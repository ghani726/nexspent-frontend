import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router";
import AuthProvider from "@/contexts/AuthProvider";
import DataProvider from "@/contexts/DataProvider";

createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<AuthProvider>
			<DataProvider>
				<App></App>
			</DataProvider>
		</AuthProvider>
	</BrowserRouter>,
);
