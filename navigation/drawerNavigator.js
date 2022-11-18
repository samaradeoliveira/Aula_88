import * as React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';

import Profile from '../screens/profile';
import StackNavigator from './stackNavigator';
import LogOut from '../screens/logOut';
import CustomSidebarMenu from '../screens/customSideBarMenu';
import firebase from 'firebase';

const Drawer = createDrawerNavigator()
export default class DrawerNavigator extends React.Component {
  constructor() {
    super();
    this.state = {
      light_theme: true,
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
      <Drawer.Navigator drawerContentOptions={{
        activeTintColor: "#e91e63",
        inactiveTintColor: this.state.light_theme ? "black" : "white",
        itemStyle: { marginVertical: 5 }
      }}
      drawerContent={props => <CustomSidebarMenu {...props} />}>
        
        <Drawer.Screen name='Home' component={StackNavigator} options={{ unmontOnBlur: true }} />
        <Drawer.Screen name='Profile' component={Profile} options={{ unmontOnBlur: true }} />
        <Drawer.Screen name='Log Out' component={LogOut} options={{ unmontOnBlur: true }} />
      </Drawer.Navigator>
    );
  }
}