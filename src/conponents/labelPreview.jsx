import React from "react";

const LabelPreview = ({ macLabel, macAddressValue }) => {
  return (
    <div
      style={{
        backgroundColor: "#f0f0f0",
        margin: "0 auto",
        width: "300px",
        height: "300px",
        borderRadius: "15px",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "85px",
          top: "20px",
        }}
      >
        <canvas id="mycanvas"></canvas>
      </div>
      <div
        style={{
          position: "absolute",
          left: "255px",
          top: "20px",
        }}
      >
        <h2>{macLabel}</h2>
        <h2>MAC</h2>
      </div>

      <h1
        style={{
          position: "absolute",
          left: "85px",
          top: "180px",
        }}
      >
        {macAddressValue[0]}
        {macAddressValue[1]}
      </h1>

      <h1
        style={{
          position: "absolute",
          left: "185px",
          top: "180px",
        }}
      >
        {macAddressValue[2]}
        {macAddressValue[3]}
      </h1>
      <h1
        style={{
          position: "absolute",
          left: "275px",
          top: "180px",
        }}
      >
        {macAddressValue[4]}
        {macAddressValue[5]}
      </h1>
      <h1
        style={{
          position: "absolute",
          left: "85px",
          top: "230px",
        }}
      >
        {macAddressValue[6]}
        {macAddressValue[7]}
      </h1>

      <h1
        style={{
          position: "absolute",
          left: "185px",
          top: "230px",
        }}
      >
        {macAddressValue[8]}
        {macAddressValue[9]}
      </h1>
      <h1
        style={{
          position: "absolute",
          left: "275px",
          top: "230px",
        }}
      >
        {macAddressValue[10]}
        {macAddressValue[11]}
      </h1>
    </div>
  );
};

export default LabelPreview;
