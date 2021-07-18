import { getDB } from "$lib/Database.ts";
import { ObjectId } from 'mongodb';

export async function createAccount(username: string) : Promise
{
    const db = await getDB();
    const res = await db.collection(import.meta.env.VITE_ACCOUNTS_COLLECTION).insertOne({username});
    return res;
}

export async function getAccount(uid: string) : json
{
    const db = await getDB();
    const res = await db.collection(import.meta.env.VITE_ACCOUNTS_COLLECTION).findOne({_id: ObjectId(uid)})
    return res;
}

export async function deleteAccount(uid: string) : Promise
{
    const db = await getDB();
    const res = await db.collection(import.meta.env.VITE_ACCOUNTS_COLLECTION).deleteOne({_id: ObjectId(uid)})
    return res;
}

export async function updateAccountFavourited(uid: string) :json
{   
    const db = await getDB();
    const res = await db.collection(import.meta.env.VITE_ACCOUNTS_COLLECTION)
    .updateOne({"_id": ObjectId(uid)},
    {$inc: {"favourited":1}})
    return res
}