import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Field from "../components/forms/Field";


const Stocks = ({ match, history }) => {
  const { id = "new" } = match.params;

  const [products, setProducts] = useState({
    nom: "",
    prix: "",
    reference: "",
    quantite: "",
    photo: "",
  });

  const [errors, setErrors] = useState({
    nom: "",
    prix: "",
    reference: "",
    quantite: "",
    photo: "",
  });

  const [editing, setEditing] = useState(false);


  const fetchproduit = async (id) => {
    try {
      const { nom, prix, reference, quantite, photo } = await Axios.get("http://127.0.0.1:8000/api/produits/"+ id)
      setProducts({ nom, prix, reference, quantite, photo });
    } catch (error) {
      toast.error("Le produit n'a pas pu être chargé");
      console.log(products)
    }
  };

  console.log(products)

  useEffect(() => {
    if (id !== "new") {
      setEditing(true);
      fetchproduit(id);
      Axios.get("http://127.0.0.1:8000/api/produits/" + id).then((res) => {
      setProducts({
        nom : res.data.nom,
        prix : res.data.prix,
        reference : res.data.reference,
        quantite: res.data.quantite,
        photo: res.data.photo,
      });
    })
    }
  }, [id]);


  //Gestion des changements des inputs dans le formulaire
  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setProducts({ ...products, [name]: value });
  };

  //Gestion de la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setErrors({});

      if (editing) {
        products.prix = parseInt(products.prix);
        products.reference = parseInt(products.reference);
        products.quantite = parseInt(products.quantite);
        await Axios.put("http://127.0.0.1:8000/api/produits/"+id, products)
        toast.success("Le Produit a bien été modifié");
        history.replace("/Stock")
      } else {
        products.prix = parseInt(products.prix);
        products.reference = parseInt(products.reference);
        products.quantite = parseInt(products.quantite);
        await Axios.post("http://127.0.0.1:8000/api/produits", products)
        toast.success("Le Produit a bien été crée");
        history.replace("/Stock")
      }
    } catch ({ response }) {
      const { violations } = response.data;

      if (violations) {
        const apiErrors = {};
        violations.forEach(({ propertyPath, message }) => {
          apiErrors[propertyPath] = message;
        });
        setErrors(apiErrors);
        toast.error("Des erreurs dans votre formulaire !");
      }
    }
  };

  return (
    <>
      <div id="Budgets_content">
        {(!editing && <h1>Création d'un Produit</h1>) || (
          <h1>Modification du Produit</h1>
        )}

        <form onSubmit={handleSubmit}>
          <div>
            <Field
              name="nom"
              label="Nom"
              type="text"
              placeholder="Nom"
              value={products.nom}
              onChange={handleChange}
              error={errors.nom}
            />
            &nbsp;
            <Field
              name="prix"
              label="Prix"
              placeholder="Prix"
              type="number"
              value={products.prix}
              onChange={handleChange}
              error={errors.prix}
            />
            &nbsp;
            <Field
              name="reference"
              label="Reference"
              type="number"
              placeholder="Référence du produit"
              value={products.reference}
              onChange={handleChange}
              error={errors.reference}
            />
            &nbsp;
            <Field
              name="quantite"
              label="Quantite"
              type="number"
              placeholder="Quantité"
              value={products.quantite}
              onChange={handleChange}
              error={errors.quantite}
            />
            &nbsp;
            <Field
              name="photo"
              label="Photo"
              type="text"
              placeholder="Url Photo"
              value={products.photo}
              onChange={handleChange}
              error={errors.photo}
            />
          </div>
          &nbsp;
          <div className="form-group">
            <button type="submit" className="btn btn-success">
              Enregistrer
            </button>
            <Link to="/Stock" className="btn btn-link">
              Retour à la liste
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Stocks;