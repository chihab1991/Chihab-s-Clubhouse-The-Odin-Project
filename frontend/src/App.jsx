import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
	return (
		<>
			<div className="bg-gray-100 text-gray-800 font-sans">
				<Header />
				<ToastContainer />
				<Outlet />
			</div>
		</>
	);
};

export default App;
