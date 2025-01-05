import React from 'react'
import s from './Footer.module.scss'
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

const Footer = () => {
  return (
    <div className={s.Footer}>
     <p>&copy; 2025 MOVIELAND</p>
     <div className={s.container}>
    <div className={s.links}>
        <span>About</span>
        <span>Support</span>
        <span>Contacts</span>
      </div>
      <div className={s.social}>
        <span><FacebookIcon/></span>
        <span><TwitterIcon/></span>
        <span><InstagramIcon/></span>
      </div>
      <div className={s.policy}>
        <span>Terms of Usek</span>
        <span>Privacy Policy</span>
      </div>
      </div>
      </div>
  )
}

export default Footer
