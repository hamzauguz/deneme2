import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { auth } from "../firebase2";
import database from "../firebaseconfig";
import LottieView from "lottie-react-native";

const CheckScreen = ({ navigation }) => {
  const [isim, setIsim] = useState(null);
  const [soyisim, setSoyisim] = useState(null);
  const [no, setNo] = useState(null);
  const [yas, setYas] = useState(null);
  const [checkemail, checksetEmail] = useState(auth.currentUser?.email);

  function addTask() {
    database.collection("Users").add({
      isim: isim,
      soyisim: soyisim,
      no: no,
      yas: yas,
      checkemail: checkemail,
    });
    navigation.navigate("all");
  }

  useEffect(() => {
    const hamza = database
      .collection("Users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((snapshot) => {
          let data = snapshot.data();
          //console.log(data);
          console.log(data.checkemail);
          if (data.checkemail == auth.currentUser?.email) {
            navigation.navigate("all");
          }
        });
      });
  });

  return (
    <SafeAreaView>
      <View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 25,
            fontWeight: "600",
            color: "red",
            top: 10,
          }}
        >
          KAYIDI TAMAMLA
        </Text>
        <Text
          style={{
            textAlign: "center",
            top: 30,
          }}
        >
          Son olarak ufak bir işleminiz kaldı. Ardından kütüphane uygulamasına
          giriş yapabilir. Masa Seçiminden Faydalanabilirsin
        </Text>
      </View>
      <View style={{ top: 50, justifyContent: "center", alignItems: "center" }}>
        <TextInput
          placeholder="İsminiz"
          onChangeText={setIsim}
          value={isim}
          style={{
            height: 40,
            width: "80%",
            backgroundColor: "#b2b2b2",
            bottom: 10,
          }}
        />
        <TextInput
          onChangeText={setSoyisim}
          value={soyisim}
          placeholder="Soyisminiz"
          style={{
            height: 40,
            width: "80%",
            backgroundColor: "#b2b2b2",
            bottom: 0,
          }}
        />

        <TextInput
          onChangeText={setNo}
          value={no}
          placeholder="Telefon Numaranız"
          style={{
            height: 40,
            width: "80%",
            backgroundColor: "#b2b2b2",
            bottom: -10,
          }}
        />
        <TextInput
          onChangeText={setYas}
          value={yas}
          placeholder="Yaşınız"
          style={{
            height: 40,
            width: "80%",
            backgroundColor: "#b2b2b2",
            bottom: -20,
          }}
        />
        <TouchableOpacity
          style={{
            bottom: -40,
            height: 40,
            width: 300,
            backgroundColor: "red",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            navigation.navigate("all");
            addTask();
          }}
        >
          <Text style={{ fontWeight: "600", fontSize: 20 }}>
            Kaydını Tamamla
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CheckScreen;
