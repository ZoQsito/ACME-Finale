import React, { useEffect, useState } from "react";
import Axios from "axios";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import "../../styles/panier.css";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";

const Panier = (props) => {
  const [basket, setBasket] = useState([]);
  const dateAchat = new Date().toISOString();
  const [totalPanier, setTotalPanier] = useState();
  const [referenceCommande, setReferenceCommande] = useState(
    Math.floor(Math.random() * 200000) + 100000
  );
  const [emailUser, setEmailUser] = useState();

  useEffect(() => {
    Axios.get("http://127.0.0.1:8000/api/paniers").then((res) => {
      setBasket(res.data["hydra:member"]);
      setTotalPanier(res.data["hydra:totalItems"]);
    });

    var token = localStorage.getItem("authToken");

    if (token) {
      var decodedToken = jwtDecode(token);
      setEmailUser(decodedToken.username);
    }
  }, []);

  console.log(basket[0]);

  const handleDelete = async (id, data) => {
    const originalProduct = [...basket];
    console.log(data.id);

    setBasket(basket.filter((basket) => basket.id !== id));

    try {
      await Axios.delete("http://127.0.0.1:8000/api/paniers/" + data.id);

      const { quantite } = data;

      const stockupdate = {
        quantite: quantite + 1,
      };
      Axios.put(
        "http://127.0.0.1:8000/api/produits/" + data.id_produit,
        stockupdate
      );

      toast.success("Le Produit a bien été supprimé");
    } catch (error) {
      setBasket(originalProduct);
      toast.error("La suppression du Produit n'a pas pu fonctionner");
    }
  };

  const totalPrice = basket.reduce(
    (total, item) => total + item.prix_produit * item.quantite,
    0
  );

  function handleCommande(
    totalPrice,
    dateAchat,
    referenceCommande,
    totalPanier
  ) {
    const cardInfo = {
      qteProduit: totalPanier,
      PrixTotal: totalPrice,
      dateAchat: dateAchat,
      reference: referenceCommande,
    };
    console.log(cardInfo);
    Axios.post("http://127.0.0.1:8000/api/historique_commandes", cardInfo);
    toast.success("La Commande a bien été ajouté", {
      position: "bottom-center",
    });
  }

  return (
    <>
      <div id="panier-container">
        <h1>Panier</h1>
        <table>
          <thead>
            <tr>
              <th>Produit</th>
              <th>Prix</th>
              <th>Quantité</th>
              <th>Total</th>
              <th>Supprimer</th>
            </tr>
          </thead>
          <tbody>
            {basket.map((data) => {
              if (data.email === emailUser) {
                return (
                  <tr key={data.id}>
                    <td>{data.nom_produit}</td>
                    <td>{data.prix_produit}€</td>
                    <td>{data.quantite}</td>
                    <td>{data.prix_produit * data.quantite}€</td>
                    <td className="center">
                      <button
                        onClick={() => handleDelete(data.id, data)}
                        className="Add btn1 w-30"
                      >
                        -
                      </button>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3">Total Panier</td>
              <td>{totalPrice}€</td>
            </tr>
          </tfoot>
        </table>
        <button className="btn btn-primary">
          <NavLink className="nav-link" to="/shop">
            Continuer les achats
          </NavLink>
        </button>
        <NavLink className="nav-link" to="/historique">
          <button
            id="button1"
            onClick={() =>
              handleCommande(
                totalPrice,
                dateAchat,
                referenceCommande,
                totalPanier
              )
            }
          >
            Passer Commande
          </button>
        </NavLink>
      </div>
    </>
  );
};

export default Panier;
