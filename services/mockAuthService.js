// services/mockAuthService.js
export const mockAuthService = {
  login: async () => {
  
    await new Promise(resolve => setTimeout(resolve, 1000));
    
   
    const mockToken = "mock-jwt-token-" + Date.now();
    return { token: mockToken };
  }
};