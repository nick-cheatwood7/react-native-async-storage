import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOCATIONS_STORAGE_KEY } from '../utils/constants';

export default class LocationsController {
  public async deleteAll(): Promise<void | Error> {
    try {
      await AsyncStorage.removeItem(LOCATIONS_STORAGE_KEY);
    } catch (err) {
      throw Error(err as string);
    }
  }
}
