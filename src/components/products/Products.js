import React from "react"
import ErrorBox from "../errorBox/ErrorBox"
import AddNewProd from "../addNewProd/AddNewProd"
import ProdTable from "../prodTable/ProdTable"
import DeleteModal from "../deleteModal/DeleteModal"
export default function Products() {
  return (
    <div>
      {/* <ErrorBox msg={"هیچ محصولی یافت نشد"} /> */}
      <AddNewProd />
      <ProdTable />
    </div>
  )
}
