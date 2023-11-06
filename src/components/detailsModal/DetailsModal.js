import React, { useEffect } from "react"
import "./DetailsModal.css"
export default function DetailsModal({ onHide }) {
  useEffect(() => {
    function checkKey(e) {
      if (e.keyCode === 13) {
        onHide()
      }
    }
    window.addEventListener("keyup", checkKey)
    return () => window.removeEventListener("keyup", checkKey)
  })
  return (
    <div className="parentModal active">
      <div className="detailsModal bg-white p-4 rounded-4">
        <span className="fw-bold fs-4" onClick={() => onHide()}>
          ⨉
        </span>
        <table className="w-100">
          <thead>
            <tr>
              <th>اسم</th>
              <th>قیمت</th>
              <th>محبوبیت</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>روغن سرخ کردنی</td>
              <td>92000</td>
              <td>78%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
