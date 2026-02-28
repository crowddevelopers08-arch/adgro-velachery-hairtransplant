import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface LeadData {
  name: string
  phone: string
  email: string
  concern?: string
  treatment?: string
  procedure?: string
  message?: string
  city?: string
  age?: string
  consent?: boolean
  source?: string
  formName?: string
  hairLossStage?: string
  pageUrl?: string  // Add pageUrl field
}

/**
 * Generate comprehensive form data string with all user details (for system notes)
 */
function generateFormDataString(leadData: LeadData): string {
  const details = [];

  // Add all available fields with their values
  if (leadData.name) details.push(`Name: ${leadData.name}`);
  if (leadData.phone) details.push(`Phone: ${leadData.phone}`);
  if (leadData.email) details.push(`Email: ${leadData.email}`);
  if (leadData.concern) details.push(`Concern: ${leadData.concern}`);
  if (leadData.treatment) details.push(`Treatment: ${leadData.treatment}`);
  if (leadData.source) details.push(`Source: ${leadData.source}`);
  if (leadData.pageUrl) details.push(`Page URL: ${leadData.pageUrl}`);
  if (leadData.hairLossStage) details.push(`Hair Loss Stage: ${leadData.hairLossStage}`);
  
  // Join all details with " | " separator
  return details.join(' | ');
}

/**
 * Send lead data to TeleCRM
 */
