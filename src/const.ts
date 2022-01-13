export enum APIRoute {
  Guitars = '/guitars'
}

export enum AppRoute {
  Navigation = '/',
  Catalog = '/catalog',
  Guitar = '/guitar'
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
