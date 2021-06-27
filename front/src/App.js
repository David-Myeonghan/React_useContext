import React from "react";
import Router from "./Router.js";
import UserContextProvider from "./Components/UserContext.js";

function App() {
	return (
		<UserContextProvider>
			<Router />
		</UserContextProvider>
	);
}

export default App;
