"use client";
import React, { useState } from 'react';

const ClickReview: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    suggestions: '',
    contact: 'Yes'
  });

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    
    if (option === 'happy') {
      // Redirect to your desired link
      window.location.href = 'https://g.page/r/CdsAWYxwiurrEBM/review';
    } else if (option === 'feedback') {
      setShowFeedbackForm(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setShowFeedbackForm(false);
    // Here you would typically send the feedback to your backend
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setSelectedOption('');
    setFormData({
      name: '',
      phone: '',
      email: '',
      suggestions: '',
      contact: 'Yes'
    });
  };

  const closeFeedbackForm = () => {
    setShowFeedbackForm(false);
    setSelectedOption('');
  };

  if (isSubmitted) {
    return (
        <>
           <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
      <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#c99500] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[#c99500]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-[#070707] mb-2">Thank You!</h3>
          <p className="text-[#070707] text-opacity-70 mb-6">We appreciate you taking the time to share your feedback.</p>
          <button
            onClick={resetForm}
            className="px-5 py-2 bg-[#c99500] hover:bg-opacity-90 text-white font-medium rounded-lg transition-colors duration-200"
          >
            Submit New Feedback
          </button>
        </div>
      </div>
      </>
    );
  }

  return (
    <>
           <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
    <div className="w-[600px] max-[470px]:w-fit max-[470px]:mt-10 max-[426px]:mb-0 mx-auto p-6 bg-white rounded-2xl shadow-lg border mb-[100px] mt-[150px] border-gray-200"style={{fontFamily: "'Outfit', sans-serif"}}>
      <div className="text-center mb-2">
         <div className="flex-shrink-0 flex justify-center">
             <img  className="w-[200px] h-[60px] max-[768px]:w-[150px] max-[768px]:h-[50px] max-[480px]:w-[120px] max-[480px]:h-[40px]" src="bglogo.png" alt="logo" />
            </div>

        <h2 className="text-[40px] font-bold max-[470px]:text-[22px] text-[#070707]">Click & Review</h2>
        <p className="text-[#070707] text-[22px] max-[426px]:text-[16px] text-opacity-70 mt-2">We'd love to hear your feedback!</p>
      </div>
      
      <p className="text-[#070707] max-[470px]:text-[16px] text-opacity-70 text-[22px] mb-6 text-center">
        Please click any one of the buttons below to share your review.
      </p>
      
      <div className="space-y-4 mb-6">
        <button
          onClick={() => handleOptionSelect('happy')}
          className={`w-full py-3 px-4 text-center border rounded-lg transition-all duration-200 ${
            selectedOption === 'happy' 
              ? 'bg-[#c99500] bg-opacity-20 border-[#c99500] shadow-sm' 
              : 'bg-[#c99500] border-gray-300 hover:bg-[#c99500]'
          }`}
        >
          <span className="text-[#070707] max-[470px]:text-[20px] text-[22px] font-medium">I'm Happy</span>
        </button>
        
        <button
          onClick={() => handleOptionSelect('feedback')}
          className={`w-full py-3 px-4 text-center border rounded-lg transition-all duration-200 ${
            selectedOption === 'feedback' 
              ? 'bg-[#c99500] bg-opacity-20 border-[#c99500] shadow-sm' 
              : 'bg-[#c99500] border-gray-300 hover:[#c99500]'
          }`}
        >
          <span className="text-[#070707] max-[470px]:text-[20px] text-[22px] font-medium">Share Feedback</span>
        </button>
      </div>
      
      <p className="text-xs text-[#070707] text-opacity-50 text-center mt-4">
        Your feedback helps us improve our services.
      </p>

      {/* Feedback Form Popup */}
      {showFeedbackForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-[#070707]">Share Your Feedback</h3>
                <button 
                  onClick={closeFeedbackForm}
                  className="text-[#070707] hover:text-opacity-70"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#070707] mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#c99500] focus:border-[#c99500] transition-colors duration-200"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[#070707] mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#c99500] focus:border-[#c99500] transition-colors duration-200"
                      placeholder="10-digit mobile number"
                      pattern="[0-9]{10}"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#070707] mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#c99500] focus:border-[#c99500] transition-colors duration-200"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="suggestions" className="block text-sm font-medium text-[#070707] mb-1">
                      Your Suggestions
                    </label>
                    <textarea
                      id="suggestions"
                      name="suggestions"
                      value={formData.suggestions}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#c99500] focus:border-[#c99500] transition-colors duration-200"
                      placeholder="Let us know how we can improve..."
                      required
                    ></textarea>
                  </div>
                  
                  <div>
                    <label htmlFor="contact" className="block text-sm font-medium text-[#070707] mb-1">
                      Would you like us to contact you?
                    </label>
                    <select
                      id="contact"
                      name="contact"
                      value={formData.contact}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#c99500] focus:border-[#c99500] transition-colors duration-200"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-[#c99500] hover:bg-opacity-90 text-white font-medium rounded-lg shadow-md transition-all duration-200"
                  >
                    Send Feedback
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default ClickReview;