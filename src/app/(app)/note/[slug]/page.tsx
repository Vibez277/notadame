import React from 'react'

function Note({params}:{params:{slug:string}}) {
  return (
    <div>Note {params.slug}</div>
  )
}

export default Note