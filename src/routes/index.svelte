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

<script lang="ts">
	import Header from '../components/Header.svelte';
	import Content from '../components/Content.svelte';
	import Footer from '../components/Footer.svelte';
	import Account from '../components/Account.svelte';

	export let user;
	export let favourite;
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

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
