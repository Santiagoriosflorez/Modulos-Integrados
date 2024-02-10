import { Navbar, Nav } from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import routes from '../helpers/routes';
import {FaHome} from 'react-icons/fa'
export default function Navigation() {

  return (
    <Navbar collapseOnSelect expand='lg' variant='dark' bg='dark' className='mb-3'>
      <Navbar.Brand as={NavLink} to={routes.home}>
      <FaHome style={{width:'50px',height:'50px'}}/>
      </Navbar.Brand> 
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
      <Nav className='ms-auto'>
               <Nav.Link  as={NavLink} to={routes.login}>Cerrar Sesion </Nav.Link> 
          </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

