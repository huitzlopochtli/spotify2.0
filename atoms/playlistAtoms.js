import { atom } from 'recoil';

export const playlistIdState = atom({
  key: 'playlistIdState',
  default: '',
});

export const playlistState = atom({
  key: 'playlistState',
  default: [],
});

export const currentTrackIdState = atom({
  key: 'currentTrackIdState',
  default: null,
});

export const isPlayingState = atom({
  key: 'isPlayingState',
  default: false,
});
