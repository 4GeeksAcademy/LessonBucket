import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import dashboardImageUrl from "../../img/dashboard.jpg";
import placeholderImg from "../../img/placeholder1.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const LoginRedirect = () => {
    let login = "/login";
    navigate(login);
  }
  const LearnMoreRedirect = () => {
    let learnMore = "/LearnMore";
    navigate(learnMore);
  }

  return (
    <div className="whiteText">
      {/* Title and preview section */}

      <div className="container d-flex mt-5 mb-5">
        <div className="row backg me-3 p-4">
          <h1>Tagline with your Unique selling proposition</h1>
          <p>
            lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec
            purus feugiat, molestie ipsum et,
          </p>
          <button
            type="button"
            style={{ height: "40px" }}
            className="btn btn-primary w-25 me-2"
            onClick={() => { LoginRedirect() }}
          >
            Get started!
          </button>
          <button
            type="button"
            style={{ height: "40px" }}
            className="btn btn-secondary w-25"
            onClick={() => { LearnMoreRedirect() }}
          >
            Learn more!
          </button>
        </div>
        <div className="row">
          <img src={dashboardImageUrl} alt="preview dashboard" />
        </div>
      </div>
      <hr />

      {/* Features section */}

      <div className="container d-flex mt-5 mb-4 justify-content-evenly">
        <div className="row text-center backg p-4" style={{ width: "300px" }}>
          <i className="fa-solid fa-check"></i>
          <h2>Gestion centralizada</h2>
          <p>
            Controla todas tus notas, comentarios, alumnos, fechas de clase y
            cualquier otra cosa que puedas necesitar desde el mismo sitio!
          </p>
        </div>
        <div className="row text-center backg p-4" style={{ width: "300px" }}>
          <i className="fa-solid fa-flag"></i>
          <h2>Sincroniza con Google Calendar</h2>
          <p>
            Visualiza tus clases gracias a la implementacion de google calendar.
          </p>
        </div>
        <div className="row text-center backg p-4" style={{ width: "300px" }}>
          <i className="fa-solid fa-star"></i>
          <h2>Control de Pagos</h2>
          <p>Registro visual y sencillo para llevar los pagos al día.</p>
        </div>
      </div>

      {/* Main benefit section */}

      <div className="container d-flex mt-5 justify-content-evenly mb-5">
        <div className="row me-5 backg p-4" style={{ width: "500px" }}>
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
        <div className="row"><img src={placeholderImg} alt="preview dashboard" />
        </div>
      </div>
      <hr />

      {/* Reviews de usuarios */}

      {/* <!-- Carousel wrapper --> */}
      <div
        id="carouselMultiItemExample"
        className="carousel slide carousel-dark text-center my-5 backg"
        data-mdb-ride="carousel"
      >
        {/* <!-- Controls --> */}
        <div className="d-flex justify-content-center mb-4">
          <button
            className="carousel-control-prev position-relative"
            type="button"
            data-mdb-target="#carouselMultiItemExample"
            data-mdb-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next position-relative"
            type="button"
            data-mdb-target="#carouselMultiItemExample"
            data-mdb-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        {/* <!-- Inner --> */}
        <div className="carousel-inner py-4">
          {/* <!-- Single item --> */}
          <div className="carousel-item active">
            <div className="container">
              <div className="row">
                <div className="col-lg-4">
                  <img
                    className="rounded-circle shadow-1-strong mb-4"
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp"
                    alt="avatar"
                    style={{ width: "150px" }}
                  />
                  <h5 className="mb-3">Anna Deynah</h5>
                  <p>Maths Teacher</p>
                  <p className="text-muted">
                    <i className="fas fa-quote-left pe-2"></i>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Quod eos id officiis hic tenetur quae quaerat ad velit ab
                    hic tenetur.
                  </p>
                  <ul className="list-unstyled d-flex justify-content-center text-warning mb-0">
                    <li>
                      <i className="fas fa-star fa-sm"></i>
                    </li>
                    <li>
                      <i className="fas fa-star fa-sm"></i>
                    </li>
                    <li>
                      <i className="fas fa-star fa-sm"></i>
                    </li>
                    <li>
                      <i className="fas fa-star fa-sm"></i>
                    </li>
                    <li>
                      <i className="fas fa-star fa-sm"></i>
                    </li>
                  </ul>
                </div>

                <div className="col-lg-4 d-none d-lg-block">
                  <img
                    className="rounded-circle shadow-1-strong mb-4"
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp"
                    alt="avatar"
                    style={{ width: "150px" }}
                  />
                  <h5 className="mb-3">John Doe</h5>
                  <p>English Teacher</p>
                  <p className="text-muted">
                    <i className="fas fa-quote-left pe-2"></i>
                    Ut enim ad minima veniam, quis nostrum exercitationem ullam
                    corporis suscipit laboriosam, nisi ut aliquid commodi.
                  </p>
                  <ul className="list-unstyled d-flex justify-content-center text-warning mb-0">
                    <li>
                      <i className="fas fa-star fa-sm"></i>
                    </li>
                    <li>
                      <i className="fas fa-star fa-sm"></i>
                    </li>
                    <li>
                      <i className="fas fa-star fa-sm"></i>
                    </li>
                    <li>
                      <i className="fas fa-star fa-sm"></i>
                    </li>
                    <li>
                      <i className="fas fa-star-half-alt fa-sm"></i>
                    </li>
                  </ul>
                </div>

                <div className="col-lg-4 d-none d-lg-block">
                  <img
                    className="rounded-circle shadow-1-strong mb-4"
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp"
                    alt="avatar"
                    style={{ width: "150px" }}
                  />
                  <h5 className="mb-3">Maria Kate</h5>
                  <p>Spanish Teacher</p>
                  <p className="text-muted">
                    <i className="fas fa-quote-left pe-2"></i>
                    At vero eos et accusamus et iusto odio dignissimos ducimus
                    qui blanditiis praesentium voluptatum deleniti atque
                    corrupti.
                  </p>
                  <ul className="list-unstyled d-flex justify-content-center text-warning mb-0">
                    <li>
                      <i className="fas fa-star fa-sm"></i>
                    </li>
                    <li>
                      <i className="fas fa-star fa-sm"></i>
                    </li>
                    <li>
                      <i className="fas fa-star fa-sm"></i>
                    </li>
                    <li>
                      <i className="fas fa-star fa-sm"></i>
                    </li>
                    <li>
                      <i className="far fa-star fa-sm"></i>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Single item --> */}
          <div className="carousel-item">
            <div className="container">
              <div className="row">
                <div className="col-lg-4">
                  <img
                    className="rounded-circle shadow-1-strong mb-4"
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(3).webp"
                    alt="avatar"
                    style={{ width: "150px" }}
                  />
                  <h5 className="mb-3">John Doe</h5>
                  <p>Maths Teacher</p>
                  <p className="text-muted">
                    <i className="fas fa-quote-left pe-2"></i>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Quod eos id officiis hic tenetur quae quaerat ad velit ab
                    hic tenetur.
                  </p>
                  <ul className="list-unstyled d-flex justify-content-center text-warning mb-0">
                    <li>
                      <i className="fas fa-star fa-sm"></i>
                    </li>
                    <li>
                      <i className="fas fa-star fa-sm"></i>
                    </li>
                    <li>
                      <i className="fas fa-star fa-sm"></i>
                    </li>
                    <li>
                      <i className="fas fa-star fa-sm"></i>
                    </li>
                    <li>
                      <i className="fas fa-star fa-sm"></i>
                    </li>
                  </ul>
                </div>

                <div className="col-lg-4 d-none d-lg-block">
                  <img
                    className="rounded-circle shadow-1-strong mb-4"
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(4).webp"
                    alt="avatar"
                    style={{ width: "150px" }}
                  />
                  <h5 className="mb-3">Alex Rey</h5>
                  <p>English Teacher</p>
                  <p className="text-muted">
                    <i className="fas fa-quote-left pe-2"></i>
                    Ut enim ad minima veniam, quis nostrum exercitationem ullam
                    corporis suscipit laboriosam, nisi ut aliquid commodi.
                  </p>
                  <ul className="list-unstyled d-flex justify-content-center text-warning mb-0">
                    <li>
                      <i className="fas fa-star fa-sm"></i>
                    </li>
                    <li>
                      <i className="fas fa-star fa-sm"></i>
                    </li>
                    <li>
                      <i className="fas fa-star fa-sm"></i>
                    </li>
                    <li>
                      <i className="fas fa-star fa-sm"></i>
                    </li>
                    <li>
                      <i className="fas fa-star-half-alt fa-sm"></i>
                    </li>
                  </ul>
                </div>

                <div className="col-lg-4 d-none d-lg-block">
                  <img
                    className="rounded-circle shadow-1-strong mb-4"
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(5).webp"
                    alt="avatar"
                    style={{ width: "150px" }}
                  />
                  <h5 className="mb-3">Maria Kate</h5>
                  <p>Spanish Teacher</p>
                  <p className="text-muted">
                    <i className="fas fa-quote-left pe-2"></i>
                    At vero eos et accusamus et iusto odio dignissimos ducimus
                    qui blanditiis praesentium voluptatum deleniti atque
                    corrupti.
                  </p>
                  <ul className="list-unstyled d-flex justify-content-center text-warning mb-0">
                    <li>
                      <i className="fas fa-star fa-sm"></i>
                    </li>
                    <li>
                      <i className="fas fa-star fa-sm"></i>
                    </li>
                    <li>
                      <i className="fas fa-star fa-sm"></i>
                    </li>
                    <li>
                      <i className="fas fa-star fa-sm"></i>
                    </li>
                    <li>
                      <i className="far fa-star fa-sm"></i>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Single item --> */}
          <div className="carousel-item">
            <div className="container">
              <div className="row">
                <div className="col-lg-4">
                  <img
                    className="rounded-circle shadow-1-strong mb-4"
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(6).webp"
                    alt="avatar"
                    style={{ width: "150px" }}
                  />
                  <h5 className="mb-3">Anna Deynah</h5>
                  <p>Spanish Teacher</p>
                  <p className="text-muted">
                    <i className="fas fa-quote-left pe-2"></i>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Quod eos id officiis hic tenetur quae quaerat ad velit ab
                    hic tenetur.
                  </p>
                  <ul className="list-unstyled d-flex justify-content-center text-warning mb-0">
                    <li>
                      <i className="fas fa-star fa-sm"></i>
                    </li>
                    <li>
                      <i className="fas fa-star fa-sm"></i>
                    </li>
                    <li>
                      <i className="fas fa-star fa-sm"></i>
                    </li>
                    <li>
                      <i className="fas fa-star fa-sm"></i>
                    </li>
                    <li>
                      <i className="fas fa-star fa-sm"></i>
                    </li>
                  </ul>
                </div>

                <div className="col-lg-4 d-none d-lg-block">
                  <img
                    className="rounded-circle shadow-1-strong mb-4"
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(8).webp"
                    alt="avatar"
                    style={{ width: "150px" }}
                  />
                  <h5 className="mb-3">John Doe</h5>
                  <p>Maths Teacher</p>
                  <p className="text-muted">
                    <i className="fas fa-quote-left pe-2"></i>
                    Ut enim ad minima veniam, quis nostrum exercitationem ullam
                    corporis suscipit laboriosam, nisi ut aliquid commodi.
                  </p>
                  <ul className="list-unstyled d-flex justify-content-center text-warning mb-0">
                    <li>
                      <i className="fas fa-star fa-sm"></i>
                    </li>
                    <li>
                      <i className="fas fa-star fa-sm"></i>
                    </li>
                    <li>
                      <i className="fas fa-star fa-sm"></i>
                    </li>
                    <li>
                      <i className="fas fa-star fa-sm"></i>
                    </li>
                    <li>
                      <i className="fas fa-star-half-alt fa-sm"></i>
                    </li>
                  </ul>
                </div>

                <div className="col-lg-4 d-none d-lg-block">
                  <img
                    className="rounded-circle shadow-1-strong mb-4"
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(7).webp"
                    alt="avatar"
                    style={{ width: "150px" }}
                  />
                  <h5 className="mb-3">Maria Kate</h5>
                  <p>English Teacher</p>
                  <p className="text-muted">
                    <i className="fas fa-quote-left pe-2"></i>
                    At vero eos et accusamus et iusto odio dignissimos ducimus
                    qui blanditiis praesentium voluptatum deleniti atque
                    corrupti.
                  </p>
                  <ul className="list-unstyled d-flex justify-content-center text-warning mb-0">
                    <li>
                      <i className="fas fa-star fa-sm"></i>
                    </li>
                    <li>
                      <i className="fas fa-star fa-sm"></i>
                    </li>
                    <li>
                      <i className="fas fa-star fa-sm"></i>
                    </li>
                    <li>
                      <i className="fas fa-star fa-sm"></i>
                    </li>
                    <li>
                      <i className="far fa-star fa-sm"></i>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Inner --> */}
      </div>
      {/* <!-- Carousel wrapper --> */}
      <hr />
      {/* Suscripción */}
      <div className="container mt-5 text-center backg p-4" style={{ width: "600px" }}>
        <h1>Subscribe for updates</h1>
        <p>
          Fusce rhoncus semper faucibus. Vivamus pharetra eget nisi gravida
          malesuada. Orci varius natoque penatibus et magnis dis parturient
          montes, nascetur ridiculus mus. Nam a mollis augue.
        </p>
        <input className="me-3" type="text" placeholder="Email" />
        <input className="me-3" type="text" placeholder="Full name" />
        <button type="button" className="btn btn-secondary">
          Subscribe
        </button>
      </div>
      <hr />
    </div>
  );
};