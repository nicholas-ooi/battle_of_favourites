# Battle of Favourites

A whacky game that highlights the number of favourites chosen by random people on the internet!  

This app does not focus on any real-life use cases but rather it was created out of technological experimentation, fun, and for the open-source learning community.  

This was built with state of the art technologies at experimental stages, with little documentation on the net: SvelteKit, Tailwind, Node, Digital Ocean MongoDB  

Since this app was use for DigitalOcean Hackathon 2021 submission. A CRUD operation is required, hence a semi-like account creation feature was added to fulfill those operations.  

## Installation

Install Node 16.5.0  
Install NPM 7.6.0  
Use [Digital Ocean Managed MongoDB](https://www.digitalocean.com/blog/introducing-digitalocean-managed-mongodb/)

```bash
# install all npm packages
# These will install tailwind, typescript, svelte, and others
npm i
```

## MongoDB setup

Digital Ocean Managed MongoDB simplifies this step.  
[Once you deploy Digital Ocean Managed MongoDB](https://www.youtube.com/watch?v=NvHQSV7jnKA&ab_channel=DigitalOcean)  
Download the ca-certificate.crt file and place at the root folder of the app  
```
Create a database name: bof  
Create an account collection name: users  
Create a favourite collection name: questions  
```

## Configuration of Env

Rename .env-example to .env

VITE word is required since sveltekit needs it to read env variables.  

VITE_DB_URL refers to the database connection string given from Digital Ocean Managed MongoDB  
[Do include username and password in the string if required.](https://docs.mongodb.com/manual/reference/connection-string/)  

VITE_DB_NAME refers to the database **name**  
VITE_ACCOUNTS_COLLECTION refers to the account collection **name**  
VITE_FAVOURITES_COLLECTION refers to the favourites collection **name**  

``` env
VITE_DB_URL=
VITE_DB_NAME=
VITE_ACCOUNTS_COLLECTION=
VITE_FAVOURITES_COLLECTION=
```


## Test and run

```bash
npm run dev
```

## Building
Before creating a production version of your app, install an [adapter](https://kit.svelte.dev/docs#adapters) for your target environment. Then:

```bash
npm run build
```

# Key Code Explaination

Below shows how sveltekit unifies javascript on the server-side, client-side, and directly interacting with the DOM yet keeping **reactivity**.  

It also highlights sveltekit ability to process data from server-side and passing it into the client side.  
The data from the client-side will then funnel through the various svelte components and render it for use.  

Lets look into how a specific data row is obtain from the favourite collection in MongoDB and then passing it into sveltekit.  

When we open the `/src/routes/index.svelte` file.  
The script with the `context="module"` signifies server-side rendering  
The `load` function is a special sveltekit function to async all internal/external api calls on the **server-side**.  
The code `await fetch('/api/favourites').then((res) => res.json())` would do a data load from the favourites internal API.
It will then load the json objects into a props variable name such as `favourite`.
We'll explore how data obtain from the favourites API work later.  

## /src/routes/index.svelte

``` svelte
<script context="module" lang="ts">
	import type { LoadInput } from '@sveltejs/kit';

	export async function load({ fetch }: LoadInput) {
		return {
			props: {
				user: await fetch('/api/accounts').then((res) => res.json()),
				favourite: await fetch('/api/favourites').then((res) => res.json())
			}
		};
	}
</script>
```

On the following script, refers to sveltekit client-side  

The `export let favourite` triggers sveltekit to load the data from the server-side with the props name `favourite` and loads it with the json object.  

``` svelte
<script lang="ts">
	import Header from '../components/Header.svelte';
	import Content from '../components/Content.svelte';
	import Footer from '../components/Footer.svelte';
	import Account from '../components/Account.svelte';

	export let user;
	export let favourite;
</script>
```

Once the favourite variable is exported or exposed for use.  
In the HTML or DOM structure, lets pass favourite into the Content component.  
the `bind:favourite=` is one of the powerful feature of svelte.  
It signals that you want to make the variable in sync from the child to parent component.  
In laymen, changing the data in the `favourite` variable from child and parent and vice versa becomes possible.  

``` svelte
<div class="max-w-5xl">
	<Header />
	<div class="container mx-auto border-4 border-new-black rounded-lg bg-new-orange text-new-black">
		{#if user.username}
			<Content bind:favourite={favourite} bind:user={user} />
		{:else}
			<Account bind:user={user} />
		{/if}
	</div>
	<Footer bind:user={user} />
</div>
```

## /src/components/Content.svelte

When we look into the script. 
We'll see the code `export let favorite`  
This again, signifies that we want to obtain the data passed into the component and be use within the Content component.  

The remaining code are client-side logic, and you should be able to trace how favourite variable is used in the component.  

``` svelte
<script lang="ts">
	export let favourite;
```

Lets head back to `/src/routes/index.svelte` and explore how `load` calls the server-side API `/api/favourites`
Over at `await fetch('/api/favourites').then((res) => res.json())`.

This would call and `endpoint` according to sveltekit documentation.  
The endpoint usually has few common HTTP operations - GET, POST, PATCH, DELETE, ...  
For DELETE on svelte, it would be **del** since delete is a reserved keyword in javscript  

## /src/routes/api/favourites.ts

In the get operation, we could do a logical switch of operations in different ways of fetching data  
Since we could fetch data in various ways such as by random, a single data, multiple data, filtered data etc..  
In this case, we will just zoom into `result = await getFavourite()`  
`getFavourite()` would be called from another backend script.  

``` ts
import { getFavourite, updateFavourite, getRandomFavourite } from "$lib/Favourite"

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
```

## /src/lib/Favourite.ts

Write backend logic with mongoDB operations.  

``` ts
export async function getFavourite() :json
{   
    const db = await getDB();
    const res = await db.collection(import.meta.env.VITE_FAVOURITES_COLLECTION).findOne({})
    return res
}
```


## Connecting to mongoDB - /src/lib/Database.ts

You could use this singleton code to connect to mongoDB, in this case was to an external managed database(mongoDB) by digital Ocean.  
getDB() can be re-used without re-initialising connection multiple times.  

``` ts
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
```

All in all, these explaination should be able to sum up how data is interacted and its relationship are forged across the various files via svelte.  
On a personal note, have to say its a beautiful piece of art of how sveltekit attempts to simplify full-stack development yet keeping it flexible.  
They might violate some software principles, but forward-thinking is all about breaking these principles and re-defining a new and better one.
