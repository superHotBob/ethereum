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
        }
        .title__block {
            display: inline-block;
            width: 35%;
        }
      `}</style>
    </div>
  );
}
