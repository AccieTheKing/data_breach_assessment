import './style.css';

export enum FOOTER_CONTENT {
   RESULT,
   ASSESSMENT,
}

interface FooterProps {
   forPage: FOOTER_CONTENT;
}

// Footer content for the result page
const ResultPageFooterContent = (
   <div className="row">
      <div className="col-12 col-lg-2 offset-lg-10">
         <div className="button-container">
            <button className="btn footer-button" type="submit">
               Export
            </button>
         </div>
      </div>
   </div>
);

const Footer: React.FC<FooterProps> = ({ forPage }) => {
   return (
      <footer className="container-fluid" id="app-footer">
         {forPage === FOOTER_CONTENT.RESULT ? ResultPageFooterContent : ''}
      </footer>
   );
};

export default Footer;
