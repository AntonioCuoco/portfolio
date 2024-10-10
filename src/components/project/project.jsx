import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import title from '../../assets/title-project-page.png'
import Menù from '../menù/menù';
import arrowDown from '../../assets/arrow down2.png'
import { useNavigate } from 'react-router-dom';
import './project.css'

function Project() {
    const controlsOpacity1 = useAnimation();
    const navigate = useNavigate();

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

    const startRotationAnimation = async() => {
        await controlsOpacity1.start({
            opacity: 0, // Imposta la rotazione desiderata (in gradi)
            transition: {
                duration: 1, // Imposta la durata dell'animazione in secondi
                ease: "easeIn" // Imposta l'interpolazione lineare per una rotazione uniforme
            }
        });

        setTimeout(onAnimationComplete(),6000);
    };

    const onAnimationComplete = () => {
        navigate('/project2');
    };

    const handleClick = () => {
        // Avvia l'animazione di rotazione continua
        startRotationAnimation();
    };

    return (
        <div className='wrapper-page-project'>
            <motion.div className='wrapper-title-project'>
                <motion.img
                    src={title} 
                    className='img-title-project'
                    animate={controlsOpacity1}
                />
                {/* <FontAwesomeIcon icon={faArrowDown} className='arrow-down'/> */}
                <motion.img
                    src={arrowDown}
                    onClick={() => handleClick()}
                    className='arrow-down'
                    animate={controlsOpacity1}
                />
            </motion.div>
            <motion.div
                className='wrapper-body1-project'
            >
                <motion.h1 className='logo-img'><a href="/home">Antonio Cuoco</a></motion.h1>
            </motion.div>
            <motion.div 
                className='wrapper-body2-project'
            >
                <Menù />
            </motion.div>
        </div>
    )
}

export default Project;