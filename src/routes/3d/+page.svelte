<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Scene from '$lib/scene.svelte';
	import type { Contribution } from '$lib/types';
	import { fade } from 'svelte/transition';
	import Loading from '$lib/loading.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let contributions: Contribution[][] = $state([]);
	let loading = $state(true);

  let username = $derived($page.url.searchParams.get('user') ?? null)
  let year = $derived($page.url.searchParams.get('year') ?? null)

	async function getContributions() {
    if(!username || !year) return goto('/')

		const res = await fetch(`${username}/${year}`);
		contributions = await res.json();
		loading = false;
	}

	$effect(() => {
		getContributions();
	});
</script>

<div class="scene">
	{#if loading}
		<div class="wrapper">
      <Loading />
		</div>
	{:else}
		<div class='scene' in:fade={{ duration: 500 }}>
			<Canvas>
				<Scene {contributions} />
			</Canvas>
		</div>
	{/if}
</div>

<style>
	.scene {
		position: absolute;
		height: 100%;
		width: 100%;
		inset: 0;
		background-color: hsl(200, 10%, 10%);

		.wrapper {
			display: grid;
			height: 100%;
			width: 100%;
			place-content: center;
			color: white;
		}
	}
</style>
