/**
 * @format
 */
import TrackPlayer from 'react-native-track-player';
import {AppRegistry} from 'react-native';
import App from './App';
import {PlayBackService} from './MusicPlayerService'
import {name as appName} from './app.json';


AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => PlayBackService);
