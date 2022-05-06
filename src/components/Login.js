import React, { useState } from "react";
import ErrorMESSAGE from "./ErrorMESSAGE";
import HandlerUserInp from "./HandlerUserInp";

export default function Login({ login, authFunc, setuser }) {
	const [username, setusername] = useState("");
	const [password, setpassword] = useState("");
	const [error, seterror] = useState("");

	function handleLogin(e) {
		e.preventDefault();
		seterror("");
		const userData = authFunc(username, password);
		if (userData.passwordMatches) setuser(userData.user);
		else seterror("Username or Password is incorrect");
	}

	return (
		<div className={`login ${login ? "active" : ""}`}>
			<form
				onSubmit={handleLogin}
				style={{ display: `${login ? "flex" : "none"}` }}
			>
				
				<img className="buko" src={require('../images/coconut.png')} />

				<HandlerUserInp
					label={"Username"}
					id={`username`}
					data={username}
					setdata={setusername}
					type={"text"}
					clearError={() => error !== "" && seterror("")}
				/>
				<HandlerUserInp
					label={"Password"}
					id={`password`}
					data={password}
					setdata={setpassword}
					type={"password"}
					clearError={() => error !== "" && seterror("")}
				/>
				<ErrorMESSAGE text={error} />
				<input type="submit" value="Login" />
			</form>
		</div>
	);
}
