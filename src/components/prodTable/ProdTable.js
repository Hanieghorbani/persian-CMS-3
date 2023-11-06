import React, { useEffect, useState } from "react"
import "./ProdTable.css"
import DeleteModal from "../deleteModal/DeleteModal"
import DetailsModal from "../detailsModal/DetailsModal"
import EditModal from "../editModal/EditModal"
import { BsCurrencyDollar } from "react-icons/bs"
import ErrorBox from "../errorBox/ErrorBox"

export default function ProdTable() {
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false)
  const [isShowEditModal, setIsShowEditModal] = useState(false)
const [allProducts,setAllProducts] = useState([])
  useEffect(()=>{
    fetch('http://localhost:8000/api/products').then(res=>res.json()).then(products=>setAllProducts(products))
  },[])

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

    {allProducts.length ? ( <div className="prodTable bg-white mt-5 rounded-4 p-4">
        <tr>
          <th>عکس</th>
          <th>اسم</th>
          <th>قیمت</th>
          <th>موجودی</th>
        </tr>
      {allProducts.map(product=>(
         <tr>
          <td>
            <img src={product.img} alt="oil" />
          </td>
          <td>{product.title}</td>
          <td>{product.price}</td>
          <td>{product.count}</td>
          <td>
            <button onClick={() => setIsShowDetailsModal(true)}>جزئیات</button>
            <button className="mx-3" onClick={() => setIsShowDeleteModal(true)}>
              حذف
            </button>
            <button onClick={() => setIsShowEditModal(true)}>ویرایش</button>
          </td>
        </tr>
      ))}
       
      </div>) : (<ErrorBox msg={"هیچ محصولی یافت نشد"}/>)}
     
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
