import React from 'react'
import './Header.css'
import {AiOutlineBell} from 'react-icons/ai'
import {BsSun} from 'react-icons/bs'
export default function Header() {
  return (
    <div className='header d-flex justify-content-between align-items-center w-100 py-3'>
        <div className='d-flex align-items-center'>
            <img src="./img/admin.jpg" alt="admin" className='ms-3'/>
            <div>
                 <p className='fs-5'>محمد امین سعیدی راد</p>
                 <p className='text-secondary mt-2'>برنامه نویس فرانت اند</p>
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
