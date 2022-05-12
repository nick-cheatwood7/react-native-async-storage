import AsyncStorage from '@react-native-async-storage/async-storage';
import Location from '../models/Location';
import { LOCATIONS_STORAGE_KEY } from '../utils/constants';

export default class LocationsController {
  private async serialize(): Promise<Location[] | null> {
    try {
      const data = await AsyncStorage.getItem(LOCATIONS_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return null;
    }
  }

  public async save(location: Location): Promise<void> {
    const locations = await this.serialize();
    if (locations) {
      locations.push(location);
      console.log(location);
    }
    try {
      AsyncStorage.setItem(LOCATIONS_STORAGE_KEY, JSON.stringify(locations));
    } catch (err) {
      throw Error(err as string);
    }
  }

  public async update(location: Location): Promise<Location | Error> {
    let updatedLocations: Location[];
    let updatedLocation: Location = location;
    try {
      await AsyncStorage.getItem(LOCATIONS_STORAGE_KEY).then((records) => {
        const locations = records ? JSON.parse(records) : [];
        updatedLocations = locations.forEach((x: Location, idx: number) => {
          if (x.id === location.id) {
            // Update this record
            locations[idx] = { ...x, location };
            updatedLocation = locations[idx];
          }
        });
        AsyncStorage.setItem(
          LOCATIONS_STORAGE_KEY,
          JSON.stringify(updatedLocations)
        );
      });
      return updatedLocation;
    } catch (err) {
      throw Error(err as string);
    }
  }

  public async findById(id: string): Promise<Location | null> {
    let foundRecord: Location | null = null;
    try {
      const values = await AsyncStorage.getItem(LOCATIONS_STORAGE_KEY);
      const locations: Array<Location> = values ? JSON.parse(values) : [];
      locations.forEach((location) => {
        if (location.id === id) {
          foundRecord = location;
        }
      });
      return foundRecord;
    } catch {
      return null;
    }
  }

  public async findAll(): Promise<Location[] | null> {
    const locations = await this.serialize();
    if (locations) {
      return locations;
    } else {
      return null;
    }
  }

  public async delete(location: Location): Promise<void | Error> {
    try {
      const records = await AsyncStorage.getItem(LOCATIONS_STORAGE_KEY);
      const locations: Array<Location> = records ? JSON.parse(records) : [];
      const newValues = locations.filter((x) => x.id !== location.id);
      AsyncStorage.setItem(LOCATIONS_STORAGE_KEY, JSON.stringify(newValues));
    } catch (e) {
      throw Error(e as string);
    }
  }

  public async deleteAll(): Promise<void | Error> {
    try {
      await AsyncStorage.removeItem(LOCATIONS_STORAGE_KEY);
    } catch (err) {
      throw Error(err as string);
    }
  }
}
