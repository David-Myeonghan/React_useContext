import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect
} from "react-router-dom";

import Main from "./Components/Main.js";
import Search from "./Components/Search.js";
import Detail from "./Components/Detail.js";
import InputForm from "./Components/InputForm.js";
import Confirmation from "./Components/Confirmation.js";
import Results from "./Components/Results.js";
import Login from "./Components/Login.js";
import Register from "./Components/Register.js";
import Notification from "./Components/Notification.js";
import NotificationPoster from "./Components/NotificationPoster.js";

import NearMe from "./Components/NearMe.js";
import Footer from "./Components/Footer.js";

export default () => (
	<Router>
		<>
			<Switch>
				<Route exact path="/" component={Main} />
				<Route exact path="/search" component={Search} />
				<Route exact path="/search/:name" component={Search} />
				<Route exact path="/doctor/:id" component={Detail} />
				<Route exact path="/doctor/:id/:time" component={InputForm} />
				<Route exact path="/confirm" component={Confirmation} />
				<Route exact path="/results/:docid/:time" component={Results} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/notification" component={Notification} />
				<Route
					exact
					path="/notification/appointment/:id"
					component={NotificationPoster}
				/>
				<Route exact path="/nearme" component={NearMe} />
				<Route exact path="/clinic/:id" component={Detail} />

				<Redirect from="*" to="/" />
			</Switch>
			<Footer />
		</>
	</Router>
);
