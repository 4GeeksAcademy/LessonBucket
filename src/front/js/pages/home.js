import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import dashboardImageUrl from "../../img/dashboard.jpg";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div>
      {/* Title and preview section */}

      <div className="container d-flex mt-5">
        <div className="row">
          <h1>Tagline with your Unique selling proposition</h1>
          <p>
            lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec
            purus feugiat, molestie ipsum et,
          </p>
          <button
            type="button"
            style={{ height: "40px" }}
            class="btn btn-primary w-25 me-2"
          >
            Primary
          </button>
          <button
            type="button"
            style={{ height: "40px" }}
            class="btn btn-secondary w-25"
          >
            Secondary
          </button>
        </div>
        <div className="row">
          <img src={dashboardImageUrl} alt="preview dashboard" />
        </div>
      </div>
      <hr />

      {/* Features section */}

      <div className="container d-flex mt-5 justify-content-evenly">
        <div className="row text-center" style={{ width: "300px" }}>
          <i class="fa-solid fa-check"></i>
          <h2>Gestion centralizada</h2>
          <p>
            Controla todas tus notas, comentarios, alumnos, fechas de clase y
            cualquier otra cosa que puedas necesitar desde el mismo sitio!
          </p>
        </div>
        <div className="row text-center" style={{ width: "300px" }}>
          <i class="fa-solid fa-flag"></i>
          <h2>Sincroniza con Google Calendar</h2>
          <p>
            Visualiza tus clases gracias a la implementacion de google calendar.
          </p>
        </div>
        <div className="row text-center" style={{ width: "300px" }}>
          <i class="fa-solid fa-star"></i>
          <h2>Control de Pagos</h2>
          <p>Registro visual y sencillo para llevar los pagos al día.</p>
        </div>
      </div>

      {/* Main benefit section */}

      <div className="container d-flex mt-5">
        <div className="row">
          <h1>Heading explaining the main benefit of your app</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ultrices
            nisl est, a mollis urna tincidunt a. Etiam ex ligula, bibendum id
            tincidunt sed, rutrum eu est. Aenean porttitor gravida velit, ac
            pretium augue luctus et. Curabitur cursus arcu eget quam dapibus
            feugiat. Donec est elit, elementum sed nibh vel, gravida pretium
            tortor. Fusce rhoncus semper faucibus. Vivamus pharetra eget nisi
            gravida malesuada. Orci varius natoque penatibus et magnis dis
            parturient montes, nascetur ridiculus mus. Nam a mollis augue.
          </p>
        </div>

        <div className="row"></div>
      </div>
    </div>
  );
};
