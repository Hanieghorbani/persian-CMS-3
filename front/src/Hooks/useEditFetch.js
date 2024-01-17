import React from "react"
import { toast, ToastContainer } from "react-toastify"

export default function useEditFetch(
  subUrl,
  id,
  contentBody,
  setModal,
  getAll,
  toastName,
  candition,
  errorText
) {
  function submitEditModal() {
    if (candition) {
      fetch(`http://localhost:8000/api/${subUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contentBody),
    })
      .then((res) => res.json())
      .then((res) => {
        setModal(false)
        getAll()
        toast.success(`ویرایش ${toastName} با موفقیت انجام شد `, {
          position: toast.POSITION.TOP_RIGHT,
        })
        errorText(false)
      })
    }else{
        errorText(true)
    }
    
  }

  return submitEditModal
}
