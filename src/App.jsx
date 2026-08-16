import { Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";
import AppNotes from "./pages/App/App";
import Website from "./pages/Website/Website";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Error from "./pages/Error";
import ProtectedRoute from "./components/ProtectedRoute";
const App = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Website></Website>}></Route>
				<Route
					path="/app/*"
					element={
						<ProtectedRoute>
							<AppNotes></AppNotes>
						</ProtectedRoute>
					}
				></Route>
				<Route path="/login" element={<Login></Login>}></Route>
				<Route path="/register" element={<Register></Register>}></Route>
				<Route path="*" element={<Error></Error>}></Route>\
			</Routes>
			<Toaster
				toastOptions={{
					className: "bg-white dark:!bg-gray-950 dark:!text-white",
					style: {
						borderRadius: "2rem",
						boxShadow: "0 0 10px rgba(0,0,0,0.2)",
					},

					success: {
						iconTheme: {
							primary: "#059669",
						},
					},
				}}
			></Toaster>
		</>
	);
};

export default App;
