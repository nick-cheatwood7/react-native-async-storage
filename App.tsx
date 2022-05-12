import { Box, Center, NativeBaseProvider } from 'native-base';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Home from './views/Home';
import RecentLocations from './views/RecentLocations';

function App() {
  return (
    // <SafeAreaView style={styles.container}>
    <NativeBaseProvider>
      <Center flex={1} safeAreaBottom>
        <RecentLocations />
      </Center>
    </NativeBaseProvider>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
});

export default App;
