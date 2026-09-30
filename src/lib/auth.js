


import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

// Todo : mongodb atlas theke user id pasword .env file a akta variable rakhe tarpor akhane raklam tahole amader coder moddhe ata thakbe na .env file theke cole asbe  . 
const client = new MongoClient(process.env.BETTER_AUTH_DB_URL);
const db = client.db('better-auth-db');

export const auth = betterAuth({
    // Todo:step 6 
    // better auth documentation theke copy kore niya aslam :
    emailAndPassword: {
        enabled: true,
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