import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {addTrack, setupPlayer} from './MusicPlayerService';
import AudioMusicPlayer from './screens/AudioMusicPlayer';
import MediaPlayer from './screens/videos/MediaPlayer';


function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [isPlaying, setIsplaying] = useState(false);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const setup = async () => {
    let isSetup = await setupPlayer();
    if (isSetup) {
      await addTrack();
    }
    setIsplaying(isSetup);
  };

  useEffect(() => {
    setup();
  }, []);

  if (!isPlaying) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.backgroundStyle}>
         <MediaPlayer />
      {/* <ScrollView contentInsetAdjustmentBehavior="automatic"> */}
        <View>
          {/* <AudioMusicPlayer /> */}
        </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: '#251356',
    height: '100%',
  },
});

export default App;
