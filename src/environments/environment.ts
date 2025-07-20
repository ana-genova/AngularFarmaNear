declare const ENV: {
  GOOGLE_MAPS_API_KEY: string;
  GOOGLE_MAP_ID: string;
  BASE_URL: string;
};

export const environment = {
  production: false,
  googleMapsApiKey: ENV.GOOGLE_MAPS_API_KEY || '',
  googleMapId: ENV.GOOGLE_MAP_ID || '',
  baseUrl: ENV.BASE_URL || '',
};
