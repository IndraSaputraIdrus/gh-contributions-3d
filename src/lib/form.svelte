<script lang="ts">
	type Props = {
		onsubmit: (e: Event) => void;
		data: { username: string | null; year: number | null };
	};

	let { onsubmit, data = $bindable() }: Props = $props();
</script>

<form {onsubmit}>
	<label>
		<span>Username</span>
		<input type="text" bind:value={data.username} required />
	</label>
	<label>
		<span>Year</span>
		<input type="number" bind:value={data.year} required />
	</label>
	<button type="submit">Submit</button>
</form>

<style>
	form {
		display: flex;
		flex-direction: row;
		gap: 1rem;
	}

	label {
		display: flex;
		align-items: center;
		gap: 1rem;

		span {
			flex: 1;
		}

		input {
			background-color: transparent;
			outline: none;
			border: 1px solid white;
			padding: 0.5rem;
			color: white;
			border-radius: 5px;
		}
	}

	button {
		padding: 0.5rem 1rem;
		border-radius: 5px;
		border: none;
		cursor: pointer;
		transition: all 100ms ease-in-out;

		&:hover {
			opacity: 80%;
		}
	}
</style>
