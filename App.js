import * as React from 'react';
import MainContainer from './src/navigation/MainContainer';
import { Provider as PaperProvider } from 'react-native-paper';
import { AppRegistry } from 'react-native';
import {enableLatestRenderer} from 'react-native-maps';
import 'react-native-gesture-handler';

enableLatestRenderer();

export default function App() {
  return (
    <PaperProvider>
        <MainContainer/>
    </PaperProvider>
    );
}

AppRegistry.registerComponent('KephyreTest', () => Main);