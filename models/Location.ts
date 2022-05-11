import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOCATIONS_STORAGE_KEY } from '../utils/constants';

type Coordinates = {
  latitude: number;
  longitude: number;
};

interface ILocation {
  timestamp?: Date;
  coordinates: Coordinates;
}

export default class Location {
  readonly id: string;
  public timestamp: Date;
  public coordinates: Coordinates;

  constructor(props: ILocation) {
    this.id = uuid.v4() as string;
    this.timestamp = new Date();
    this.coordinates = props.coordinates;
  }

  private get props(): Location {
    return this;
  }

  async save(): Promise<void | Error> {
    try {
      AsyncStorage.getItem(LOCATIONS_STORAGE_KEY).then((locations) => {
        const values = locations ? JSON.parse(locations) : [];
        values.push(this.props);
        AsyncStorage.setItem(LOCATIONS_STORAGE_KEY, JSON.stringify(values));
      });
    } catch (err) {
      throw Error(err as string);
    }
  }

  async delete(): Promise<void | Error> {
    try {
      AsyncStorage.getItem(LOCATIONS_STORAGE_KEY).then((locations) => {
        const values: Array<Location> = locations ? JSON.parse(locations) : [];
        const newValues = values.filter((location) => location.id !== this.id);
        AsyncStorage.setItem(LOCATIONS_STORAGE_KEY, JSON.stringify(newValues));
      });
    } catch (err) {
      throw Error(err as string);
    }
  }
}
