import React from "react";
import './loadingSpinner.css';

export default function LoadingSpinner() {
  return (
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
