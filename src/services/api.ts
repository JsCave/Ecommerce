import { 
  AddToCartResponse, 
  GetUserCartResponse, 
  RemoveCartProductResponse, 
  ClearCartResponse, 
  UpdateCartProductCountResponse,
  CheckoutResponse,
  LoginResponse,
  BrandResponse,
  Order,
  VerifyResponse,
  ResetCodeResponse,
  WishListResponse,
  AddToWishListResponse,
  VerifyCodeResponse,
  ResetResponse,
} from "@/interfaces";
import { CategoriesResponse, ProductsResponse, SingleProductResponse } from "@/types";

class ApiServices {
  #baseUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL!;

  async getAllProducts(): Promise<ProductsResponse> {
    return await fetch(this.#baseUrl + "api/v1/products", {
      next: { revalidate: 60 },
      cache: "no-cache",
    }).then((res) => res.json());
  }

  async getAllBrands(): Promise<BrandResponse> {
    return await fetch(this.#baseUrl + "api/v1/brands", {
      next: { revalidate: 60 },
      cache: "no-cache",
    }).then((res) => res.json());
  }

  async getAllCategories(): Promise<CategoriesResponse> {
    return await fetch(this.#baseUrl + "api/v1/categories", {
      next: { revalidate: 60 },
      cache: "no-cache",
    }).then((res) => res.json());
  }

  
  async getUserData(): Promise<VerifyResponse> {
    return await fetch(this.#baseUrl + "api/v1/auth/verifyToken", {
      headers: this.#getHeaders(),
      next: { revalidate: 60 },
      cache: "no-cache",
    }).then((res) => res.json());
  }

  async getProductDetails(productId: string | string[]): Promise<SingleProductResponse> {
    return await fetch(this.#baseUrl + "api/v1/products/" + productId).then((res) =>
      res.json()
    );
  }

  #getHeaders() {
    return {
      "Content-Type": "application/json",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Yjk1MGYxY2E0NWFiOWY5MWE3OWQwNyIsIm5hbWUiOiJBbGFhIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NTY5NzUzNDYsImV4cCI6MTc2NDc1MTM0Nn0.pFTGtev-la1EW9SvjyCRYXNeY_vivY5sd7mvVveiAD4",
    };
  }

  async addProductToCart(productId: string): Promise<AddToCartResponse> {
    return await fetch(this.#baseUrl + "api/v1/cart", {
      method: "post",
      headers: this.#getHeaders(),
      body: JSON.stringify({ productId }),
    }).then((res) => res.json());
  }

  async getUserCart(): Promise<GetUserCartResponse> {
    const isServer = typeof window === "undefined";
  
    const res = await fetch(this.#baseUrl + "api/v1/cart", {
      headers: this.#getHeaders(),
      ...(isServer
        ? { cache: "no-store", next: { revalidate: 0 } } 
        : { cache: "no-cache" }),                        
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch cart");
    }
  
    return res.json();
  }
  
  

  async removeCartProduct(productId: string): Promise<RemoveCartProductResponse> {
    return await fetch(this.#baseUrl + "api/v1/cart/" + productId, {
      headers: this.#getHeaders(),
      method: "delete",
    }).then((res) => res.json());
  }

  async clearCart(): Promise<ClearCartResponse> {
    return await fetch(this.#baseUrl + "api/v1/cart", {
      headers: this.#getHeaders(),
      method: "delete",
    }).then((res) => res.json());
  }

  async updateCartProductCount(
    productId: string,
    count: number
  ): Promise<UpdateCartProductCountResponse> {
    return await fetch(this.#baseUrl + "api/v1/cart/" + productId, {
      body: JSON.stringify({ count }),
      headers: this.#getHeaders(),
      method: "put",
    }).then((res) => res.json());
  }



  async checkOut(cartId: string): Promise<CheckoutResponse> {
    return await fetch(
      this.#baseUrl + "api/v1/orders/checkout-session/" + cartId + "?url=https://ecommerce-i16w.vercel.app",
      {
        method: "post",
        body: JSON.stringify({
          shippingAddress: {
            details: "details",
            phone: "01010700999",
            city: "Cairo",
          },
        }),
        headers: this.#getHeaders(),
      }
    ).then((res) => res.json());
  }

  async logIn(email: string, password: string): Promise<LoginResponse> {
    return await fetch(this.#baseUrl + "api/v1/auth/signin", {
      body: JSON.stringify({ email, password }),
      headers: this.#getHeaders(),
      method: "post",
    }).then((res) => res.json());
  }

  async getAllOrders(cartId: string): Promise<Order[]> {
    const res = await fetch(this.#baseUrl + "api/v1/orders/user/" + cartId, {
      cache: "no-store",        
      next: { revalidate: 0 },  
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch orders");
    }
  
    return res.json();
  }

  async forgetPassword(email: string): Promise<ResetCodeResponse> {
    return await fetch(this.#baseUrl + "api/v1/auth/forgotPasswords", {
      body: JSON.stringify({ email}),
      headers: this.#getHeaders(),
      method: "post",
    }).then((res) => res.json());
  }

 
  async verifyResetCode(resetCode: string): Promise<ResetCodeResponse> {
    return await fetch(this.#baseUrl + "api/v1/auth/verifyResetCode", {
      body: JSON.stringify({ resetCode}),
      headers: this.#getHeaders(),
      method: "post",
    }).then((res) => res.json());
  }

  async resetPassword(email: string,newPassword:string): Promise<ResetCodeResponse> {
    return await fetch(this.#baseUrl + "api/v1/auth/verifyResetCode", {
      body: JSON.stringify({ email,newPassword}),
      headers: this.#getHeaders(),
      method: "put",
    }).then((res) => res.json());
  }


  async getWishList(): Promise<WishListResponse> {
    return await fetch(this.#baseUrl + "api/v1/wishlist", {
      headers: this.#getHeaders(),
      next: { revalidate: 60 },
      cache: "no-cache",
    }).then((res) => res.json());
  }

  async addWishList(productId: string): Promise<AddToWishListResponse> {
    return await fetch(this.#baseUrl + "api/v1/wishlist", {
      body: JSON.stringify({ productId }),
      headers: this.#getHeaders(),
      method: "post",
    }).then((res) => res.json());
  }
  
  async deleteWishList(productId: string): Promise<AddToWishListResponse> {
    const res = await fetch(this.#baseUrl + "api/v1/wishlist/" + productId, {
      headers: this.#getHeaders(),
      cache: "no-store",        
      next: { revalidate: 0 },  
      method:'delete'
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch orders");
    }
  
    return res.json();
  }

}

export const apiServices = new ApiServices();
