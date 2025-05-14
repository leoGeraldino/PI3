import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../../assets/images/background.png")}
      style={styles.introducao}
    >
      <View style={styles.container}>
        <Text style={styles.titulo1}>Bem-vindo de volta!</Text>
        <Text style={styles.titulo2}>Por favor, faça login</Text>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="E-mail"
            style={[styles.campo, styles.input]}
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Senha"
            style={[styles.campo, styles.input]}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          onPress={() => router.push("/calendar")}
          style={styles.botao}
        >
          <Text style={styles.botaoTexto}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/register")}>
          <Text style={styles.link}>Criar conta</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  introducao: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    padding: 0,
  },
  titulo1: {
    fontSize: 48,
    color: "white",
    fontWeight: "400",
    marginBottom: 10,
  },
  titulo2: {
    fontSize: 24,
    color: "white",
    fontWeight: "400",
    marginBottom: 40,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  campo: {
    height: 50,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "black",
    fontSize: 16,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: "#eeeeee",
  },
  input: {
    backgroundColor: "#eeeeee",
  },
  botao: {
    width: "100%",
    maxWidth: 400,
    height: 50,
    backgroundColor: "#9E5BE1",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  botaoTexto: {
    fontSize: 18,
    color: "white",
    fontWeight: "400",
  },
  link: {
    color: "#0066cc",
    textAlign: "center",
    marginTop: 16,
  },
});
