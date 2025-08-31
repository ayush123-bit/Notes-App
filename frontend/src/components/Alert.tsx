import React from "react";

const Alert: React.FC<{ type?: "error" | "success"; children: React.ReactNode }> = ({ type = "error", children }) => {
  const base = "p-3 rounded";
  if (type === "error") return <div className={`${base} bg-red-50 text-red-700 border border-red-100`}>{children}</div>;
  return <div className={`${base} bg-green-50 text-green-700 border border-green-100`}>{children}</div>;
};

export default Alert;
