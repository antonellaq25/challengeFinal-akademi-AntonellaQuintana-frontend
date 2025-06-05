import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { confirmPasswordReset } from "../../store/actions/authActions";
import {
  Card,
  CardBody,
  Typography,
  Input,
  Button,
  Alert,
} from "@material-tailwind/react";

const ResetPassword = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth); 
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords must match.");
      return;
    }

    try {
      await dispatch(confirmPasswordReset(token, password));
      setSuccess("Password has been reset.");
      setError(null);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setSuccess(null);
      setError("Cannot Do.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <Card className="w-full max-w-md">
        <CardBody>
          <Typography variant="h5" className="mb-4 text-center">
            Reset Password
          </Typography>

          {success && <Alert color="green" className="mb-4">{success}</Alert>}
          {error && <Alert color="red" className="mb-4">{error}</Alert>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Nueva contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
            <Input
              label="Confirmar contraseña"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
            <Button
              type="submit"
              color="blue"
              fullWidth
              loading={loading}
              disabled={loading}
            >
              Reset Password
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default ResetPassword;
