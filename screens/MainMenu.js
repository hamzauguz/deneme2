import React, { Component, useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Text,
  TextInput,
  LogBox,
  Alert,
  StyleSheet,
  Button,
} from "react-native";
import CheckBox from "react-native-check-box";
import database from "../firebaseconfig";
import { auth } from "../firebase2";
import LottieView from "lottie-react-native";

LogBox.ignoreLogs(["Setting a timer"]);

export default function MainMenu({ navigation }) {
  const [task, setTask] = useState([]);
  const [timeLeft, setTimeLeft] = useState(10);
  const [timeLeft2, setTimeLeft2] = useState(null);

  const [email, setemail] = useState(auth.currentUser?.email);
  const [isChecked, setIsChecked] = useState(false);
  const [mins, setMins] = useState(2);
  const [secs, setSecs] = useState(2);
  const timerRef = useRef(null);
  const [minutes, setMinutes] = useState(5);
  function handleSignOut() {
    auth
      .signOut()
      .then(() => {
        navigation.replace("LoginScreen");
      })
      .catch((error) => alert(error.message));
  }

  useEffect(() => {
    const routeref = database.collection("Tasks");
    routeref.onSnapshot((query) => {
      const list = [];
      query.forEach((doc) => {
        list.push({ ...doc.data() });
      });
      setTask(list);
    });

    if (timeLeft === 1) {
      console.log("TIME LEFT IS 0");
      database
        .collection("Tasks")
        .where("saat", "in", [auth.currentUser?.email])
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            doc.ref.update({
              description: false,
              email: "",
              saat: "bos",
            });
          });
        });
    }

    // exit early when we reach 0
    if (!timeLeft) return;
    //if (!timeLeft2) return;

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    console.log(timeLeft);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  return (
    <SafeAreaView style={{ top: 10 }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={task}
        renderItem={({ item }) => {
          return (
            <CheckBox
              checkedImage={
                item.email == auth.currentUser?.email ? (
                  <LottieView
                    source={require("../assets/animations/cat.json")}
                    style={{ height: 80, alignSelf: "center", width: 80 }}
                    autoPlay
                    speed={2}
                    loop={false}
                  />
                ) : (
                  <LottieView
                    source={require("../assets/animations/close.json")}
                    style={{ height: 80, alignSelf: "center", width: 80 }}
                    autoPlay
                    speed={0.5}
                    loop={false}
                  />
                )
              }
              unCheckedImage={
                <LottieView
                  source={require("../assets/animations/check.json")}
                  style={{ height: 80, alignSelf: "center", width: 80 }}
                  autoPlay
                  speed={0.5}
                  loop={false}
                />
              }
              style={{
                flex: 1,
                padding: 20,
                backgroundColor: "gray",
                borderBottomColor: "red",
                borderWidth: 2,
              }}
              onClick={() => {
                if (
                  item.description === true &&
                  item.email === auth.currentUser?.email
                ) {
                  database
                    .collection("Tasks")
                    .where("id", "in", [item.id])
                    .get()
                    .then(function (querySnapshot) {
                      querySnapshot.forEach(function (doc) {
                        doc.ref.update({
                          description: false,
                          email: "",
                        });
                      });
                    });
                } else if (item.description === false) {
                  Alert.alert("Kütüphane", "Kütüphanenin içindemisiniz?", [
                    {
                      text: "Evet Kütüphanedeyim",
                      onPress: () => {
                        database
                          .collection("Tasks")
                          .where("id", "in", [item.id])
                          .get()
                          .then(function (querySnapshot) {
                            querySnapshot.forEach(function (doc) {
                              doc.ref.update({
                                description: true,
                                email: email,
                              });
                            });
                          });
                      },
                    },
                    {
                      text: "Hayır(30 dakikanız var reserve için)",
                      onPress: () => {
                        setTimeLeft(5);

                        console.log("Hayır(30 dakikanız var reserve için)");
                        database
                          .collection("Tasks")
                          .where("id", "in", [item.id])
                          .get()
                          .then(function (querySnapshot) {
                            querySnapshot.forEach(function (doc) {
                              doc.ref.update({
                                description: true,
                                email: email,
                                saat: auth.currentUser?.email,
                              });
                            });
                          });
                      },
                    },
                  ]);
                }
              }}
              isChecked={item.description}
              leftText={`Özel Masa ${item.id} ${item.email} `}
            />
          );
        }}
      />

      <TouchableOpacity onPress={handleSignOut}>
        <Text>çikiş yap</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("saatdeneme");
        }}
      >
        <Text style={{ fontSize: 40 }}>bas</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 40,
  },
  timer: {
    marginVertical: 10,
  },
  timerText: {
    fontSize: 20,
  },
  button: {
    marginVertical: 5,
    backgroundColor: "white",
    borderRadius: 24,
    width: 100,
  },
});
