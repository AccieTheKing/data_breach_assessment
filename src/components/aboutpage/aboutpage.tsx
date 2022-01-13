import React from 'react';
import Navbar from '../Navbar/Nav';
import './style.css';

const Aboutpage = () => {
   function activeClass(e: any) {
      const active = document.querySelector('#side a.active')!;
      if (active !== null) {
         active.classList.remove('active');
      }
      e.target.className = 'active';
   }

   return (
      <div>
         <Navbar></Navbar>

         <p></p>
         <div className="sidebar" id="side" onClick={activeClass}>
            <a href="#about">What is this tool about?</a>
            <a href="#step1">Step 1</a>
            <a href="#assessor">&nbsp; • Assessor and date</a>
            <a href="#step2">Step 2</a>
            <a href="#data">&nbsp; • Data processing context</a>
            <a href="#simpleData">&nbsp; • Simple data</a>
            <a href="#behavorialData">&nbsp; • Behavioral data</a>
            <a href="#financialData">&nbsp; • Financial data</a>
            <a href="#sensitiveData">&nbsp; • Sensitive data</a>
            <a href="#step3">Step 3</a>
            <a href="#eoi">&nbsp; • Ease of identification</a>
            <a href="#step4">Step 4</a>
            <a href="#ac">&nbsp; • Aggravating circumstances</a>
            <a href="#step5">Step 5</a>
            <a href="#mc"> Mitigating circumstances</a>
         </div>

         <div className="content">
            <h1 id="about" className="h1Style">
               What is this tool about?
            </h1>
            This application is based on the updated methodology for assessing the severity of personal data
            breaches developed by the data protection authorities in Greece and Germany in cooperation with
            ENISA. Through an assessor's answers to questions about the data in the breach, the severity of
            the data breach is determined, and the assessor is given suggestions on actions to take according
            to the GDPR (and AVG). Below you can find a step-by-step guide with explanations on how to do an
            assessment using this application.
            <h1 id="step1" className="h1Style">
               Step 1
            </h1>
            <h2 id="assessor">The assessor an date of data breach</h2>
            To start an assessment, you must fill in information about yourself, such as full name and
            employee number, and information regarding the data breach such as incident number from *** and
            the date from when the first person within the organization got aware of the data breach. The date
            determines how much time one has left to notify the breach to the supervisory authorities.
            <h1 id="step2" className="h1Style">
               Step 2
            </h1>
            <h2 id="data">The type of data and circumstances (data processing context)</h2>
            The first four drop-down menus are questions about the type of personal data involved in the data
            breach. The data must be classified into at least one of the four categories: simple, behavioral,
            financial, and sensitive data. Below you will find a list of data types within each category. The
            list is not exhaustive; however, most data involved in real cases can be matched to at least one
            of the categories. Credentials are not considered a specific category of data and should be
            handled based on the type of data processed by the systems they provide access to.
            <br></br>
            <br></br>
            The application will calculate a score within each drop-down based on your answers regarding the
            contextual factors. The contextual factors can be data volume, special characteristics of the
            controllers or the individuals, invalidity/inaccuracy of data, public availability (before the
            breach), nature of data etc. <br></br>The highest score will then be used for further
            calculations.
            <br></br>
            <br></br>
            <h2 id="simpleData">Simple data</h2>
            <li>Biographical data (date of birth, gender, age ..)</li>
            <li>Contact details (telephone number, social media, e-mail address ..) </li>
            <li>Full name</li>
            <li>Data on education ()</li>
            <li>Familiy life (children, marriage, partner, siblings, parents .. )</li>
            <li>Professional experience</li>
            <br></br>
            
            <h2 id="behavorialData">Behavioral data</h2>
            <li>Location (IP-address, travel history)</li>
            <li>
               Traffic data (browsing activity, cookies, e-mail correspondence, telephone history, chat logs)
            </li>
            <li>Data on personal preferences</li>
            <li>Data on habits (search behaviour, app usage and activity, purchase, complaints) </li>
            <br></br>
            <h2 id="financialData">Financial data</h2>
            <li>Income</li>
            <li>Financial transactions </li>
            <li>Bank statements </li>
            <li>Investments </li>
            <li>Credit card information</li>
            <li>Invoices</li>
            <li>Social welfare data </li>
            <br></br>
            <h2 id="sensitiveData">Sensitive data</h2>
            <li>Health data</li>
            <li>Political affiliation/opinion</li>
            <li>Racial or ethnic origin</li>
            <li>Religious or philosophical beliefs</li>
            <li>Trade union membership</li>
            <li>Genetic data</li>
            <li>Biometric data</li>
            <li>Sex life or sexual orientation</li>
            <h1 id="step3" className="h1Style">
               Step 3
            </h1>
            <h2 id="eoi">Ease of identification</h2>
            This part of the assessment is to evaluate how easy it is to identify an individual based on the
            data in the breach. <br></br>
            Neglible is chosen if it is extremely difficult to match the data to a particular person, but
            under certain conditions it could be possible.
         </div>
      </div>
   );
};

export default Aboutpage;
