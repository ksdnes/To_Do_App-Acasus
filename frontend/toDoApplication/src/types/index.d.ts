interface IUser {
  email: string;
  username: string;
  password: string;
  id: string;
}

interface IAuthenticatedUser {
  email: string;
  username: string;
  id: string;
}

export interface IColor {
  name: string;
  id: string;
  code: string;
}

export interface IIcon {
  name: string;
  id: string;
  symbol: string;
}

interface ITrack {
  id: string;
  name: string;
  isCompleted: boolean;
  duration: Number;
  dateTime: string;
  distance: Number;
  location: string;
}

interface ITrackkRequest {
  name?: string;
  isCompleted?: boolean;
  duration?: Number;
  dateTime?: string;
  distance?: Number;
  location?: string;
}
