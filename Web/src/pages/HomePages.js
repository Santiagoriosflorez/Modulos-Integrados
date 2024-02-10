import "../components/css/Home.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import routes from "../helpers/routes";
import React from "react";
import Imagen from "../components/IMG/image.jpg";

export default function HomePages() {
  return (
    <div>
      <Container
        className="Container"
        role="banner"
        aria-label="Welcome banner"
      >
        <Row className="mt-5">
          <Col
            className="mb-5"
            tabIndex="0"
            role="region"
            aria-label="Welcome section"
          >
            <h2>Bienvenid@ a la Aplicacion de AudioGuia</h2>
            <p>
              ¡"App de audio-guía para personas con discapacidad visual: habla,
              encuentra, llega. ¡Navegación fácil y precisa basada en
              ubicación!"!
            </p>
            <p>Comenzemos</p>
            <div>
              <Link c to={routes.login}>
                <Button>Bienvenido</Button>
                <h1 className="container">Iniciar Sesion</h1>
              </Link>{" "}
              o<Link to={routes.register}> registrar</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
