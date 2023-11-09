import React, { useEffect, useState } from "react"
import ErrorBox from "../errorBox/ErrorBox"
import "./Orders.css"
import DeleteModal from "../deleteModal/DeleteModal"
import DetailsModal from "../detailsModal/DetailsModal"
import { toast, ToastContainer } from "react-toastify"
import UseGetFetch from "../../Hooks/UseGetFetch"
import useDeleteFetch from "../../Hooks/useDeleteFetch"
import useAccRejFetch from "../../Hooks/useAccRejFetch"
export default function Orders() {
  const [allOrders,getAllOrders] = UseGetFetch('orders')
  const [orderId, setOrderId] = useState("")
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false)
  const [isShowRecordModal, setIsShowRecordModal] = useState(false)
  const [isShowRejectModal,setIsShowRejectModal] = useState(false)
  const [mainOrderInfos, setMainOrderInfos] = useState([])
  const deleteOrder = useDeleteFetch('orders',orderId,getAllOrders,setIsShowDeleteModal,'سفارش')
  const recordOrder = useAccRejFetch('PUT','orders','active-order',orderId,1,setIsShowRecordModal,getAllOrders,'ثبت سفارش')
  const rejectOrder = useAccRejFetch('PUT','orders','active-order',orderId,0,setIsShowRejectModal,getAllOrders,'رد سفارش')
  useEffect(() => {
    getAllOrders()
  }, [])

  return (
    <div className="orders-div">
      <ToastContainer autoClose={2000} rtl />

      {allOrders.length ? (
        <table className="bg-white mt-5 rounded-4 p-4 w-100">
          <thead>
            <tr>
              <th>نام خریدار</th>
              <th>محصول</th>
              <th>تعداد</th>
              <th>تاریخ سفارش</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.userID}</td>
                <td>{order.productID}</td>
                <td>{order.sale_count}</td>
                <td>{order.date}</td>
                <td>
                  <button
                    onClick={() => {
                      setIsShowDeleteModal(true)
                      setOrderId(order.id)
                    }}
                  >
                    حذف
                  </button>
                  {order.isActive ? (
                    <button
                      className="mx-3"
                      onClick={() => {
                        setIsShowRejectModal(true)
                        setOrderId(order.id)
                      }}
                    >
                      رد سفارش
                    </button>
                  ) : (
                    <button
                      className="mx-3"
                      onClick={() => {
                        setIsShowRecordModal(true)
                        setOrderId(order.id)
                      }}
                    >
                      ثبت سفارش
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setIsShowDetailsModal(true)
                      setMainOrderInfos(order)
                    }}
                  >
                    جزییات
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ErrorBox msg={"هیچ سفارشی یافت نشد"} />
      )}
      {isShowDeleteModal && (
        <DeleteModal
          cancelModal={() => setIsShowDeleteModal(false)}
          submitModal={deleteOrder}
          title={"آیا از حذف سفارش اطمینان دارید ؟"}
        />
      )}
      {isShowDetailsModal && (
        <DetailsModal onHide={() => setIsShowDetailsModal(false)}>
          <table>
            <thead>
              <tr>
                <th>ساعت</th>
                <th>مبلغ کل</th>
                <th>میزان تخفیف</th>
                <th>میزان محبوبیت</th>
                <th>وضعیت سفارش</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{mainOrderInfos.hour}</td>
                <td>
                  {new Intl.NumberFormat("en-US", { style: "decimal" }).format(
                    mainOrderInfos.price
                  )}
                </td>
                <td>{mainOrderInfos.off}</td>
                <td>{mainOrderInfos.popularity}%</td>
                <td>{mainOrderInfos.isActive ? 'ثبت شده' : 'ثبت نشده'}</td>
              </tr>
            </tbody>
          </table>
        </DetailsModal>
      )}
      {isShowRecordModal && (
        <DeleteModal
          cancelModal={() => setIsShowRecordModal(false)}
          submitModal={recordOrder}
          title={"آیا از ثبت سفارش اطمینان دارید ؟"}
        />
      )}
      {isShowRejectModal && (
        <DeleteModal
          cancelModal={() => setIsShowRejectModal(false)}
          submitModal={rejectOrder}
          title={"آیا از رد سفارش اطمینان دارید ؟"}
        />
      )}
    </div>
  )
}
