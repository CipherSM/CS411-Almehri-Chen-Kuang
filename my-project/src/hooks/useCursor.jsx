// useCursor.js
import { useState } from "react";

const useCursor = () => {
  const [cursorVariant, setCursorVariant] = useState("default");

  const handleCursorEnter = () => setCursorVariant("hover");
  const handleCursorLeave = () => setCursorVariant("default");

  return { cursorVariant, handleCursorEnter, handleCursorLeave };
};

export default useCursor;
