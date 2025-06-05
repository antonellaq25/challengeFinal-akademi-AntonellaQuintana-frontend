import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/actions/authActions";
import { useNavigate, Link } from "react-router-dom";
import {
  Card,
  CardBody,
  Input,
  Button,
  Typography,
  Alert,
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
           Log In
          </Typography>

          {error && (
            <Alert color="red" className="mb-4">
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
            <Input
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={handleChange}
              required
            />
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <Button
              type="submit"
              color="blue"
              fullWidth
              loading={loading}
              disabled={loading}
            >
              Log In
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default Login;
