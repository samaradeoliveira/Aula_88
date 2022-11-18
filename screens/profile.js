import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, SafeAreaView, StatusBar, Platform, Dimensions, Switch, Image } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { RFValue } from "react-native-responsive-fontsize";
import firebase from 'firebase';

import AppTitle from '../components/AppTitle'

let customFonts = {
    "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};
export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fontsLoaded: false,
            isEnabled: false,
            light_theme: true,
            profile_image: '',
            name: '',
            lightText: 'Light theme',
            darkText: 'Dark theme'
        }
    }

    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
    }
    componentDidMount() {
        this._loadFontsAsync();
        this.fetchUser();
    }

    toggleSwitch() {
        const previous_state = this.state.isEnabled;
        const theme = !this.state.isEnabled ? "dark" : "light";
        var updates = {};
        // updates[
        //     "/users/" + firebase.auth().currentUser.uid + "/current_theme"
        // ] = theme;
        firebase
            .database()
            .ref('/')
            .update({current_theme: theme});
        this.setState({ isEnabled: !previous_state, light_theme: previous_state });
    }

    async fetchUser() {
        let theme, name, image;
        await firebase
            .database()
            // .ref("/users/" + firebase.auth().currentUser.uid)
            // .on("value", function (snapshot) {
            //     theme = snapshot.val().current_theme;
            //     name = `${ snapshot.val().first_name } ${ snapshot.val().last_name }`;
            //     image = snapshot.val().profile_picture;
            // });
            .ref('/')
            .on('value', data=>{
                theme = data.val().current_theme;
            })
        this.setState({
            light_theme: theme === "light" ? true : false,
            isEnabled: theme === "light" ? false : true,
            name: name,
            profile_image: image
        });
    }

    render() {
        if (!this.state.fontsLoaded) {
            return <AppLoading />

        } else {
            return (
                <View style={this.state.light_theme?
                    styles.containerLight:
                    styles.container} >
                    <SafeAreaView style={styles.droidSafeArea} />
                    <AppTitle title={'Story Telling App'} />

                    <View style={styles.screenContainer}>
                        <View style={styles.profileImageContainer}>
                            <Image style={styles.profileImage} source={{ uri: this.state.profile_image }} />
                            <Text style={this.state.light_theme?
                            styles.nameTextLight:
                            styles.nameText}>{this.state.name}</Text>
                        </View>
                        <View style={styles.themeContainer}>
                            <Text style={this.state.light_theme?
                            styles.themeTextLight:
                            styles.themeText}>{this.state.light_theme?
                            this.state.lightText:
                            this.state.darkText} </Text>
                            <Switch
                                style={{
                                    transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }]
                                }}
                                trackColor={{ false: "#767577", true: this.state.light_theme?"#eee": "white" }}
                                thumbColor={this.state.isEnabled ? "#ee8249" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={() => this.toggleSwitch()}
                                value={this.state.isEnabled}
                            />
                        </View>
                        <View style={{ flex: 0.3 }} />
                    </View>
                    <View style={{ flex: 0.08 }} />
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#15193c"
    },
    containerLight: {
      flex: 1,
      backgroundColor: "white"
    },
    droidSafeArea: {
      marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
    },
    appTitle: {
      flex: 0.07,
      flexDirection: "row"
    },
    appIcon: {
      flex: 0.3,
      justifyContent: "center",
      alignItems: "center"
    },
    iconImage: {
      width: "100%",
      height: "100%",
      resizeMode: "contain"
    },
    appTitleTextContainer: {
      flex: 0.7,
      justifyContent: "center"
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
    screenContainer: {
      flex: 0.85
    },
    profileImageContainer: {
      flex: 0.5,
      justifyContent: "center",
      alignItems: "center"
    },
    profileImage: {
      width: RFValue(140),
      height: RFValue(140),
      borderRadius: RFValue(70)
    },
  
    nameText: {
      color: "white",
      fontSize: RFValue(40),
      fontFamily: "Bubblegum-Sans",
      marginTop: RFValue(10)
    },
    nameTextLight: {
      color: "black",
      fontSize: RFValue(40),
      fontFamily: "Bubblegum-Sans",
      marginTop: RFValue(10)
    },
    themeContainer: {
      flex: 0.2,
      flexDirection: "row",
      justifyContent: "center",
      marginTop: RFValue(20)
    },
    themeText: {
      color: "white",
      fontSize: RFValue(30),
      fontFamily: "Bubblegum-Sans",
      marginRight: RFValue(15)
    },
    themeTextLight: {
      color: "black",
      fontSize: RFValue(30),
      fontFamily: "Bubblegum-Sans",
      marginRight: RFValue(15)
    }
  });