import uuid from 'react-native-uuid';

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
  public timestamp: number;
  public coordinates: Coordinates;
  public isSynced: boolean;

  constructor(props: ILocation) {
    this.id = uuid.v4() as string;
    this.timestamp = new Date().getTime();
    this.coordinates = props.coordinates;
    this.isSynced = false;
  }
}
