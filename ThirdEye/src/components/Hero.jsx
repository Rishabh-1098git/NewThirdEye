import React from "react";
import "./Hero.css";
import heroImage from "./logo-black.png";
import { useState, useEffect } from "react";
import aboutImage from "./eye.jpg";

function Hero() {
  const [typedText, setTypedText] = useState("");
  const textToType =
    "Third Eye aims to revolutionize public safety by integrating real-time face recognition for criminal face Identification. This will be coupled with alarm triggering and Criminal location tracing system.";

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < textToType.length) {
        setTypedText((prevText) => prevText + textToType.charAt(index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 30); // Adjust the typing speed here (milliseconds)

    return () => clearInterval(typingInterval);
  }, [textToType]);
  return (
    <>
      <section class="hero">
        <div class="container">
          <div class="hero-image">
            <img src={heroImage} alt="CIA Hero Image" />
          </div>
          <div class="hero-content">
            <h1>Protecting Our Nation. Protecting the World.</h1>
            <p>
              <span>{typedText}</span>
            </p>
          </div>
        </div>
      </section>

      <section class="about-section">
        <div class="about-content">
          <h2 className="about-content-h2">About Us</h2>
          <p>
            Develop an integrated system to enhance public safety by alerting
            authorities to the presence of wanted criminals .in public spaces.
            Utilize real-time face recognition for criminal detection coupled
            with alarm triggering and emergency response coordination. Integrate
            public surveillance cameras for real-time video access AND
            Implemented facial recognition for identifying wanted criminals.
            Develop alarm triggering mechanisms to notify authorities. Ensure
            privacy compliance and user friendly interfaces. Collaborate closely
            with authorities for deployment and continuous improvement of the
            system.
          </p>
        </div>
        <img src={aboutImage} alt="About Us Image" class="about-image" />
      </section>
    </>
  );
}

export default Hero;
