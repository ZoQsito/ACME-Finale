import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import "../../styles/Stock.css"


const Stock = ({history}) => {

  const[products, setProducts] = useState([]);

  useEffect(() => {
    Axios.get("http://127.0.0.1:8000/api/produits").then((res) => {
      setProducts(res.data["hydra:member"]);
  })
  },[]);

  const handleDelete = async (id) => {
    const originalProduct = [...products];

    setProducts(products.filter((products) => products.id !== id));

    try {
      await Axios
      .delete("http://127.0.0.1:8000/api/produits/" + id)
      toast.success("Le Produit a bien été supprimé");
    } catch (error) {
      setProducts(originalProduct);
      toast.error("La suppression du Produit n'a pas pu fonctionner");
    }
  };

  return (
    <div id="Stock">
        <div className="page-header align-items-start min-vh-50 pt- pb-10 m-3 border-radius-lg montserrat">
          <h1 className="text-align-center">Gérer la page Shop</h1>

          <div className="table table-striped">
            <table className="table align-items-center mb-0">
              <thead>
                <tr>
                  <th className='center'>ID</th>
                  <th className='center'>Nom</th>
                  <th className='center'>Prix</th>
                  <th className='center'>Référence</th>
                  <th className='center'>Quantité</th>
                  <th className='center'>Modification</th>
                  <th className='center'>Suppression</th>
                </tr>
              </thead>

              <tbody>
                {products.map((data) => (
                  <tr key={data.id}>
                    <td className='center'>{data.id}</td>
                    <td className='center'>{data.nom}</td>
                    <td className='center'>{data.prix}€</td>
                    <td className='center'>{data.reference}</td>
                    <td className='center'>{data.quantite}</td>
                    <td className='center'>
                      <Link to={"/Stocks/" + data.id}>
                        <button className="Add btn1 w-85 my-4 mb-2 montserrat">
                          +
                        </button>
                      </Link>
                    </td>
                    <td className='center'>
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
            <Link to="/Stocks/new">
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