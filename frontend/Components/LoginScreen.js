import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet, TextInput, Button, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles/styles';

export default function LoginScreen({ navigation, setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLogin, setIsLogin] = useState(true); 
  const [message, setMessage] = useState('');
  const [showTempPassword, setShowTempPassword] = useState(true); // New state for password visibility
  const [showPassword, setShowPassword] = useState(true);
  const [tempPassWord, setTempPassWord] = useState('');

  //Handles shown passwords on press
  const handleShow = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };
  const handleShowTemp = () => {
    setShowTempPassword(!showTempPassword); // Toggle password visibility
  };

  const handlePress = async () => {
    if (isLogin) {
      if (email === '' || password === '') {
        setMessage('Please fill out all fields.');
        return;
      }
    } else {
      if (email === '' || password === '' || firstName === '' || lastName === '') {
        setMessage('Please fill out all fields.');
        return;
      }
    }
  
    const url = isLogin
      ? 'http://192.168.1.118:5000/users/login'
      : 'http://192.168.1.118:5000/users/register';
  
    const body = isLogin
      ? { username: email, password }
      : { username: email, password, firstname: firstName, lastname: lastName };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
  
      const result = await response.json();
      if (response.ok) {
        if (isLogin) {
          setMessage('Login successful');
          if (result.token) {
            // Save token and update login state
            await AsyncStorage.setItem('token', result.token);
            await AsyncStorage.setItem('firstName', result.firstname || firstName);  // Save first name
            await AsyncStorage.setItem('lastName', result.lastname || lastName);    // Save last name
          
            setIsLoggedIn(true);
            navigation.reset({
              index: 0,
              routes: [{ name: 'Welcome' }],
            });
          }
        } else {
          setMessage('Registration successful. Please log in.');
          setIsLogin(true); // Switch to login view
        }
      } else {
        setMessage(result.message || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error connecting to the server.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.headerText}>{isLogin ? "Login" : "Sign Up"}</Text>
        
        {!isLogin && (
          <>
            <Text style={styles.entryText}>Enter your first name : </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter first name"
              value={firstName}
              onChangeText={text => setFirstName(text)}
            />

            <Text style={styles.entryText}>Enter your last name : </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter last name"
              value={lastName}
              onChangeText={text => setLastName(text)}
            />
          </>
        )}
        
        <Text // <----PASSWORD CONFIRM FIELD---->
          style={styles.entryText}>Enter your email : </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          value={email}
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
        />

        <Text style={styles.entryText}>Enter your password : </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />

        <Text style={styles.entryText}>Re-Enter your password : </Text>
        <TextInput onPressIn={handleShowTemp} onPressOut={handleShowTemp}
          style={styles.input}
          onChangeText={text => setTempPassWord(text)}
          value={tempPassWord}
          secureTextEntry={showTempPassword}
          placeholder="Password"
        />

        {password && tempPassWord && password !== tempPassWord && (
        <Text style={{ color: 'red' }}>Passwords do not match.</Text> //More confusing than I expected :/ Tells if passwords don't match
        )}

        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button 
              title={isLogin ? "Login" : "Sign Up"}
              color="gray" 
              onPress={handlePress}
            />
          </View>
          <View style={styles.button}>
            <Button
              title={isLogin ? "Switch to Sign Up" : "Switch to Login"}
              color="gray" 
              onPress={() => setIsLogin(!isLogin)}
            />
          </View>
        </View>

        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>
    </SafeAreaView>
  );
}

