import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import { BsBookmarkPlus } from "react-icons/bs";
import { RiMenu3Line } from "react-icons/ri";
import routes from "../../helpers/routes";
import "./lista.css";

const Sidebar = ({ title, linkTo }) => {
  return (
    <li className="sidebar-option">
      {linkTo ? (
        <NavLink exact to={linkTo} activeClassName="active">
          <span>{title}</span>
        </NavLink>
      ) : (
        <>
          <span>{title}</span>
        </>
      )}
    </li>
  );
};

const ClickableListItem = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavigation = () => {
    setIsOpen(!isOpen);
  };

  const options = [
    {
      title: "Configuracion de busquedad",
      content: "",
    },
    {
      title: "Guardados",
      linkTo: routes.places,
    },
    {
      title: "Consejos y sugerencias",
      content: "",
    },
    {
      title: "Obtener ayuda",
      content: "",
    },
    {
      title: "Información del consumidor",
      content: "",
    },
  ];

  return (
    <div className="sidebar-container">
      <button className="sidebar-toggle-button" onClick={toggleNavigation}>
        <RiMenu3Line className="icon" />
      </button>
      <h1 className="Text">Menu</h1>
      {isOpen && (
        <div className={`sidebar sidebar-open`}>
          <div className="sidebar-header">
            <h3>AudioGuia Vision</h3>
            <button className="sidebar-close-button" onClick={toggleNavigation}>
              &times;
            </button>
          </div>
          <ul className="sidebar-options">
            {options.map((option, index) => (
              <Sidebar
                key={index}
                icon={option.icon}
                title={option.title}
                linkTo={option.linkTo}
              />
            ))}
          </ul>
        </div>
      )}
      <Navbar.Brand
        as={NavLink}
        to={routes.places}
        className="sidebar-toggle-button"
      >
        <BsBookmarkPlus style={{ cursor: "pointer" }} className="icon" />
      </Navbar.Brand>
      <h1 className="Text2">Guardados</h1>
    </div>
  );
};

export default ClickableListItem;
