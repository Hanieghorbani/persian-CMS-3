import React, { useEffect, useState } from "react"
import ErrorBox from "../errorBox/ErrorBox"
import "./Users.css"
import DeleteModal from "../deleteModal/DeleteModal"
import { toast, ToastContainer } from "react-toastify"
import EditModal from "../editModal/EditModal"
import {
  MdDriveFileRenameOutline,
  MdOutlineAlternateEmail,
} from "react-icons/md"
import { BsCartCheck } from "react-icons/bs"
import { AiOutlineLock, AiOutlinePhone, AiOutlineUser } from "react-icons/ai"
import { CiLocationOn } from "react-icons/ci"
import { GrScorecard } from "react-icons/gr"
import DetailsModal from "../detailsModal/DetailsModal"
import UseGetFetch from "../../Hooks/UseGetFetch"
import useDeleteFetch from "../../Hooks/useDeleteFetch"
import useEditFetch from "../../Hooks/useEditFetch"
export default function Users() {
  const [users, getAllUsers] = UseGetFetch("users")
  const [userId, setUserId] = useState("")
  const [isShowDeleteModal, setIsShowDeleteModal] = useState("")
  const [isShowEditModal, setIsShowEditModal] = useState(false)
  const [isShowErrorText, setIsShowErrorText] = useState(false)
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false)

  const [name, setName] = useState("")
  const [lastname, setLastname] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [city, setCity] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [score, setScore] = useState("")
  const [buy, setBuy] = useState("")

  const [mainUserInfos, setMainUserInfos] = useState([])

  let emailVal = /.+@.+.com/

  //use custom hooks for delete fetch
  const deleteUser = useDeleteFetch(
    "users",
    userId,
    getAllUsers,
    setIsShowDeleteModal,
    "کاربر"
  )

  //use custom hooks for edit fetch
  const editUser = useEditFetch(
    "users",
    userId,
    {
      firsname: name,
      lastname: lastname,
      username: username,
      password: password,
      phone: phone,
      city: city,
      email: email,
      address: address,
      score: score,
      buy: buy,
    },
    setIsShowEditModal,
    getAllUsers,
    "کاربر",
    name.trim().length >= 3 &&
      lastname.trim().length >= 3 &&
      username.length >= 3 &&
      password.length >= 8 &&
      !isNaN(phone) &&
      city.trim().length &&
      emailVal.test(email) &&
      address.trim().length &&
      !isNaN(score) &&
      !isNaN(score),
    setIsShowErrorText
  )
  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <div className="users-div">
      <ToastContainer autoClose={2000} rtl />

      <h1 className="my-4 fs-3">لیست کاربران</h1>
      {users.length ? (
        <table className="bg-white p-4 w-100 rounded-4">
          <thead>
            <tr>
              <th>نام و نام خانوادگی</th>
              <th>نام کاربری</th>
              <th>رمز عبور</th>
              <th>شماره تماس</th>
              <th>ایمیل</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  {user.firsname} {user.lastname}
                </td>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    onClick={() => {
                      setIsShowDeleteModal(true)
                      setUserId(user.id)
                    }}
                  >
                    حذف
                  </button>
                  <button
                    className="mx-3"
                    onClick={() => {
                      setIsShowEditModal(true)
                      setUserId(user.id)
                      setName(user.firsname)
                      setUsername(user.username)
                      setLastname(user.lastname)
                      setEmail(user.email)
                      setAddress(user.address)
                      setPassword(user.password)
                      setPhone(user.phone)
                      setBuy(user.buy)
                      setCity(user.city)
                      setScore(user.score)
                    }}
                  >
                    ویرایش
                  </button>
                  <button
                    onClick={() => {
                      setIsShowDetailsModal(true)
                      setUserId(user.id)
                      setMainUserInfos(user)
                    }}
                  >
                    جزییات
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ErrorBox msg={"هیچ کاربری یافت نشد"} />
      )}
      {isShowDeleteModal && (
        <DeleteModal
          cancelModal={() => setIsShowDeleteModal(false)}
          submitModal={deleteUser}
          title={"آیا از حذف کاربر اطمینان دارید ؟"}
        />
      )}
      {isShowEditModal && (
        <EditModal
          onClose={() => setIsShowEditModal(false)}
          onSubmit={editUser}
        >
          <div className="row edit-form-group gap-3 justify-content-center">
            <div className="col-lg-5">
              <div>
                <MdDriveFileRenameOutline />
                <input
                  type="text"
                  placeholder="نام جدید"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-5">
              <div>
                <MdDriveFileRenameOutline />
                <input
                  type="text"
                  placeholder="نام خانوادگی جدید"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-5">
              <div>
                <AiOutlineUser />
                <input
                  type="text"
                  placeholder="نام کاربری جدید"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-5">
              <div>
                <AiOutlineLock />
                <input
                  type="text"
                  placeholder="رمز عبور جدید"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-5">
              <div>
                <GrScorecard />
                <input
                  type="text"
                  placeholder="امتیاز جدید"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-5">
              <div>
                <CiLocationOn />
                <textarea
                  type="text"
                  placeholder="آدرس جدید"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-5">
              <div>
                <AiOutlinePhone />
                <input
                  type="text"
                  placeholder="شماره همراه جدید"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-5">
              <div>
                <MdOutlineAlternateEmail />
                <input
                  type="text"
                  placeholder="ایمیل جدید"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-5">
              <div>
                <BsCartCheck />
                <input
                  type="text"
                  placeholder="میزان خرید جدید"
                  value={buy}
                  onChange={(e) => setBuy(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-5">
              <div>
                <CiLocationOn />
                <input
                  type="text"
                  placeholder="شهر جدید"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>
            {isShowErrorText && (
              <div className="bg-white">
                <ul className="text-danger">
                  <li>*رمزعبور باید بیشتر 7 رقم باشد</li>
                  <li>
                    * الگوی ایمیل باید مطابق مثال رو به رو
                    باشد:exmple@email/gmail.com
                  </li>
                  <li>*شماره همراه باید 11 رقم باشد</li>
                  <li>*میزن خرید باید به صورت عدد نوشته شده باشد</li>
                  <li>*امتیاز کاربر باید به صورت عدد نوشته شده باشد</li>
                </ul>
              </div>
            )}
          </div>
        </EditModal>
      )}
      {isShowDetailsModal && (
        <DetailsModal onHide={() => setIsShowDetailsModal(false)}>
          <table>
            <thead>
              <tr>
                <th>شهر</th>
                <th>آدرس</th>
                <th>امتیاز</th>
                <th>میزان خرید</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{mainUserInfos.city}</td>
                <td>{mainUserInfos.address}</td>
                <td>{mainUserInfos.score}</td>
                <td>
                  {new Intl.NumberFormat("en-US", { style: "decimal" }).format(
                    mainUserInfos.buy
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </DetailsModal>
      )}
    </div>
  )
}
