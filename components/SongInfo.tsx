import {StyleSheet, Text, View} from 'react-native';
import React, {PropsWithChildren} from 'react';
import {Track} from 'react-native-track-player';

type SongInfoProps = PropsWithChildren<{
  Track: Track | undefined | null;
}>;

const SongInfo = ({track}: any) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.textColor}>{track?.title}</Text>
      <Text style={styles.textColor}>{track?.artist}</Text>
    </View>
  );
};

export default SongInfo;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    justifyContent: 'center',
    marginVertical: 20,
    marginHorizontal: 30,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textColor: {
    color: 'white',
    marginHorizontal: 10,
    fontSize: 14,
    textAlign: 'justify',
    marginTop: 10,
    marginBottom: 10,
  },
});
