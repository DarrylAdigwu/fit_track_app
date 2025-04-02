import React  from "react";
import { Link } from "react-router";
import profileIcon from "../assets/images/profile-icon.svg"

export default function Header(props) {
  
  return (
    <header>
      <Link to="." className="logo">FitTrack</Link>
      <hr/>
      <nav>
        <Link to=".">home</Link>
        <Link to="about">about</Link>
        <Link to={`dashboard/${props.user_name}`}>dash</Link>
      </nav>
      <Link to={`dashboard/${props.user_name}`}>
        <img src={profileIcon} alt="person icon" className="profile"/>
      </Link>
    </header>
  )
}