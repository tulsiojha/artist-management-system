export interface IPageResult {
  total: number;
}

export enum GENDER {
  "MALE" = "m",
  "FEMALE" = "f",
  "OTHER" = "o",
}

export enum USER_ROLE {
  "SUPER_ADMIN" = "super_admin",
  "ARTIST_MANAGER" = "artist_manager",
  "ARTIST" = "artist",
}

export enum GENRE {
  "RNB" = "rnb",
  "COUNTRY" = "country",
  "CLASSIC" = "classic",
  "ROCK" = "rock",
  "JAZZ" = "jazz",
}

export interface IUser {
  id: number;
  artist_id: number;
  first_name: string;
  last_name: string;
  dob: Date;
  email: string;
  password: string;
  address: string;
  phone: string;
  gender: GENDER;
  role: USER_ROLE;
  created_at?: Date;
  updated_at?: Date;
}

export interface IUnlinkedUser {
  uid: number;
  first_name: string;
  last_name: string;
}

export type IUserResponse = {
  data: { users: IUser[]; pageInfo: IPageResult };
};

export type IUnlinkedUserResponse = {
  data: { users: IUnlinkedUser[] };
};

export interface IArtist {
  id: number;
  name: string;
  dob: Date;
  address: string;
  gender?: GENDER;
  first_release_year: number;
  no_of_albums_released?: number;
  created_at?: Date;
  updated_at?: Date;
}

export type IArtistResponse = {
  data: { artists: IArtist[]; pageInfo: IPageResult };
};

export interface ISong {
  id: number;
  artist_id: number;
  title: string;
  album_name: string;
  genre?: GENRE;
  created_at?: Date;
  updated_at?: Date;
}

export type ISongResponse = {
  data: { songs: ISong[]; pageInfo: IPageResult };
};
