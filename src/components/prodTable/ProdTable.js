import React, { useEffect, useState } from "react"
import "./ProdTable.css"
import DeleteModal from "../deleteModal/DeleteModal"
import DetailsModal from "../detailsModal/DetailsModal"
import EditModal from "../editModal/EditModal"
import ErrorBox from "../errorBox/ErrorBox"
import { toast, ToastContainer } from "react-toastify"
import { MdDriveFileRenameOutline } from "react-icons/md"
import { BsBag, BsCartCheck, BsCurrencyDollar } from "react-icons/bs"
import { AiOutlineHeart, AiOutlineFileUnknown } from "react-icons/ai"
import { HiOutlineColorSwatch } from "react-icons/hi"
export default function ProdTable({ getAllProducts, allProducts }) {
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false)
  const [isShowEditModal, setIsShowEditModal] = useState(false)
  const [productId, setProductId] = useState(null)
  const [mainInfoProd, setMainInfoProd] = useState([])

  const [prodNewTitle, setProdNewTitle] = useState("")
  const [prodNewSale, setProdNewSale] = useState("")
  const [prodNewPrice, setProdNewPrice] = useState("")
  const [prodNewCount, setProdNewCount] = useState("")
  const [prodNewPopularity, setProdNewPopularity] = useState("")
  const [prodNewImg, setProdNewImg] = useState("")
  const [prodNewColors, setProdNewColors] = useState("")

  function cancelDeleteModal() {
    setIsShowDeleteModal(false)
  }
  function submitDeleteModal() {
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
      .catch((err) => {
        if (err == "SyntaxError: Unexpected end of JSON input") {
         alert('این محصول به دلیل داشتن کامنت حذف نمی شود.ابتدا کامنت ان راپاک کنید.(باگ بک اند)')
          setIsShowDeleteModal(false)
        }
      })
  }
  function hideDetailsModal() {
    setIsShowDetailsModal(false)
  }
  function closeEditModal() {
    setIsShowEditModal(false)
  }

  function submitEditModal() {
    const newInfosProd = {
      title: prodNewTitle,
      price: prodNewPrice,
      count: prodNewCount,
      img: prodNewImg,
      popularity: prodNewPopularity,
      sale: prodNewSale,
      colors: prodNewColors,
    }
    fetch(`http://localhost:8000/api/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newInfosProd),
    })
      .then((res) => res.json())
      .then((result) => {
        setIsShowEditModal(false)
        getAllProducts()
      })
  }
  return (
    <>
      <ToastContainer autoClose={2000} rtl />
      {allProducts.length ? (
        <table className="prodTable bg-white mt-5 rounded-4 p-4 w-100">
          <thead>
            <tr>
              <th>عکس</th>
              <th>اسم</th>
              <th>قیمت</th>
              <th>موجودی</th>
            </tr>
          </thead>

          <tbody>
            {allProducts.reverse().map((product) => (
              <tr key={product.id}>
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
                      setProductId(product.id)
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
          </tbody>
        </table>
      ) : (
        <ErrorBox msg={"هیچ محصولی یافت نشد"} />
      )}

      {isShowDeleteModal && (
        <DeleteModal
          cancelModal={cancelDeleteModal}
          submitModal={submitDeleteModal}
          title={"آیا از حذف اطمینان دارید ؟"}
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
                <MdDriveFileRenameOutline />
                <input
                  type="text"
                  placeholder="عنوان جدید را وارد کنید"
                  value={prodNewTitle}
                  onChange={(e) => setProdNewTitle(e.target.value)}
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
                  onChange={(e) => setProdNewPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-5">
              <div>
                <BsBag />
                <input
                  type="text"
                  placeholder="موجودی جدید را وارد کنید"
                  value={prodNewCount}
                  onChange={(e) => setProdNewCount(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-5">
              <div>
                <AiOutlineFileUnknown />
                <input
                  type="text"
                  placeholder="آدرس کاور جدید را وارد کنید"
                  value={prodNewImg}
                  onChange={(e) => setProdNewImg(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-5">
              <div>
                <AiOutlineHeart />
                <input
                  type="text"
                  placeholder=" میزان محبوبیت جدید را وارد کنید"
                  value={prodNewPopularity}
                  onChange={(e) => setProdNewPopularity(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-5">
              <div>
                <BsCartCheck />
                <input
                  type="text"
                  placeholder=" میزان فروش جدید را وارد کنید"
                  value={prodNewSale}
                  onChange={(e) => setProdNewSale(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-5">
              <div>
                <HiOutlineColorSwatch />
                <input
                  type="text"
                  placeholder=" تعداد رنگ بندی جدید را وارد کنید"
                  value={prodNewColors}
                  onChange={(e) => setProdNewColors(e.target.value)}
                />
              </div>
            </div>
          </div>
        </EditModal>
      )}
    </>
  )
}
