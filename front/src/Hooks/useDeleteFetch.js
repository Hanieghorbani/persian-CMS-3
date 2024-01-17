import React from "react"
import { toast, ToastContainer } from "react-toastify"

export default function useDeleteFetch(
  subUrl,
  id,
  getMethod,
  setDeleteModal,
  toastName,
) {
  function deleteUser() {
    fetch(`http://localhost:8000/api/${subUrl}/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        getMethod()
        setDeleteModal(false)
        toast.success(`حذف ${toastName} با موفقیت انجام شد `, {
          position: toast.POSITION.TOP_RIGHT,
        })
      })
      .catch((err) => {
        if (err == "SyntaxError: Unexpected end of JSON input") {
            alert(`این ${toastName} به دلیل داشتن کامنت حذف نمی شود.ابتدا کامنت ان راپاک کنید.(باگ بک اند)`)
          setDeleteModal(false)
        }
      })
  }
  return deleteUser
}
