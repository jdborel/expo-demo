import React, { Component } from 'react';
import { Text, View, Image, SafeAreaView, FlatList, TouchableOpacity, StyleSheet  } from 'react-native';
import AppSettings from '../constants/AppSettings';

var moment = require('moment');
moment().format();

export default class MoviesList extends Component {
  
  state = { 
    isLoading: false,
    pageNumber: 1,
    movies: [] 
  };

  componentDidMount(){
    this.fetchNewReleases();
  }

  render() {
    return (
      <SafeAreaView>
        <FlatList
          horizontal={false}
          data={this.state.movies}
          renderItem={this.renderMovieListItem}
          keyExtractor={item => item.id.toString()}
          onRefresh={() => this.fetchNewReleases()}
          onEndReached={() => this.handleLoadMoreContent()}
          onEndReachedThreshold = {1}
          refreshing={this.state.isLoading}
        />
      </SafeAreaView>
    );
  }

  renderMovieListItem = ({ item }) => <MoviesListItem navigation={this.props.navigation} movie={item} />;

  fetchNewReleases(){
    this.setState({isLoading: true});
    fetch(`${AppSettings.baseUrl}/3/movie/upcoming?api_key=${AppSettings.apiKey}&language=en-US&page=${this.state.pageNumber}`)
    .then((response) => response.json())
    .then((responseJson) => {
        this.setState({movies: [...this.state.movies, ...responseJson.results], isLoading: false})
      })
    .catch((error) => {
      console.log(error);
    });
  }

  handleLoadMoreContent(){
    this.setState({pageNumber: this.state.pageNumber + 1}, () => {
      this.fetchNewReleases();
    });
  }
}

class MoviesListItem extends Component{
  render(){
    return(
      <TouchableOpacity 
        style={styles.container}
        onPress={() => {
          const {navigate} = this.props.navigation;
          navigate('Movie', { movie: this.props.movie })
        }}
      >
        <View style={styles.movie}>
          <Image 
            style={{width: 200, height: 300}}
            source={{uri: `${AppSettings.imageBaseUrl}/w300${this.props.movie.poster_path}`}}/>
          <Text style={styles.label}>Rating: {this.props.movie.vote_average}/10</Text>
          <Text style={styles.label}>{moment(new Date(this.props.movie.release_date)).format('LL')}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: { 
    flexDirection: 'row', 
    justifyContent: 'center',
    margin: 16
  },
  movie: {
    borderColor: '#D8D8D8', 
    borderWidth: 1, 
    paddingBottom: 8
  },
  label: {
    fontSize: 18,
    alignSelf: 'center'
  }
});