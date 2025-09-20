import { NextResponse } from "next/server";

type USER={
    name:string,
    email:string
}

const users:USER[]=[]
export async function GET(){

return NextResponse.json({
    email:'a',
    name:'alaa'
})

}

export async function POST(req:Request) {
    const body=await req.json()
    users.push(body)
  return  NextResponse.json({
        message:'success',
        data:users
    })
}