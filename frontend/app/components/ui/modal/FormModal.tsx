"use client";
import React from "react";
import PopBtn from "../btn/PopBtn";

const FormModal = () => {
  return (
    <section className="formModal" style={{ backgroundColor: "white" }}>
      <PopBtn
        className="btn__secondary"
        showModal={false}
        text="close"
        whichModal="formModal"
      />
      <div className="formModal__container">
        <div className="formModal__header">
          <h2>Formulario de contacto</h2>
          <button className="btn btn--close">X</button>
        </div>
        <form className="formModal__form">
          <label htmlFor="name">Nombre</label>
          <input type="text" id="name" name="name" required />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="message">Mensaje</label>
          <textarea id="message" name="message" required></textarea>

          <button type="submit" className="btn btn--submit">
            Enviar
          </button>
        </form>
      </div>
    </section>
  );
};

export default FormModal;
