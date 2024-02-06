import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  // console.log("middleware executed");
  // return NextResponse.redirect(new URL('/home', request.url))
  const authToken = request.cookies.get("authToken")?.value;

  if (request.nextUrl.pathname === "/api/login" || request.nextUrl.pathname==="/api/users") return;

  const loggedInUserNotAccessPaths =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/signup";

  // going to login/signup page but he is already loggedin
  if (loggedInUserNotAccessPaths) {
    if (authToken) {
      return NextResponse.redirect(new URL("/profile/user", request.url));
    }
  } else {
    // accessing secured page but not loggedin then we will send him to login page
    if (!authToken) {
      if(request.nextUrl.pathname.startsWith("/api")){
        return new NextResponse.json(
          {
            message: "Access denied",
            success: false,
          },
          {
            status:401,
          }
        );
      }
      return NextResponse.redirect(new URL("/login", request.url));
    } else {
      // verify token
    }
  }



  // console.log(authToken);
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/api/:path*",
    "/login",
    "/signup",
    "/add-task",
    "/show-tasks",
    "/profile/:path*",
  ],
}