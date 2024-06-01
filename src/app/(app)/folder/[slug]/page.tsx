import React from 'react'

function Folder({params}:{params:{
    slug:string
}}) {
  return (
    <div className='text-white'>Folder {params.slug}</div>
  )
}

export default Folder