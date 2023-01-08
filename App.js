import React, { useEffect, useState, useMemo } from "react";
import { NavigationContainer } from "@react-navigation/native";
import messaging from "@react-native-firebase/messaging";
import TradeHunt from "./src/app/app";
import { StatusBar } from "react-native";
import { AppColors } from "./src/app/constants/colors";
import SplashScreen from "./src/app/splash";
import { AuthContext } from "./src/app/context/context";
import {
	getStorageItem,
	removeStorageItem,
	setStorageItem,
} from "./src/app/utils/utils";

const App = () => {
	const [userToken, setUserToken] = useState(null);

	const authContext = useMemo(() => ({
		signIn: async (token, user) => {
			console.log(user);
			await setStorageItem("userToken", token);
			await setStorageItem("user", JSON.stringify(user));
			setUserToken(token);
		},
		signOut: async () => {
			await removeStorageItem("userToken");
			await removeStorageItem("user");
			setUserToken(null);
		},
	}));
	const [showSplash, setShowSplash] = useState(true);
	useEffect(async () => {
		const fcmToken = await messaging().getToken();
		if (fcmToken) {
			await setStorageItem("fcmToken", fcmToken);
		}
	}, []);

	useEffect(async () => {
		const token = await getStorageItem("userToken");
		if (token) {
			setUserToken(token);
		}
	}, []);
	useEffect(() => {
		setTimeout(() => {
			setShowSplash(false);
		}, 2000);
	}, []);

	return (
		<AuthContext.Provider value={authContext}>
			<NavigationContainer>
				<StatusBar
					backgroundColor={AppColors.background}
				></StatusBar>
				{showSplash ? (
					<SplashScreen />
				) : (
					<TradeHunt token={userToken} />
				)}
			</NavigationContainer>
		</AuthContext.Provider>
	);
};

export default App;
