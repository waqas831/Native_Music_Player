import Icon from 'react-native-vector-icons/MaterialIcons';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';
import TrackPlayer, {
  Event,
  State,
  usePlaybackState,
} from 'react-native-track-player';
const SlidesControl = () => {
  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
  const playBackState = usePlaybackState();

  const skipToNext = async () => {
    await TrackPlayer.skipToNext();
  };

  const skipToPrevious = async () => {
    await TrackPlayer.skipToPrevious();
  };

  const togglePlayback = async (playback: State) => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack !== null) {
      if (playback === State.Paused || playback === State.Ready) {
        console.log('play');
        await TrackPlayer.play();
      } else {
        console.log('pause');
        await TrackPlayer.pause();
      }
    }
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={skipToPrevious}>
        <Icon style={styles.icon} name="skip-previous" size={25} />
      </Pressable>
      <Pressable onPress={() => togglePlayback(playBackState)}>
        <Icon
          style={styles.icon}
          name={playBackState === State.Playing ? 'pause' : 'play-arrow'}
          size={40}
        />
      </Pressable>
      <Pressable onPress={skipToNext}>
        <Icon style={styles.icon} name="skip-next" size={25} />
      </Pressable>
    </View>
  );
};

export default SlidesControl;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignItems: 'center',
  },
  icon: {
    color: '#FFFFFF',
  },
  playButton: {
    marginHorizontal: 24,
  },
});
