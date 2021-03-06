import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import * as firebase from "firebase";

export default class TestScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      currentPassword: "",
      newPassword: "",
      newEmail: "",
    };
  }

  // Occurs when signout is pressed...

  // Reauthenticates the current user and returns a promise...
  reauthenticate = (currentPassword) => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    return user.reauthenticateWithCredential(cred);
  };

  // Changes user's password...
  onChangePasswordPress = () => {
    this.reauthenticate(this.state.currentPassword)
      .then(() => {
        var user = firebase.auth().currentUser;
        user
          .updatePassword(this.state.newPassword)
          .then(() => {
            Alert.alert("Password was changed");
          })
          .catch((error) => {
            console.log(error.message);
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // Changes user's email...
  onChangeEmailPress = () => {
    this.reauthenticate(this.state.currentPassword)
      .then(() => {
        var user = auth().currentUser;
        user
          .updateEmail(this.state.newEmail)
          .then(() => {
            Alert.alert("Email was changed");
          })
          .catch((error) => {
            console.log(error.message);
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          flexDirection: "column",
          paddingVertical: 50,
          paddingHorizontal: 10,
        }}
      >
        <TextInput
          style={styles.textInput}
          value={this.state.currentPassword}
          placeholder="Current Password"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={(text) => {
            this.setState({ currentPassword: text });
          }}
        />

        <TextInput
          style={styles.textInput}
          value={this.state.newPassword}
          placeholder="New Password"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={(text) => {
            this.setState({ newPassword: text });
          }}
        />
        <TouchableOpacity
          onPress={this.onChangePasswordPress}
          style={{ height: 40, width: 100, backgroundColor: "gray" }}
        >
          <Text>??ifreyi De??i??tir</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "gray",
    marginVertical: 20,
    padding: 10,
    height: 40,
    alignSelf: "stretch",
    fontSize: 18,
  },
});
