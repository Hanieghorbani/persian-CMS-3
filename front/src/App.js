import "./App.css"
import Sidebar from "./components/sidebar/Sidebar"
import Header from "./components/header/Header"
import routes from "./routes"
import { useRoutes } from "react-router-dom"
import CmsContext from "./Context"
import { useState } from "react"
export default function App() {
  const router = useRoutes(routes)
  const [adminInfos,setAdminInfos] = useState('')

  return (
    <CmsContext.Provider value={
      {
        adminInfos,
        setAdminInfos
      }
    }>
      <div className="app d-flex justify-content-between w-100">
        <Sidebar />

        <div className="main">
          <Header />
          {router}
        </div>
      </div>
    </CmsContext.Provider>
  )
}
