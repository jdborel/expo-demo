import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import NewReleasesList from '../components/NewReleasesList';

export default class NewReleasesScreen extends Component {

  static navigationOptions = {
    title: 'New Releases',
  };

  render() {
    return (
      <View style={styles.container}>
        <NewReleasesList navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 8
  }
});