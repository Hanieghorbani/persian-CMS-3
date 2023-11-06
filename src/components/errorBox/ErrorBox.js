import React from 'react'

export default function ErrorBox({msg}) {
  return (
    <div className='bg-danger text-white text-center mt-5 rounded-4'>
        <h1 className='fs-4 py-2'>{msg} !</h1>
    </div>
  )
}
