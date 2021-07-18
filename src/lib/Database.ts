/**
Connect mongoDB
 */

import { MongoClient } from 'mongodb';

let db = null;

export async function getDB() : Promise
{
    if(!db) 
    {
        const DB_URL = import.meta.env.VITE_DB_URL;
        const DB_NAME = import.meta.env.VITE_DB_NAME;

        const client = await MongoClient
        .connect(DB_URL,
            {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            tls: true,
            tlsCAFile: "./ca-certificate.crt"
        })
        db = client.db(DB_NAME);
    }
    return db;
}
