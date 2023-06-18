import react from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {ScreenWidth} from '../config';

function MovieCard(props) {
  return (
    <View
      style={{
        flex: 1,

        marginLeft: props.index % 2 == 0 ? 0 : 20,
      }}>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('MovieDetail', {
            movieData: props.item,
            movieId: props.item.id,
          });
        }}>
        <View
          style={{
            borderRadius: 15,
            overflow: 'hidden',
            backgroundColor: 'yellow',
            width: props.ImageWd,
          }}>
          <Image
            source={{uri: props.Image}}
            resizeMode="stretch"
            style={{
              width: props.ImageWd,
              height: props.ImageHeight,
            }}
          />
        </View>
        <Text
          style={{
            color: 'yellow',
            fontSize: 18,
            fontWeight: '600',
            marginTop: 20,
            fontFamily: 'WixMadeforText-Regular',
          }}>
          {props.MovieTitle}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default MovieCard;
