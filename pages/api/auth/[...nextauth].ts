import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { dbUsers } from "../../../database";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // ...add more providers here

    Credentials({
      name: 'Custom Login',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'correo@prueba.com' },
        password: { label: 'Password', type: 'password', placeholder: 'Password' },
      },
      async authorize(credentials): Promise<any> {
        // return { name: 'dimaria', email: 'didi@prueba.com', role: 'admin' };
        return await dbUsers.checkUserEmailPassword(credentials!.email, credentials!.password)
      }
    }),
  ],

  //Custom pages
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register'
  },

  jwt: {

  },

  session: {
    maxAge: 2592000, // 30d
    strategy: 'jwt',
    updateAge: 86400, // cada dia
  },

  //Callbacks
  callbacks: {

    async jwt({ token, account, user }) {

      if (account) {
        token.accessToken = account.access_token;

        switch (account.type) {

          case 'oauth':
            token.user = await dbUsers.oAuthToDbUser(user?.email || '', user?.name || '');

          case 'credentials':
            token.user = user;
            break;
        }
      }

      return token;
    },

    async session({ session, token, user }) {

      // console.log('SESSION',session)
      // console.log('USER', user)
      // console.log('TOKEN', token)

      //session.accessToken = token.accessToken;
      session.user = token.user as any;

      return session
    }

  }
}
export default NextAuth(authOptions)