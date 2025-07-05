import { useParams } from 'next/navigation'
import React from 'react'

const Editpage = () => {
  const {id} = useParams();
  return (
    <div>
      edit
    </div>
  )
}

export default Editpage
