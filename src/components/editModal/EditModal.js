import React,{useEffect} from "react"
import "./EditModal.css"
export default function EditModal({ children, onClose, onSubmit }) {
  useEffect(() => {
    function checkKey(e) {
        console.log(e);
      if (e.keyCode === 13) {
        onClose()
      }
    }
    window.addEventListener("keyup", checkKey)
    return () => window.removeEventListener("keyup", checkKey)
  })
  return (
    <div className="parentModal active w-100">
      <div className="editModal bg-white p-4 rounded-4">
        <span className="fs-4 fw-bold" onClick={() => onClose()}>
          ⨉
        </span>
        <h1 className="fs-4 my-4">اطلاعات جدید را وارد کنید</h1>
        {children}
        <button className="w-100" onClick={() => onSubmit()}>
          ثبت اطلاعات جدید
        </button>
      </div>
    </div>
  )
}
