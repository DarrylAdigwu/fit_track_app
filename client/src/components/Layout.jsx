import React from "react";
import { Outlet } from "react-router";
import { useCookies } from "react-cookie";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  const [cookies, setCookies] = useCookies([""]);
  const username = cookies.username ? `${cookies.username}` : ":username";

  return(
    <main>
      <div id="content-wrapper">
        <Header user_name={username}/>
        <Outlet />
      </div>
      <Footer />
    </main>
  )
}