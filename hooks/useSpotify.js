import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import SpotifyAPI from '../lib/spotify';

function useSpotify() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      // if refresh access token attempt fails
      if (session.error === 'RefreshAccessTokenError') {
        signIn();
      }
      SpotifyAPI.setAccessToken(session.user.accessToken);
    }
  }, [session]);

  return SpotifyAPI;
}

export default useSpotify;
