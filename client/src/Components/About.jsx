import { Link } from "react-router-dom";
import React from "react";
import '../Style/CSS/About.css'
import Sergio from '../Style/Imagenes/Sergio_Romero.jpg'

export default function About() {
    return (
        <div className="About">
            <h1>About this API</h1>

            <p>Hi !
                I'm Sergio Romero (31), all my life I have been passionate about technology. I recently discovered the IT world and I love it.
                I am very interested in continuing to learn in order to have more knowledge and improve my programming skills. I am good at teamwork and leading projects as well.
                I have extensive experience working with the public and leading a small team. </p>

            <img src={Sergio} alt="Sergio Romero" />

            <a href="https://www.linkedin.com/in/sergio-leonel-romero-sanchez-rajoy-fullstack/" target="_blank" rel="noreferrer"><h2>Visit my LinkedIn!</h2></a>

            <div>
                <Link to='/home'>
                    <button id="backToHome">Back to Home</button>
                </Link>
            </div>
        </div>
    )
}