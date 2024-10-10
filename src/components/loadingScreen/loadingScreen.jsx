import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import logoLoading from '../../assets/logoLoading.png'
import './loadingScreen.css'
import { useNavigate } from 'react-router-dom';

function LoadingScreen() { // per la pagina di about, fare un quiz interattivo in cui faccio capire chi sono o cose del genere
    const [showButton, setShowButton] = useState(false);
    const controls = useAnimation();
    const navigate = useNavigate();

    useEffect(() => {
        startRotationAnimation();
    }, []); // La dipendenza vuota assicura che l'effetto venga eseguito solo una volta

    const startRotationAnimation = async () => {
        await controls.start({
            rotate: 360, // Imposta la rotazione desiderata (in gradi)
            transition: {
                duration: 5, // Imposta la durata dell'animazione in secondi
                ease: "linear" // Imposta l'interpolazione lineare per una rotazione uniforme
            }
        });

        setTimeout(onAnimationComplete(), 5000);
    };

    const onAnimationComplete = () => {
        navigate('/home');
    };

    return (
        <div className='wrapper-page-loading'>
            <motion.div className='wrapper-body1-loading'>

            </motion.div>
            <motion.div className='wrapper-body2-loading'>
                {/* <video autoPlay loop muted>
                    <source src={videoLoading} type="video/mp4" />
                    Il tuo browser non supporta il tag video.
                </video> */}
                <motion.div className='wrapper-logo-loading'>
                    <motion.img src={logoLoading} className='logo-loading' animate={controls} />
                </motion.div>
            </motion.div>
        </div>
    )
}

export default LoadingScreen