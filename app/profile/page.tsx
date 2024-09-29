import Link from 'next/link'
import React from 'react'

const profile = () => {
  return (
   <>
    <Link href = '/' className= 'underline block mb-2'> Reset Password</Link>
            
    <Link href= '/' className= 'underline block mb-2'> Delete Account</Link>
            
    <Link href = '/api/auth/signout' className= 'underline block mb-2'> Singout</Link>
   </>
  )
}

export default profile