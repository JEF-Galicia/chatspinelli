import NextAuth, { type DefaultSession } from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

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
  auth,
  CSRF_experimental // will be removed in future
} = NextAuth({
  providers: [GitHub, Google],
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
      return !!auth?.user // this ensures there is a logged in user for -every- request
    },
    signIn(params) {
      console.log('signIn', params)
      return true
    },
    redirect({ url, baseUrl }) {
      console.log('redirect', url, baseUrl)
      return url.startsWith(baseUrl) ? url : baseUrl
    }
  },
  pages: {
    signIn: '/sign-in' // overrides the next-auth default signin page https://authjs.dev/guides/basics/pages
  }
})
