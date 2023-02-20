// generate.js
import React, { useState } from "react";
import QRCode from "react-qr-code";

function Generate() {
  const [qrCodeValue, setQrCodeValue] = useState("");

  return (
    <div className="bg-white flex flex-col items-center">
      <div>Generate QR</div>
      {qrCodeValue != "" && <QRCode value={qrCodeValue} />}
      <input className="text-black"
        onChange={(e) => {
          setQrCodeValue(e.target.value);
        }}
      />
    </div>
  );
}

export default Generate;
