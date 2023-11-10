import React, { useEffect } from "react"
import AddNewProd from "../addNewProd/AddNewProd"
import ProdTable from "../prodTable/ProdTable"
import UseGetFetch from "../../Hooks/UseGetFetch"
import isLogin from "../../utils"
import { Navigate } from "react-router-dom"
export default function Products() {
  const [allProducts, getAllProducts] = UseGetFetch("products")
  useEffect(() => {
    getAllProducts()
  }, [])


  let isAdminLogin = isLogin(localStorage.getItem('pass'))
  // console.log(isAdminLogin);
  return (
    <>
    {isAdminLogin ? (<div>
        <AddNewProd getAllProducts={getAllProducts} />
        <ProdTable getAllProducts={getAllProducts} allProducts={allProducts} />
      </div>) : (<Navigate to={'/panel'}/>)}
      
    </>
  )
}
