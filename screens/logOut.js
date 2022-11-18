import * as React from 'react';
import {View, Text} from 'react-native';
import firebase from 'firebase'

export default class LogOut extends React.Component{
    componentDidMount(){
        // firebase.auth().signOut();
        this.props.navigation.navigate('LoginScreen')
    }

    render(){
        return(
            <View style={{flex:1, alignItems: 'center' }}>
                <Text style={{alignSelf: 'center'}}>Log Out</Text>
            </View>
        )
    }
}