import React from 'react'
import './NoPage404.css'
import {useEffect} from "react"

function Nopage404() {

  useEffect(() => {

    function sendOut() {
      window.location.href = "http://www.hotmail.com"
    }
    sendOut()
  }, [])

  return(
    <div className="outer">
      <p>404. Page Not Found !!!</p>
    </div>
  )
}

export default Nopage404