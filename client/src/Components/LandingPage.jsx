import { Link } from "react-router-dom";
import React from "react";
import '../Style/CSS/LandingPage.css'
import video from '../Style/Videos/VideoIntro.mp4'

export default function LandingPage() {
    return (
        <div className="body_landing">

            <div className="landing">

                <video autoPlay="autoplay" muted type={"video/mp4"} preload="auto" loop src={video}></video>
                <Link to='/home'>
                    <h1>Henry Food's Proyect</h1>
                </Link>
            </div>

            <h3>Welcome to Food's API</h3>
            <p>In this page you can see different recipes's info with relevant information using the SPOONACULAR external API. Also you can create your own recipes!</p>

        </div>
    )
}