import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import "../../styles/shoppage.css";
import Navbar from '../../js/components/Navbar';
import handleAddToCart from '../../js/components/Navbar';
import cartIconEmpty from '../../js/components/images/cart-icon-empty.png';
import cartIconFull from '../../js/components/images/cart-icon-full.png';
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import authAPI from '../services/authAPI';


function ShopPage() {

  const [basket, setBasket] = useState([]);
  const[products, setProducts] = useState([]);

  const [cartCount, setCartCount] = useState(0);
  const [emailUser, setEmailUser] = useState();
  

  const [isAuthenticated, setIsAuthenticated] = useState(
    authAPI.isAuthenticated()
  );

  const data = basket.map((data) => data.quantite > 1);

  function handleAddToCart() {
    setCartCount(cartCount + data);
    setCartIcon(cartIconFull);
  }

  useEffect(() => {
    Axios.get("http://127.0.0.1:8000/api/produits").then((res) => {
      setProducts(res.data["hydra:member"]);
  });
      Axios.get("http://127.0.0.1:8000/api/paniers").then((res) => {
      setBasket(res.data["hydra:member"]);
    });

    var token = localStorage.getItem("authToken");

    if (token) {
      var decodedToken = jwtDecode(token);
      setEmailUser(decodedToken.username)
    }

  },[]);


  function handleBuyClick(product, emailUser) {
    const { id, nom , prix, reference} = product;
    const cardInfo = {
      quantite: 1,
      idProduit: id,
      nomProduit: nom,
      prixProduit: prix,
      referenceProduit: reference,
      email: emailUser,
    };
    console.log(cardInfo);
    Axios.post("http://127.0.0.1:8000/api/paniers", cardInfo)
    toast.success("Le Produit a bien été ajouté", {
      position: "bottom-center",
      });
  
  }

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
    <div className="marketplace">
      <h1>Bienvenue sur notre marketplace</h1>

      <div className='shop'>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            {basket.length > 0 ?
              <NavLink className="nav-link" to="/panier"><img className='panier-logo'  src={cartIconFull} alt="Logo panier plein" /></NavLink> : 
              <NavLink className="nav-link" to="/panier"><img className='panier-logo'  src={cartIconEmpty} alt="Logo panier vide"/></NavLink>
            }
          </li>
        </ul>
    </div>
      

      <div className="card-container">
        {products.map((product) => (
          <div className="card" key={product.id}>
            <img src={product.photo} alt={product.nom} />
            <h2>{product.nom}</h2>
            <div className="price">${product.prix}</div>
            {isAuthenticated && (
              <button id="button1" onClick={() => handleBuyClick(product, emailUser)}>
                Acheter
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShopPage;