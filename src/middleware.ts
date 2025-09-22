import { getToken } from 'next-auth/jwt'
import { NextResponse, NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
   const token=await getToken({req:request})
   if(token?.token){
    NextResponse.next()
   }else{
    const loginUrl=new URL('/auth/login',request.url)
    loginUrl.searchParams.set('callbackUrl',request.nextUrl.search)
    return NextResponse.redirect(loginUrl)
   }
  
}
 
export const config = {
  matcher:  ['/cart', '/profile'],
}