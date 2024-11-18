import NextAuth from 'next-auth'
import GithubProvider from "next-auth/providers/github"
import User from '@/app/models/user'  
import Payment from '@/app/models/payment' 
import connectDB from '@/app/db/connectDb'

const handler = NextAuth({
  providers: [
    // OAuth authentication providers...
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      
      if (account.provider === "github") {
        // Connect to the database
        await connectDB()

        // Check if the user already exists in the database
        const currentUser = await User.findOne({ email: user.email }) 

        if (!currentUser) { // if not present then create new one
          const newUser = await User.create({
            email: user.email,
            username: user.email.split('@')[0]
          })
        //   user.name = newUser.username
        // } else {
        //   user.name = currentUser.username
        }
        return true
      }
      return false  // Return false if the provider is not GitHub
    },

    //The session is mainly used to store information about a user during their active session on your application, like keeping track of who is logged in or what actions they've performed.
  
    async session({ session, token }) { 
      const dbUser = await User.findOne({ email: session.user.email })  
      session.user.username = dbUser.username 
      return session
    },
  }
})

export { handler as GET, handler as POST }
