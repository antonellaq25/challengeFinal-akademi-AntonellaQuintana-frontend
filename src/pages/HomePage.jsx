import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
	Card,
	CardBody,
	Typography,
	Button,
	Chip,
} from "@material-tailwind/react";

const HomePage = () => {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
			<div className="w-full max-w-2xl">
				<div className="text-center mb-8">
					<Typography variant="h1" className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
						Welcome to <span className="text-blue-600">Akademi</span>
					</Typography>
					<Typography className="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
						Your all-in-one solution for managing courses, tracking progress, and connecting with learners worldwide.
					</Typography>
				</div>
				<div className="grid md:grid-cols-3 gap-4 mb-8">
					<Card className="hover:shadow-lg transition-shadow duration-300">
						<CardBody className="text-center p-6">
							<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
								<svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
								</svg>
							</div>
							<Typography variant="h6" className="text-gray-800 mb-2">
								Course Management
							</Typography>
							<Typography className="text-sm text-gray-600">
								Create and organize your courses effortlessly
							</Typography>
						</CardBody>
					</Card>

					<Card className="hover:shadow-lg transition-shadow duration-300">
						<CardBody className="text-center p-6">
							<div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
								<svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
								</svg>
							</div>
							<Typography variant="h6" className="text-gray-800 mb-2">
								User Analytics
							</Typography>
							<Typography className="text-sm text-gray-600">
								Track student progress and engagement
							</Typography>
						</CardBody>
					</Card>

					<Card className="hover:shadow-lg transition-shadow duration-300">
						<CardBody className="text-center p-6">
							<div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
								<svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
								</svg>
							</div>
							<Typography variant="h6" className="text-gray-800 mb-2">
								Progress Tracking
							</Typography>
							<Typography className="text-sm text-gray-600">
								Monitor learning outcomes in real-time
							</Typography>
						</CardBody>
					</Card>
				</div>

				<Card className="shadow-xl border-0 bg-gradient-to-r from-blue-600 to-indigo-600">
					<CardBody className="text-center p-8 text-white">
						{!isAuthenticated ? (
							<>
								<Typography variant="h4" className="mb-3 font-bold">
									Ready to Get Started?
								</Typography>
								<Typography className="mb-6 opacity-90">
									Join thousands of educators and students already using our platform
								</Typography>
								<div className="flex flex-col sm:flex-row gap-4 justify-center">
									<Link to="/register">
										<Button
											size="lg"
											className="bg-white text-blue-600 hover:bg-gray-50 font-semibold px-8 py-3 rounded-xl shadow-lg"
										>
											Register
										</Button>
									</Link>
									<Link to="/login">
										<Button
											variant="outlined"
											size="lg"
											className="border-white text-black hover:bg-white hover:text-blue-600 font-semibold px-8 py-3 rounded-xl"
										>
											Login
										</Button>
									</Link>
								</div>
							</>
						) : (
							<div className="flex flex-col items-center">
								<Chip
									value="Logged In"
									className="bg-green-500 text-white mb-4"
								/>
								<Typography variant="h5" className="mb-3">
									Welcome Back!
								</Typography>
								<Typography className="mb-6 opacity-90">
									Continue where you left off and explore your dashboard
								</Typography>
								<Link to="/dashboard">
									<Button
										size="lg"
										className="bg-white text-blue-600 hover:bg-gray-50 font-semibold px-8 py-3 rounded-xl shadow-lg"
									>
										Go to Dashboard
									</Button>
								</Link>
							</div>
						)}
					</CardBody>
				</Card>
				<div className="text-center mt-8">
					<Typography className="text-sm text-gray-500">
						Trusted by educators worldwide • Secure • Easy to use
					</Typography>
				</div>
			</div>
		</div>
	);
};

export default HomePage;