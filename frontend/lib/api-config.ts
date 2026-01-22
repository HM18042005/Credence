// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  // Borrower endpoints
  borrower: {
    createProfile: `${API_BASE_URL}/api/v1/borrower/profile`,
    uploadFinancialData: (userId: string) => `${API_BASE_URL}/api/v1/borrower/financial-data?user_id=${userId}`,
    assessCredit: `${API_BASE_URL}/api/v1/borrower/assess-credit`,
    getAssessments: (userId: string) => `${API_BASE_URL}/api/v1/borrower/assessments/${userId}`,
    getProfile: (userId: string) => `${API_BASE_URL}/api/v1/borrower/profile/${userId}`,
  },
  // Lender endpoints
  lender: {
    createProfile: `${API_BASE_URL}/api/v1/lender/profile`,
    listBorrowers: `${API_BASE_URL}/api/v1/lender/borrowers`,
    getBorrowerDetails: (userId: string) => `${API_BASE_URL}/api/v1/lender/borrower/${userId}`,
    overrideDecision: `${API_BASE_URL}/api/v1/lender/decision/override`,
    getPortfolioAnalytics: `${API_BASE_URL}/api/v1/lender/portfolio/analytics`,
    getProfile: (userId: string) => `${API_BASE_URL}/api/v1/lender/profile/${userId}`,
  },
  // Health check
  health: `${API_BASE_URL}/health`,
};
