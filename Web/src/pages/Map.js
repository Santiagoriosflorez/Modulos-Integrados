import "leaflet/dist/leaflet.css"; // Importa los estilos de Leaflet
import "./map.css";
import { Navbar, Button, Form, Col, Row, Nav } from "react-bootstrap";
import {
  MapContainer as LeafletMap,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import { useState } from "react";
import Icon from "../components/Marker/icon";
import icon2 from "../components/Marker/2icon";
import { IoArrowUndoOutline } from "react-icons/io5";
import { FaPersonWalkingArrowRight } from "react-icons/fa6";
import { FaMicrophoneLines } from "react-icons/fa6";
import axios from "axios";
import ClickableListItem from "../components/lista/Lista";
const Map = () => {
  // Estados para controlar el término de búsqueda y la ubicación encontrada
  const [showNavigation, setShowNavigation] = useState(false);
  const [origin, setOrigin] = useState(""); // Coordenadas de origen
  const [destination, setDestination] = useState("");
  const [distance, setDistance] = useState("");
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLocation, setSearchLocation] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");

  // Estado para manejar errores
  const [Error, setError] = useState([]);

  // Función para manejar el cambio en el campo de búsqueda
  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async () => {
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      searchTerm
    )}`;

    try {
      const response = await fetch(geocodeUrl);
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        const locationData = { lat, lon, display_name };

        setSearchLocation(locationData);
        saveLocationToBackend(locationData);
      } else {
        setSearchLocation(null);
        alert("No se encontraron resultados para la búsqueda");
      }
    } catch (error) {
      setError(error);
      console.error("Error en la solicitud: ", error);

      setErrorMessage("Error en la solicitud");
      setTimeout(() => {
        setErrorMessage("");
      }, 1000);
    }
  };

  const saveLocationToBackend = (locationData) => {
    const { display_name, lat, lon } = locationData;
    const dataToSend = {
      name: display_name,
      coordinates: [parseFloat(lat), parseFloat(lon)],
    };

    axios
      .post("http://localhost:4000/api/places", dataToSend)
      .then((response) => {
        if (
          response.data &&
          response.data.message === "El lugar ya existe en la base de datos"
        ) {
          setErrorMessage("El lugar ya existe en la base de datos");
          setTimeout(() => {
            setErrorMessage(""); // Limpia el mensaje después de un segundo (1000 milisegundos)
          }, 1000);
        } else {
          setErrorMessage("");
        }
        return response;
      })
      .catch((error) => {
        setError(Error);
        console.error("Error al enviar ubicación al backend:", Error);
        setErrorMessage("Error al enviar ubicación al backend");
        setTimeout(() => {
          setErrorMessage("");
        }, 1000);
      });
  };

  const handleGetRoute = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/post-route",
        {
          origin,
          destination,
        }
      );
      console.log(response.data);
      setDistance(JSON.stringify(response.data));
      const routeCoordinates = response.data.features.flatMap(
        (feature) => feature.geometry.coordinates
      );
      setRouteCoordinates(routeCoordinates);

      // Extraer instrucciones de la respuesta y almacenarlas en el estado
      const routeInstructions = response.data.features.flatMap((feature) =>
        feature.properties.segments.flatMap((segment) =>
          segment.steps.map((step) => step.instruction)
        )
      );
      setInstructions(routeInstructions);
      console.log(routeInstructions);
    } catch (error) {
      console.error("Error al obtener la ruta desde el backend:", error);
      // Manejar errores
    }
  };

  const startVoiceRecognition = () => {
    const recognition = new window.webkitSpeechRecognition();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchTerm(transcript);
      handleSearchSubmit();
    };

    recognition.start();
  };

  const toggleNavigation = () => {
    setShowNavigation(!showNavigation);
  };

  return (
    <Row sm={5}>
      <Col>
        <Navbar
          className={"mb-7 d-flex flex-column fluid "}
          style={{ width: "250px", height: "1000px" }}
        >
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearchSubmit();
            }}
          >
            <Row>
              <Col className="Col">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className=" form-Control"
                  value={searchTerm}
                  onChange={handleSearchInput}
                  name="search"
                />
                <Button className="Button1" onClick={startVoiceRecognition}>
                  <FaMicrophoneLines />
                </Button>
                <Button type="submit" className="Button">
                  buscar
                </Button>
              </Col>
              {errorMessage && (
                <div className="alert alert-warning">{errorMessage}</div>
              )}
            </Row>
          </Form>
          <button onClick={toggleNavigation} className="button">
            {showNavigation ? (
              <IoArrowUndoOutline
                style={{ cursor: "pointer", color: "white" }}
              />
            ) : (
              <FaPersonWalkingArrowRight
                style={{
                  cursor: "pointer",
                  color: "white",
                  width: "40px",
                  height: "40px",
                }}
              />
            )}
          </button>

          {showNavigation && (
            <Form onSubmit={handleGetRoute} className="Form">
              <input
                type="search"
                placeholder="Origen"
                value={origin}
                onChange={(event) => setOrigin(event.target.value)}
                className="Input"
              />
              <input
                type="search"
                placeholder="Destino"
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
                className="Input"
              />

              <button className="Btn" type="submit">
                IR
              </button>

              {instructions.length > 0 && (
                <div>
                  <h3>Instrucciones:</h3>
                  <ol>
                    {instructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ol>
                </div>
              )}
            </Form>
          )}
        </Navbar>
      </Col>
      {/* Mapa */}
      <LeafletMap
        center={[4.613066171673955, -74.20411539052256]}
        zoom={15}
        className="leaflet-Map"
      >
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Si se encuentra una ubicación, mostrar un marcador en el mapa */}
        {searchLocation && (
          <Marker
            position={[searchLocation.lat, searchLocation.lon]}
            icon={Icon}
          >
            <Popup>{searchLocation.display_name}</Popup>
          </Marker>
        )}

        {routeCoordinates && routeCoordinates.length > 0 && (
          <>
            {/* Polyline para la ruta */}
            <Polyline
              positions={routeCoordinates.map((coord) => [coord[1], coord[0]])}
              color="red"
            />

            {/* Marcador en el origen */}
            <Marker
              position={[routeCoordinates[0][1], routeCoordinates[0][0]]}
              icon={Icon}
            >
              <Popup>Origen</Popup>
            </Marker>

            {/* Marcador en el destino */}
            <Marker
              position={[
                routeCoordinates[routeCoordinates.length - 1][1],
                routeCoordinates[routeCoordinates.length - 1][0],
              ]}
              icon={icon2}
            >
              <Popup>Destino</Popup>
            </Marker>
          </>
        )}
      </LeafletMap>

      <Nav class="Nav" style={{ width: "140px" }}>
        <div>
          <ClickableListItem />
        </div>
      </Nav>
    </Row>
  );
};

export default Map;
