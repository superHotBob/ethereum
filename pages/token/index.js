import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";

export default function Token() {
  return (
    <div className="token__main__block">
      <div className="image__block"></div>
      <div className="title__block"></div>
      <style jsx>{`
        .token__main__block {
          margin: 200px auto;
          width: 90%;
        }
        .image__block {
          display: inline-block;
          width: 60%;
          height: 60vh;
          padding: 20px;
          background: url("https://img.rarible.com/prod/image/upload/t_image_big/prod-itemImages/0xb66a603f4cfe17e3d27b87a8bfcad319856518b8:105920822369709375853288917251796322838081429785310148444847718745428717469697/57b9c84")
            no-repeat center 30%;
          background-size: 80% auto;
        }
        .title__block {
          display: inline-block;
          width: 35%;
        }
      `}</style>
    </div>
  );
}