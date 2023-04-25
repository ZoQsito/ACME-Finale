import Axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import Field from "../components/forms/Field";
import usersAPI from "../services/usersAPI";

const RegisterPage = ({ history }) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const apiErrors = {};
    if (user.password !== user.passwordConfirm) {
      apiErrors.passwordConfirm =
        "Votre Confirmation de Mot de Passe n'est pas comforme avec le Mot de Passe";
      setErrors(apiErrors);
      toast.error("Des erreurs dans votre Formulaire !😠", {
        position: "bottom-center",
        });
      return;
    }

    try {
      await usersAPI.register(user);
      setErrors({});
      toast.success("Vous êtes Désormais Inscrit !😄", {
        position: "bottom-center",
        });
      history.replace("/login");
    } catch (error) {
      console.log(error.response);

      const { violations } = error.response.data;

      if (violations) {
        violations.forEach((violations) => {
          apiErrors[violations.propertyPath] = violations.message;
        });
        setErrors(apiErrors);
      }
      toast.error("Des erreurs dans votre Formulaire !😠", {
        position: "bottom-center",
        });
    }
  };

  return (
    <>
      <h1>Inscription</h1>

      <form onSubmit={handleSubmit}>
        <Field
          name="firstName"
          label="Prénom"
          placeholder="Votre Prénom"
          error={errors.firstName}
          value={user.firstName}
          onChange={handleChange}
        />
        &nbsp;
        <Field
          name="lastName"
          label="Nom"
          placeholder="Votre Nom"
          error={errors.lastName}
          value={user.lastName}
          onChange={handleChange}
        />
        &nbsp;
        <Field
          name="email"
          label="Email"
          placeholder="Votre Email"
          error={errors.email}
          value={user.email}
          onChange={handleChange}
        />
        &nbsp;
        <Field
          name="password"
          type="password"
          label="Password"
          placeholder="Votre Mot de Passe"
          error={errors.password}
          value={user.password}
          onChange={handleChange}
        />
        &nbsp;
        <Field
          name="passwordConfirm"
          type="password"
          label="PasswordConfirm"
          placeholder="Comfirmer votre Mot de Passe"
          error={errors.passwordConfirm}
          value={user.passwordConfirm}
          onChange={handleChange}
        />
        &nbsp;
        <div className="mb-5 mt-4 form-group">
          <button type="submit" className="btn btn-outline-success">
            Inscription
          </button>
          <Link to="/login" className="btn btn-link">
            J'ai Déjà un Compte
          </Link>
        </div>
      </form>
    </>
  );
};

export default RegisterPage;
