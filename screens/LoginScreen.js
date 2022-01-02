import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import * as GoogleSignIn from "expo-google-sign-in";
import LottieView from "lottie-react-native";

import { auth } from "../firebase2";
import firebase from "../firebaseconfig";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [hidePass, setHidePass] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("CheckScreen");
      }
    });

    return unsubscribe;
  }, []);

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
    <KeyboardAvoidingView style={{ width: "100%", height: "100%" }}>
      <Image
        style={{ height: "50%" }}
        source={require("../assets/library.jpeg")}
      />
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
              navigation.navigate("SignUpScreen");
            }}
            style={{ color: "blue" }}
          >
            Hesabınız yokmu? Şimdi kaydolun.
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
              value={email}
              onChangeText={(text) => setEmail(text)}
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
              value={password}
              onChangeText={(text) => setPassword(text)}
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
            <TouchableOpacity>
              <Text
                style={{ left: 190, bottom: 20, fontSize: 14, color: "gray" }}
              >
                Şifremi Unuttum.
              </Text>
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
              onPress={handleLogin}
            >
              <Text style={{ fontSize: 20, fontWeight: "400", color: "white" }}>
                Giriş Yap
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
    </KeyboardAvoidingView>
  );
}
