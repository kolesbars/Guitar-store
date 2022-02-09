export enum APIRoute {
  Guitars = '/guitars'
}

export enum AppRoute {
  Main = '/',
  Catalog = '/catalog',
  Guitar = '/guitar'
}

export enum ErrorMessage {
  FailLoading = 'Ошибка загрузки данных',
  ServerError = 'Ошибка сервера',
}

export enum StringCount {
  Four = 4,
  Six = 6,
  Seven = 7,
  Twelve = 12,
}

export enum KeyCode {
  ArrowUp = 40,
  ArrowDown = 38,
  Enter = 13,
}

export enum GuitarType {
  Acoustic = 'acoustic',
  Electric = 'electric',
  Ukulele = 'ukulele',
}

export enum RatingStarsLocation {
  GuitarScreen = 'screen',
  GuitarCard = 'card',
  Comment = 'comment',
}

export enum GuitarScreenTabs {
  Specifications = 'specifications',
  Description = 'description',
}

export enum HttpCode {
  ServerError = 500,
}

export const emptyGuitar = {
  'id': 0,
  'name': '',
  'vendorCode': '',
  'type': '',
  'description': '',
  'previewImg': '',
  'stringCount': 0,
  'rating': 0,
  'price': 0,
};

export const DEFAULT_PAGE_COUNT = '1';
export const RANGE_STEP = 9;
export const DEFAULT_START_VALUE = '1';
export const RATING_STAR_MAX_VALUE = 5;
export const COMMENTS_RANGE = 3;

export const BACKEND_URL = 'https://accelerator-guitar-shop-api-v1.glitch.me';
export const REQUEST_TIMEOUT = 5000;
