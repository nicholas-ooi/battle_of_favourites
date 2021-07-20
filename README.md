# Battle of Favourites

A whacky game that highlights the number of favourites chosen by random people on the internet!

This app does not focus on any real-life use cases but rather it was created out of technology experimentation and fun.

This was built with state of the art technologies at experimental stages, with little documentation on the net: SvelteKit, Tailwind, Node, Digital Ocean MongoDB  

Since this app was use for DigitalOcean Hackathon 2021 submission. A CRUD operation is required, hence a semi-account creation feature was added to fulfill those operations.  

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

## Configuration of Env

Rename .env-example to .env

VITE word is required since sveltekit needs it to read env variables.  

VITE_DB_URL refers to the database connection string given from Digital Ocean Managed MongoDB  
[Do include username and password in the string if required.](https://docs.mongodb.com/manual/reference/connection-string/)  

VITE_DB_NAME refers to the database name  
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
