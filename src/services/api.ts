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

  
  async getUserData(token:string): Promise<VerifyResponse> {
    return await fetch(this.#baseUrl + "api/v1/auth/verifyToken", {
      headers: this.#getHeaders(token),
      next: { revalidate: 60 },
      cache: "no-cache",
    }).then((res) => res.json());
  }

  async getProductDetails(productId: string | string[]): Promise<SingleProductResponse> {
    return await fetch(this.#baseUrl + "api/v1/products/" + productId).then((res) =>
      res.json()
    );
  }

  #getHeaders(token:string) {
    return {
      "Content-Type": "application/json",
      ...(token ? { token } : {}),
    };
  }

  async addProductToCart(productId: string,token:string): Promise<AddToCartResponse> {
    return await fetch(this.#baseUrl + "api/v1/cart", {
      method: "post",
      headers: this.#getHeaders(token),
      body: JSON.stringify({ productId }),
    }).then((res) => res.json());
  }

  async getUserCart(token:string): Promise<GetUserCartResponse> {
    const isServer = typeof window === "undefined";
  
    const res = await fetch(this.#baseUrl + "api/v1/cart", {
      headers: this.#getHeaders(token),
      ...(isServer
        ? { cache: "no-store", next: { revalidate: 0 } } 
        : { cache: "no-cache" }),                        
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch cart");
    }
  
    return res.json();
  }
  
  

  async removeCartProduct(productId: string,token:string): Promise<RemoveCartProductResponse> {
    return await fetch(this.#baseUrl + "api/v1/cart/" + productId, {
      headers: this.#getHeaders(token),
      method: "delete",
    }).then((res) => res.json());
  }

  async clearCart(token:string): Promise<ClearCartResponse> {
    return await fetch(this.#baseUrl + "api/v1/cart", {
      headers: this.#getHeaders(token),
      method: "delete",
    }).then((res) => res.json());
  }

  async updateCartProductCount(
    productId: string,
    count: number,
    token:string
  ): Promise<UpdateCartProductCountResponse> {
    return await fetch(this.#baseUrl + "api/v1/cart/" + productId, {
      body: JSON.stringify({ count }),
      headers: this.#getHeaders(token),
      method: "put",
    }).then((res) => res.json());
  }



  async checkOut(cartId: string,token:string): Promise<CheckoutResponse> {
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
        headers: this.#getHeaders(token),
      }
    ).then((res) => res.json());
  }

  async logIn(email: string, password: string): Promise<LoginResponse> {
    return await fetch(this.#baseUrl + "api/v1/auth/signin", {
      body: JSON.stringify({ email, password }),
      headers:  {"Content-Type": "application/json"},
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
      headers: {"Content-Type": "application/json"},
      method: "post",
    }).then((res) => res.json());
  }

 
  async verifyResetCode(resetCode: string): Promise<ResetCodeResponse> {
    return await fetch(this.#baseUrl + "api/v1/auth/verifyResetCode", {
      body: JSON.stringify({ resetCode}),
      headers: {"Content-Type": "application/json"},
      method: "post",
    }).then((res) => res.json());
  }

  async resetPassword(email: string,newPassword:string): Promise<ResetCodeResponse> {
    return await fetch(this.#baseUrl + "api/v1/auth/resetPassword", {
      body: JSON.stringify({ email,newPassword}),
      headers: {"Content-Type": "application/json"},
      method: "put",
    }).then((res) => res.json());
  }


  async getWishList(token:string): Promise<WishListResponse> {
    return await fetch(this.#baseUrl + "api/v1/wishlist", {
      headers: this.#getHeaders(token),
      next: { revalidate: 60 },
      cache: "no-cache",
    }).then((res) => res.json());
  }

  async addWishList(productId: string,token:string): Promise<AddToWishListResponse> {
    return await fetch(this.#baseUrl + "api/v1/wishlist", {
      body: JSON.stringify({ productId }),
      headers: this.#getHeaders(token),
      method: "post",
    }).then((res) => res.json());
  }
  
  async deleteWishList(productId: string,token:string): Promise<AddToWishListResponse> {
    const res = await fetch(this.#baseUrl + "api/v1/wishlist/" + productId, {
      headers: this.#getHeaders(token),
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
