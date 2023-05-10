import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Slider from '@react-native-community/slider';
import {useProgress} from 'react-native-track-player';
import TrackPlayer from 'react-native-track-player';
const SongSlider = () => {
  const {position, duration} = useProgress();
  return (
    <View style={styles.box}>
      <View
        style={{
          position: 'absolute',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.1,
          shadowRadius: 16.0,
          elevation: 24,
        }}>
        <Slider
          style={{width: 320, height: 20}}
          value={position}
          minimumValue={0}
          maximumValue={duration}
          minimumTrackTintColor="red"
          maximumTrackTintColor="black"
          thumbTintColor="red"
          onTouchMove={() => {
            TrackPlayer.pause();
          }}
          onTouchEnd={() => {
            TrackPlayer.play();
          }}
          onValueChange={value => {
            TrackPlayer.seekTo(value);
          }}
        />
        <View style={styles.mainWrapper}>
          <Text style={{color: 'white'}}>
            {new Date(position * 1000).toISOString().substring(15, 19)}
          </Text>
          <Text style={{color: 'white'}}>
            {new Date(position - duration * 1000)
              .toISOString()
              .substring(15, 19)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SongSlider;

const styles = StyleSheet.create({
  box: {
    shadowOffset: {width: 10, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '90%',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    top: 30,
  },
  mainWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
