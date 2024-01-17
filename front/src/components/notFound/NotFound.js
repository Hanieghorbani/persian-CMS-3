import React from "react"
import ReactDOM from "react-dom"
import {Link} from 'react-router-dom'
export default function NotFound() {
  return ReactDOM.createPortal(
    <div className="bg-white text-center w-100 h-100 position-fixed z-3 pt-5">
       <h1 className="fs-1">! 404 </h1>
      <h1 className="fs-3 my-5">صفحه ای که دنبالش بودی پیدا نشد )):</h1>
      <button style={{background:'var(--blue)'}} className="p-3 rounded-4 border-0"><Link to={'/'} className="text-white text-decoration-none">بازگشت به صفحه اصلی</Link></button>
    </div>,
    document.querySelector("body")
  )
}
