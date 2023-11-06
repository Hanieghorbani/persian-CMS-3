import React from "react"
import "./AddNewProd.css"
import { MdDriveFileRenameOutline } from "react-icons/md"
import { BsBag, BsCartCheck, BsCurrencyDollar } from "react-icons/bs"
import { AiOutlineHeart, AiOutlineFileUnknown } from "react-icons/ai"
import { HiOutlineColorSwatch } from "react-icons/hi"
export default function AddNewProd() {
  return (
    <div className="addNewProd">
      <h1 className="fs-3 my-4">افزودن محصول جدید</h1>
      <div className="row bg-white rounded-4 p-2 m-0">
        <div className="col-lg-6">
          <div>
            <MdDriveFileRenameOutline />
            <input type="text" placeholder="نام محصول را وارد کنید" />
          </div>
        </div>
        <div className="col-lg-6">
          <div>
            <BsCurrencyDollar />
            <input type="text" placeholder="قیمت محصول را وارد کنید" />
          </div>
        </div>
        <div className="col-lg-6">
          <div>
            <BsBag />
            <input type="text" placeholder="موجودی محصول را وارد کنید" />
          </div>
        </div>
        <div className="col-lg-6">
          <div>
            <AiOutlineFileUnknown />
            <input type="text" placeholder="آدرس عکس را وارد کنید" />
          </div>
        </div>
        <div className="col-lg-6">
          <div>
            <AiOutlineHeart />
            <input type="text" placeholder="میزان محبوبیت محصول را وارد کنید" />
          </div>
        </div>
        <div className="col-lg-6">
          <div>
            <BsCartCheck />
            <input type="text" placeholder="میزان فروش محصول را وارد کنید" />
          </div>
        </div>
        <div className="col-lg-6">
          <div>
            <HiOutlineColorSwatch />
            <input
              type="text"
              placeholder="تعداد رنگ بندی محصول را وارد کنید"
            />
          </div>
        </div>
        <div >
           <button>ثبت محصول</button> 
        </div>
      </div>
    </div>
  )
}
