import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/actions/authActions";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardBody,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (user) {
      if (user.role === "superadmin") {
        navigate("/admin");
      } else if (user.role === "teacher") {
        navigate("/teacher/courses");
      } else if (user.role === "student") {
        navigate("/courses");
      }
    }
  }, [user, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <Card className="w-full max-w-md">
        <CardBody>
          <Typography variant="h4" color="blue-gray" className="mb-6 text-center">
            Iniciar Sesión
          </Typography>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              type="email"
              label="Email"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />

            <Input
              type="password"
              label="Contraseña"
              name="password"
              value={password}
              onChange={handleChange}
              required
              minLength={6}
            />

            <Button type="submit" disabled={loading} className="mt-4" fullWidth>
              {loading ? "Iniciando sesión..." : "Ingresar"}
            </Button>

            {error && (
              <Typography color="red" className="mt-2 text-center">
                {error}
              </Typography>
            )}
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default Login;
