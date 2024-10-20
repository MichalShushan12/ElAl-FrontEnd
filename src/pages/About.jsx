import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import '/src/css/About.css'

const About = () => {

const navigate= useNavigate();

const ClickContact =()=>{
  navigate('/contact');
};


const scrollLeft = () => {
  document.getElementById('image-gallery').scrollBy({
    left: -300, 
    behavior: 'smooth'
  });
};

const scrollRight = () => {
  document.getElementById('image-gallery').scrollBy({
    left: 300, 
    behavior: 'smooth'
  });
};

  return (
    <div className="about-page">
      <div className="hero-section">
        <div className="hero-inner">
          <div className="branch-overlay"></div>
          <div className="hero-content">
            <h1>About Us</h1>
          </div>
        </div>
      </div>
      
      <main id="main">
        <div className="container">
          <div className="grid">
            <div className="text-section">

              <br/>  
<p>
Elal, also known as El Al Israel Airways Ltd., is the international airline company in Israel.
</p>

<p>
 The company was established in 1948 and since then has become one of the leading companies in the international world.
 </p>

<p>
Elal's activity and management center at Ben-Gurion International Airport. 
</p>

<p>
The company operates flights to destinations in Europe, Asia, Africa and North America.
</p>

<p>
Elal operates in excellent customer service, safety and security, while adhering to kosher rules and avoiding flying on Shabbats and Israeli holidays.
</p>

<p>
If you need help, contact our representatives at the link attached herewith:
&nbsp;&nbsp;
<button onClick={ClickContact}>Contact Us</button>
</p>
</div>
<br /> <br />

<div className="image-gallery-wrapper">
  <button className="scroll-button left" onClick={scrollLeft}>
    &lt;
  </button>

  <div className="image-gallery" id="image-gallery">
    <img src="/images/miami.jpeg" alt="Miami" />
    <img src="/images/japan.jpeg" alt="Japan" />
    <img src="/images/france.jpeg" alt="France" />
    <img src="/images/argentina.jpg" alt="Argentina" />
    <img src="/images/Las Vegas.jpg" alt="Las Vegas" />
    <img src="/images/china.jpeg" alt="China" />
    <img src="/images/italy.jpeg" alt="Italy" />
    <img src="/images/south africa.jpg" alt="South Africa" />
    <img src="/images/mexico.jpg" alt="Mexico" />
    <img src="/images/nigeria.jpeg" alt="Nigeria" />
  </div>

  <button className="scroll-button right" onClick={scrollRight}>
    &gt;
  </button>
</div>
</div>
</div>
</main>
</div>
  )
}

export default About