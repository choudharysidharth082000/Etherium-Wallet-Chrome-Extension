import { NextResponse } from "next/server";
import { getCookie } from "../middlewares/readCookie";

export default function middleware(req) {
 
    const {cookies} = req;
    const email = cookies.userID;
  // console.log(email);
  const url = req.url;
  if (url.includes("/Test")) {
      if(email === undefined)
          return NextResponse.redirect("http://localhost:3000/");
  }
}
