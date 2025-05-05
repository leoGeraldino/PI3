import React from 'react';
import { View, Text, TextInput, Button, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';

export default function RegisterScreen() {
  return (
    <ImageBackground
      source={require('../../assets/images/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Cadastro</Text>

        <View style={styles.inputContainer}>
          <TextInput placeholder="Nome completo" style={styles.input} placeholderTextColor="#555" />
        </View>

        <View style={styles.inputContainer}>
          <TextInput placeholder="E-mail" style={styles.input} keyboardType="email-address" placeholderTextColor="#555" />
        </View>

        <View style={styles.inputContainer}>
          <TextInput placeholder="Senha" style={styles.input} secureTextEntry placeholderTextColor="#555" />
        </View>

        <View style={styles.inputContainer}>
          <TextInput placeholder="Confirmar senha" style={styles.input} secureTextEntry placeholderTextColor="#555" />
        </View>

        <TouchableOpacity style={styles.button} onPress={() => alert('Cadastro realizado!')}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    maxWidth: 800,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 16,
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 24,
    fontFamily: 'Mulish', // depois podemos configurar fonts personalizadas
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    height: 48,
    backgroundColor: '#eeeeee',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#9E5BE1',
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Mulish',
  },
});
