import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScreenHeight, api_key} from '../config';
import Loading from '../components/loading';
import {FlatList, ScrollView} from 'react-native-gesture-handler';

export default function MovieDetail(props) {
  const [movieId, setmovieId] = useState(
    props.route.params && props.route.params.movieId
      ? props.route.params.movieId
      : null,
  );
  const [movieDetail, setmovieDetail] = useState(null);
  const [recommand, setRecommand] = useState([]);
  const [showLoading, setshowLoading] = useState(true);
  const [crew, setCrewLists] = useState([]);

  const showTime = total => {
    var totalMinutes = total;

    var hours = Math.floor(totalMinutes / 60);
    var minutes = totalMinutes % 60;

    return hours + 'hr ' + minutes + 'm';
  };

  useEffect(() => {
    console.log(' Navigation ' + JSON.stringify(props));
  }, []);

  useEffect(() => {
    if (movieId) {
      callMovieDetail();
      callCrewLists();
      callRecommandation();
    }
  }, [movieId]);

  const callRecommandation = () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMWU1Y2I0YWFjYmNjODhiYTM2NjJmOWIzM2Q0ZDFmOCIsInN1YiI6IjVlMjUyMTU1OGYyNmJjMDAxNTdhMWMxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.35O4gSfizObx2nYRViGOG0kqPTwrIujfQ3S641LsYmM',
      },
    };

    fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=` + api_key + options,
    )
      .then(response => response.json())
      .then(response => {
        setshowLoading(false);
        if (response) {
          console.log(' recommand ' + JSON.stringify(response));
          if (response.results) {
            setRecommand(response.results);
          }
        } else {
          setRecommand(null);
        }
      })
      .catch(err => {
        setshowLoading(false);
        console.log(err);
      });
  };

  const callMovieDetail = () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMWU1Y2I0YWFjYmNjODhiYTM2NjJmOWIzM2Q0ZDFmOCIsInN1YiI6IjVlMjUyMTU1OGYyNmJjMDAxNTdhMWMxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.35O4gSfizObx2nYRViGOG0kqPTwrIujfQ3S641LsYmM',
      },
    };

    fetch('https://api.themoviedb.org/3/movie/' + movieId, options)
      .then(response => response.json())
      .then(response => {
        setshowLoading(false);
        if (response) {
          //  console.log(' page ' + JSON.stringify(response));
          setmovieDetail(response);
        } else {
          setmovieDetail(null);
        }
      })
      .catch(err => {
        setshowLoading(false);
        console.log(err);
      });
  };

  const callCrewLists = () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMWU1Y2I0YWFjYmNjODhiYTM2NjJmOWIzM2Q0ZDFmOCIsInN1YiI6IjVlMjUyMTU1OGYyNmJjMDAxNTdhMWMxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.35O4gSfizObx2nYRViGOG0kqPTwrIujfQ3S641LsYmM',
      },
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US'` +
        movieId,
      options,
    )
      .then(response => response.json())
      .then(response => {
        setshowLoading(false);
        if (response) {
          //  console.log(' people ' + JSON.stringify(response));
          if (response.cast) {
            setCrewLists(response.cast);
          }
        } else {
          setCrewLists(null);
        }
      })
      .catch(err => {
        setshowLoading(false);
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent={true} />
      {showLoading && <Loading />}
      {!showLoading && movieDetail ? (
        <>
          <ImageBackground
            source={{
              uri: encodeURI(
                `https://image.tmdb.org/t/p/original/` +
                  movieDetail.backdrop_path,
              ),
            }}
            style={styles.MoviePoster}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.goBack();
              }}
              style={styles.customBackContainer}>
              <Text style={styles.backTxt}> {'< Back'}</Text>
            </TouchableOpacity>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.DetailContainer}>
                <View style={styles.TitleAndRate}>
                  <View style={{flex: 0.3, paddingHorizontal: 5}}>
                    <Image
                      resizeMode="contain"
                      source={{
                        uri: encodeURI(
                          `https://image.tmdb.org/t/p/original/` +
                            movieDetail.poster_path,
                        ),
                      }}
                      style={{flex: 1, marginTop: 10}}
                    />
                  </View>
                  <View
                    style={{
                      flex: 0.8,
                      justifyContent: 'center',
                      paddingHorizontal: 5,
                      paddingVertical: 5,
                    }}>
                    <Text
                      style={{
                        color: 'yellow',
                        fontSize: 20,
                        fontFamily: 'Anton Regular',
                        marginBottom: 20,
                      }}>
                      {movieDetail.original_title}
                    </Text>

                    {movieDetail.genres ? (
                      <FlatList
                        keyExtractor={(item, index) => item.id}
                        showsHorizontalScrollIndicator={false}
                        data={movieDetail.genres}
                        horizontal={true}
                        renderItem={({item}) => (
                          <View
                            key={item.id}
                            style={{
                              paddingHorizontal: 10,
                              paddingVertical: 4,
                              backgroundColor: 'yellow',
                              borderRadius: 20,
                              marginRight: 5,
                            }}>
                            <Text
                              style={{
                                color: 'black',
                                fontFamily: 'Anton Regular',
                                fontSize: 10,
                              }}>
                              {item.name}
                            </Text>
                          </View>
                        )}
                      />
                    ) : null}

                    <View style={{flexDirection: 'row', marginTop: 10}}>
                      <Text style={{color: 'yellow'}}>Runtime - </Text>
                      <Text style={{color: 'yellow'}}>
                        {movieDetail.runtime
                          ? showTime(movieDetail.runtime)
                          : null}
                      </Text>
                    </View>

                    <View style={{flexDirection: 'row', marginTop: 10}}>
                      <Text style={{color: 'yellow'}}>Ratings - </Text>
                      <Text style={{color: 'yellow'}}>
                        {movieDetail.vote_average
                          ? movieDetail.vote_average.toFixed(1)
                          : null}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 10}}>
                      <Text style={{color: 'yellow'}}>Release Date - </Text>
                      <Text style={{color: 'yellow'}}>
                        {movieDetail.release_date
                          ? movieDetail.release_date.replace(/-/g, '/')
                          : null}
                      </Text>
                    </View>
                    {/* {movieDetail.genres ? (
                    <FlatList
                      data={movieDetail.genres}
                      horizontal={true}
                      renderItem={({item}) => (
                        <View
                          key={item.id}
                          style={{
                            paddingHorizontal: 10,
                            paddingVertical: 4,
                            backgroundColor: 'yellow',
                            borderRadius: 20,
                            marginRight: 5,
                          }}>
                          <Text
                            style={{
                              color: 'black',
                              fontFamily: 'Anton Regular',
                              fontSize: 10,
                            }}>
                            {item.name}
                          </Text>
                        </View>
                      )}
                    />
                  ) : null} */}
                  </View>
                </View>
                <Text
                  style={{
                    color: 'yellow',
                    fontSize: 16,
                    fontFamily: 'Anton Regular',
                  }}>
                  Overview
                </Text>

                <Text style={styles.synosis}>{movieDetail.overview}</Text>

                <View style={{height: 20}} />
                <Text
                  style={{
                    color: 'yellow',
                    fontSize: 16,
                    fontFamily: 'Anton Regular',
                    marginBottom: 20,
                  }}>
                  Cast And Crew
                </Text>
                {crew ? (
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={crew}
                    keyExtractor={(item, index) => item.id}
                    horizontal={true}
                    renderItem={({item}) => (
                      <View
                        style={{
                          borderRadius: 10,
                          marginRight: 10,
                          backgroundColor: 'black',
                          overflow: 'hidden',
                          width: 120,
                        }}>
                        <Image
                          source={{
                            uri:
                              `https://image.tmdb.org/t/p/original/` +
                              item.profile_path,
                          }}
                          style={{width: '100%', height: 100, maxHeight: 120}}
                        />
                        <View
                          style={{
                            backgroundColor: 'yellow',
                            paddingHorizontal: 10,
                            paddingVertical: 10,
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10,
                            height: 70,
                          }}>
                          <Text
                            style={{
                              fontSize: 12,
                              fontFamily: 'WixMadeforText-Regular',
                            }}>
                            {item.original_name}
                          </Text>
                          <Text
                            style={{
                              fontSize: 8,
                              fontFamily: 'WixMadeforText-Regular',
                            }}>
                            {item.character}
                          </Text>
                        </View>
                      </View>
                    )}
                  />
                ) : null}
                <View style={{height: 20}} />
                <Text
                  style={{
                    color: 'yellow',
                    fontSize: 16,
                    fontFamily: 'Anton Regular',
                    marginBottom: 20,
                  }}>
                  Related Movies
                </Text>
                {recommand ? (
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={recommand}
                    keyExtractor={(item, index) => item.id}
                    horizontal={true}
                    renderItem={({item}) => (
                      <View
                        style={{
                          borderRadius: 10,
                          marginRight: 10,
                          backgroundColor: 'black',
                          overflow: 'hidden',
                          width: 200,
                        }}>
                        <Image
                          source={{
                            uri:
                              `https://image.tmdb.org/t/p/original/` +
                              item.poster_path,
                          }}
                          style={{width: '100%', height: 100}}
                        />
                        <View
                          style={{
                            backgroundColor: 'yellow',
                            paddingHorizontal: 10,
                            paddingVertical: 10,
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10,
                            height: 50,
                            maxHeight: 100,
                          }}>
                          <Text
                            style={{
                              fontSize: 12,
                              fontFamily: 'WixMadeforText-Regular',
                            }}>
                            {item.original_title}
                          </Text>
                          {/* <Text
                          style={{
                            fontSize: 8,
                            fontFamily: 'WixMadeforText-Regular',
                          }}>
                          {item.character}
                        </Text> */}
                        </View>
                      </View>
                    )}
                  />
                ) : null}

                <View style={{height: 20}} />
              </View>
            </ScrollView>
          </ImageBackground>
        </>
      ) : null}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  customBackContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    zIndex: 1,
    position: 'absolute',
    marginTop: 20,
  },
  backTxt: {
    color: 'yellow',
    fontFamily: 'Anton Regular',
    fontSize: 18,
    //   position: 'absolute',
  },
  MoviePoster: {
    width: '100%',
    height: ScreenHeight,
  },
  DetailContainer: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    marginHorizontal: 20,
    marginVertical: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
    marginTop: 80,
  },
  TitleAndRate: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  synosis: {
    color: 'yellow',
    fontSize: 14,
    fontFamily: 'WixMadeforText-Regular',
  },
});
