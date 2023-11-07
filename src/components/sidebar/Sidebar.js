import React, { useEffect, useRef, useState } from "react"
import "./Sidebar.css"
import { AiOutlineHome } from "react-icons/ai"
import { MdProductionQuantityLimits } from "react-icons/md"
import { BiCommentDetail,BiSolidOffer } from "react-icons/bi"
import { FiUsers } from "react-icons/fi"
import { BsCart4 } from "react-icons/bs"
import { Link } from "react-router-dom"

export default function Sidebar() {
  const listRef = useRef(null)
  useEffect(()=>{
    for (const li of listRef.current.children) {
     if (li.className.includes(window.location.pathname)) {
       li.classList.add('active')
     }else{
      li.classList.remove('active')
     }
    }
  })
  return (
    <div className="sidebar">
      <h1 className="p-3 border-bottom fs-5">به داشبورد خود خوش آمدید</h1>
      <ul ref={listRef} className="sidebar-links">
        <li className="/home mb-4 active">
          <Link to={'/home'}> 
          <AiOutlineHome />
           صفحه اصلی
           </Link>
        </li>
        <li className="/products">
          <Link to={'/products'}>
          <MdProductionQuantityLimits />
          محصولات
          </Link>
        </li>
        <li className="/comments">
          <Link to={'/comments'}>
          <BiCommentDetail />
          کامنت ها</Link>
        </li>
        <li className="/users">
          <Link to={'/users'}>
          <FiUsers />
          کاربران</Link>
        </li>
        <li className="/orders">
          <Link to={'/orders'}>
          <BsCart4 />
          سفارشات</Link>
        </li>
        <li className="/offers">
          <Link to={'/offers'}>
          <BiSolidOffer />
          تخفیف ها</Link>
        </li>
      </ul>
    </div>
  )
}
