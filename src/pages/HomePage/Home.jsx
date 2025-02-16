import React from 'react'
import './Home.css'
import Navbar from '../../components/Nanbar/Navbar'
import { Link } from 'react-router-dom'

const Home = () => {

  return (
    <div className='home_page'>
      <div className='glass_card'>
        <Navbar />
      </div>


      <div className='container heading mt-3 glass_card d-flex'>
        <i className="bi bi-speedometer2 icon"></i>
        <h2 className='text-dark'>Dashboard</h2>
      </div>

      <div className='container p-0 mt-3'>


        <div className="card glass_card p-0">
          <div className="card-header"> 
            <h5 className="card-title">Welcome....</h5>
          </div>
          <div className="card-body">
            <h5 className="card-title">Complete Your Profile</h5>
            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
            <Link to={'/profile'}>
            <button className="btn btn-primary d-flex align-item-centre justify-content-centre gap-2 text-decoration-none">Go Profile <i className="bi bi-arrow-right-circle"></i></button></Link>
          </div>
        </div>


      </div>
    </div>
  )
}

export default Home;
