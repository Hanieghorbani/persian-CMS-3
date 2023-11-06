import React, { useEffect, useState } from "react"
import "./ProdTable.css"
import DeleteModal from "../deleteModal/DeleteModal"
import DetailsModal from "../detailsModal/DetailsModal"
import EditModal from "../editModal/EditModal"
import { BsCurrencyDollar } from "react-icons/bs"
import ErrorBox from "../errorBox/ErrorBox"
import { toast, ToastContainer } from "react-toastify"

export default function ProdTable() {
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false)
  const [isShowEditModal, setIsShowEditModal] = useState(false)
  const [allProducts, setAllProducts] = useState([])
  const [productId, setProductId] = useState(null)
  const [mainInfoProd, setMainInfoProd] = useState([])

  const [prodNewTitle, setProdNewTitle] = useState("")
  const [prodNewSale, setProdNewSale] = useState("")
  const [prodNewPrice, setProdNewPrice] = useState("")
  const [prodNewCount, setProdNewCount] = useState("")
  const [prodNewPopularity, setProdNewPopularity] = useState("")
  const [prodNewImg, setProdNewImg] = useState("")
  const [prodNewColors, setProdNewColors] = useState("")
  

  useEffect(() => {
    getAllProducts()
  }, [])

  function getAllProducts() {
    fetch("http://localhost:8000/api/products")
      .then((res) => res.json())
      .then((products) => setAllProducts(products))
  }

  function cancelDeleteModal() {
    console.log("cancle delete modal")
    setIsShowDeleteModal(false)
  }
  function submitDeleteModal() {
    console.log("submit delete modal")
    console.log(productId)
    fetch(`http://localhost:8000/api/products/${productId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        setIsShowDeleteModal(false)
        toast.success("حذف با موفقیت انجام شد ", {
          position: toast.POSITION.TOP_RIGHT,
        })
        getAllProducts()
      })
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
      <ToastContainer autoClose={2000} rtl />
      {allProducts.length ? (
        <div className="prodTable bg-white mt-5 rounded-4 p-4">
          <tr>
            <th>عکس</th>
            <th>اسم</th>
            <th>قیمت</th>
            <th>موجودی</th>
          </tr>
          {allProducts.map((product) => (
            <tr>
              <td>
                <img src={product.img} alt="oil" />
              </td>
              <td>{product.title}</td>
              <td>
                {new Intl.NumberFormat("en-US", { style: "decimal" }).format(
                  product.price
                )}
              </td>
              <td>{product.count}</td>
              <td>
                <button
                  onClick={() => {
                    setIsShowDetailsModal(true)
                    setMainInfoProd(product)
                  }}
                >
                  جزئیات
                </button>
                <button
                  className="mx-3"
                  onClick={() => {
                    setIsShowDeleteModal(true)
                    setProductId(product.id)
                  }}
                >
                  حذف
                </button>
                <button
                  onClick={() => {
                    setIsShowEditModal(true)

                    setProdNewColors(product.colors)
                    setProdNewCount(product.count)
                    setProdNewPopularity(product.popularity)
                    setProdNewPrice(product.price)
                    setProdNewSale(product.sale)
                    setProdNewTitle(product.title)
                    setProdNewImg(product.img)
                  }}
                >
                  ویرایش
                </button>
              </td>
            </tr>
          ))}
        </div>
      ) : (
        <ErrorBox msg={"هیچ محصولی یافت نشد"} />
      )}

      {isShowDeleteModal && (
        <DeleteModal
          cancelModal={cancelDeleteModal}
          submitModal={submitDeleteModal}
        />
      )}
      {isShowDetailsModal && (
        <DetailsModal onHide={hideDetailsModal}>
          <table className="w-100">
            <thead>
              <tr>
                <th>محبوبیت</th>
                <th>فروش</th>
                <th>رنگبندی</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{mainInfoProd.popularity}</td>
                <td>
                  {new Intl.NumberFormat("en-US", { style: "decimal" }).format(
                    mainInfoProd.sale
                  )}
                </td>
                <td>{mainInfoProd.colors}</td>
              </tr>
            </tbody>
          </table>
        </DetailsModal>
      )}
      {isShowEditModal && (
        <EditModal onClose={closeEditModal} onSubmit={submitEditModal}>
          <div className="row edit-form-group gap-3 justify-content-center">
            <div className="col-lg-5">
              <div>
                <BsCurrencyDollar />
                <input
                  type="text"
                  placeholder="عنوان جدید را وارد کنید"
                  value={prodNewTitle}
                />
              </div>
            </div>
            <div className="col-lg-5">
              <div>
                <BsCurrencyDollar />
                <input
                  type="text"
                  placeholder="مبلغ جدید را وارد کنید"
                  value={prodNewPrice}
                />
              </div>
            </div>
            <div className="col-lg-5">
              <div>
                <BsCurrencyDollar />
                <input
                  type="text"
                  placeholder="موجودی جدید را وارد کنید"
                  value={prodNewCount}
                />
              </div>
            </div>
            <div className="col-lg-5">
              <div>
                <BsCurrencyDollar />
                <input
                  type="text"
                  placeholder="آدرس کاور جدید را وارد کنید"
                  value={prodNewImg}
                />
              </div>
            </div>
            <div className="col-lg-5">
              <div>
                <BsCurrencyDollar />
                <input
                  type="text"
                  placeholder=" میزان محبوبیت جدید را وارد کنید"
                  value={prodNewPopularity}
                />
              </div>
            </div>
            <div className="col-lg-5">
              <div>
                <BsCurrencyDollar />
                <input
                  type="text"
                  placeholder=" میزان فروش جدید را وارد کنید"
                  value={prodNewSale}
                />
              </div>
            </div>
            <div className="col-lg-5">
              <div>
                <BsCurrencyDollar />
                <input
                  type="text"
                  placeholder=" تعداد رنگ بندی جدید را وارد کنید"
                  value={prodNewColors}
                />
              </div>
            </div>
          </div>
        </EditModal>
      )}
    </>
  )
}