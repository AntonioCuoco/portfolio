import React, { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { motion, useAnimation } from 'framer-motion';
import Menù from '../menù/menù';
import { useNavigate } from 'react-router-dom';
import text01 from '../../assets/01.png'
import text02 from '../../assets/02.png'
import text03 from '../../assets/03.png'
import img99dev from '../../assets/99dev-img.png';
import portfolioScreen from '../../assets/portfolioScreen.png'
import cms99dev from '../../assets/cms99dev.png'
import artifonia from '../../assets/artifoniaScreen.jpg'
import { useForm } from 'antd/es/form/Form';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { getScreenWidth } from '../../utils/utils'
import './project2.css'
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

function Project2() {
    const controlsOpacity1 = useAnimation();
    const navigate = useNavigate();
    const formContactMe = useForm();
    const [menùVisible, setMenùVisible] = useState(false);
    const openMenù = useSelector((state) => (state.general.openMenù));
    const widthScreen = getScreenWidth();

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.keyCode === 40) { // Codice tasto giù
                // Avvia l'animazione di rotazione continua
                startRotationAnimation();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []); // La dipendenza vuota assicura che l'effetto venga eseguito solo una volta

    const startRotationAnimation = async () => {
        await controlsOpacity1.start({
            opacity: 0, // Imposta la rotazione desiderata (in gradi)
            transition: {
                duration: 1, // Imposta la durata dell'animazione in secondi
                ease: "easeIn" // Imposta l'interpolazione lineare per una rotazione uniforme
            }
        });

        setTimeout(onAnimationComplete(), 6000);
    };

    const onAnimationComplete = () => {
        navigate('/home');
    };

    const handleClick = () => {
        // Avvia l'animazione di rotazione continua
        startRotationAnimation();
    };

    return (
        <div className='wrapper-page-project2'>
            <motion.div
                className='wrapper-body1-project2'
            >
                <div className='wrapper-mobile-header'>
                    <motion.h1 className='logo-img2'><a href="/home">Antonio Cuoco</a></motion.h1>
                    {widthScreen < 767 && <Menù />}
                </div>
                <div className='wrapper-first-element-project'>
                    <motion.img src={text01} className='first-element-project2' />
                    <div className='wrapper-img-blog'>
                        <motion.img src={img99dev} className='img-blog' />
                        <div className='github-wrapper1'>
                            <motion.h2 className='text-white'>img blog 99dev</motion.h2>
                            <a href="https://github.com/AntonioCuoco/Blog99Dev" className='link-project2'><FontAwesomeIcon icon={faGithub} /></a>
                            <a href="https://99dev.net" className='link-project2'><FontAwesomeIcon icon={faGlobe} /></a>
                            {/* <a href="https://github.com/AntonioCuoco/cms99dev" className='link-project2'><FontAwesomeIcon icon={faGithub} /></a> */}
                        </div>
                    </div>
                </div>

                <div className='wrapper-third-element-project'>
                    <motion.img src={artifonia} className='img-artifonia' />
                    <div className='github-wrapper3-mobile'>
                        <h2 className='text-white'>artifonia react native</h2>
                        <a href="https://github.com/AntonioCuoco/artifonia" className='link-project2'><FontAwesomeIcon icon={faGithub} /></a>
                    </div>
                </div>

                <div className='wrapper-second-element-project'>
                    <motion.img src={text03} className='third-element-project2' />
                    <div className='wrapper-img-portfolio'>
                        <motion.img src={portfolioScreen} className='img-portfolio' />
                        <div className='github-wrapper2'>
                            <motion.h2 className='text-white'>img portfolio screen</motion.h2>
                            <a href="https://github.com/AntonioCuoco/portfolio" className='link-project2'><FontAwesomeIcon icon={faGithub} /></a>
                            <a href="https://antoniocuoco.it" className='link-project2'><FontAwesomeIcon icon={faGlobe} /></a>
                        </div>
                    </div>
                </div>
            </motion.div>
            <motion.div
                className='wrapper-body2-project2'
            >
                <Menù />
                <div className='wrapper-img-artifonia'>
                    <motion.img src={text02} className='second-element-project2' />
                    <div className='github-wrapper3'>
                        <motion.img src={artifonia} className='img-artifonia' />
                        <div className='subwrapper-github-artifonia'>
                            <motion.h2 className='text-white'>artifonia react native</motion.h2>
                            <a href="https://github.com/AntonioCuoco/artifonia" className='link-project2'><FontAwesomeIcon icon={faGithub} /></a>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default Project2;