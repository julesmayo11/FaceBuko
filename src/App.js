// import logo from './logo.svg';
import "./App.css";
import React, { useState, useEffect } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ButtonFETCH from "./components/ButtonFETCH";
import bcryptjs from "bcryptjs";

function App() {
	const [sampleDb, setsampleDb] = useState([
		{
			email: "sample@gmail.com",
			username: "sample21",
			password: "$2a$10$cBMdQLswyWkRUK2O74T05Oe2mwNoOgQe3gW/qdLV50RHfsK7LE70a",
		}, 
		//CONSTANT ACCOUNT, FOR TESTING PURPOSES
		//password: s@mplE21
		
	]);
	const [login, setlogin] = useState(true);
	const [user, setuser] = useState({});

	const salt = bcryptjs.genSaltSync(10);

	const hash = pass => bcryptjs.hashSync(pass, salt);

	function existingUser(u) {
		const userFound = sampleDb.find(user => user.username === u);
		return userFound;
	}
	function existingEmail(e) {
		const userFound = sampleDb.find(user => user.email === e);
		return userFound;
	}

	function authFunc(u, p) {
		const userFound = existingUser(u);
		if (userFound) {
			const compare = bcryptjs.compareSync(p, userFound.password);
			if (compare) {
				return { passwordMatches: true, user: userFound };
			} else return { passwordMatches: false };
		} else return { passwordMatches: false };
	}

	function proceedLogout() {
		setuser({});
	}

	function register(e, u, p) {
		let tempArray = sampleDb;
		tempArray.push({ email: e, username: u, password: hash(p) });
		setsampleDb(tempArray);
	}

	useEffect(() => {
		console.log(sampleDb);
	}, [sampleDb]);

	return (
		<>
			{user.username ? (
				<div className="authedt">
					<div className="autho-container">

					
						<img className="buko" src={require('./images/coconut.png')} />
						<br />
						<br />
						<h1>Welcome to FaceBUKO, {user.username}!</h1>
						<br />
						<br />
						<p className="hello">Please Enjoy your stay! STAY BUKO!</p>
						<br />
						<br />
						<button className="logout" onClick={proceedLogout}>
							Log out
						</button>
					</div>
				</div>
			) : (
				<div className={`wallpaper w-${login ? "login" : "signup"}`}>
					<div
						className={`switch s-${login ? "login" : "signup"}`}
						onClick={() => setlogin(!login)}
					>
						{login ? (
							<ButtonFETCH main={`Register`} />
						) : (
							<ButtonFETCH main={`Back`} />
						)}
					</div>
					<div className={`header ${login ? `top` : ""} `}>
						<h1> faceBUKO :P </h1>
					</div>
					<div className="main-container">
						<Login
							login={login}
							authFunc={authFunc}
							setuser={setuser}
						/>
						<div className="blank">
						</div>
						<div className="blank"></div>
						<Signup
							login={login}
							setlogin={setlogin}
							existingUser={existingUser}
							existingEmail={existingEmail}
							register={register}
						/>
					</div>
					
				</div>
			)}
		</>
	);
}

export default App;
