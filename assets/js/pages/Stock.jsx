import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../../styles/Stock.css"


function Stock() {

  const[products, setProducts] = useState([]);

  useEffect(() => {
    Axios.get("http://127.0.0.1:8000/api/produits").then((res) => {
      setProducts(res.data["hydra:member"]);
  })
  },[]);
  const img = 'https://placehold.it/300x200';
  console.log(products)

  const handleDelete = async (id) => {
    const originalProduct = [...products];

    setProducts(products.filter((products) => products.id !== id));

    try {
      await Axios
      .delete("http://127.0.0.1:8000/api/produits/" + id)
      toast.success("Le Produit a bien été supprimé", {
        position: "bottom-center",
        });
    } catch (error) {
      setProducts(originalProduct);
      toast.error("La suppression du Produit n'a pas pu fonctionner", {
        position: "bottom-center",
        });
    }
  };

  return (
    <div id="BudgetAdmin">
        <div className="page-header align-items-start min-vh-50 pt- pb-10 m-3 border-radius-lg montserrat">
          <h1 className="text-align-center">Gérer la page Budget</h1>

          <div className="table table-striped">
            <table className="table align-items-center mb-0">
              <thead>
                <tr className='tr-stock'>
                  <th>ID</th>
                  <th>Nom</th>
                  <th>Prix</th>
                  <th>Référence</th>
                  <th>Quantité</th>
                  <th>Modification</th>
                  <th>Suppression</th>
                </tr>
              </thead>

              <tbody>
                {products.map((data) => (
                  <tr key={data.id}>
                    <td>{data.id}</td>
                    <td>{data.nom}</td>
                    <td>${data.prix}</td>
                    <td>{data.reference}</td>
                    <td>{data.quantite}</td>
                    <td>
                      <Link to={"/Stock/" + data.id}>
                        <button className="Add btn1 w-85 my-4 mb-2 montserrat">
                          +
                        </button>
                      </Link>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(data.id)}
                        className="Add btn1 w-85 my-4 mb-2 montserrat"
                      >
                        -
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link to="/Stock/new">
              <button className="Add btn1 w-85 my-4 mb-2 montserrat">
                Créer un Produit
              </button>
            </Link>
          </div>
        </div>
      </div>
  );
}

export default Stock;