import React, { useEffect } from "react"
import "./DetailsModal.css"
export default function DetailsModal({ onHide,children }) {
  return (
    <div className="parentModal active">
      <div className="detailsModal bg-white p-4 rounded-4">
        <span className="fw-bold fs-4" onClick={() => onHide()}>
          ⨉
        </span>
        {children}
      </div>
    </div>
  )
}
