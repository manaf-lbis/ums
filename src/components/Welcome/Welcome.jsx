import React from 'react'
import './Welcome.css'

const Welcome = () => {
  return (
    <div className="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>Welcome!</strong> You should check in on some of those fields below.
      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  )
}

export default Welcome
