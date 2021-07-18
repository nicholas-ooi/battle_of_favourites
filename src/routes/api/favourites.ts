
import { getFavourite, updateFavourite, getRandomFavourite } from "$lib/Favourite"
import { updateAccountFavourited } from "$lib/Account"
import cookie from 'cookie';

const RANDOM = 1;

export async function get(request: Request) :json
{
    let result;
    const operation = request.query.get('operation');
    switch(parseInt(operation))
    {
        case RANDOM:
        result = await getRandomFavourite();
        break;
        default:
        result = await getFavourite()
        break;
    }

    return { 
        body: result
    };
}

export async function patch(request: Request) :json
{

    //Better to separate account favourite update operation,
    // since this api should focus on updating favourite only
    const cookies = cookie.parse(request.headers.cookie || "")
    await updateAccountFavourited(cookies.uid);

    return { 
        body: await updateFavourite(request.body.fid, request.body.qid)
    };
}