async function sendToTeleCRM(leadData: LeadData, dbLeadId: string) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15000) // 15s timeout

  const endpoint = process.env.TELECRM_API_URL

  if (!endpoint) {
    throw new Error('TELECRM_API_URL environment variable is not set')
  }

  if (!process.env.TELECRM_API_KEY) {
    throw new Error('TELECRM_API_KEY environment variable is not set')
  }

  try {
    // Generate comprehensive form data string with all user details (for system notes)
    const formDataString = generateFormDataString(leadData);

    // Get the simple form name for the FormName field
    const simpleFormName = leadData.formName || 'Website leads';

    // Prepare the TeleCRM payload according to their API structure
    const telecrmPayload = {
      fields: {
        Id: "", // Leave empty for new leads
        name: leadData.name,
        email: leadData.email || "",
        phone: leadData.phone.replace(/\D/g, ''), // Only digits
        city_1: leadData.city || "",
        preferredtime: "",
        preferreddate: "",
        message: leadData.concern || leadData.message || "",
        select_the_procedure: leadData.treatment || leadData.concern || "",
        Country: "",
        LeadID: dbLeadId, // Store database ID for reference
        "CreatedOn": new Date().toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        }),
        "Lead Stage": leadData.hairLossStage || "",
        "Lead Status": "new",
        "Lead Request Type": "consultation",
        "PageName": leadData.pageUrl || leadData.source || "https://youraddgrowwebsite.com", // Use pageUrl
        "State": "",
        "Age": leadData.age || "",
        "FormName": simpleFormName // Only show form name here (simple)
      },
      actions: [
        {
          "type": "SYSTEM_NOTE",
          "text": `Form Name: ${simpleFormName}`
        },
        {
          "type": "SYSTEM_NOTE", 
          "text": `Complete Form Data: ${formDataString}`
        },
        {
          "type": "SYSTEM_NOTE",
          "text": `Lead Source URL: ${leadData.pageUrl || leadData.source || 'Direct'}`
        },
        // {
        //   "type": "SYSTEM_NOTE",
        //   "text": `Database ID: ${dbLeadId}`
        // },
        {
          "type": "SYSTEM_NOTE",
          "text": `Concern: ${leadData.concern || 'Not specified'}`
        },
        {
          "type": "SYSTEM_NOTE",
          "text": `Submitted via: Hair Transformation Consultation Form`
        }
      ]
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.TELECRM_API_KEY}`,
        'X-Client-ID': 'nextjs-hair-clinic-website',
        'Accept': 'application/json',
      },
      body: JSON.stringify(telecrmPayload),
      signal: controller.signal,
    })

    // Handle empty responses
    if (response.status === 204) {
      clearTimeout(timeout)
      return { status: 'success', message: 'Lead created (204 No Content)' }
    }

    const responseText = await response.text()

    // Skip HTML responses
    if (
      responseText.trim().startsWith('<!DOCTYPE') ||
      responseText.trim().startsWith('<html') ||
      responseText.includes('<!DOCTYPE html>')
    ) {
      console.warn(`HTML response from ${endpoint}`, {
        status: response.status,
        headers: Object.fromEntries(response.headers.entries()),
        bodyPreview: responseText.slice(0, 200),
      })
      throw new Error('TeleCRM returned HTML response instead of JSON')
    }

    // Parse JSON
    try {
      const data = responseText ? JSON.parse(responseText) : {}
      if (!response.ok) {
        throw new Error(data.message || `HTTP ${response.status} from ${endpoint}`)
      }
      clearTimeout(timeout)
      return data
    } catch {
      throw new Error(`Invalid JSON from ${endpoint}: ${responseText.slice(0, 100)}...`)
    }
  } catch (error) {
    clearTimeout(timeout)
    throw error instanceof Error ? error : new Error(String(error))
  }
}

/**
 * Save lead to database
 */
async function saveLeadToDatabase(leadData: LeadData) {
  try {
    const lead = await prisma.lead.create({
      data: {
        name: leadData.name,
        phone: leadData.phone,
        email: leadData.email,
        concern: leadData.concern,
        treatment: leadData.treatment || leadData.concern,
        procedure: leadData.procedure,
        message: leadData.message,
        city: leadData.city,
        age: leadData.age,
        consent: leadData.consent ?? true,
        source: leadData.source, // Keep for backward compatibility
        pageUrl: leadData.pageUrl, // Store the actual page URL
        formName: leadData.formName,
        hairLossStage: leadData.hairLossStage,
        status: 'NEW',
        telecrmSynced: false,
      },
    });
    
    return lead;
  } catch (error) {
    console.error('Database save error:', error);
    throw error;
  }
}

/**
 * Update lead with TeleCRM sync status
 */
async function updateLeadSyncStatus(leadId: string, telecrmId?: string, error?: string) {
  try {
    await prisma.lead.update({
      where: { id: leadId },
      data: {
        telecrmSynced: !error,
        telecrmId: telecrmId,
        error: error,
        syncedAt: error ? undefined : new Date(),
      },
    });
  } catch (updateError) {
    console.error('Failed to update lead sync status:', updateError);
  }
}

/**
 * Handle POST request
 */
export async function POST(request: Request) {
  let data: LeadData;
  let dbLead: any = null;

  try {
    data = await request.json()

    // Validate required fields
    if (!data.name || !data.phone || !data.email) {
      return NextResponse.json(
        { error: 'Missing required fields: name, phone, email' },
        { status: 400 }
      )
    }

    // Get the simple form name
    const simpleFormName = data.formName || 'Website leads';

    // First, save to database
    try {
      dbLead = await saveLeadToDatabase(data);
      console.log('Lead saved to database with ID:', dbLead.id);
      console.log('Page URL saved:', dbLead.pageUrl);
    } catch (dbError) {
      console.error('Failed to save lead to database:', dbError);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to save lead to database',
          details: dbError instanceof Error ? dbError.message : String(dbError),
          referenceId: `DB-ERR-${Date.now()}`,
        },
        { status: 500 }
      );
    }

    // Send to TeleCRM
    let telecrmResponse = null;
    let telecrmError = null;

    try {
      telecrmResponse = await sendToTeleCRM(data, dbLead.id);
      console.log('Lead sent to TeleCRM successfully');
      
      // Update database with TeleCRM sync status
      const telecrmId = telecrmResponse?.id || telecrmResponse?.leadId || telecrmResponse?.data?.id;
      await updateLeadSyncStatus(dbLead.id, telecrmId);
      
    } catch (error) {
      telecrmError = error;
      console.error('TeleCRM submission failed:', error);
      
      // Update database with TeleCRM error
      await updateLeadSyncStatus(
        dbLead.id, 
        undefined, 
        error instanceof Error ? error.message : String(error)
      );
    }

    // Return response based on results
    if (dbLead && !telecrmError) {
      return NextResponse.json(
        {
          success: true,
          leadId: dbLead.id,
          telecrmResponse: telecrmResponse,
          timestamp: new Date().toISOString(),
          formName: simpleFormName,
          message: 'Lead submitted successfully to database and TeleCRM',
          pageUrl: data.pageUrl // Return the page URL for verification
        },
        { status: 201 }
      );
    } else if (dbLead && telecrmError) {
      return NextResponse.json(
        {
          success: true,
          leadId: dbLead.id,
          warning: 'Lead saved to database but TeleCRM sync failed',
          telecrmError: telecrmError instanceof Error ? telecrmError.message : String(telecrmError),
          timestamp: new Date().toISOString(),
          formName: simpleFormName,
          message: 'Lead saved to database. TeleCRM sync pending.',
          pageUrl: data.pageUrl
        },
        { status: 201 } // Still return 201 as lead was saved
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to process lead',
          referenceId: `ERR-${Date.now()}`,
        },
        { status: 500 }
      );
    }

  } catch (error) {
    const simpleFormName = data?.formName || 'Website leads';

    console.error('Lead submission error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
      formName: simpleFormName
    })

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process lead',
        details: error instanceof Error ? error.message : 'Unknown error',
        referenceId: `ERR-${Date.now()}`,
        formName: simpleFormName
      },
      { status: 500 }
    )
  }
}

/**
 * Handle GET request - Fetch leads with filters
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const formName = searchParams.get('formName');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const limit = parseInt(searchParams.get('limit') || '100');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};
    
    if (status) {
      where.status = status.toUpperCase();
    }
    
    if (formName) {
      where.formName = formName;
    }
    
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) {
        where.createdAt.gte = new Date(startDate);
      }
      if (endDate) {
        where.createdAt.lte = new Date(endDate);
      }
    }

    // Get total count for pagination
    const total = await prisma.lead.count({ where });

    // Fetch leads
    const leads = await prisma.lead.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    });

    return NextResponse.json({
      success: true,
      leads,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch leads',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}