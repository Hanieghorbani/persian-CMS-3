import React, { useState } from "react"
import "./AddNewProd.css"
import { MdDriveFileRenameOutline } from "react-icons/md"
import { BsBag, BsCartCheck, BsCurrencyDollar } from "react-icons/bs"
import { AiOutlineHeart, AiOutlineFileUnknown } from "react-icons/ai"
import { HiOutlineColorSwatch } from "react-icons/hi"
import { toast, ToastContainer } from "react-toastify"

export default function AddNewProd({ getAllProducts }) {
  const [newProdTitle, setNewProdTitle] = useState("")
  const [newProdSale, setNewProdSale] = useState("")
  const [newProdPrice, setNewProdPrice] = useState("")
  const [newProdCount, setNewProdCount] = useState("")
  const [newProdPopularity, setNewProdPopularity] = useState("")
  const [newProdImg, setNewProdImg] = useState("")
  const [newProdColors, setNewProdColors] = useState("")

  function submitNewProduct() {
    if (
      newProdTitle &&
      newProdSale &&
      newProdPrice &&
      newProdCount &&
      newProdPopularity &&
      newProdImg &&
      newProdColors
    ) {
      const newProductInfos = {
        title: newProdTitle,
        price: newProdPrice,
        count: newProdCount,
        img: newProdImg,
        popularity: newProdPopularity,
        sale: newProdSale,
        colors: newProdColors,
      }
      fetch("http://localhost:8000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProductInfos),
      })
        .then((res) => res.json())
        .then((result) => {
          getAllProducts()
          setNewProdTitle("")
          setNewProdSale("")
          setNewProdPrice("")
          setNewProdCount("")
          setNewProdPopularity("")
          setNewProdImg("")
          setNewProdColors("")

          toast.success("محصول با موفقیت اضافه شد", {
            position: toast.POSITION.TOP_RIGHT,
          })
        })
    }else{
      toast.error("لطفا تمام موارد را وارد کنید", {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  }
  return (
    <div className="addNewProd">
      <h1 className="fs-3 my-4">افزودن محصول جدید</h1>
      <div className="row bg-white rounded-4 p-2 m-0">
        <div className="col-lg-6">
          <div>
            <MdDriveFileRenameOutline />
            <input
              type="text"
              placeholder="نام محصول را وارد کنید"
              value={newProdTitle}
              onChange={(e) => setNewProdTitle(e.target.value)}
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div>
            <BsCurrencyDollar />
            <input
              type="text"
              placeholder="قیمت محصول را وارد کنید"
              value={newProdPrice}
              onChange={(e) => setNewProdPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div>
            <BsBag />
            <input
              type="text"
              placeholder="موجودی محصول را وارد کنید"
              value={newProdCount}
              onChange={(e) => setNewProdCount(e.target.value)}
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div>
            <AiOutlineFileUnknown />
            <input
              type="text"
              placeholder="آدرس عکس را وارد کنید"
              value={newProdImg}
              onChange={(e) => setNewProdImg(e.target.value)}
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div>
            <AiOutlineHeart />
            <input
              type="text"
              placeholder="میزان محبوبیت محصول را وارد کنید"
              value={newProdPopularity}
              onChange={(e) => setNewProdPopularity(e.target.value)}
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div>
            <BsCartCheck />
            <input
              type="text"
              placeholder="میزان فروش محصول را وارد کنید"
              value={newProdSale}
              onChange={(e) => setNewProdSale(e.target.value)}
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div>
            <HiOutlineColorSwatch />
            <input
              type="text"
              placeholder="تعداد رنگ بندی محصول را وارد کنید"
              value={newProdColors}
              onChange={(e) => setNewProdColors(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button onClick={submitNewProduct}>ثبت محصول</button>
        </div>
      </div>
      <ToastContainer autoClose={2000} rtl />
    </div>
  )
}
