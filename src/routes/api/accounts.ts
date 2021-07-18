import { getAccount, createAccount, deleteAccount } from "$lib/Account"
import cookie from 'cookie';

export async function get(request: Request) : json
{   
    const cookies = cookie.parse(request.headers.cookie || "")
    return {
        body: await getAccount(cookies.uid)
    }
}

export async function post(request : Request) : json
{
    const user = await createAccount(request.body.username)
    return {
        body: user,
        headers: {
            'set-cookie':`uid=${user.insertedId}; Path=/; HttpOnly`
        }
    };
}

export async function del(request : Request) : json
{
    const cookies = cookie.parse(request.headers.cookie || "")
    return {
        body: await deleteAccount(cookies.uid),
        headers: {
            'set-cookie':`uid=deleted; Max-Age=0; Path=/; HttpOnly`
        }
    };
}