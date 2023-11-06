import React from "react"
import "./Sidebar.css"
import { AiOutlineHome } from "react-icons/ai"
import { MdProductionQuantityLimits } from "react-icons/md"
import { BiCommentDetail,BiSolidOffer } from "react-icons/bi"
import { FiUsers } from "react-icons/fi"
import { BsCart4 } from "react-icons/bs"
import { Link } from "react-router-dom"
export default function Sidebar() {
  return (
    <div className="sidebar">
      <h1 className="p-3 border-bottom fs-5">به داشبورد خود خوش آمدید</h1>
      <ul className="sidebar-links">
        <li className="mb-4 active">
          <Link to={'/products'}> 
          <AiOutlineHome />
           صفحه اصلی
           </Link>
        </li>
        <li>
          <Link to={'/products'}>
          <MdProductionQuantityLimits />
          محصولات
          </Link>
        </li>
        <li>
          <Link to={'/comments'}>
          <BiCommentDetail />
          کامنت ها</Link>
        </li>
        <li>
          <Link to={'/users'}>
          <FiUsers />
          کاربران</Link>
        </li>
        <li>
          <Link to={'/orders'}>
          <BsCart4 />
          سفارشات</Link>
        </li>
        <li>
          <Link to={'/offers'}>
          <BiSolidOffer />
          تخفیف ها</Link>
        </li>
      </ul>
    </div>
  )
}
