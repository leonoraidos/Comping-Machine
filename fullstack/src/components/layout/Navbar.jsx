//icons setup
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { faKeyboard, faUser, faStopCircle } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
config.autoAddCss = false

import NavbarHeader from './NavbarHeader';
import { useEffect, useState } from 'react'
// import useLoginModal from '../../../Hooks/useLoginModal'
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from "next/router";
import { faMusic } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
  const { data: session } = useSession();
  let [profileDisplay, setProfileDisplay] = useState('hidden')
  const router = useRouter()

  useEffect(() => {
    if (session) {
      setProfileDisplay('visible text-fuchsia-900');
    }
  }, [session])

  return (
    <div className='container lg:max-w-[1000px] flex justify-center items-center lg:justify-between md:justify-around min-w-[400px]
    mx-auto h-fit w-full ring ring-fuchsia-900 p-2 rounded-b-lg'>
     
        <NavbarHeader />
        <div className='w-min-[100px]'>
          <a href='/'>
            <FontAwesomeIcon className='ring ring-pink-500 ring-offset-1' style={iconStyle} icon={faKeyboard} />
          </a>
          <button className={profileDisplay}>
            <FontAwesomeIcon onClick={() => {router.push('/userProfile')}} className='ring ring-pink-500 ring-offset-1' style={iconStyle} icon={faMusic} />
          </button>
          {!session ?
            <FontAwesomeIcon onClick={() => router.push('/login')} className='ring ring-pink-500 ring-offset-1' style={iconStyle} icon={faUser} />
            :
            <div className='inline'>
              <FontAwesomeIcon onClick={() => signOut({callbackUrl: '/'})} className='ring ring-pink-500 ring-offset-1' style={iconStyle} icon={faStopCircle} />
              <br></br>
              <span className={profileDisplay}>Logged as {session.user.name}</span>
            </div>
          }
       
      </div>
    </div>
  )
}

const iconStyle = {
  color: 'whitesmoke',
  height: '26px',
  margin: '5px 10px',
  backgroundColor: 'inherit',
  borderRadius: '50px',
  padding: '5px',
  cursor: 'pointer',
}

export default Navbar;