import SpotifyWebAPI from 'spotify-web-api-node';

const scopes = [
	'user-read-email',
	'playlist-read-private',
	'playlist-read-collaborative',
	'playlist-modify-public',
	'streaming',
	'user-read-private',
	'user-read-playback-state',
	'user-modify-playback-state',
	'user-read-currently-playing',
	'user-read-recently-played',
	'user-top-read',
	'user-read-playback-position',
	'user-read-birthdate',
	'user-read-recently-played',
	'user-read-currently-playing',
	'user-read-recently-played',
	'user-read-playback-state',
	'user-read-private',
	'user-read-email',
	'user-read-recently-played',
	'user-read-currently-playing',
].join(',');

const params = {
	scopes: scopes,
};

const qyeryParamsString = new URLSearchParams(params).toString();

const LOGIN_URL = `https://accounts.spotify.com/authorize?${qyeryParamsString}`;

const spotifyApi = new SpotifyWebAPI({
	clientId: process.env.SPOTIFY_ID,
	clientSecret: process.env.SPOTIFY_SECRET,
});

export default spotifyApi;

export { LOGIN_URL };
