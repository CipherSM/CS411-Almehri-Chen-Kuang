import React from "react";

function HelloSection() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      style={{
        padding: "20px",
        margin: "20px 20px 20px 20px", // Add some space on all sides
        color: "#fff",
        backgroundColor: "rgba(51, 51, 51, 0.5)", // Semi-transparent
        borderRadius: "10px",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        // Specify that the component should only be as tall as its content
        height: "auto",
        // Ensure that the width is not 100%, so that the component doesn't stretch
        width: "auto",
        maxWidth: "calc(100% - 40px)", // Adjust the width as per your layout
      }}
    >
      <h1>Hello, user!</h1>
      <p>Today's date is {currentDate}.</p>
    </div>
  );
}

export default HelloSection;
