import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AppSettings from '../constants/AppSettings';
import QRCode from 'react-native-qrcode-svg';

export default class MovieScreen extends Component {
  state = {
    isTicketPurchased: false,
    movie: {}
  };

  componentDidMount() {
    const { navigation } = this.props;
    this.setState({ movie: navigation.getParam('movie', {}) })
  }

  render() {
    return (
      <View style={styles.container}>
        <QrCode movie={this.state.movie} isVisible={this.state.isTicketPurchased} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {

            Alert.alert(
              'Ticket Purchased',
              'Please have your QR code ready to be scanned.',
              [{ text: 'Ok', onPress: () => { this.setState({ isTicketPurchased: true }) } }],
              { cancelable: false },
            );
          }}>
          <Text style={styles.buttonLabel}>Purchase Ticket</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function QrCode(props) {
  if (props.isVisible) {
    return (
      <View style={styles.qrCode}>
        <QRCode value={props.movie.title} size={300} />
      </View>
    );
  }

  return (
    <View>
      <Image
        style={styles.image}
        source={{ uri: `${AppSettings.imageBaseUrl}/w500${props.movie.poster_path}` }} />
      <Text style={styles.title}>{props.movie.title}</Text>
    </View>
  );
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
  },
  qrCode: {
    alignSelf: 'center',
    marginTop: 32
  },
  image: {
    width: 300,
    height: 500,
    marginTop: 16,
    alignSelf: 'center',
    borderColor: 'black',
    borderWidth: 2
  },
  title: {
    fontSize: 30,
    marginTop: 8,
    marginLeft: 32,
    marginRight: 32,
    textAlign: 'center'
  }
});