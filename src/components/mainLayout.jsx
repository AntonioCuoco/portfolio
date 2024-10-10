import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import personaggio from "../assets/personaggio3d.png"
import { useNavigate } from 'react-router-dom';
import Menù from './menù/menù'
import scrittaHome from '../assets/scrittaHome.png'
import scrittaHome2 from '../assets/scrittaHome2.png'
import './mainLayout.css'
import GetInTouch from './getInTouch/getInTouch';
import { getScreenWidth } from '../utils/utils';

function MainLayout() { // per la pagina di about, fare un quiz interattivo in cui faccio capire chi sono o cose del genere
    const [showButton, setShowButton] = useState(false);
    const widthScreen = getScreenWidth();
    const navigate = useNavigate();

    return (
        <div className='wrapper-page'>
            <motion.div className='wrapper-body1'>
                <h1 className='logo-img'><a href="/home">Antonio Cuoco</a></h1>
                {widthScreen > 767 && <GetInTouch />} {/*{ showButton && <GetInTouch />} */}
                <motion.div className='wrapper-img-personaggio'>
                    <motion.img src={personaggio} className='img-personaggio3d' />
                </motion.div>
            </motion.div>
            {widthScreen < 767 &&
                        <div className='wrapper-text'>
                            <motion.div className='text-container-mobile'>
                                <motion.img src={scrittaHome} className='text-1-mobile' />
                            </motion.div>
                            <motion.div className='text-container-mobile2'>
                                <motion.img src={scrittaHome2} className='text-2-mobile' />
                            </motion.div>
                        </div>
                    }
            <motion.div className='text-container'>
                <motion.img src={scrittaHome} className='text-1' />
            </motion.div>
            <motion.div className='text-container2'>
                <motion.img src={scrittaHome2} className='text-2' />
            </motion.div>
            <motion.div className='wrapper-body2'>
                <Menù />
                <p style={{ color: 'white', padding: 16 }} className='siteBy'>Antonio Cuoco @ 2024</p>
            </motion.div>
        </div>
    )
}

export default MainLayout