import React,{useEffect} from "react"
import AddNewProd from "../addNewProd/AddNewProd"
import ProdTable from "../prodTable/ProdTable"
import UseGetFetch from "../../Hooks/UseGetFetch"
export default function Products() {
  const [allProducts,getAllProducts] = UseGetFetch('products')
  useEffect(() => {
    getAllProducts()
  }, [])

  return (
    <div>
      <AddNewProd getAllProducts={getAllProducts}/>
      <ProdTable getAllProducts={getAllProducts} allProducts={allProducts}/>
    </div>
  )
}
