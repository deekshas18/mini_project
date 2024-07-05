import React from 'react';
import '../Css/About.css';
import Header from '../components/header';

const About = () => {
  return (
    <>
    <Header/>
    <div className="aboutUs-container">
      <h1 className="aboutUs-header">About Us</h1>
      <p className="aboutUs-paragraph">
        Develop a hybrid system integrating speech-to-text conversion and text summarization to streamline healthcare documentation.
      </p>
      <p className="aboutUs-paragraph">
        Enhance efficiency in healthcare administration by providing rapid and accurate conversion of spoken words into written text.
      </p>
      <p className="aboutUs-paragraph">
        Improve communication within healthcare teams by summarizing lengthy documents and reports.
      </p>
      <p className="aboutUs-paragraph">
        Ultimately, improve patient care, streamline workflows, and enhance collaboration across the healthcare ecosystem.
      </p>
      <h2 className="aboutUs-subheader">Our Goals</h2>
      <ul className="aboutUs-list">
        <li className="aboutUs-listItem">
          Increase Efficiency: Manual documentation in healthcare is time-consuming and reduces staff efficiency. Implementing voice-to-text technology streamlines these processes, saving time and allowing staff to focus on patient care.
        </li>
        <li className="aboutUs-listItem">
          Improve Communication: Summarization technologies enhance communication by providing clear, concise, and accurate information. This improves the flow of information among healthcare providers, ensuring better patient outcomes.
        </li>
        <li className="aboutUs-listItem">
          Address Diverse Needs: The solution meets various requirements such as patient information documentation, legal compliance, medical education, and research support. This comprehensive approach ensures that all critical aspects of healthcare administration are covered effectively.
        </li>
      </ul>
    </div>
    </>
  );
};

export default About;
