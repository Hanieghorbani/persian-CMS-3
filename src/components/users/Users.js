import React, { useEffect, useState } from "react"
import ErrorBox from "../errorBox/ErrorBox"
import "./Users.css"
import DeleteModal from "../deleteModal/DeleteModal"
import { toast, ToastContainer } from "react-toastify"

export default function Users() {
  const [users, setUsers] = useState([])
  const [isShowDeleteModal, setIsShowDeleteModal] = useState("")
  const [userId, setUserId] = useState("")
  useEffect(() => {
    getAllUsers()
  }, [])

  function getAllUsers() {
    fetch("http://localhost:8000/api/users")
      .then((res) => res.json())
      .then((users) => {
        setUsers(users)
      })
  }

  function deleteUser() {
    fetch(`http://localhost:8000/api/users/${userId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        getAllUsers()
        setIsShowDeleteModal(false)
        toast.success(" حذف کاربر با موفقیت انجام شد ", {
          position: toast.POSITION.TOP_RIGHT,
        })
      })
      .catch((err) => {
          if (err == 'SyntaxError: Unexpected end of JSON input') {
           alert('این کاربر به دلیل داشتن کامنت ،حذف نمی شود.ابتدا کامنت این شخص را پاک کنید.(باگ بک اند)')
           setIsShowDeleteModal(false)
          }
      })
  }
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
                  <button className="mx-3">ویرایش</button>
                  <button>جزییات</button>
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
    </div>
  )
}
