import RNFS from 'react-native-fs';
import {useEffect, useState, useRef} from 'react';
import {
  FlatList,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Video from 'react-native-video';
import RNFetchBlob from 'rn-fetch-blob';
import { PERMISSIONS } from '../../constants/Permissions';

function MediaPlayer() {
  const [videos, setVideos] = useState<any>();
  const videoPlayer = useRef<any>();

  const permission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
       PERMISSIONS
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const videoFiles: any = [];

        const dirs = await RNFS.readDir(RNFS.ExternalStorageDirectoryPath);
        console.log('dirs', dirs);

      
        const filterVideoFiles = (files: any) => {
          return files.reduce((result: any, file: any) => {
            const extension = file.name.split('.').pop().toLowerCase();
            if (
              ['mp4', 'mov', 'avi', 'wmv', 'flv', 'mkv', 'webm'].includes(
                extension,
              )
            ) {
              result.push(`file://${file.path}`);
            }
            return result;
          }, []);
        };

        const processDir = async (dir: any) => {
          console.log('dir', dir);
          try {
            const files = await RNFS.readDir(dir.path);
            const videoFilesInDir = filterVideoFiles(files);
            videoFiles.push(...videoFilesInDir);
            const subdirs = files.filter(file => file.isDirectory());
            await Promise.all(subdirs.map(processDir));
          } catch (error) {
            return;
          }
        };

        await Promise.all(dirs.map(processDir));
        console.log('videoFiles', videoFiles);

        setVideos(videoFiles.slice(0, 50));
      } else {
        console.log('Storage permission denied');
      }
    } catch (error) {
      console.log('Error getting videos', error);
    }
  };

  useEffect(() => {
    permission();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={videos}
          keyExtractor={item => item}
          renderItem={({item}) => (
            console.log('item', item),
            (
              <Video
                ref={videoPlayer}
                source={{uri: item}}
                repeat={false}
                paused={true}
                style={styles.video}
                resizeMode="cover"
                progressUpdateInterval={250.0}
              />
            )
          )}
        />
      </View>
    </>
  );
}

export default MediaPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  video: {
    width: 150,
    height: 150,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 30,
  },
});
