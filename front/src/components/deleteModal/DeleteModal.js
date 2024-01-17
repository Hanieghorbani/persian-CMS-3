import React from "react"
import "./DeleteModal.css"
import ReactDOM from "react-dom"
export default function DeleteModal({  cancelModal,submitModal,title }) {
  return ReactDOM.createPortal(
    <div className="parentModal active w-100">
      <div className="bg-white p-4 rounded-4">
        <h1 className="fs-3">{title}
        </h1>
        <div className="text-center mt-3">
          <button className="ms-2" onClick={()=>submitModal()}>بله</button>
          <button onClick={()=>cancelModal()}>خیر</button>
        </div>
      </div>
    </div>,
    document.querySelector("#modals-parent")
  )
}
