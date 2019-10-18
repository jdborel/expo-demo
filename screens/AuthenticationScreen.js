import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AppSettings from '../constants/AppSettings';

export default class AuthenticationScreen extends Component {
  static navigationOptions = {
    title: 'React Native',
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{ width: 300, height: 300, alignSelf: 'center' }}
          source={{ uri: AppSettings.logoUrl }} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate('Main');
          }}>
          <Text style={styles.buttonLabel}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    width: '80%',
    position: 'absolute',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#5EDCF8',
    padding: 16,
    bottom: 16,
    borderRadius: 10,
  },
  buttonLabel: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'flex-end'
  }
});