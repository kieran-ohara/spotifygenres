import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Spotify({
      clientId: process.env.SPOTIFY_ID,
      clientSecret: process.env.SPOTIFY_CLIENT,
      scope: 'playlist-read-private user-library-read user-library-modify playlist-modify-private streaming user-read-email user-read-private',
    }),
  ],
  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      if (account?.expires_in) {
        token.accessTokenExpires = Date.now() + (account.expires_in * 1000);
      }
      return token;
    },
    async session(session, token) {
      if (new Date() > token?.accessTokenExpires) {
        return;
      }
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
});
