import React, { useEffect, useRef, useState } from "react"
import "./Comments.css"
import ErrorBox from "../errorBox/ErrorBox"
import DetailsModal from "../detailsModal/DetailsModal"
import DeleteModal from "../deleteModal/DeleteModal"
import EditModal from "../editModal/EditModal"
import { toast, ToastContainer } from "react-toastify"
import UseGetFetch from "../../Hooks/UseGetFetch"
import useDeleteFetch from "../../Hooks/useDeleteFetch"
import useEditFetch from "../../Hooks/useEditFetch"
import useAccRejFetch from "../../Hooks/useAccRejFetch"
import isLogin from "../../utils"
import { Navigate } from "react-router-dom"

export default function Comments() {
  const [allComments, getAllComments] = UseGetFetch("comments")
  const [commentId, setCommentId] = useState("")
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false)
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
  const [isShowEditModal, setIsShowEditModal] = useState(false)
  const [isShowAcceptModal, setIsShowAcceptModal] = useState(false)
  const [isShowRejectModal, setIsShowRejectModal] = useState(false)
  const [mainBodyComment, setMainBodyComment] = useState("")

  let isAdminLogin = isLogin(localStorage.getItem('pass'))
  //use custom hooks for fetchs
  const submitDeleteModal = useDeleteFetch(
    "comments",
    commentId,
    getAllComments,
    setIsShowDeleteModal,
    "کامنت"
  )
  const submitEditModal = useEditFetch(
    "comments",
    commentId,
    mainBodyComment,
    setIsShowEditModal,
    getAllComments,
    "کامنت"
  )
  const acceptModal = useAccRejFetch(
    "POST",
    "comments",
    "accept",
    commentId,
    "",
    setIsShowAcceptModal,
    getAllComments,
    "تایید کامنت"
  )
  const rejectModal = useAccRejFetch(
    "POST",
    "comments",
    "reject",
    commentId,
    "",
    setIsShowRejectModal,
    getAllComments,
    "رد کامنت"
  )
  useEffect(() => {
    getAllComments()
  }, [])

  return (
    <>
      {isAdminLogin ? (<div className="comments-div">
        <ToastContainer autoClose={2000} rtl />
        <h1 className="my-4 fs-3">لیست کامنت ها</h1>
        {allComments.length ? (
          <table className="bg-white p-4 w-100 rounded-4">
            <thead>
              <tr>
                <th>اسم کاربر</th>
                <th>محصول</th>
                <th>کامنت</th>
                <th>تاریخ</th>
                <th>ساعت</th>
              </tr>
            </thead>
            <tbody>
              {allComments.map((comment) => (
                <tr key={comment.id}>
                  <td>{comment.userID}</td>
                  <td>{comment.productID}</td>
                  <td>
                    <button
                      onClick={() => {
                        setIsShowDetailsModal(true)
                        setMainBodyComment(comment.body)
                      }}
                    >
                      دیدن متن
                    </button>
                  </td>
                  <td>{comment.date}</td>
                  <td>{comment.hour}</td>
                  <td>
                    <button
                      onClick={() => {
                        setIsShowDeleteModal(true)
                        setCommentId(comment.id)
                      }}
                    >
                      حذف
                    </button>
                    <button
                      className="mx-2"
                      onClick={() => {
                        setIsShowEditModal(true)
                        setMainBodyComment(comment.body)
                        setCommentId(comment.id)
                      }}
                    >
                      ویرایش
                    </button>
                    <button className="ms-2">پاسخ</button>
                    {comment.isAccept ? (
                      <button
                        className="bg-danger"
                        onClick={() => {
                          setIsShowRejectModal(true)
                          setCommentId(comment.id)
                        }}
                      >
                        رد کردن
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setIsShowAcceptModal(true)
                          setCommentId(comment.id)
                        }}
                      >
                        تایید
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <ErrorBox msg={"هیچ کامنتی یافت نشد"} />
        )}
        {isShowDetailsModal && (
          <DetailsModal onHide={() => setIsShowDetailsModal(false)}>
            <p className="my-4 fs-4">{mainBodyComment}</p>
          </DetailsModal>
        )}
        {isShowDeleteModal && (
          <DeleteModal
            cancelModal={() => setIsShowDeleteModal(false)}
            submitModal={submitDeleteModal}
            title={"آیا از حذف اطمینان دارید ؟"}
          />
        )}
        {isShowEditModal && (
          <EditModal
            onClose={() => setIsShowEditModal(false)}
            onSubmit={submitEditModal}
          >
            <textarea
              className="w-100 border-3 rounded-4 p-4"
              value={mainBodyComment}
              onChange={(e) => setMainBodyComment(e.target.value)}
            ></textarea>
          </EditModal>
        )}
        {isShowAcceptModal && (
          <DeleteModal
            cancelModal={() => setIsShowAcceptModal(false)}
            submitModal={acceptModal}
            title={"آیا از تایید اطمینان دارید ؟"}
          />
        )}
        {isShowRejectModal && (
          <DeleteModal
            cancelModal={() => setIsShowRejectModal(false)}
            submitModal={rejectModal}
            title={"آیا از رد کامنت اطمینان دارید ؟"}
          />
        )}
      </div>) : (
        <Navigate to={'/panel'}/>
      )}
    </>
  )
}
