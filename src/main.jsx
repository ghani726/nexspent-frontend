import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import AuthProvider from "./contexts/AuthProvider.jsx";
import DataProvider from "./contexts/DataProvider.jsx";

createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<AuthProvider>
			<DataProvider>
				<App></App>
			</DataProvider>
		</AuthProvider>
	</BrowserRouter>,
);
