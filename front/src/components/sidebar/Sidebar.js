import React, { useEffect, useRef, useState } from "react"
import "./Sidebar.css"
import { AiOutlineHome } from "react-icons/ai"
import { MdProductionQuantityLimits } from "react-icons/md"
import { BiCommentDetail, BiSolidOffer } from "react-icons/bi"
import { FiUsers,FiUser } from "react-icons/fi"
import { BsCart4 } from "react-icons/bs"
import { Link,NavLink } from "react-router-dom"

export default function Sidebar() {

  return (
    <div className="sidebar">
      <h1 className="p-3 border-bottom fs-5">به داشبورد خود خوش آمدید</h1>
      <ul className="sidebar-links">
        <NavLink to="/" className="mb-4">
          <AiOutlineHome />
          صفحه اصلی
        </NavLink>
        <NavLink to='/products' >
            <MdProductionQuantityLimits />
            محصولات
        </NavLink>
        <NavLink to="/comments">
            <BiCommentDetail />
            کامنت ها
        </NavLink>
        <NavLink to="/users">
            <FiUsers />
            کاربران
        </NavLink>
        <NavLink to="/orders">
            <BsCart4 />
            سفارشات
        </NavLink>
        <NavLink to="/offers">
            <BiSolidOffer />
            تخفیف ها
        </NavLink>
        <NavLink to="/panel">
            <FiUser />
            حساب کاربری
        </NavLink>
      </ul>
    </div>
  )
}
