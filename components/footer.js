export default function Footer() {
  return (
    <div className="footer_main">
      <h1>This is footer</h1>
      <style jsx>{`
      .footer_main {
          position: fixed;
          bottom: 0;
          background-color: #ddd;
          width: 100%;
          z-index: 1;
      }
      h1 {
        color: red;
        text-align: center;
        font-size: 30px;
      }
    `}</style>
    </div>
  );
}
