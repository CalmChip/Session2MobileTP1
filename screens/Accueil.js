import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Accueil({ navigation }) {
  return (
    <View>
      <View style={styles.logoApp}>
        <Image source={require("../assets/logoApp.png")} />
      </View>
      <View style={styles.btn}>
        <TouchableOpacity
          style={styles.button}
          title="Login"
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.login}>Login</Text>
        </TouchableOpacity>
        <View style={styles.btn}>
          <TouchableOpacity
            style={styles.button}
            title="Register"
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.login}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 12,
    borderRadius: 6,
  },
  
  logoApp: {
    margin: 20,
    width: 150,
    height: 200,
    alignSelf: "center",
  },
  button: {
    width: 150,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "blue",
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
  },

  login: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    color: "#fff",
    borderRadius: 19,
    borderColor: "blue",
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
  },
});
