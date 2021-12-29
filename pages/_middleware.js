import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
export async function middleware(req, res, next) {
    //Token exist if user is logged in
    const token = await getToken({req,secret:process.env.JWT_SECRET});
    const {pathname}=req.nextUrl    
    //ALLOW REQUEST IF FOLLOWING IS TRUE
    //1) have token
    //2) is an auth req

    //THERE IS A PROBLEM WITH MIDDLEWARES IN DEPLOYMENT
    
    //if user have token and trys to log in 
    if (token && pathname === "/login"){
        return  NextResponse.redirect('/')
    }
    
    if (pathname.includes("/api/auth") || token ) {
        return NextResponse.next()
    }
    
    //REDIRECT TO LOGIN
    if (!token && pathname !== '/login'){
        return NextResponse.redirect('/login')
    }
}