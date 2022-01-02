import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Button,
  Text,
  SafeAreaView,
  TextInput,
  Alert,
  View,
  TouchableOpacity,
} from "react-native";
import database from "../firebaseconfig";

import { Timer, Countdown } from "react-native-element-timer";
import { useNavigation } from "@react-navigation/core";

const TimerScreen = ({ seconds }) => {
  const timerRef = useRef(null);
  const countdownRef = useRef(null);
  const [minutes, setMinutes] = useState(5);
  const navigation = useNavigation();
  const [timeLeft, setTimeLeft] = useState(null);

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const ref = useRef(null);
  const [dateTime, setDateTime] = useState(new Date());
  const [hamza, setHamza] = useState();

  const myfunc = () => {
    console.log("I was activated 5 seconds later");
  };

  useEffect(() => {
    database
      .collection("Tasks")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((snapshot) => {
          let data = snapshot.data();
          //console.log(data);
          console.log(data.checkemail);
        });
      });
  });
  /* 
  const pressHandler = () => {
    Alert.alert("Kütüphane", "Kütüphanenin içindemisiniz?", [
      {
        text: "Evet Kütüphanedeyim",
        onPress: () => {
          console.log("Yes is pressed");
        },
      },
      {
        text: "Hayır(30 dakikanız var reserve için)",
        onPress: () => noHandler(),
      },
    ]);
  };
  const noHandler = () => {
    setName("");
    setAge(0);
    setGender("");
  };
  */

  const second2 = new Date().getSeconds();
  const minute = new Date().getMinutes();
  const second = new Date().getSeconds();
  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          fontSize: 20,
          color: "red",
        }}
      >
        {second2}
      </Text>
      <Text
        style={{
          fontSize: 20,
          color: "red",
        }}
      >
        {second}
      </Text>
      <Text
        style={{
          fontSize: 20,
          color: "red",
        }}
      >
        {`${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`}
      </Text>

      {/* 
      <TextInput
        onChangeText={(text) => setName(text)}
        style={{ backgroundColor: "red", height: 30, width: 100 }}
      />
      <TextInput
        onChangeText={(text) => setAge(text)}
        style={{ backgroundColor: "red", height: 30, width: 100, top: 20 }}
      />
      <TextInput
        onChangeText={(text) => setGender(text)}
        style={{ backgroundColor: "red", height: 30, width: 100, top: 40 }}
      />
      <View style={{ top: 50 }}>
        <Button title="Submit" onPress={() => pressHandler()} />
        <Text>
          {name} {age} {gender}
        </Text>
      </View>

      
      <Text style={styles.text}>Countdown:</Text>
      <Countdown
        ref={countdownRef}
        style={styles.timer}
        textStyle={styles.timerText}
        initialSeconds={minutes}
        onTimes={() => {}}
        onPause={() => {}}
        onEnd={() => {
          navigation.navigate("all");
        }}
      />
      <Button
        style={styles.button}
        title={"Start"}
        onPress={() => {
          countdownRef.current.start();
        }}
      />
      <Button
        style={styles.button}
        title={"Pause"}
        onPress={() => {
          countdownRef.current.pause();
        }}
      />
      <Button
        style={styles.button}
        title={"Resume"}
        onPress={() => {
          countdownRef.current.resume();
        }}
      />
      <Button
        style={styles.button}
        title={"Stop"}
        onPress={() => {
          countdownRef.current.stop();
        }}
      />
      */}
    </SafeAreaView>
  );
};

export default TimerScreen;

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
