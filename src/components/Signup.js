import React, { useState } from "react";
import ErrorMESSAGE from "./ErrorMESSAGE";
import HandlerUserInp from "./HandlerUserInp";

export default function Signup({
	login,
	setlogin,
	existingUser,
	register,
	existingEmail,
}) {
	const [registeredEmail, setregisteredEmail] = useState("");
	const [registeredUsername, setregisteredUsername] = useState("");
	const [registeredPassword, setregisteredPassword] = useState("");
	const [registeredConfiguredPass, setregisteredConfiguredPass] = useState("");
	const [error, seterror] = useState("");
	const [emailError, setemailError] = useState("");
	const [usernameError, setusernameError] = useState("");
	const [passwordError, setpasswordError] = useState("");
	const [configureErrorPass, setconfigureErrorPass] = useState("");

	function passwordValid() {
		return (
			registeredPassword.match(/[a-z]+/) &&
			registeredPassword.match(/[0-9]+/) &&
			registeredPassword.match(/[A-Z]+/) &&
			registeredPassword.length >= 8
		);
	}

	function handleSignup(e) {
		e.preventDefault();
		seterror("");
		setemailError("");
		setusernameError("");
		setpasswordError("");
		setconfigureErrorPass("");

		const validEmail = checkEmailValidity(registeredEmail);
		const validEmail2 = existingEmail(registeredEmail);
		//ERROR HANDLERS

		if (validEmail === null) {
			setemailError("error-input");
			seterror("Kindly check the email you have inserted.");
			return;
		}
		if (validEmail2) {
			setemailError("error-input");
			seterror("Email has already been taken.");
			return;
		}


		const validUsername = existingUser(registeredUsername);
		if (validUsername) {
			setusernameError("error-input");
			seterror("Username already exists.");
			return;
		}

		if (!passwordValid()) {
			setpasswordError("error-input");
			seterror(
				"The password you entered does not enter the requirements: Alphanumeric with Upper and Lowercase letters; characters must be greater than or equal to 8"
			);
			return;
		}

		if (registeredPassword !== registeredConfiguredPass) {
			setpasswordError("error-input");
			setconfigureErrorPass("error-input");
			seterror("Please input matching passwords.");
			return;
		}

		register(validEmail[0], registeredUsername, registeredPassword);
		alert(`Hello, ${registeredUsername}! You have registered to FaceBUKO! You may now log in.`);
		clrea();
		setlogin(true);
	}

	function clrea() {
		setregisteredEmail("");
		setregisteredUsername("");
		setregisteredPassword("");
		setregisteredConfiguredPass("");
	}

	function checkEmailValidity(e) {
		const pattern = new RegExp(
			/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
		);
		const res = e.toLowerCase().match(pattern);
		// console.log(e.toLowerCase());
		// console.log(res);
		return res;
	}

	return (
		<div className={`signup ${!login ? "active" : ""}`}>
			<form
				onSubmit={handleSignup}
				style={{ display: `${!login ? "flex" : "none"}` }}
			>
				<HandlerUserInp
					style={emailError}
					label={"Email"}
					id={`registeredEmail`}
					data={registeredEmail}
					setdata={setregisteredEmail}
					type={"email"}
					clearError={() => {
						error !== "" && seterror("");
						emailError !== "" && setemailError("");
					}}
				/>
				<HandlerUserInp
					style={usernameError}
					label={"Username"}
					id={`registeredUsername`}
					data={registeredUsername}
					setdata={setregisteredUsername}
					type={"text"}
					clearError={() => {
						error !== "" && seterror("");
						usernameError !== "" && setusernameError("");
					}}
				/>
				<HandlerUserInp
					style={passwordError}
					label={"Password"}
					id={`registeredPassword`}
					data={registeredPassword}
					setdata={setregisteredPassword}
					type={"password"}
					clearError={() => {
						error !== "" && seterror("");
						passwordError !== "" && setpasswordError("");
						configureErrorPass !== "" && setconfigureErrorPass("");
					}}
				/>
				<HandlerUserInp
					style={configureErrorPass}
					label={"Confirm Password"}
					id={`registeredConfiguredPass`}
					data={registeredConfiguredPass}
					setdata={setregisteredConfiguredPass}
					type={"password"}
					clearError={() => {
						error !== "" && seterror("");
						passwordError !== "" && setpasswordError("");
						configureErrorPass !== "" && setconfigureErrorPass("");
					}}
				/>
				<ErrorMESSAGE text={error} />
				<input type="submit" value="Register" />
			</form>
		</div>
	);
}
