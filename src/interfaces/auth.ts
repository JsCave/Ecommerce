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
  
  export interface ResetCodeResponse {
    statusMsg: string;  // e.g., "success" | "fail"
    message: string;    // e.g., "Reset code sent to your email"
  }
  
  export interface VerifyCodeResponse {
    status: string;
  }

  export interface ResetResponse {
    token: string;
  }