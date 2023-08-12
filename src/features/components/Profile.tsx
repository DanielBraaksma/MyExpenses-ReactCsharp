import React from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

export default function Profile() {
  return (
    <>
      <Header></Header>

      <div className="profile-wrapper">
        <div className="profile-container">
          <h2>Welcome Back</h2>
          <div className="profile-content"></div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
