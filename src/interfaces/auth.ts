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
  

  export interface VerifyResponse {
    message: string;
    decoded: {
      id: string;
      name: string;
      role: "user" | "admin" | string;
      iat: number;
      exp: number;
    };
  }
  