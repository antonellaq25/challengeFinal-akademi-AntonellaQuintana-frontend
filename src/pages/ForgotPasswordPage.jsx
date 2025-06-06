import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestPasswordReset } from "../../store/actions/authActions";
import {
	Card,
	CardBody,
	Typography,
	Input,
	Button,
	Alert,
} from "@material-tailwind/react";

const ForgotPassword = () => {
	const dispatch = useDispatch();
	const { loading } = useSelector((state) => state.auth);
	const [email, setEmail] = useState("");
	const [success, setSuccess] = useState(null);
	const [error, setError] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await dispatch(requestPasswordReset(email));
			setSuccess("An email has been sent.");
			setError(null);
		} catch (err) {
			setSuccess(null);
			setError("Could not send email.");
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
							label="Email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						<Button
							type="submit"
							color="blue"
							fullWidth
							loading={loading}
							disabled={loading}
						>
							Send link
						</Button>
					</form>
				</CardBody>
			</Card>
		</div>
	);
};

export default ForgotPassword;
