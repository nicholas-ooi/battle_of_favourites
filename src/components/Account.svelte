<script lang="ts">
	export let user;

	function handleCreate(event: Event) {
		fetch('/api/accounts', {
			method: 'POST',
			body: JSON.stringify({ username: event.target.username.value }),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => {
				if (res.ok) {
					return refreshAccount();
				} else {
					alert('Choose a different name');
				}
			})
	}

	function refreshAccount() {
			return fetch('/api/accounts').then((next) => {
			next.json().then((r) => {
				user = r;
			});
		});
	}

</script>

<div class="p-5">
	<form on:submit|preventDefault={handleCreate} method="post">
		<p class="mb-5 text-center font-bold">
			<span>How to play:</span> Pick your favourite choice and see what the world thinks!
		</p>
		<input
			placeholder="Enter your name"
			class="p-2 shadow appearance-none border rounded w-1/2"
			name="username"
			type="text"
		/>
		<button
			type="submit"
			class="float-right bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
			>[C]reate my account and begin!</button
		>
	</form>
</div>
