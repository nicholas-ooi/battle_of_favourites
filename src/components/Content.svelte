<script lang="ts">
	export let favourite;
	export let user;

	let button1Hide = false;
	let button2Hide = false;
	let skipButtonDisable = false;

	function updateFavourite(fid, qid) : any {
		fetch('/api/favourites', {
			method: 'PATCH',
			body: JSON.stringify({ fid: fid, qid: qid }),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((res) => {
			if (res.ok) {
				button1Hide = true;
				button2Hide = true;
				skipButtonDisable = true;
				setTimeout(() => {
					button1Hide = false;
					button2Hide = false;
					skipButtonDisable = false;
					refreshAccount();
					skip();
				}, 3000);
			}
		});
	}

	/**
	 * Intentionally duplicate function from Account.svelte
	 * To showcase code flexibility and modularity
	 */
	function refreshAccount() {
			return fetch('/api/accounts').then((next) => {
			next.json().then((r) => {
				user = r;
			});
		});
	}

	function skip() {
		fetch('/api/favourites?operation=1').then((next) => {
			next.json().then((r) => {
				favourite = r;
			});
		});
	}
</script>

<div class="mt-10">
	<div class="px-28 grid grid-flow-col grid-rows-2 items-center">
		<div class="row-span-2">
			{#if !button1Hide}
				<button
					on:click={updateFavourite(favourite._id, favourite.questions[0]._id)}
					class="text-2xl float-left bg-purple-700 hover:bg-purple-600 text-white font-bold p-10 border-b-4 border-purple-900 hover:border-purple-500 rounded"
				>
					{favourite.questions[0].text}
				</button>
			{:else}
				<div class="font-bold text-7xl text-center font-ruslan">
					{favourite.questions[0].count}
				</div>
			{/if}
		</div>
		<div class="font-ruslan font-bold text-7xl row-span-2 text-center">VS</div>
		<div class="row-span-2">
			{#if !button2Hide}
				<button
					on:click={updateFavourite(favourite._id, favourite.questions[1]._id)}
					class="text-2xl float-right bg-purple-700 hover:bg-purple-600 text-white font-bold p-10 border-b-4 border-purple-900 hover:border-purple-500 rounded"
				>
					{favourite.questions[1].text}
				</button>
			{:else}
				<div class="font-bold text-7xl text-center font-ruslan">
					{favourite.questions[1].count}
				</div>
			{/if}
		</div>
	</div>
	<div class="mt-16">
		<span class="float-left mt-5 ml-3 font-bold">
			Hey I'm {user.username}, and I favourited {user.favourited || 0} times!
		</span>
		<button
			disabled={skipButtonDisable}
			on:click={skip}
			class="mr-3 mb-3 float-right bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
		>
			SKIP
		</button>
	</div>
	<div class="clear-both" />
</div>
