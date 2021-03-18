export type userType = {
_id: string,
uid: string,
name: string,
password: string,
email: string,
avatar: string,
date: string
};

export type CountryType = {
  _id: object,
  nameEn: string,
  nameRu: string,
  nameBe: string,
  topLevelDomain: Object,
  articleEn: string,
  articleRu: string,
  articleBe: string,
  videoEn: string,
  videoRu: string,
  videoBe: string,
  photoSrc1: string,
  photoSrc2: string,
  photoSrc3: string,
  alpha2Code: string,
  alpha3Code: string,
  callingCodes: object,
  capital: string,
  altSpellings: object,
  region: string,
  subregion: string,
  population: number,
  latlng: object,
  demonym: string,
  area: number,
  gini: any,
  timezones: object,
  borders: object,
  nativeName: string,
  numericCode: string,
  currencies: object,
  languages: object,
  translations: object,
  flag: string,
  regionalBlocs: object,
  cioc: string
  coordinats: any;
};

export type showplaceType = {
_id: string,
nameRu: string,
nameEn: string,
nameBe: string,
coord: string,
articleRu: string,
articleEn: string,
articleBe: string,
fullArticleRu: string,
fullArticleEn: string,
fullArticleBe: string,
photoSrc1: string,
photoSrc2: string,
photoSrc3: string,
buildDate: string,
placeRu: string,
placeBe: string,
placeEn: string,
siteUrl: string,
googleMapUrl: string,
plusCode: string,
country: string,
rating: number,
views: number,
votes: string,
id: string
};
