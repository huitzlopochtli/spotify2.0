import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
import spotifyAPI, { LOGIN_URL } from '../../../lib/spotify';

async function refreshAccessToken(token) {
  try {
    spotifyAPI.setAccessToken(token.accessToken);
    spotifyAPI.setRefreshToken(token.refreshToken);

    const { body: refreshToken } = await spotifyAPI.refreshAccessToken();

    return {
      ...token,
      accessToken: refreshToken.access_token,
      accessTokenExpires: Date.now() + refreshToken.expires_in * 1000,
      refreshToken: refreshAccessToken.refresh_token ?? token.refreshToken,
    };
  } catch (err) {
    console.error(err);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_ID || '',
      clientSecret: process.env.SPOTIFY_SECRET || '',
      authorization: LOGIN_URL || '',
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET || '',
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // Inital sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.accessToken,
          refreshToken: account.refreshToken,
          accessTokenExpires: account.expires_at * 1000,
          username: account.providerAccountId,
        };
      }

      // return the previous token if not expired
      if (token.accessTokenExpires > Date.now()) {
        return token;
      }

      // refresh the token
      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;

      return session;
    },
  },
});
