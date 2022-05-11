import React, { useState, useEffect } from 'react';
// import { StatusBar } from 'expo-status-bar';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  StatusBar,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Location from './models/Location';
import db from './controllers/storage';
import { LOCATIONS_STORAGE_KEY } from './utils/constants';

const STORAGE_KEY = '@user_input';

export default function App() {
  const [input, setInput] = useState<string>('');
  const [inputArr, setInputArr] = useState<string[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    if (!inputArr) return;
    readData();
  }, []);

  const mockLocation = async (): Promise<void> => {
    const location = new Location({
      coordinates: {
        latitude: 123,
        longitude: 456,
      },
    });
    await location.save();
    setLocations((prev) => [...prev, location]);
  };

  const saveData = async (value: string): Promise<void> => {
    try {
      const values = await AsyncStorage.getItem(STORAGE_KEY);
      let data: Array<string>;
      if (values) {
        data = JSON.parse(values as string);
        data.push(value);
      } else {
        data = [value];
      }
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      alert('Data successfully saved');
    } catch (e) {
      alert('Failed to save data to the storage');
    }
  };

  const readData = async () => {
    try {
      const values = await AsyncStorage.getItem(STORAGE_KEY);
      if (values) {
        setInputArr(JSON.parse(values));
      }
    } catch (e) {
      alert('Failed to fetch the input from storage');
    }
  };

  const clearStorage = async () => {
    try {
      await db.locations.deleteAll();
    } catch (err) {
      console.error(err);
    }
    setLocations([]);
  };

  const onChangeText = (value: string) => setInput(value);

  const onSubmitEditing = () => {
    if (!input) return;

    saveData(input);
    setInput('');
    setInputArr((prev) => [...prev, input]);
  };

  interface IItem {
    title: string;
  }

  const Item = ({ title }: IItem) => (
    <View style={styles.item}>
      <Text>{title}</Text>
    </View>
  );

  const renderItem = ({ item }: { item: Location }) => {
    return <Item title={JSON.stringify(item)} />;
  };

  return (
    <>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>AsyncStorage React Native</Text>
      </View>
      <SafeAreaView style={styles.container}>
        {/* Body */}
        <View style={styles.panel}>
          {/* Form */}
          <View style={styles.panel}>
            {/* Clear button */}
            <Pressable onPress={clearStorage} style={styles.button}>
              <Text style={styles.buttonText}>Clear storage</Text>
            </Pressable>
            {/* Location button */}
            <Pressable onPress={mockLocation} style={styles.button}>
              <Text style={styles.buttonText}>Add Location</Text>
            </Pressable>
          </View>
          {/* List of values */}
          <Text style={styles.label}>From Async Storage:</Text>
        </View>
        <FlatList
          data={[...locations.reverse()]}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  header: {
    width: '100%',
    backgroundColor: '#dcdcdc',
    paddingTop: 48,
    paddingBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    color: '#333',
    fontWeight: 'bold',
  },
  panel: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 20,
  },
  text: {
    fontSize: 24,
    paddingTop: 10,
  },
  inputField: {
    backgroundColor: '#fff',
    height: 44,
    borderWidth: 1,
    borderColor: '#333',
    width: '100%',
    padding: 10,
    marginTop: 12,
  },
  button: {
    margin: 10,
    padding: 10,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 18,
    color: '#444',
  },
  item: {
    padding: 6,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
