export enum APIRoute {
  Guitars = '/guitars',
  Comments = '/comments',
  Coupons = '/coupons'
}

export enum AppRoute {
  Main = '/',
  Catalog = '/catalog',
  Guitar = '/guitar',
  Cart = '/cart'
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
  ArrowUp = 38,
  ArrowDown = 40,
  Enter = 13,
  Escape = 27,
  Tab = 9,
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

export enum RatingStarsSizes {
  defaultWidth = '0',
  defaultHeight = '0',
  inCardWidth = '12',
  inCardHeight = '11',
  inGuitarScreenWidth = '14',
  inGuitarScreenHeight = '14',
  inCommentWidth = '16',
  inCommentHeight ='16',
}

export enum Coupon {
  light = 'light-333',
  medium = 'medium-444',
  height = 'height-555',
}

export enum ItemQuantity {
  zero = '0',
  min = '1',
  max = '99',
  step = '1',
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

export const emptyComment = {
  'id': '',
  'userName': '',
  'advantage': '',
  'disadvantage': '',
  'comment': '',
  'rating': 0,
  'createAt': '',
  'guitarId': 0,
};

export const emptyCommentPost = {
  'guitarId': 0,
  'userName': '',
  'advantage': '',
  'disadvantage': '',
  'comment': '',
  'rating': 0,
};

export const CALLBACK_DELAY = 500;
export const DEFAULT_PAGE_COUNT = '1';
export const RANGE_STEP = 9;
export const DEFAULT_START_VALUE = '1';
export const RATING_STAR_MAX_VALUE = 5;
export const COMMENTS_RANGE = 3;
export const ZERO_COORDINATE = 0;
export const COMMENTS_START_COUNT = 0;
export const PAGE_DIVIDER_COUNT = 4;
export const CURRENT_SEARCH_ITEM_COUNT = 0;
export const DEFAULT_QUANTITY = 0;
export const DEFAULT_GUITARS_IN_CART = 0;
export const DEFAULT_TOTAL_PRICE = 0;
export const DEFAULT_DISCOUNT_VALUE = 0;
export const STORAGE_GUITARS_LIST_DEFAULT_LENGTH = 1;
export const DEFAULT_DISCOUNT = 0;

export const BACKEND_URL = 'https://accelerator-guitar-shop-api-v1.glitch.me';
export const REQUEST_TIMEOUT = 5000;
