"use client";

import { useState, useEffect, Fragment } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Download,
  Phone,
  Mail,
  Calendar,
  RefreshCw,
  Users,
  FileText,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  Eye,
  EyeOff,
  X,
  Check,
  Clock,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  treatment?: string;
  procedure?: string;
  message?: string;
  city?: string;
  age?: string;
  consent: boolean;
  source?: string;
  formName?: string;
  status: "new" | "contacted" | "scheduled" | "converted" | "lost";
  telecrmSynced: boolean;
  telecrmId?: string;
  hairLossStage?: string;
  createdAt: string;
  updatedAt: string;
}

interface LeadsTableProps {
  initialLeads?: Lead[];
  autoRefresh?: boolean;
  refreshInterval?: number;
}

export default function LeadsTable({
  initialLeads = [],
  autoRefresh = false,
  refreshInterval = 30000,
}: LeadsTableProps) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [treatmentFilter, setTreatmentFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [formFilter, setFormFilter] = useState("all");
  const [expandedLead, setExpandedLead] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Lead;
    direction: "asc" | "desc";
  } | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [mobileLeadDetails, setMobileLeadDetails] = useState<Lead | null>(null);

  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact-form");
      const data = await res.json();
      setLeads(res.ok && data.success ? data.leads || [] : []);
    } catch {
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(fetchLeads, refreshInterval);
    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval]);

  const handleSort = (key: keyof Lead) => {
    setSortConfig((prev) => ({
      key,
      direction: prev?.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedLeads = [...leads].sort((a, b) => {
    if (!sortConfig) return 0;
    let aVal = a[sortConfig.key];
    let bVal = b[sortConfig.key];

    if (sortConfig.key === "createdAt" || sortConfig.key === "updatedAt") {
      aVal = new Date(aVal as string).getTime();
      bVal = new Date(bVal as string).getTime();
    } else {
      aVal = (aVal ?? "").toString().toLowerCase();
      bVal = (bVal ?? "").toString().toLowerCase();
    }

    if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const safe = (v: unknown) => (v ? String(v).toLowerCase() : "");

  const isWithinDateRange = (date: string, range: string) => {
    const d = new Date(date);
    const now = new Date();
    if (range === "today") return d.toDateString() === now.toDateString();
    if (range === "week") {
      const weekAgo = new Date(now);
      weekAgo.setDate(now.getDate() - 7);
      return d >= weekAgo;
    }
    if (range === "month") {
      const monthAgo = new Date(now);
      monthAgo.setMonth(now.getMonth() - 1);
      return d >= monthAgo;
    }
    return true;
  };

  const filteredLeads = sortedLeads.filter((l) => {
    const matchesSearch =
      safe(l.name).includes(safe(searchTerm)) ||
      safe(l.phone).includes(safe(searchTerm)) ||
      safe(l.email).includes(safe(searchTerm)) ||
      safe(l.treatment).includes(safe(searchTerm)) ||
      safe(l.message).includes(safe(searchTerm)) ||
      safe(l.city).includes(safe(searchTerm)) ||
      safe(l.formName).includes(safe(searchTerm)) ||
      safe(l.hairLossStage).includes(safe(searchTerm));

    const matchesStatus = statusFilter === "all" || l.status === statusFilter;
    const matchesTreatment =
      treatmentFilter === "all" || l.treatment === treatmentFilter;
    const matchesDate =
      dateFilter === "all" || isWithinDateRange(l.createdAt, dateFilter);
    const matchesForm = formFilter === "all" || l.formName === formFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesTreatment &&
      matchesDate &&
      matchesForm
    );
  });

  const getStatusBadge = (status: Lead["status"]) => {
    const map = {
      new: "bg-blue-100 text-blue-800 border-blue-200",
      contacted: "bg-yellow-100 text-yellow-800 border-yellow-200",
      scheduled: "bg-purple-100 text-purple-800 border-purple-200",
      converted: "bg-green-100 text-green-800 border-green-200",
      lost: "bg-red-100 text-red-800 border-red-200",
    } as const;
    
    const icon = {
      new: "●",
      contacted: "📞",
      scheduled: "📅",
      converted: "✓",
      lost: "✗"
    };
    
    return (
      <Badge variant="outline" className={`${map[status]} border ${isMobile ? 'px-2 py-1 text-xs' : ''}`}>
        {isMobile ? icon[status] : status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getFormBadge = (name?: string) => {
    if (!name)
      return (
        <Badge className="bg-gray-100 text-gray-700 border-gray-200 text-xs">
          {isMobile ? "?" : "Unknown"}
        </Badge>
      );

    const n = name.toLowerCase();
    const map: Record<string, { label: string; shortLabel: string; color: string }> = {
      "contact-form": {
        label: "Contact Form",
        shortLabel: "Contact",
        color: "bg-blue-100 text-blue-800 border-blue-200",
      },
      "common-form": {
        label: "Common Form",
        shortLabel: "Common",
        color: "bg-emerald-100 text-emerald-800 border-emerald-200",
      },
      hairtreatment: {
        label: "Hair Treatment",
        shortLabel: "Hair",
        color: "bg-purple-100 text-purple-800 border-purple-200",
      },
      "skin and hair leads": {
        label: "Skin & Hair",
        shortLabel: "S&H",
        color: "bg-indigo-100 text-indigo-800 border-indigo-200",
      },
    };

    const cfg = map[n] || {
      label: name,
      shortLabel: name.length > 8 ? name.substring(0, 8) + "..." : name,
      color: "bg-gray-100 text-gray-800 border-gray-200",
    };

    return (
      <Badge variant="outline" className={`${cfg.color} border text-xs`}>
        {isMobile ? cfg.shortLabel : cfg.label}
      </Badge>
    );
  };

  const getTelecrmBadge = (v: boolean) =>
    v ? (
      <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
        {isMobile ? "✓" : "Synced"}
      </Badge>
    ) : (
      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 text-xs">
        {isMobile ? "⏳" : "Pending"}
      </Badge>
    );

  const uniqueFormNames = Array.from(
    new Set(leads.map((l) => l.formName).filter(Boolean))
  );

  const updateLeadStatus = async (id: string, status: Lead["status"]) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status } : l))
        );
        // Update mobile details if open
        if (mobileLeadDetails?.id === id) {
          setMobileLeadDetails({...mobileLeadDetails, status});
        }
      }
    } catch {
      /* no-op */
    }
  };

  const formatDate = (d: string) => {
    if (!isClient || !d) return { date: "", time: "" };
    const dt = new Date(d);
    
    if (isMobile) {
      return {
        date: dt.toLocaleDateString("en-IN", { 
          day: "2-digit", 
          month: "short" 
        }),
        time: dt.toLocaleTimeString("en-IN", { 
          hour: "2-digit", 
          minute: "2-digit" 
        }),
        fullDate: dt.toLocaleDateString("en-IN"),
        fullTime: dt.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
    }
    
    return {
      date: dt.toLocaleDateString("en-IN"),
      time: dt.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      fullDate: dt.toLocaleDateString("en-IN"),
      fullTime: dt.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const exportToCSV = () => {
    const headers = [
      "Name",
      "Phone",
      "Email",
      "Treatment",
      "Hair Loss Stage",
      "Message",
      "City",
      "Age",
      "Status",
      "Form Name",
      "Source",
      "TeleCRM Synced",
      "Created At",
    ];

    const rows = filteredLeads.map((l) => [
      l.name ?? "",
      l.phone ?? "",
      l.email ?? "",
      l.treatment ?? "",
      l.hairLossStage ?? "",
      `"${(l.message ?? "").replace(/"/g, '""')}"`,
      l.city ?? "",
      l.age ?? "",
      l.status,
      l.formName ?? "",
      l.source ?? "",
      l.telecrmSynced ? "Yes" : "No",
      isClient
        ? new Date(l.createdAt).toLocaleString("en-IN")
        : l.createdAt,
    ]);

    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCall = (p?: string) => p && window.open(`tel:${p}`, "_self");
  const handleEmail = (e?: string) =>
    e && window.open(`mailto:${e}`, "_self");

  const toggleLeadExpansion = (id: string) =>
    setExpandedLead((c) => (c === id ? null : id));

  const openMobileLeadDetails = (lead: Lead) => {
    setMobileLeadDetails(lead);
  };

  const clearFilters = () => {
    setStatusFilter("all");
    setTreatmentFilter("all");
    setDateFilter("all");
    setFormFilter("all");
    setSearchTerm("");
  };

  // Mobile Lead Card Component
  const MobileLeadCard = ({ lead }: { lead: Lead }) => {
    const d = formatDate(lead.createdAt);
    
    return (
      <div className="bg-white border rounded-lg p-4 mb-3 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 truncate">
              {lead.name || "Unknown"}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-gray-600">{lead.phone || "-"}</span>
              {lead.email && (
                <span className="text-xs text-gray-500 truncate">
                  • {lead.email}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            {getStatusBadge(lead.status)}
            <span className="text-xs text-gray-500">
              {d.date}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <span className="text-xs text-gray-500 block">Treatment</span>
            <span className="text-sm font-medium truncate block">
              {lead.treatment || lead.procedure || "-"}
            </span>
          </div>
          <div>
            <span className="text-xs text-gray-500 block">Form</span>
            <div className="mt-1">{getFormBadge(lead.formName)}</div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t">
          <div>
            <span className="text-xs text-gray-500 block">Sync</span>
            <div className="mt-1">{getTelecrmBadge(lead.telecrmSynced)}</div>
          </div>
          
          <div className="flex items-center gap-2">
            {lead.phone && (
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCall(lead.phone);
                }}
                className="h-8 w-8 p-0"
              >
                <Phone className="h-4 w-4" />
              </Button>
            )}
            {lead.email && (
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEmail(lead.email);
                }}
                className="h-8 w-8 p-0"
              >
                <Mail className="h-4 w-4" />
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={() => openMobileLeadDetails(lead)}
              className="h-8 px-3"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">
                Leads Management
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Manage and track consultation requests
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button 
                variant="outline" 
                onClick={fetchLeads} 
                disabled={loading}
                size={isMobile ? "sm" : "default"}
                className="w-full sm:w-auto"
              >
                <RefreshCw
                  className={`h-4 w-4 mr-2 ${
                    loading ? "animate-spin" : ""
                  }`}
                />
                {loading ? "Refreshing..." : "Refresh"}
              </Button>
              <Button 
                onClick={exportToCSV}
                size={isMobile ? "sm" : "default"}
                className="w-full sm:w-auto"
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Mobile Filter Button */}
          {isMobile && (
            <div className="flex gap-2 mb-4">
              <Sheet open={showMobileFilters} onOpenChange={setShowMobileFilters}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex-1">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[80vh]">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Status</label>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="contacted">Contacted</SelectItem>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                          <SelectItem value="converted">Converted</SelectItem>
                          <SelectItem value="lost">Lost</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Treatment</label>
                      <Select value={treatmentFilter} onValueChange={setTreatmentFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Treatment" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Treatments</SelectItem>
                          <SelectItem value="Baldness">Baldness</SelectItem>
                          <SelectItem value="Hair thinning">Hair thinning</SelectItem>
                          <SelectItem value="Receding hairline">
                            Receding hairline
                          </SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Form</label>
                      <Select value={formFilter} onValueChange={setFormFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Form" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Forms</SelectItem>
                          {uniqueFormNames.map((f) => (
                            <SelectItem key={f} value={f!}>
                              {f}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Date</label>
                      <Select value={dateFilter} onValueChange={setDateFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Date" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Time</SelectItem>
                          <SelectItem value="today">Today</SelectItem>
                          <SelectItem value="week">This Week</SelectItem>
                          <SelectItem value="month">This Month</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button 
                        variant="outline" 
                        onClick={clearFilters}
                        className="flex-1"
                      >
                        Clear All
                      </Button>
                      <Button 
                        onClick={() => setShowMobileFilters(false)}
                        className="flex-1"
                      >
                        Apply Filters
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              
              <Button 
                variant="outline" 
                onClick={clearFilters}
                className="flex-1"
              >
                <X className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>
          )}

          {/* Desktop Filters */}
          {!isMobile && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6 p-4 bg-gray-50 rounded-lg border">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="converted">Converted</SelectItem>
                  <SelectItem value="lost">Lost</SelectItem>
                </SelectContent>
              </Select>

              <Select value={treatmentFilter} onValueChange={setTreatmentFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Treatment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Treatments</SelectItem>
                  <SelectItem value="Baldness">Baldness</SelectItem>
                  <SelectItem value="Hair thinning">Hair thinning</SelectItem>
                  <SelectItem value="Receding hairline">
                    Receding hairline
                  </SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>

              <Select value={formFilter} onValueChange={setFormFilter}>
                <SelectTrigger>
                  <Users className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Form" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Forms</SelectItem>
                  {uniqueFormNames.map((f) => (
                    <SelectItem key={f} value={f!}>
                      {f}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger>
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Results Count */}
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold">{filteredLeads.length}</span> of{" "}
              <span className="font-semibold">{leads.length}</span> leads
            </p>
            {isMobile && filteredLeads.length > 0 && (
              <p className="text-xs text-gray-500">
                Tap for details
              </p>
            )}
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="py-12 text-center">
              <RefreshCw className="h-6 w-6 mr-2 inline animate-spin text-gray-500" />
              <span className="text-gray-600">Loading leads...</span>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="py-12 text-center bg-white rounded-lg border">
              <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">No leads found</p>
              <p className="text-sm text-gray-500 mt-2">
                {searchTerm || statusFilter !== "all" || treatmentFilter !== "all" || dateFilter !== "all" || formFilter !== "all"
                  ? "Try adjusting your filters"
                  : "No leads available"}
              </p>
            </div>
          ) : isMobile ? (
            /* Mobile Card View */
            <div className="space-y-2">
              {filteredLeads.map((lead) => (
                <MobileLeadCard key={lead.id} lead={lead} />
              ))}
            </div>
          ) : (
            /* Desktop Table View */
            <div className="border rounded-lg overflow-hidden bg-white">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th
                        className="px-4 py-3 cursor-pointer whitespace-nowrap text-left"
                        onClick={() => handleSort("name")}
                      >
                        <div className="flex items-center gap-1">
                          Name
                          {sortConfig?.key === "name" &&
                            (sortConfig.direction === "asc" ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            ))}
                        </div>
                      </th>
                      <th className="px-4 py-3 whitespace-nowrap text-left">Contact</th>
                      <th className="px-4 py-3 whitespace-nowrap text-left">Treatment</th>
                      <th className="px-4 py-3 whitespace-nowrap text-left">Form</th>
                      <th className="px-4 py-3 whitespace-nowrap text-left">Status</th>
                      <th className="px-4 py-3 whitespace-nowrap text-left">Sync</th>
                      <th
                        className="px-4 py-3 cursor-pointer whitespace-nowrap text-left"
                        onClick={() => handleSort("createdAt")}
                      >
                        <div className="flex items-center gap-1">
                          Date
                          {sortConfig?.key === "createdAt" &&
                            (sortConfig.direction === "asc" ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            ))}
                        </div>
                      </th>
                      <th className="px-4 py-3 whitespace-nowrap text-left">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredLeads.map((lead) => {
                      const d = formatDate(lead.createdAt);

                      return (
                        <Fragment key={lead.id}>
                          <tr
                            className="border-b hover:bg-gray-50 cursor-pointer"
                            onClick={() => toggleLeadExpansion(lead.id)}
                          >
                            <td className="px-4 py-3 font-medium whitespace-nowrap">
                              {lead.name || "Unknown"}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex flex-col gap-1">
                                <span className="whitespace-nowrap">
                                  {lead.phone || "-"}
                                </span>
                                {lead.email && (
                                  <span className="text-xs text-gray-600 truncate max-w-[150px]">
                                    {lead.email}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              {lead.treatment || lead.procedure || "-"}
                            </td>
                            <td className="px-4 py-3">
                              {getFormBadge(lead.formName)}
                            </td>
                            <td className="px-4 py-3">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <div className="cursor-pointer">
                                    {getStatusBadge(lead.status)}
                                  </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  {["new","contacted","scheduled","converted","lost"].map(
                                    (s) => (
                                      <DropdownMenuItem
                                        key={s}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          updateLeadStatus(
                                            lead.id,
                                            s as Lead["status"]
                                          );
                                        }}
                                      >
                                        Set as {s}
                                      </DropdownMenuItem>
                                    )
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                            <td className="px-4 py-3">
                              {getTelecrmBadge(lead.telecrmSynced)}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="flex flex-col">
                                <span>{d.date}</span>
                                <span className="text-xs text-gray-500">
                                  {d.time}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCall(lead.phone);
                                  }}
                                  disabled={!lead.phone}
                                >
                                  <Phone className="h-3 w-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEmail(lead.email);
                                  }}
                                  disabled={!lead.email}
                                >
                                  <Mail className="h-3 w-3" />
                                </Button>
                              </div>
                            </td>
                          </tr>

                        {expandedLead === lead.id && (
  <tr className="bg-gray-50">
    <td colSpan={8} className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium mb-3 text-gray-900">
            Lead Details
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-start">
              <span className="font-medium w-32 text-gray-600">Source/Live URL:</span>
              <span className="text-blue-600 break-all">
                {lead.source ? (
                  <a href={lead.source} target="_blank" rel="noopener noreferrer" 
                     className="hover:underline">
                    {lead.source}
                  </a>
                ) : "-"}
              </span>
            </div>
            <div className="flex items-start">
              <span className="font-medium w-32 text-gray-600">Hair Loss Stage:</span>
              <span>{lead.hairLossStage || "-"}</span>
            </div>
            {lead.telecrmId && (
              <div className="flex items-start">
                <span className="font-medium w-32 text-gray-600">TeleCRM ID:</span>
                <span className="font-mono">{lead.telecrmId}</span>
              </div>
            )}
            {lead.city && (
              <div className="flex items-start">
                <span className="font-medium w-32 text-gray-600">City:</span>
                <span>{lead.city}</span>
              </div>
            )}
            {lead.age && (
              <div className="flex items-start">
                <span className="font-medium w-32 text-gray-600">Age:</span>
                <span>{lead.age}</span>
              </div>
            )}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-3 text-gray-900">
            Message
          </h4>
          <div className="p-4 border rounded-lg bg-white max-h-60 overflow-y-auto text-sm">
            {lead.message ? (
              <p className="whitespace-pre-wrap">{lead.message}</p>
            ) : (
              <p className="text-gray-500 italic">No message provided</p>
            )}
          </div>
        </div>
      </div>
    </td>
  </tr>
)}
                        </Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Mobile Lead Details Sheet */}
          <Sheet open={!!mobileLeadDetails} onOpenChange={(open) => !open && setMobileLeadDetails(null)}>
            <SheetContent side="bottom" className="h-[85vh]">
              {mobileLeadDetails && (
                <>
                  <SheetHeader className="mb-6">
                    <SheetTitle>Lead Details</SheetTitle>
                  </SheetHeader>
                  
                  <div className="space-y-6 overflow-y-auto pb-20">
                    {/* Basic Info */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-semibold text-lg mb-3">{mobileLeadDetails.name}</h3>
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm text-gray-500 block">Phone</span>
                          <a href={`tel:${mobileLeadDetails.phone}`} className="font-medium hover:text-blue-600">
                            {mobileLeadDetails.phone}
                          </a>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500 block">Email</span>
                          <a href={`mailto:${mobileLeadDetails.email}`} className="font-medium hover:text-blue-600 truncate block">
                            {mobileLeadDetails.email}
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Status & Actions */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white border rounded-lg p-4">
                        <span className="text-sm text-gray-500 block mb-2">Status</span>
                        <div className="mb-3">{getStatusBadge(mobileLeadDetails.status)}</div>
                        <div className="space-y-2">
                          {["new","contacted","scheduled","converted","lost"].map((s) => (
                            <Button
                              key={s}
                              variant="outline"
                              size="sm"
                              onClick={() => updateLeadStatus(mobileLeadDetails.id, s as Lead["status"])}
                              className="w-full justify-start text-xs"
                            >
                              {s}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="bg-white border rounded-lg p-4">
                        <span className="text-sm text-gray-500 block mb-2">Actions</span>
                        <div className="space-y-2">
                          <Button
                            onClick={() => handleCall(mobileLeadDetails.phone)}
                            disabled={!mobileLeadDetails.phone}
                            className="w-full justify-start"
                          >
                            <Phone className="h-4 w-4 mr-2" />
                            Call
                          </Button>
                          <Button
                            onClick={() => handleEmail(mobileLeadDetails.email)}
                            disabled={!mobileLeadDetails.email}
                            className="w-full justify-start"
                          >
                            <Mail className="h-4 w-4 mr-2" />
                            Email
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                <div className="bg-white border rounded-lg p-4">
  <h3 className="font-semibold mb-3">Lead Information</h3>
  <div className="space-y-3">
    <div className="grid grid-cols-2 gap-4">
      <div>
        <span className="text-sm text-gray-500 block">Treatment</span>
        <span className="font-medium">{mobileLeadDetails.treatment || "-"}</span>
      </div>
      <div>
        <span className="text-sm text-gray-500 block">Form</span>
        <span>{mobileLeadDetails.formName || "-"}</span>
      </div>
    </div>
    
    <div className="grid grid-cols-2 gap-4">
      <div>
        <span className="text-sm text-gray-500 block">Hair Loss Stage</span>
        <span>{mobileLeadDetails.hairLossStage || "-"}</span>
      </div>
      <div>
        <span className="text-sm text-gray-500 block">Source/Live URL</span>
        <span className="text-blue-600 text-xs break-all">
          {mobileLeadDetails.source ? (
            <a href={mobileLeadDetails.source} target="_blank" rel="noopener noreferrer" 
               className="hover:underline">
              {mobileLeadDetails.source}
            </a>
          ) : "-"}
        </span>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div>
        <span className="text-sm text-gray-500 block">City</span>
        <span>{mobileLeadDetails.city || "-"}</span>
      </div>
      <div>
        <span className="text-sm text-gray-500 block">Age</span>
        <span>{mobileLeadDetails.age || "-"}</span>
      </div>
    </div>

    <div>
      <span className="text-sm text-gray-500 block">Created</span>
      <span>{formatDate(mobileLeadDetails.createdAt).fullDate} at {formatDate(mobileLeadDetails.createdAt).fullTime}</span>
    </div>

    {mobileLeadDetails.telecrmId && (
      <div>
        <span className="text-sm text-gray-500 block">TeleCRM ID</span>
        <span className="font-mono">{mobileLeadDetails.telecrmId}</span>
      </div>
    )}
  </div>
</div>

                    {/* Message */}
                    {mobileLeadDetails.message && (
                      <div className="bg-white border rounded-lg p-4">
                        <h3 className="font-semibold mb-3">Message</h3>
                        <div className="p-3 bg-gray-50 rounded">
                          <p className="whitespace-pre-wrap text-sm">{mobileLeadDetails.message}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 bg-white border-t p-4">
                    <Button
                      onClick={() => setMobileLeadDetails(null)}
                      className="w-full"
                    >
                      Close
                    </Button>
                  </div>
                </>
              )}
            </SheetContent>
          </Sheet>
        </CardContent>
      </Card>
    </div>
  );
}