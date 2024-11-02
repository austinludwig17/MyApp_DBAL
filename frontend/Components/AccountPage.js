import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Button,
  TextInput,
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from './styles/styles';
import UserIcon from './userIcon'; // Import UserIcon component
 
export default function AccountPage({ navigation, setIsLoggedIn }) {
  
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState(''); // State for first name
  const [lastName, setLastName] = useState(''); // State for last name
  const [username, setUsername] = useState(''); // State for username

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    setIsLoggedIn(false);
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
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
    const loadUserDetails = async () => {
      const storedFirstName = await AsyncStorage.getItem('firstName');
      const storedLastName = await AsyncStorage.getItem('lastName');
      if (storedFirstName) {
        setFirstName(storedFirstName);
      }
      if (storedLastName) {
        setLastName(storedLastName);
      }
    };

    loadUserDetails(); // Call the function to load user details
  }, []);
 
 
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.AccountHeader}>
        <Text style={styles.headerText}>Welcome, {username}!</Text>
      </View>

      <UserIcon containerSize={375} colorBorder="gray" />

      <View style={styles.message}>
        <Text style={styles.message}>First Name: {firstName}</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter first name"
          value={firstName}
          onChangeText={text => setFirstName(text)}
        />

        <Text style={styles.message}>Last Name: {lastName}</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter last name"
          value={lastName}
          onChangeText={text => setLastName(text)}
        />
      </View>

      <View style={styles.footerContainer}>
        <View style={styles.button}>
          <Button title="Logout" color="gray" onPress={handleLogout} />
        </View>
      </View>
    </SafeAreaView>
  );
}
 
