import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../../styles/historique.css';
import { NavLink } from "react-router-dom";


const HistoriqueCommandes = () => {
  const [commandes, setCommandes] = useState([]);

  useEffect(() => {
    Axios.get('http://127.0.0.1:8000/api/historique_commandes').then((res) => {
      setCommandes(res.data['hydra:member']);
    });
  }, []);

  return (
    <div className='historique-page-container'>
      <h2>Historique des Commandes</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>#</th>
            <th>Référence</th>
            <th>Quantité Article</th>
            <th>Prix Total</th>
            <th>Date Achat</th>
          </tr>
        </thead>
        <tbody>
          {commandes.map((commande) => (
            <tr key={commande.id}>
              <td>{commande.id}</td>
              <td>{commande.reference}</td>
              <td>{commande.qteProduit}</td>
              <td>{commande.prixTotal}€</td>
              <td>{new Date(commande.dateAchat).toLocaleDateString('fr-FR')}</td>
              <td>
                <NavLink className="nav-link" to="/deliverystatus">Suivre</NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoriqueCommandes;