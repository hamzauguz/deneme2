import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { auth } from "../firebase2";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [hidePass, setHidePass] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("LoginScreen");
      }
    });

    return unsubscribe;
  }, []);

  function handleSignUp() {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered with:", user.email);
      })
      .catch((error) => alert("Incorrect"));
  }

  function handleLogin() {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
      })
      .catch((error) => alert("Incorrect"));
  }

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <Image style={{ height: "50%" }} source={require("../assets/bey.jpeg")} />
      <View
        style={{
          backgroundColor: "white",
          height: "100%",
          borderTopStartRadius: 60,
          borderTopRightRadius: 60,
          bottom: 80,

          width: "100%",
        }}
      >
        <View style={{ left: 40, top: 20 }}>
          <Text
            style={{
              fontSize: 21,
              fontWeight: "600",
            }}
          >
            Hoşgeldiniz
          </Text>
          <Text
            onPress={() => {
              navigation.navigate("LoginScreen");
            }}
            style={{ color: "blue" }}
          >
            Hesabınız varmı? Şimdi Giriş Yap.
          </Text>
        </View>
        <View style={{ top: 50, left: 40 }}>
          <View
            style={{
              backgroundColor: "#ffab5e",
              height: 40,
              width: "80%",
              borderRadius: 20,
            }}
          >
            <TextInput
              placeholder="Lütfen Mail Adresinizi Giriniz..."
              style={{
                height: 40,
                left: 10,
              }}
            />
          </View>
          <View
            style={{
              backgroundColor: "#ffab5e",
              height: 40,
              width: "80%",
              borderRadius: 20,
              top: 15,
            }}
          >
            <TextInput
              secureTextEntry={hidePass ? true : false}
              placeholder="Lütfen Şifrenizi giriniz..."
              style={{
                height: 40,
                left: 10,
              }}
            />
            <TouchableOpacity>
              <Ionicons
                style={{ left: 275, top: -35 }}
                size={25}
                name={hidePass ? "eye-off" : "eye"}
                color="black"
                onPress={() => setHidePass(!hidePass)}
              />
            </TouchableOpacity>
          </View>
          <View style={{ top: 70 }}>
            <TouchableOpacity
              style={{
                height: 40,
                width: 200,
                backgroundColor: "#ffab5e",
                alignItems: "center",
                justifyContent: "center",
                left: 60,
                borderRadius: 20,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "400", color: "white" }}>
                Kayıt Ol
              </Text>
            </TouchableOpacity>
            <Text style={{ left: 140, top: 50 }}>Ya da</Text>
            <View style={{ flexDirection: "row", top: 100, left: 70 }}>
              <TouchableOpacity>
                <Image
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                  }}
                  source={require("../assets/face.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                    left: 20,
                    top: 3,
                  }}
                  source={require("../assets/google.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  style={{
                    height: 45,
                    width: 45,
                    borderRadius: 20,
                    left: 37,
                    top: -2,
                  }}
                  source={require("../assets/apple.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({});
