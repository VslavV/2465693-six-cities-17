export type LocationOffer = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type CityOffer = {
  name: string;
  location: LocationOffer;
};

export type HostType = {
  isPro: boolean;
  name: string;
  avatarUrl: string;
};

export type RentalOffer = {
  id: string;
  title: string;
  type: string;
  price: number;
  previewImage: string;
  city: CityOffer;
  location: LocationOffer;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
};

export type SelectedRentalOffer = {
  id: string;
  title: string;
  description: string;
  type: string;
  price: number;
  images: string[];
  city: CityOffer;
  location: LocationOffer;
  goods: string[];
  host: HostType;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  bedrooms: number;
  maxAdults: number;
};
