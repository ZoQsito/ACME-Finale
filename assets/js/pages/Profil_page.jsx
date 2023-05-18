import React, { useEffect, useState } from "react";
import Axios from "axios";
import jwtDecode from "jwt-decode";
import "../../styles/ProfilePage.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";


const ProfilePage = () => {
  const [profil, setProfil] = useState([]);
  const [emailUser, setEmailUser] = useState();

  useEffect(() => {
    Axios.get("http://127.0.0.1:8000/api/users")
      .then((res) => {
        setProfil(res.data["hydra:member"]);
      })
      .catch((error) => {
        console.log(error);
      });

    var token = localStorage.getItem("authToken");
    if (token) {
      var decodedToken = jwtDecode(token);
      setEmailUser(decodedToken.username);
    }
  }, []);

  console.log(profil);

  const filteredProfile = profil.filter((data) => data.email === emailUser);

  return (
    <div className="profile-container">
      <h1>Page de profil</h1>
      {filteredProfile.map((data) => (
        <div key={data.id} className="profile-card">
          <p className="profile-info">Nom : {data.lastName}</p>
          <p className="profile-info">Prénom : {data.firstName}</p>
          <p className="profile-info">Email : {data.email}</p>
        </div>
      ))}
      <div>
        <NavLink className="nav-link" to="/historique">
          <button className="bouton-historique">Consulter mon historique de commande</button>
        </NavLink>
      </div>
    </div>
  );
};

export default ProfilePage;