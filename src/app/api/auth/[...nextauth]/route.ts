import { apiServices } from "@/services/api"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers:[
    CredentialsProvider({
// The name to display on the sign in form (e.g. 'Sign in with...')
name: 'Credentials',
// The credentials is used to generate a suitable form on the sign in page.
// You can specify whatever fields you are expecting to be submitted.
// e.g. domain, username, password, 2FA token, etc.
// You can pass any HTML attribute to the <input> tag through the object.
credentials: {
  email: { label: "Email", type: "email", placeholder: "your email" },
  password: { label: "Password", type: "password", placeholder:"******"}
},
async authorize(credentials, req) {
credentials?.email
credentials?.password
const response=await apiServices.logIn(credentials?.email??"",credentials?.password??"")
console.log('response'+response)
if(response.message=="success"){
  const user = { id: response.user.email, name: response.user.name, email: response.user.email,role:response.user.role,token:response.token }

  return user
}else{
  return null
}


}
    })
  ],
  pages:{
    signIn:'/auth/login'
  },
callbacks:{
    async session({session,token}){
session.user.role=token.role as string
session.token=token.token as string
      return session;
    },
    async jwt({token,user}){
      if(user){
        token.token=user.token;
        token.role=user.role;
      }
      return token;
    }
}
})

export { handler as GET, handler as POST }