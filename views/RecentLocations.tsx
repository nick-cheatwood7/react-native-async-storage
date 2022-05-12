import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import {
  ScrollView,
  Box,
  Heading,
  FlatList,
  View,
  Text,
  Fab,
  Icon,
  HStack,
  VStack,
  Center,
  Container,
  IconButton,
} from 'native-base';
import Location from '../models/Location';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import db from '../controllers/storage';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import AppBar from '../components/AppBar';

function RecentLocations(): JSX.Element {
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    if (!locations) return;
    readData();
  }, []);

  const readData = async () => {
    const data = await db.locations.findAll();
    if (data) {
      console.log(data[0]);
    }
  };

  const toggleUpdate = async () => {
    const location = await db.locations.findById(
      locations[locations.length - 1].id
    );
    if (location) {
      await db.locations.update({ ...location, isSynced: true });
    }
  };

  const mockLocation = async (): Promise<void> => {
    const location = new Location({
      coordinates: {
        latitude: 123,
        longitude: 456,
      },
    });
    await db.locations.save(location);
    setLocations((prev) => [...prev, location]);
  };

  interface IItem {
    title: string;
    subtitle?: string;
  }
  const Item = ({ title, subtitle }: IItem) => (
    <Box borderBottomWidth={1} pl={4} pr={5} py={2} borderColor="coolGray.200">
      <HStack space={3} justifyContent="space-between">
        <VStack>
          <Text color="warmGray.800">{title}</Text>
          <Text color="warmGray.400">{subtitle}</Text>
        </VStack>
      </HStack>
    </Box>
  );

  const renderItem = ({ item }: { item: Location }) => {
    return (
      <Item
        title={JSON.stringify(item.coordinates)}
        subtitle={`${JSON.stringify(item.timestamp)} Synced: ${JSON.stringify(
          item.isSynced
        )}`}
      />
    );
  };

  return (
    <>
      <AppBar title="Recent Locations" />
      <Box flex={1} alignItems="center" justifyContent="center">
        <FlatList
          flex={1}
          data={[...locations.reverse()]}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          alignSelf="flex-start"
          // flexDirection={'column'}
          contentContainerStyle={{
            flexGrow: 1,
            flexDirection: 'column',
            minWidth: '100%',
          }}
          ListFooterComponent={
            <Center flex={1}>
              <Text
                padding={6}
                fontSize={16}
                color={'warmGray.400'}
                alignContent={'center'}
              >
                End of list
              </Text>
            </Center>
          }
        />
        <Fab
          icon={
            <Icon
              shadow={2}
              color="white"
              as={AntDesign}
              name="plus"
              size="lg"
            />
          }
          onPress={mockLocation}
        />
      </Box>
    </>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 6,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export default RecentLocations;
