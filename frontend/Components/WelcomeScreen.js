// WelcomeScreen.js
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  Button,
  View,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from './styles/styles';

export default function WelcomeScreen({ navigation, setIsLoggedIn }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(''); // State for username

  const navigateToAccountPage = () => {
    navigation.navigate("AccountPage");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch("http://192.168.1.118:5000/users/me", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const userData = await response.json();
        setUsername(userData.username); // Set the username state
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData(); // Call the fetchUserData function
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch("http://192.168.1.118:5000/items/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const items = await response.json();
        setData(items);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    setIsLoggedIn(false);
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (

          <Text style={styles.headerText}>Welcome {username}!</Text> // Display the username
        )}
      </View>
      
      <View style={styles.footerContainer}>
        <View style={styles.button}>
          <Button title="Account Page" color="gray" onPress={navigateToAccountPage} />
        </View>
        
        <View style={styles.button}>
          <Button title="Logout" color="gray" onPress={handleLogout} />
        </View>
      </View>
    </SafeAreaView>
  );
}