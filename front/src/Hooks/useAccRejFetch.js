import React from 'react'
import { toast, ToastContainer } from "react-toastify"

export default function useAccRejFetch(method,mainSubUrl,subUrl,id,isAcctive,setModal,getAll,toastName) {
    function accOrRej(){
        fetch(`http://localhost:8000/api/${mainSubUrl}/${subUrl}/${id}/${isAcctive}`, {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((res) => {
            setModal(false)
            getAll()
            toast.success(` ${toastName} با موفقیت انجام شد `, {
                position: toast.POSITION.TOP_RIGHT,
              })
          })
      }
      return accOrRej
}
