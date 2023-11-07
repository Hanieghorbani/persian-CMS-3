import React, { useEffect, useState } from "react"
import "./Comments.css"
import ErrorBox from "../errorBox/ErrorBox"
import DetailsModal from "../detailsModal/DetailsModal"
import DeleteModal from "../deleteModal/DeleteModal"
import EditModal from "../editModal/EditModal"
export default function Comments() {
  const [allComments, setAllComments] = useState([])
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false)
  const [mainBodyComment, setMainBodyComment] = useState("")

  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
  const [commentId, setCommentId] = useState("")

  const [isShowEditModal, setIsShowEditModal] = useState(false)
  useEffect(() => {
    getAllComments()
  }, [])

  function getAllComments() {
    fetch("http://localhost:8000/api/comments")
      .then((res) => res.json())
      .then((comments) => {
        setAllComments(comments)
      })
  }

  function submitDeleteModal() {
    console.log("delte modal")
    fetch(`http://localhost:8000/api/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        getAllComments()
        setIsShowDeleteModal(false)
      })
  }

  function submitEditModal(){
    console.log('submit edit modal');
    fetch(`http://localhost:8000/api/comments/${commentId}`,{
      method:'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        body:mainBodyComment
      })
    }).then(res=>res.json()).then(res=>{
      console.log(res);
      setIsShowEditModal(false)
      getAllComments()
    })
  }
  return (
    <div className="comments-div">
      {allComments.length ? (
        <table className="bg-white p-4 w-100 rounded-4 mt-5">
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
                  <button>تایید</button>
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
        />
      )}
      {isShowEditModal && (
        <EditModal onClose={() => setIsShowEditModal(false)} onSubmit={submitEditModal}>
          <textarea
            className="w-100 border-3 rounded-4 p-4"
            value={mainBodyComment}
            onChange={e=>setMainBodyComment(e.target.value)}
          ></textarea>
        </EditModal>
      )}
    </div>
  )
}
