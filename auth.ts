import NextAuth, { type DefaultSession } from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Auth0Provider from "next-auth/providers/auth0";

declare module 'next-auth' {
  interface Session {
    user: {
      /** The user's id. */
      id: string
    } & DefaultSession['user']
  }
}

export const {
  handlers: { GET, POST },
  auth
} = NextAuth({
  providers: [],
  callbacks: {},
  /*
  providers: [GitHub, Google, Auth0Provider],
  callbacks: {
    jwt({ token, profile }) {
      console.log('jwt', token, profile)
      if (profile) {
        token.id = profile.id || profile.sub
        token.image = profile.avatar_url || profile.picture
      }
      return token
    },
    authorized({ auth }) {
      return true;
      return !!auth?.user; // this ensures there is a logged in user for -every- request
    },
    signIn(params) {
      console.log('signIn', params)
      return true
    },
    redirect({ url, baseUrl }) {
      console.log('redirect', url, baseUrl)
      return baseUrl
    }
  },
  pages: {
    signIn: '/sign-in' // overrides the next-auth default signin page https://authjs.dev/guides/basics/pages
  }
  */
});
