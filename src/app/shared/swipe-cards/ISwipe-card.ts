import { ILatLng } from '../location/ILocation';

export interface ISwipeCard {
  name: string;
  imageUrl: string;
  description: string;
  latLng: ILatLng;
}
