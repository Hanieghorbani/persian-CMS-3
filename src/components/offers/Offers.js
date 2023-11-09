import React, { useEffect, useState } from "react"
import ErrorBox from "../errorBox/ErrorBox"
import DeleteModal from "../deleteModal/DeleteModal"
import { toast, ToastContainer } from "react-toastify"
import './Offers.css'
import UseGetFetch from "../../Hooks/UseGetFetch"
import useDeleteFetch from "../../Hooks/useDeleteFetch"
import useAccRejFetch from "../../Hooks/useAccRejFetch"
export default function Offers() {
  const [allOffs,getAllOffers] = UseGetFetch('offs')
  const [offId, setOffId] = useState("")
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
  const [isShowRejectModal,setIsShowRejectModal] = useState(false)
  const [isShowAcceptModal,setIsShowAcceptModal] = useState(false)
  const deleteOff = useDeleteFetch('offs',offId,getAllOffers,setIsShowDeleteModal,'تخفیف')
  const acceptOff = useAccRejFetch("PUT",'offs','active-off',offId,1,setIsShowAcceptModal,getAllOffers,'فعال کردن تخفیف')
  const rejectOff = useAccRejFetch('PUT','offs','active-off',offId,0,setIsShowRejectModal,getAllOffers,'غیر فعال کردن تخفیف')
  useEffect(() => {
    getAllOffers()
  }, [])

  return (
    <div className="offers-div">
          <ToastContainer autoClose={2000} rtl />

      {allOffs.length ? (
        <table className="bg-white mt-5 rounded-4 p-4 w-100">
          <thead>
            <tr>
              <th>کد تخفیف</th>
              <th>درصد تخفیف</th>
              <th>تاریخ ثبت</th>
              <th>ثبت شده توسط</th>
              <th>ساخته شده برای</th>
            </tr>
          </thead>
          <tbody>
            {allOffs.map((off) => (
              <tr key={off.id}>
                <td>{off.code}</td>
                <td>{off.percent}%</td>
                <td>{off.date}</td>
                <td>{off.adminID}</td>
                <td>{off.productID}</td>
                <td>
                  <button
                  className="mx-1"
                    onClick={() => {
                      setIsShowDeleteModal(true)
                      setOffId(off.id)
                    }}
                  >
                    حذف
                  </button>
                  {off.isActive ? (
                    <button
                      
                      onClick={() => {
                        setIsShowRejectModal(true)
                        setOffId(off.id)
                      }}
                    >
                      غیرفعال
                    </button>
                  ) : (
                    <button
                      
                      onClick={() => {
                        setIsShowAcceptModal(true)
                        setOffId(off.id)
                      }}
                    >
                      فعال
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ErrorBox msg={"هیچ کد تخفیفی یافت نشد"} />
      )}
      {isShowDeleteModal && <DeleteModal cancelModal={()=>setIsShowDeleteModal(false)} submitModal={deleteOff} title={'آیا از حذف این کد تخفیف اطمینان دارید ؟'}/>}
      {isShowAcceptModal && <DeleteModal cancelModal={()=>setIsShowAcceptModal(false)} submitModal={acceptOff} title={'آیا از فعال کردن کد تخفیف اطمینان دارید ؟'}/>}
      {isShowRejectModal && <DeleteModal cancelModal={()=>setIsShowRejectModal(false)} submitModal={rejectOff} title={'آیا از  غیرفعال کردن کد تخفیف اطمینان دارید ؟'}/>}
    </div>
  )
}
