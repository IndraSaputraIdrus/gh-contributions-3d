<script lang="ts">
	import Form from '$lib/form.svelte';
	import Loading from '$lib/loading.svelte';
	import type { Contribution } from '$lib/types';
	import { fade } from 'svelte/transition';

	type FormData = {
		username: null | string;
		year: null | number;
	};

	async function getContributions(data: FormData) {
		const res = await fetch(`${data.username}/${data.year}`);
		contributions = await res.json();
		loading = false;
	}

	let contributions: Contribution[][] | null = $state(null);
	let loading = $state(false);

	let formData: FormData = $state({
		username: null,
		year: null
	});

	async function onsubmit(e: Event) {
		e.preventDefault();

		if (!formData.username || !formData.year) return;

		loading = true;
		await getContributions(formData);
	}

	$inspect(formData);
</script>

<div class="wrapper">
	<h1>Github contributions</h1>

	<Form bind:data={formData} {onsubmit} />

	{#if loading}
		<div in:fade={{ duration: 200 }} class="loading">
			<Loading />
		</div>
	{/if}

	{#if contributions}
		<table in:fade={{ duration: 200 }}>
			<tbody>
				{#each contributions as row}
					<tr>
						{#each row as day}
							<td data-level={day?.level}></td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>

		<a href="/3d?user={formData.username}&year={formData.year}">View 3d</a>
	{/if}
</div>

<style>
	.wrapper {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.8rem;
		place-items: center;
	}

	h1 {
		text-align: center;
	}

	td {
		padding: 0.4rem;
		border-radius: 2px;

		&[data-level='0'] {
			background-color: #2c333b;
		}

		&[data-level='1'] {
			background-color: #00442a;
		}

		&[data-level='2'] {
			background-color: #006d35;
		}

		&[data-level='3'] {
			background-color: #00a648;
		}

		&[data-level='4'] {
			background-color: #00d35c;
		}
	}

	a {
		display: block;
		margin-inline: auto;
		background: #fff;
		color: black;
		text-decoration: none;
		padding: 1rem 2rem;
		border-radius: 1rem;
		transition: all 100ms ease-in-out;
		font-weight: 600;

		&:hover {
			opacity: 60%;
		}
	}

	.loading {
		height: 105px;
		display: flex;
		align-items: center;
	}
</style>
