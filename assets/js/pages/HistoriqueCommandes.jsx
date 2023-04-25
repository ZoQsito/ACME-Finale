import React, { Component } from 'react';
import axios from 'axios';
import "../../styles/historique.css";

class HistoriqueCommandes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      commandes: []
    };
  }

  componentDidMount() {
    axios.get('/api/commandes').then((res) => {
      this.setState({ commandes: res.data });
    });
  }

  render() {
    const { commandes } = this.state;

    return (
      <div className='historique-page-container'>
        <h2>Historique des Commandes</h2>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nom</th>
              <th>Adresse</th>
              <th>Quantité</th>
            </tr>
          </thead>
          <tbody>
            {commandes.map((commande) => (
              <tr key={commande.id}>
                <td>{commande.id}</td>
                <td>{commande.nom}</td>
                <td>{commande.adresse}</td>
                <td>{commande.quantite}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default HistoriqueCommandes;