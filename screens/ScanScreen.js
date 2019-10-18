import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

export default class ScanScreen extends Component {

  static navigationOptions = {
    title: 'Scan Tickets',
  };

  state = {
    isCodeScanned: false,
    isCameraPermissionEnabled: null
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  render() {
    const { isCameraPermissionEnabled, isCodeScanned } = this.state;

    if (isCameraPermissionEnabled === null) {
      return <Text>Requesting camera access...</Text>;
    }
    if (isCameraPermissionEnabled === false) {
      return <Text>It looks like you've denied access to the camera. Please enable camera permissions in your Settings.</Text>;
    }
    return (
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={isCodeScanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {isCodeScanned && (<Button title={'SCAN AGAIN'} onPress={() => this.setState({ isCodeScanned: false })} />)}
      </View>
    );
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ isCameraPermissionEnabled: status });
  };

  handleBarCodeScanned = ({ data }) => {
    this.setState({ isCodeScanned: true });
    alert(`Ticket for ${data} scanned!`);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  }
});