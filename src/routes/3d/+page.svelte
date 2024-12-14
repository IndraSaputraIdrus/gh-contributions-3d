<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Scene from '$lib/scene.svelte';
	import type { Contribution } from '$lib/types';
	import { fade } from 'svelte/transition';

	let contributions: Contribution[][] = $state([]);
	let loading = $state(true);

	async function getContributions() {
		const res = await fetch('/indrasaputraidrus/2024');
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
			<h1>loading</h1>
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
