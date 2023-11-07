import React,{useEffect,useState} from "react"
import AddNewProd from "../addNewProd/AddNewProd"
import ProdTable from "../prodTable/ProdTable"
export default function Products() {
  const [allProducts, setAllProducts] = useState([])

  useEffect(() => {
    getAllProducts()
  }, [])

  function getAllProducts() {
    fetch("http://localhost:8000/api/products")
      .then((res) => res.json())
      .then((products) => setAllProducts(products))
  }
  return (
    <div>
      <AddNewProd getAllProducts={getAllProducts}/>
      <ProdTable getAllProducts={getAllProducts} allProducts={allProducts}/>
    </div>
  )
}
