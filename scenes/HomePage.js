import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  FlatList,
  Alert,
} from 'react-native';

import React, {useEffect, useState} from 'react';
import {IsIos, ScreenHeight, ScreenWidth, api_key} from '../config';
import MovieCard from '../components/movieCard';

export default function HomePage(props) {
  const [MoviesList, setMoviesList] = useState([]);
  const [PageNo, setPageNo] = useState(1);
  const [PageSize, setPageSize] = useState(6);

  useEffect(() => {
    callPopularListMovies();
  }, []);

  useEffect(() => {
    if (PageNo != 1) {
      callPopularListMovies();
    }
  }, [PageNo]);

  const callPopularListMovies = () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMWU1Y2I0YWFjYmNjODhiYTM2NjJmOWIzM2Q0ZDFmOCIsInN1YiI6IjVlMjUyMTU1OGYyNmJjMDAxNTdhMWMxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.35O4gSfizObx2nYRViGOG0kqPTwrIujfQ3S641LsYmM',
      },
    };

    fetch(
      'https://api.themoviedb.org/3/movie/popular?api_key=' +
        api_key +
        '&page=' +
        PageNo +
        '&total_results=' +
        PageSize,
      options,
    )
      .then(response => response.json())
      .then(response => {
        if (response) {
          console.log(' page ' + JSON.stringify(response));

          if (response.results) {
            if (PageNo == 0) {
              console.log(' page ' + response.page);
              setMoviesList(response.results);
            } else {
              setMoviesList(previousState => [
                ...previousState,
                ...response.results,
              ]);
            }
          }
        }
      })
      .catch(err => Alert.alert(err));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Title  */}
      <ImageBackground
        resizeMode="cover"
        source={require('../images/BigImage.jpg')}
        style={{width: ScreenWidth, height: ScreenHeight / 3.5}}>
        <View style={styles.TitleContainer}>
          <Text style={styles.SmallTxt}>
            Welcome To Movie Database Application 👋
          </Text>
          <Text style={styles.BigTxt}>Let's relax and watch a movie !</Text>
        </View>
      </ImageBackground>
      <View style={styles.separater} />

      <View style={styles.ListTitleContainer}>
        <Text style={styles.ListTitle}>Popular Movies</Text>
      </View>
      <View style={{paddingHorizontal: 20}}>
        {MoviesList ? (
          <FlatList
            data={MoviesList}
            renderItem={({item, index}) => (
              <MovieCard
                Image={encodeURI(
                  `https://image.tmdb.org/t/p/original/` + item.poster_path,
                )}
                ImageHeight={250}
                MovieTitle={item.original_title}
                index={index}
                item={item}
                navigation={props.navigation}
              />
            )}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
            initialNumToRender={6}
            showsVerticalScrollIndicator={false}
            bounces={false}
            ItemSeparatorComponent={() => (
              <View style={{flex: 1, height: 30}} />
            )}
            onEndReached={() => {
              var pageno = PageNo;

              setPageNo(pageno + 1);
            }}
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c27',
  },
  SmallTxt: {
    color: 'yellow',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
    fontFamily: IsIos ? 'Anton Regular' : 'anton-regular',
  },
  BigTxt: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: IsIos ? 'Anton Regular' : 'anton-regular',
  },
  TitleContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  separater: {
    height: 5,
    backgroundColor: 'yellow',
  },
  ListTitleContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  ListTitle: {
    color: 'yellow',
    fontSize: 20,
    fontFamily: IsIos ? 'WixMadeforText-Regular' : 'wixmadefortext-regular.ttf',
  },
});
