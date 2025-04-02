import React from "react";
import { Form, useActionData, useLoaderData } from "react-router";
import "../../assets/css/dashboard.css";
import plusIcon from "../../assets/images/plusIcon.svg";
import minusIcon from "../../assets/images/minusIcon.svg";


export async function loader({ request }) {
}

export async function action({ request }) {
}

/* React Component */
export default function Dashboard() {

  return(
    
    <div className="container dash-container">
    </div>
  )
}