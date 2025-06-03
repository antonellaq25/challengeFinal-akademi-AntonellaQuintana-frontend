import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../store/actions/authActions";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = ({ target: { name, value } }) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    dispatch(register({ name, email, password }, navigate));
  };

  const fields = [
    { name: "name", label: "Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
    { name: "confirmPassword", label: "Confirm Password", type: "password" },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <Card className="w-full max-w-md">
        <CardBody>
          <Typography variant="h4" color="blue-gray" className="mb-6 text-center">
            Register
          </Typography>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {fields.map(({ name, label, type }) => (
              <Input
                key={name}
                type={type}
                label={label}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                minLength={type === "password" ? 6 : undefined}
              />
            ))}

            <Button type="submit" disabled={loading} className="mt-4" fullWidth>
              {loading ? "Registering..." : "Register"}
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
};

export default RegisterPage;
