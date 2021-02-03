export interface ILocation {
  id?: string;
  name: string;
  description: string;
  images: ILocationImage[];
  latLng: ILatLng;
  distancetext?: string;
  avgCost: number;
  maxPeoples: number;
  activityType: any[];
  ownerId?: string;
}

export interface ILocationImage {
  name: string;
  url: string;
}

export interface ILatLng {
  lat: number;
  lng: number;
}
