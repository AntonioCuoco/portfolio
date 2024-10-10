import React from 'react';
import { motion } from 'framer-motion';
import Menù from '../menù/menù';
import personaggio from '../../assets/personaggio3d.png';
import aboutImg from '../../assets/ABOUT.png';
import GetInTouch from '../getInTouch/getInTouch';
import { Form, Input, Button } from 'antd';
import { getScreenWidth } from '../../utils/utils';
import './about.css'

function About() {

    const screenWidth = getScreenWidth();

    return (
        <div className='wrapper-page-about'>
            <motion.div className='wrapper-body1-about'>
                <h1 className='logo-img-about'><a href="/home">Antonio Cuoco</a></h1>
                <div>
                    <img src={personaggio} className='img-personaggio3d-about' />
                </div>
                <GetInTouch />
                <motion.img src={aboutImg} className='img-about-background' />
            </motion.div>
            <motion.div className='wrapper-body2-about'>
                <div className='wrapper-menù-about2'>
                    {screenWidth < 767 && <h1 className='logo-img-about'><a href="/home">Antonio Cuoco</a></h1>}
                    <Menù />
                </div>
                <motion.div className='wrapper-about-paragraph'>
                    <div className='wrapper-experience-about'>
                        <h1 className='title-experience-about'>Esperienze</h1>
                        <p className='subtitle-experience-about'>YNOS IT</p>
                        <p className='about-paragraph'>Da Maggio 2023 a Dicembre 2023</p>
                        <p className='about-paragraph'>Ho lavorato come frontend developer, ho lavorato principalmente con html,css,javascript,react, redux, ant design, react router e altre librerie, ho imparato a lavorare in team e avere dei feedback da parte dei miei colleghi,e ho avuto una piccola infarinatura di come si utilizza un database non relazionale come mongoDB e node js per la parte di api</p>
                    </div>
                    <h1 className='title-experience-about'>About me</h1>
                    <p className='about-paragraph'>Salve, sono Antonio e sono un frontend developer, ho studiato per all'incirca un'anno in maniera autonoma prima i concetti base della programmazione, per poi passare ad html&css&javascript e poi react, dopo aver raggiunto un buon livello di preparazione, ho fatto il corso di start2impact per consolidare le mie conoscenze e avere dei feedback sul come programmavo, dopo aver concluso questo corso, ho incominciato a lavorare presso un'azienda di salerno, dove lavoro attualmente e dove ho imparato e consolidato molte cose nuove o che già sapevo</p>
                    <p className='about-paragraph2'>Conosco html,css,javascript,React, i classici strumenti di versionamento del codice come git, ho visto l'utilizzo di strumenti di rilascio del codice come jenkins e l'utilizzo di repository quali github e bitbucket, ovviamente in questo lavoro si imparano sempre nuove cose e io sono voglioso di imparare sempre piu nuove cose</p>
                    <div className='wrapper-form-about'>
                        <h2 style={{ textAlign: 'center' }}>Contact Me</h2>
                        <Form
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={(value) => console.log(value)}
                            onFinishFailed={(value) => console.log(value)}
                            className='form-about'
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Please input your email' }]}
                            >
                                <Input className='input1-form-about' />
                            </Form.Item>

                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[{ required: true, message: 'Please input your name!' }]}
                            >
                                <Input className='input2-form-about' />
                            </Form.Item>

                            <Form.Item
                                label="Surname"
                                name="Surname"
                                rules={[{ required: true, message: 'Please input your surname!' }]}
                            >
                                <Input className='input2-form-about' />
                            </Form.Item>

                            <Form.Item
                                label="Message"
                                name="message"
                                rules={[{ required: true, message: 'Please input your message!' }]}
                            >
                                <Input className='input2-form-about' />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </motion.div>
                <p style={{ color: 'white', padding: 16 }}>Antonio Cuoco @ 2024</p>
            </motion.div>
        </div>
    )
}

export default About