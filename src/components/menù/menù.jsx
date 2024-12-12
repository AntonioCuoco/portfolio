import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import GetInTouch from '../getInTouch/getInTouch';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenMenù } from '../../redux/slice/generalSlice'
import './menù.css'

function Menù() { // per la pagina di about, fare un quiz interattivo in cui faccio capire chi sono o cose del genere
    const navigate = useNavigate();
    // const [openMenù, setOpenMenù] = useState(false);
    const openMenù = useSelector((state) => state.general.openMenù);
    const dispatch = useDispatch();

    return (
        <ul className='wrapper-menù'>
            <li className='wrapper-voice-menù' onClick={() => navigate('/home')}>Home</li>
            <li className='wrapper-voice-menù' onClick={() => navigate('/project')}>Projects</li>
            <li className='wrapper-voice-menù' onClick={() => navigate('/about')}>About</li>
            <MenuOutlined className='menù-mobile-icon' onClick={() => dispatch(setOpenMenù())} />
            <div className={openMenù ? 'open-menù' : 'open-menù-close'}>
                <ul className={openMenù ? 'wrapper-ul' : 'wrapper-ul-close'}>
                    <Button className="btn-close" onClick={() => dispatch(setOpenMenù())}>x</Button>
                    <li className='open-menù-voice' onClick={() => navigate('/home')}>Home</li>
                    <li className='open-menù-voice' onClick={() => navigate('/project')}>Projects</li>
                    <li className='open-menù-voice' onClick={() => navigate('/about')}>About</li>
                    {openMenù && <GetInTouch />}
                    <p className="siteByMobile" style={{ color: 'white', padding: 8 }}>Antonio Cuoco @ 2024</p>
                    <div className='wrapper-policy'>
                        <a href="https://www.iubenda.com/privacy-policy/2400137" className="privacy-policy">Privacy Policy</a>
                        <a href="https://www.iubenda.com/privacy-policy/46134369/cookie-policy" className="cookie-policy">Cookie Policy</a>
                    </div>
                </ul>
            </div>
        </ul>
    )

    /* inserire x per far chiudere menù a tendina e far si che compaia il getInTouch e il antonioCuoco2024 nel menù a tendina e poi testare che tutto funzioni e passare a pagina successiva */
}

export default Menù