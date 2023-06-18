import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScreenHeight, api_key} from '../config';
import MovieCard from '../components/movieCard';

export default function SearchPage(props) {
  const [searchKeyWord, setsearchKeyWord] = useState('');
  const [MoviesList, setMoviesList] = useState([]);
  const [PageNo, setPageNo] = useState(1);
  const [PageSize, setPageSize] = useState(6);

  useEffect(() => {
    if (PageNo != 1) {
      console.log(' Call API AGAIN ' + PageNo);
      callSearchMulti();
    }
  }, [PageNo]);

  const callSearchMulti = () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMWU1Y2I0YWFjYmNjODhiYTM2NjJmOWIzM2Q0ZDFmOCIsInN1YiI6IjVlMjUyMTU1OGYyNmJjMDAxNTdhMWMxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.35O4gSfizObx2nYRViGOG0kqPTwrIujfQ3S641LsYmM',
      },
    };

    fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=` +
        api_key +
        '&query=' +
        searchKeyWord,
      //  +
      // '&page=' +
      // PageNo +
      // '&total_results=' +
      // PageSize,
      // options,
    )
      .then(response => response.json())
      .then(response => {
        if (response) {
          if (response.results) {
            // if (PageNo == 0) {
            console.log(' page ' + response.page);
            setMoviesList(response.results);
            // } else {
            //   setMoviesList(previousState => [
            //     ...previousState,
            //     ...response.results,
            //   ]);
            // }
          } else {
            setMoviesList([]);
          }
        } else {
          setMoviesList([]);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 20,
        }}>
        <Text
          style={{fontSize: 18, fontFamily: 'Anton Regular', color: 'yellow'}}>
          Search Movie By Title or Movie
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={{flex: 0.1}}>
          <TouchableOpacity
            onPress={() => {
              callSearchMulti();
            }}>
            <Image
              source={require('../images/SearchInactive.png')}
              style={{width: 25, height: 25}}
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 0.8}}>
          <TextInput
            value={searchKeyWord}
            onChangeText={text => setsearchKeyWord(text)}
            placeholder="Search more ..."
            placeholderTextColor={'#848587'}
            onSubmitEditing={() => callSearchMulti()}
            style={{
              fontSize: 18,
              color: 'yellow',
              fontFamily: 'WixMadeforText-Regular',
            }}
          />
        </View>
        <View style={{flex: 0.1}}>
          {searchKeyWord != '' ? (
            <TouchableOpacity onPress={() => setsearchKeyWord('')}>
              <Image
                source={require('../images/cancel.png')}
                style={{width: 25, height: 25}}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      <View style={{height: 30}} />

      {MoviesList ? (
        <FlatList
          contentContainerStyle={{paddingHorizontal: 20}}
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
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                height: 200,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'grey', fontSize: 18}}>No Data ....</Text>
            </View>
          )}
          bounces={false}
          ItemSeparatorComponent={() => <View style={{flex: 1, height: 30}} />}
          // onEndReached={() => {
          //   var pageno = PageNo;

          //   setPageNo(pageno + 1);
          // }}
        />
      ) : null}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c27',
    paddingHorizontal: 20,
  },
  inputContainer: {
    backgroundColor: '#34353e',
    height: 50,
    borderRadius: 25,
    flexDirection: 'row',
    marginHorizontal: 20,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
