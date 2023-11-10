import React, { useContext, useEffect, useState } from 'react'
import './Header.css'
import {AiOutlineBell} from 'react-icons/ai'
import {BsSun} from 'react-icons/bs'
import CmsContext from '../../Context'

export default function Header() {
  // const [adminInfos,setAdminInfos] = useState(JSON.parse(localStorage.getItem('adminInfo')))
const contextData = useContext(CmsContext)
useEffect(()=>{
  contextData.setAdminInfos(JSON.parse(localStorage.getItem('adminInfo')))
},[])
  return (
    <div className='header d-flex justify-content-between align-items-center w-100 py-3'>
        <div className='d-flex align-items-center'>
            <img src={contextData.adminInfos.img} alt={contextData.adminInfos.firstname} className='ms-3'/>
            <div>
                 <p className='fs-5'>{contextData.adminInfos.firstname} {contextData.adminInfos.lastname}</p>
                 <p className='text-secondary mt-2'>{contextData.adminInfos.task}</p>
            </div>
        </div>
        <div className='header-left d-flex align-items-center justify-content-between'>
        <div className='searchBox shadow ms-2'>
            <input type="text" placeholder='جست و جو کنید...'/>
            <button>جست و جو</button>
        </div>
            <AiOutlineBell className='ms-2 shadow'/>
            <BsSun className='shadow'/>
        </div>
    </div>
  )
}
