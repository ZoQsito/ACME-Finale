import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import {Suspense, useRef} from 'react'
import {Canvas , useFrame} from '@react-three/fiber'
import {OrbitControls, useGLTF} from '@react-three/drei'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import adidashome from "../images/adidashome.png"
import adidashome2 from "../images/adidashome2.png"
import rondhome from "../images/rondhome.png"
import "../../styles/HomePage.css"


const HomePage = (props) => {
  const [image, setImage] = useState("https://i.goopics.net/2tslag.png");

  const handleClick = () => {
    setImage("https://i.goopics.net/2tslag.png");
  };

  const handleClick2 = () => {
    setImage("https://i.goopics.net/yqbljc.png");
  };

    const [basket, setBasket] = useState([]);
    const[products, setProducts] = useState([]);
  
    const [cartCount, setCartCount] = useState(0);

    function handleAddToCart() {
      setCartCount(cartCount + data);
      setCartIcon(cartIconFull);
    }
  
    useEffect(() => {
      Axios.get("http://127.0.0.1:8000/api/produits").then((res) => {
        setProducts(res.data["hydra:member"]);
    });
    },[]);
    console.log(products)
  

  return (
    <section className='home-page-container'>
    <div className='logo-container'>
    <img className='image-home' src={image} alt="image" />
    <img className='rondhome' src={rondhome} alt='rond'/>
    </div>
    <div>
      <h1 className='titlehome'>NOUVELLES SORTIES</h1>
      <p className='typehome'>Sneakers</p>
      <blockquote className='deschome'>
      Nous sommes fiers de vous présenter notre collection de chaussures de sport haut de gamme, conçue avec les meilleurs matériaux pour offrir une expérience de confort et de performance inégalée.
Notre équipe de designers a travaillé sans relâche pour créer des designs uniques et audacieux, tout en veillant à ce que chaque paire de chaussures soit fonctionnelle et durable.
<br />
<br />
Que vous soyez un athlète professionnel cherchant à améliorer vos performances, ou simplement un amateur de sneakers à la recherche d'une paire de chaussures confortables pour vos activités quotidiennes, nous avons ce qu'il vous faut.
      </blockquote>
    </div>
    <div className='liste-deroulante-home'>
      <tr>
          <button className='liste-deroulante-une' onClick={handleClick}>01</button>
      </tr>
      <tr>
      <button onClick={handleClick2} className='liste-deroulante-deux'>02</button>
      </tr>
      <tr>
      <p className='liste-deroulante-trois'>03</p>
      </tr>
      <tr>
      <p className='liste-deroulante-quatre'>04</p>
      </tr>
    </div>
   
    <div className="prix-product">
        {products?.map((product) => (
          <div className="card" key={product.id}>
            <h2>{product.nom}</h2>
            <div className="price">${product.prix}</div>
          </div>
        ))}
      </div>
    </section>
    );
    }
 
export default HomePage;