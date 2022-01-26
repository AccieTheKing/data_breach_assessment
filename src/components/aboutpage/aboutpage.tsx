import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Nav';
import './style.css';

//Aboutpage: Serves for giving information and tips about the tool.
const Aboutpage = () => {
   const location = useLocation();

   //activeClass: This function marks the selected step in the sidebar in orange. This is executed as an onClick function within the sidebar.
   function activeClass(e: any) {
      const active = document.querySelector('#side a.active')!;
      if (active !== null) {
         active.classList.remove('active');
      }
      e.target.className = 'active';
   }

   function scrollFunction(id: string) {
      const el = document.querySelector(id);
      el && el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
   }

   useEffect(() => {
      if (location.hash) scrollFunction(location.hash);
   }, [location]);

   return (
      <div id="about">
         <Navbar></Navbar>

         <br></br>
         <div className="sidebar" id="side" onClick={activeClass}>
            <br></br>
            <a href="#about">About</a>

            <a href="#assessor">Step 1: Assessor and date</a>

            <a href="#data">Step 2: Data processing context</a>
            <a href="#simple_data">&nbsp; • Simple data</a>
            <a href="#behavioural_data">&nbsp; • Behavioural data</a>
            <a href="#financial_data">&nbsp; • Financial data</a>
            <a href="#sensitive_data">&nbsp; • Sensitive data</a>

            <a href="#ease_of_identification">Step 3: Ease of identification</a>

            <a href="#aggravating_circumstances_of_breach">Step 4: Aggravating circumstances</a>

            <a href="#mitigating_circumstances_of_breach">Step 5: Mitigating circumstances</a>

            <a href="#dc">Step 6: Draft or calculate score?</a>

            <a href="#sl">Step 7: Results: SL and actions</a>
         </div>

         <div id="about" className="content">
            <h1 id="about" className="h1Style">
               What is this tool about?
            </h1>
            <p>
               This application is based on the updated methodology for assessing the severity of personal
               data breaches developed by the Data Protection Authorities in Greece and Germany in cooperation
               with ENISA. Through an assessor's answers to questions regarding the data in a breach, the
               severity level of the data breach is determined, and the assessor is given suggestions on
               actions to take according to the GDPR (and AVG).{' '}
            </p>
            <h1 id="assessor" className="h1Style">
               Step 1
            </h1>
            <h2 id="assessor">The assessor and the data breach date</h2>
            <p>
               To start an assessment, you need to fill in information about yourself, your full name, and
               information about the data breach, event number, and date of the breach. The date is from when
               the first person in your organization became aware of the data breach. The date determines how
               much time is left to notify the supervisory authorities if it needs to be notified.
            </p>

            <h1 id="data" className="h1Style">
               Step 2
            </h1>
            <h2 id="data">Data processing context (DPC)</h2>
            <p>
               The first four drop-down menus are questions about the type of personal data involved in the
               data breach. The data must be classified into at least one of the four categories: simple,
               behavioral, financial, and sensitive data. Below you will find a list of data types within each
               category. The list is not exhaustive; however, most data involved in real cases can be matched
               to at least one of the categories. Credentials are not considered a specific category of data
               and should be handled based on the type of data processed by the systems they provide access
               to.
               <br></br>
               <br></br>
               The application will calculate a score within each drop-down based on your answers regarding
               the contextual factors. The contextual factors can be data volume, special characteristics of
               the controllers or the individuals, invalidity/inaccuracy of data, public availability (before
               the breach), nature of data etc.
               <br></br> <br></br>
               <img
                  className="tblImage"
                  src="./picDPC.png"
                  alt="The first four dropdown menus"
               />
               <br></br> <br></br>
               The highest score will then be used for further calculations.
            </p>
            <br></br>
            <h2 id="simple_data">Simple data</h2>
            <li>Biographical data (date of birth, gender, age)</li>
            <li>Contact details (telephone number, social media, e-mail address) </li>
            <li>Full name</li>
            <li>Data on education</li>
            <li>Familiy life (children, marriage, partner, siblings, parents)</li>
            <li>Professional experience</li>
            <br></br>
            <h2 id="behavioural_data">Behavioral data</h2>
            <li>Location (IP-address, travel history)</li>
            <li>
               Traffic data (browsing activity, cookies, e-mail correspondence, telephone history, chat logs)
            </li>
            <li>Data on personal preferences</li>
            <li>Data on habits (search behaviour, app usage and activity, purchase, complaints) </li>
            <br></br>
            <h2 id="financial_data">Financial data</h2>
            <li>Income</li>
            <li>Financial transactions </li>
            <li>Bank statements </li>
            <li>Investments </li>
            <li>Credit card information</li>
            <li>Invoices</li>
            <li>Social welfare data </li>
            <h2 id="sensitive_data">Sensitive data</h2>
            <li>Health data</li>
            <li>Political affiliation/opinion</li>
            <li>Racial or ethnic origin</li>
            <li>Religious or philosophical beliefs</li>
            <li>Trade union membership</li>
            <li>Genetic data</li>
            <li>Biometric data</li>
            <li>Sex life or sexual orientation</li>

            <h1 id="ease_of_identification" className="h1Style">
               Step 3
            </h1>
            <h2 id="ease_of_identification">Ease of identification (EI)</h2>
            <p>
               This part of the assessment evaluates how easy it is to identify an individual based on the
               data in the breach. Four levels of EI (negligible, limited, significant and maximum) has been
               defined with a linear increase in score. <br></br>
               <li>
                  Negligible is when it is extremely difficult to match the data to a particular person, but
                  under certain conditions it could be possible.<br></br>
               </li>
               <li>
                  Maximum is selected when identification is possible directly from the data breached with no
                  special research needed to discover the individual’s identity
               </li>
               <br></br>
               Identification may be directly (e.g. on the basis of a given name) or indirectly (eg. on the
               basis of ID number) possible from the breached data, but may also depend on the specific
               context of the breach. Therefore, certain identifiers may lead to different EI scores according
               to the specific case of the breach.
            </p>

            <h1 id="aggravating_circumstances_of_breach" className="h1Style">
               Step 4
            </h1>
            <h2 id="aggravating_circumstances_of_breach">Aggravating circumstances of breach (CBa)</h2>
            <p>
               The elements considered under CBa are loss of security (confidentiality, integrity,
               availability), malicious intent and the size of the breach and are complementary to DPC and EI.
               Unlike DPC and EI where the maximum score reached is selected, the points obtained for each CBa
               item are added, as different circumstances may occur in the same breach.
               <br></br> <br></br>
               <li>
                  Loss of confidentiality occurs when the information is accessed by parties who are not
                  authorized or do not have a legitimate purpose to access it.
               </li>
               <li>
                  Loss of integrity occurs when the original data has been altered by unauthorized parties or
                  systems.
               </li>
               <li>
                  Loss of availability occurs when the original data cannot be accessed when needed. It can be
                  either temporal (data can be recovered, but it will take time), or permanent (data can not
                  be recovered).
               </li>
               <br></br>
               Malicious intent examines whether the breach was due to an error or mistake, either human or
               technical, or it was caused by an intentional action of malicious intent. Non malicious
               breaches include cases of accidental loss, inadequate disposal, human error and software bug or
               misconfiguration. Malicious breaches include cases of theft and/or hacking that aim to either
               harm individuals or the data controller by disclosing the personal data to third parties or
               selling the personal data for financial gain.
               <br></br>
               <br></br>
               The table below shows examples of data breaches and their loss of security and whether they are
               considered with malicious intent. For the first and last row, the malicious intent must be
               considered within the context of the breach.
               <br></br> <br></br>
               Large number: Examines the number of affected individuals in the breach.
               <br></br>
               <br></br>
               <img
                  className="tblImage"
                  src="./tblCIA.png"
                  alt="Table with breach in confidentialty, integrity, availability and example of malicious intent"
               />
            </p>

            <h1 id="mitigating_circumstances_of_breach" className="h1Style">
               Step 5
            </h1>
            <h2>Mitigating circumstances of breach (CBm)</h2>
            <p>
               The elements assessed under CBm are the specific circumstances of the breach and are custom
               made for NN Non-Life. These are complementary to DPC, EI, and CBa. The points obtained for each
               CBm element are subtracted to achieve the final score, as different extenuating circumstances
               may occur in the same breach.
               <br></br> <br></br>
            </p>

            <h1 id="dc" className="h1Style">
               Step 6
            </h1>
            <h2 id="dc">End of assessment: Draft or Calculate score?</h2>
            <p>
               When all fields have been answered the “Calculate Score”-button will be enabled. If there is
               still some uncertainty to parts of the assessment or data breach, and you would like to finish
               later, then the “Draft”-button will make a draft so the assessment can be finished on a later
               occasion. But be sure to not let too much time go by, as some cases require notification to the
               supervisory authority and communication to affected data subjects without undue delay or within
               72 hours after the awareness of the data breach.<br></br> <br></br>
            </p>

            <h1 id="sl" className="h1Style">
               Step 7
            </h1>
            <h2 id="sl">Results: Severity Level and actions</h2>
            <p>
               When pushing the “Calculate Score”-button the result is revealed with a score between 0 and 4
               that defines the Severity Level. The Severity Level goes from “Insignificant” to “Critical”.
               The risk level refers to how the data breach affects the rights and freedoms of the affected
               individuals. The score can be less than 0 if there have been specific mitigating circumstances.
               The negative number is to ensure the insignificance of the breach. See table below for further
               description on how the different levels may affect the individuals.
               <br></br> <br></br>
               <img
                  className="tblImage"
                  src="./tblConsequences.png"
                  alt="Table that shows how the different severity levels of a breach affect an individuals rights and freedoms"
               />
               <br></br> <br></br>
               Based on the Severity Level, you will be provided with some actions that are in accordance with
               the GDPR. The three types of action the GDPR requires the controller to do are:
               <li>
                  Document any personal data breaches, comprising the facts relating to the personal data
                  breach, its effects and the remedial action taken.
               </li>
               <li>
                  Notify the personal data breach to the supervisory authority within 72 hours from awareness
                  date unless the data breach is unlikely to result in a risk to the rights and freedoms.
               </li>
               <li>
                  Communicate the personal data breach to the data subjects without undue delay if the breach
                  is likely to result in a high risk to their rights and freedoms.
               </li>
               <br></br>
               The diagram below illustrates which actions is to be taken based on the different Severity
               Levels.
               <br></br> <br></br>
               <img
                  className="tblActions tblImage"
                  src="./tblActions.png"
                  alt="Table of severity levels and their actions"
               />
               <br></br> <br></br>
               If you want to use the results of this assessment as part of the documentation, tap "Export" to
               download them as a PDF file.
            </p>

            <br></br>
         </div>
      </div>
   );
};

export default Aboutpage;
