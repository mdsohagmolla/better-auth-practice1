

import { Resend } from 'resend';
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

// Todo : mongodb atlas theke user id pasword .env file a akta variable rakhe tarpor akhane raklam tahole amader coder moddhe ata thakbe na .env file theke cole asbe  . 

const client = new MongoClient(process.env.BETTER_AUTH_DB_URL);
const db = client.db('better-auth-db');

// Todo: email verification er jonno 'resend' better auth theke niya aslam

const resend = new Resend(process.env.RESEND_API_KEY);


export const auth = betterAuth({
    // Todo:step 6 
    // better auth documentation theke copy kore niya aslam :
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,  //for email verification

        // import better auth doc for reset password:
        sendResetPassword: async ({ user, url, token }, request) => {
            void resend.emails.send({
                from: 'Acme <onboarding@resend.dev>',
                to: user.email,
                subject: "Reset your password",
                html: `<h4> Reset your password</h4>
                Click the link to reset your password: ${url}
                <p>Ignore this email if you have not requested a password reset`
                ,
            })

        }
    },
    // for email verification

    emailVerification: {
        sendVerificationEmail: async ({ user, url }) => {
            void resend.emails.send({
                from: 'Acme <onboarding@resend.dev>',   //ai from ta abar resend theke ante hbe
                to: user.email,
                subject: 'Verify your email address',
                html: `Click <a href="${url}">here</a> to verify your email.`,
            })

        },
        // import from better auth doc
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        expiresIn: 3600 // 1 hour

    },

    // todo setup googole auth follow docmumentation step 2
    socialProviders: {
        google: {
            clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID,
            clientSecret: process.env.BETTER_AUTH_GOOGLE_SECRET
        },
    },



    database: mongodbAdapter(db, {
        // Optional: if you don't provide a client, database transactions won't be enabled.
        client
    }),
    //...
});