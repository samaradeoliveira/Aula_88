import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import * as Font from 'expo-font';
import { RFValue } from "react-native-responsive-fontsize";

import firebase from 'firebase';
import db from '../config'

let customFonts = {
    "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
  };
export default class AppTitle extends React.Component {
    constructor() {
        super();
        this.state = {
            light_theme: true
        }
    }

    componentDidMount() {
        let theme
        firebase
            .database()
            // .ref("/users/" + firebase.auth().currentUser.uid)
            // .on("value", function (snapshot) {
            //     theme = snapshot.val().current_theme;
            // });
            .ref('/')
            .on('value', data => {
                theme = data.val().current_theme;
            })
        this.setState({
            light_theme: theme === "light" ? true : false,
        });
    }
    render() {
        return (
            <View style={styles.appTitle}>
                <View style={styles.appIcon}>
                    <Image
                        source={require("../assets/logo.png")}
                        style={styles.iconImage}
                    ></Image>
                </View>
                <View style={styles.appTitleTextContainer}>
                    <Text style={this.state.light_theme?
                    styles.appTitleTextLight:
                    styles.appTitleText}>{this.props.title}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    appTitle: {
        flex: 0.07,
        flexDirection: "row",
    },
    appIcon: {
        flex: 0.3,
        justifyContent: "center",
        alignItems: "center",
    },
    iconImage: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
    appTitleTextContainer: {
        flex: 0.7,
        justifyContent: "center",
    },
    appTitleText: {
        color: "white",
        fontSize: RFValue(28),
        fontFamily: "Bubblegum-Sans"
    },
      appTitleTextLight: {
        color: "black",
        fontSize: RFValue(28),
        fontFamily: "Bubblegum-Sans"
    },
})