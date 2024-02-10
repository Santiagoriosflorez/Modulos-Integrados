import { Button, Form, Container } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { useAuth } from "../Auth/AuthProvider";
import { useState } from "react";
import { Link  } from "react-router-dom";
import roles from '../helpers/roles';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function LoginPage() {

  const {register,handleSubmit,formState:{errors}}= useForm();
  const {signin,errors:signupErrors} = useAuth();
  

  const onSubmit = handleSubmit(async (values) => {
    signin(values);
  });

  const [showPassword, setShowPassword] = useState(false);


  const togglePasswordVisibility = ()=>{
    setShowPassword(!showPassword)
  }

  return (
    <Container style={{background: 'linear-gradient(to bottom, rgb(25, 138, 231), rgb(163, 190, 193))', padding: '20px' , width: '400px',height:'500px'}}>
      <div className="d-flex flex-column align-items-center">
        <h2 style={{ color: 'white' }}>Inicio de Sesion</h2>
        <Form onSubmit={onSubmit} style={{ width: '300px' }}>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: 'white' }}>Correo Electrónico</Form.Label>
            <Form.Control
              type="text"
              placeholder="Escriba su correo electrónico"
              {...register("email", { required: true })}
              />
            {errors.email && (
              <p className="text-danger">Email es requerido</p>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: 'white' }}>Contraseña</Form.Label>
            <div className='d-flex align-item-center'>
          <Form.Control
            placeholder='Escribe una nueva contraseña '
            {...register("password")}  
            type={showPassword ? "text" : "password"}/>
                
                <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
                {showPassword ? <FiEyeOff /> : <FiEye />}
                </Button>
                </div>

            {errors.email && (
            <p className="text-danger">Password es requerido</p>
            )}

          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: 'white' }}>Rol</Form.Label>
            <Form.Control as="select" {...register("rol")} defaultValue="user" disabled>
            
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </Form.Control>
            {errors.rol && (
              <p className="text-danger">Rol es requerido</p>
            )}
          </Form.Group>

          <div className="text-center">
            <Button type="submit" variant="primary" className="mb-2">
              Iniciar Sesion
            </Button>
          </div>
        </Form>
        <p>
        ¿No tienes una cuenta? <Link to="/register">Register</Link>
        </p>
      </div>

      <div>
      <ul className="mb-0">
    {Array.isArray(signupErrors) && signupErrors.map((error, i) => (
    <li key={i}>{error}</li>
    ))}
    </ul>
      </div>
    </Container>
  );
}
