export interface LoginResponse {
    message: string;
    token: string;
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
  }
  

  