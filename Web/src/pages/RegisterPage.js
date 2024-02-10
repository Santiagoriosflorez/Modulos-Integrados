import { Button, Form, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAuth } from "../Auth/AuthProvider";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import roles from "../helpers/roles";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <Container
      style={{
        background:
          "linear-gradient(to bottom, rgb(73, 222, 235), rgb(171, 209, 253))",
        padding: "20px",
        width: "400px",
        height: "500px",
      }}
    >
      <div className="d-flex flex-column align-items-center">
        <h2 style={{ color: "white" }}>Registro de Usuario</h2>
        <Form onSubmit={onSubmit} style={{ width: "300px" }}>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: "white" }}>
              Correo Electrónico
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Escriba su correo electrónico"
              {...register("email", { required: true })}
            />
            {errors.email && <p className="text-danger">Email es requerido</p>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: "white" }}>Contraseña</Form.Label>
            <div className="d-flex align-item-center">
              <Form.Control
                placeholder="Escribe una nueva contraseña "
                {...register("password")}
                type={showPassword ? "text" : "password"}
              />

              <Button
                variant="outline-secondary"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </Button>
            </div>

            {errors.email && <p className="text-danger">Email es requerido</p>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: "white" }}>Rol</Form.Label>
            <Form.Control as="select" {...register("rol")} defaultValue="user">
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </Form.Control>
            {errors.rol && <p className="text-danger">Rol es requerido</p>}
          </Form.Group>

          <div className="text-center">
            <Button type="submit" variant="secondary">
              Registrar
            </Button>
          </div>
        </Form>
        <p>
          Ya tienes una cuenta ? <Link to="/login">Login</Link>
        </p>
      </div>

      <div>
        <ul className="mb-4">
          {Array.isArray(registerErrors) &&
            registerErrors.map((error, i) => <li key={i}>{error}</li>)}
        </ul>
      </div>
    </Container>
  );
}
