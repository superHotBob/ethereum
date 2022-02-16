import Image from "next/image";

export default function ExploreAll() {
  return (
    <div className="start_main">
      <h1>Explore ALL NFTs</h1>      
      <style jsx>{`
        .start_main {         
          margin: 200px auto;
          width: 90%;
        }
        span {
          font-size: 29px;
          line-height: 40px;
          color: gray;
          font-weight: 500;
        }
        h1 {
          text-align: left;
          font-size: 50px;
        }
      `}</style>
    </div>
  );
}
