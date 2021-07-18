import { getDB } from "$lib/Database.ts";
import { ObjectId } from 'mongodb';

export async function getFavourite() :json
{   
    const db = await getDB();
    const res = await db.collection(import.meta.env.VITE_FAVOURITES_COLLECTION).findOne({})
    return res
}

export async function getRandomFavourite() : json
{
    const db = await getDB();
    const res = await db.collection(import.meta.env.VITE_FAVOURITES_COLLECTION).aggregate([{ $sample: { size: 1 } }]).toArray()
    return res[0]
}

/**
Finds the favourite object by ID.
Then finds the question object from the favourite object by ID.
Then increment the count of the question object.
 */
export async function updateFavourite(fid: string, qid: string) :json
{   
    const db = await getDB();
    const res = await db.collection(import.meta.env.VITE_FAVOURITES_COLLECTION)
    .updateOne({"_id": ObjectId(fid), "questions._id": ObjectId(qid)},
    {$inc: {"questions.$.count":1}})
    return res
}