const enum RoutePath {
  Index = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  NotFound = '*',
}

const enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

const LOCATIONS = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

const ONE_STAR_RATING = 100 / 5;

const CardImageSize = {
  'favorites': {
    width: 150,
    height: 110,
  },
  'cities': {
    width: 260,
    height: 200,
  },
  'near-places': {
    width: 260,
    height: 200,
  },
} as const;

const ComentsLenght = {
  MIN: 50,
  MAX: 300,
};

export { AuthorizationStatus, RoutePath, LOCATIONS, ONE_STAR_RATING, CardImageSize, ComentsLenght };
