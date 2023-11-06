import React, { useState } from "react"
import "./ProdTable.css"
import DeleteModal from "../deleteModal/DeleteModal"
import DetailsModal from "../detailsModal/DetailsModal"
import EditModal from "../editModal/EditModal"
import { BsCurrencyDollar } from "react-icons/bs"

export default function ProdTable() {
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false)
  const [isShowEditModal, setIsShowEditModal] = useState(false)
  function cancelDeleteModal() {
    console.log("cancle delete modal")
    setIsShowDeleteModal(false)
  }
  function submitDeleteModal() {
    console.log("submit delete modal")
    setIsShowDeleteModal(false)
  }
  function hideDetailsModal() {
    console.log("cancle details modal")
    setIsShowDetailsModal(false)
  }
  function closeEditModal() {
    console.log("edit modal was closed")
    setIsShowEditModal(false)
  }

  function submitEditModal() {
    console.log("edit modal was submited")
    setIsShowEditModal(false)
  }
  return (
    <>
      <div className="prodTable bg-white mt-5 rounded-4 p-4">
        <tr>
          <th>عکس</th>
          <th>اسم</th>
          <th>قیمت</th>
          <th>موجودی</th>
        </tr>

        <tr>
          <td>
            <img src="/images/oil.jpeg" alt="oil" />
          </td>
          <td>روغن سرخ کردنی</td>
          <td>92000</td>
          <td>82</td>
          <td>
            <button onClick={() => setIsShowDetailsModal(true)}>جزئیات</button>
            <button className="mx-3" onClick={() => setIsShowDeleteModal(true)}>
              حذف
            </button>
            <button onClick={() => setIsShowEditModal(true)}>ویرایش</button>
          </td>
        </tr>
      </div>
      {isShowDeleteModal && (
        <DeleteModal
          cancelModal={cancelDeleteModal}
          submitModal={submitDeleteModal}
        />
      )}
      {isShowDetailsModal && <DetailsModal onHide={hideDetailsModal} />}
      {isShowEditModal && (
        <EditModal onClose={closeEditModal} onSubmit={submitEditModal}>
          <div className="edit-form-group">
            <div>
              <BsCurrencyDollar />
              <input type="text" placeholder="عنوان جدید را وارد کنید" />
            </div>
            <div>
              <BsCurrencyDollar />
              <input type="text" placeholder="عنوان جدید را وارد کنید" />
            </div>
            <div>
              <BsCurrencyDollar />
              <input type="text" placeholder="عنوان جدید را وارد کنید" />
            </div>
            <div>
              <BsCurrencyDollar />
              <input type="text" placeholder="عنوان جدید را وارد کنید" />
            </div>
          </div>
        </EditModal>
      )}
    </>
  )
}
