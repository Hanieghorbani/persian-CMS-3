import React, { useState } from "react"
// import { Link } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import "./Panel.css"
import { useContext } from "react"
import CmsContext from "../../Context"
import DetailsModal from "../detailsModal/DetailsModal"
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md"
export default function Panel() {
  const [password, setPassword] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [allValid, setAllValid] = useState(false)
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false)
  const [IsShowPass, setIsShowPass] = useState(false)
  const contextDeta = useContext(CmsContext)
  function loginBtn(e) {
    e.preventDefault()
    setSubmitted(true)

    if (password) {
      fetch("http://localhost:8000/api/admins", {
        method: "GET",
        headers: {
          authorization: password,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (!res.length) {
            toast.error("رمز عبور اشتباه است", {
              position: toast.POSITION.TOP_RIGHT,
            })

          } else {
            setAllValid(true)
            // submitted(false)
            setPassword("")
            localStorage.setItem("pass", password)
            localStorage.setItem("adminInfo", JSON.stringify(res[0]))
            contextDeta.setAdminInfos(res[0])
            setTimeout(() => {
              setAllValid(false)
              setSubmitted(false)
            }, 2000)
          }
        })
        .catch((err) => {
          toast.error("رمز عبور اشتباه است", {
            position: toast.POSITION.TOP_RIGHT,
          })
          setPassword("")
        })
    }
  }

  return (
    <div className="form-container my-4">
      <ToastContainer autoClose={2000} rtl />

      <div className="text-center mb-5 mt-4">
        <h4 className="fs-4">ورود</h4>
        <p className="fw-bold mt-2 fs-6">
          {contextDeta.adminInfos
            ? "شما در حال حاضر در حساب کاربری خود هستید.برای تعویض حساب رمز دیگرتان را وارد کنید."
            : "برای ادامه به حساب کاربری خود وارد شوید"}
        </p>
      </div>
      <form className="register-form" autoComplete="off">
        {allValid && (
          <div className="success-message">
            شما با موفقیت وارد حساب کاربری خود شدید.
          </div>
        )}

        <div className="d-flex justify-content-between align-items-center w-100 mt-1">
          <p className="">رمز عبور</p>
          <p
            style={{ cursor: "pointer", fontSize: "15px" }}
            onClick={() => {
              setIsShowDetailsModal(true)
            }}
          >
            رمز عبور را فراموش کرده اید؟
          </p>
        </div>
        <div className="form-field">
          <input
            placeholder="رمز عبور"
            id="pass"
            className=""
            type={!IsShowPass ? 'password' : 'text'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {IsShowPass ? (
            <MdOutlineVisibility onClick={() => setIsShowPass(false)} />
          ) : (
            <MdOutlineVisibilityOff onClick={() => setIsShowPass(true)} />
          )}
        </div>

        {submitted && !password &&  !allValid && <span>لطفا رمز عبور را وارد نمایید!</span>}

        <button className="form-field" type="submit" onClick={loginBtn}>
          ورود
        </button>
      </form>

      <div className="d-flex flex-column justify-content-center align-items-center"></div>
      {isShowDetailsModal && (
        <DetailsModal onHide={() => setIsShowDetailsModal(false)}>
          <h1 className="text-warning fs-4">
            این پروژه صرفا جهت تمرین ساخته شده
          </h1>
          <h2 className="text-warning fs-5">
            یکی از رمز های پایین را وارد کنید
          </h2>
          <ul className="mt-3">
            <li>react2020</li>
            <li className="my-2">q-909012-yolme</li>
            <li>sa-ds12</li>
          </ul>
        </DetailsModal>
      )}
    </div>
  )
}
