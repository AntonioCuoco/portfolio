import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import './getInTouch.css'

function GetInTouch() { // per la pagina di about, fare un quiz interattivo in cui faccio capire chi sono o cose del genere
    return (
        <div className='wrapper-getInTouch'>
            <p style={{ color: 'white' }}><a href="mailto:ascuoco@gmail.com" className='link-getInTouch'>Get in touch: ascuoco@gmail.com</a> <span style={{color:'white'}} className='span-divisore'>|</span> </p>
            <a href='https://www.linkedin.com/in/antoniocuoco21/' className='icon-social'><FontAwesomeIcon icon={faLinkedin} style={{ color: 'white' }} /></a> <span style={{ color: 'white' }} className='span-divisore'>|</span>
            <a href='https://github.com/AntonioCuoco' className='icon-social'><FontAwesomeIcon icon={faGithub} style={{ color: 'white' }} /></a>
        </div>
    )
}

export default GetInTouch