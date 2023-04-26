import React, { useEffect, useState } from "react";
import Axios from "axios";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import "../../styles/panier.css";
import { toast } from "react-toastify";

const Panier = (props) => {
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    Axios.get("http://127.0.0.1:8000/api/paniers").then((res) => {
      setBasket(res.data["hydra:member"]);
    });
  }, []);

  const handleDelete = async (id, data) => {
    const originalProduct = [...basket];
    console.log(data.id);

    setBasket(basket.filter((basket) => basket.id !== id));

    try {
      await Axios.delete("http://127.0.0.1:8000/api/paniers/" + data.id);

      const{quantite} = data;

      const stockupdate = {
      quantite : quantite + 1,
    }
    Axios.put("http://127.0.0.1:8000/api/produits/" + data.id_produit, stockupdate)

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
            {basket.map((data) => (
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
            ))}
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
        <button className="btn btn-primary">Passer commande</button>
      </div>
    </>
  );
};

export default Panier;