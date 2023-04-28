import React, {useContext, useEffect, useState} from 'react';
import jwtDecode from "jwt-decode";
import "../../styles/DeliveryStatus.css";
import AuthContext from '../contexts/AuthContext';


const ProgressBar = () => {
  const [step, setStep] = useState(0);
  const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };


  useEffect(() => {
    var token = localStorage.getItem("authToken");

    if (token) {
      var decodedToken = jwtDecode(token);
      if (decodedToken.roles[0] === "ADMIN") {
        setIsAdmin(true);
      }
    }
  }, [isAuthenticated]);

  return (
    <div className="container">
      <h1 className="">Status de la commande</h1>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="progress">
            <div
              className={`progress-bar ${
                step >= 0 ? "bg-success" : "bg-secondary"
              }`}
              role="progressbar"
              style={{ width: "25%" }}
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              Commande Validé
            </div>
            <div
              className={`progress-bar ${
                step >= 1 ? "bg-success" : "bg-secondary"
              }`}
              role="progressbar"
              style={{ width: "25%" }}
              aria-valuenow="50"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              Commande expedier
            </div>
            <div
              className={`progress-bar ${
                step >= 2 ? "bg-success" : "bg-secondary"
              }`}
              role="progressbar"
              style={{ width: "25%" }}
              aria-valuenow="75"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              En cours de livraison
            </div>
            <div
              className={`progress-bar ${
                step >= 3 ? "bg-success" : "bg-secondary"
              }`}
              role="progressbar"
              style={{ width: "25%" }}
              aria-valuenow="100"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              Commande livré
            </div>
          </div>
          <div className="btnStep button-group mt-4">
            {isAdmin && (
              <div>
                <button
                  className="btn btn-secondary mr-2"
                  onClick={handlePreviousStep}
                  disabled={step === 0}
                >
                  Previous Step
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleNextStep}
                  disabled={step === 3}
                >
                  Next Step
                </button>
              </div>
            )}
          </div>
        </div>
        {step === 2 ? (
          <iframe
            style={{ width: "1000px", height: "300px", padding: "20px" }}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10122.737637080592!2d3.0572728014564885!3d50.63297923233601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c2d59a2b3fa653%3A0x1aaf5c625712dace!2sLille-Centre%2C%20Lille!5e0!3m2!1sfr!2sfr!4v1681206548215!5m2!1sfr!2sfr"
          ></iframe>
        ) : null}
      </div>
    </div>
  );
};

export default ProgressBar;
