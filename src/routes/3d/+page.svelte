<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Scene from '$lib/scene.svelte';
	import type { Contribution } from '$lib/types';

	let contributions: Contribution[][] = $state([]);

	async function getContributions() {
		const res = await fetch('/indrasaputraidrus/2024');
		contributions = await res.json();
	}

	$effect(() => {
		getContributions();
	});
</script>

<div class="scene">
	<Canvas>
		<Scene {contributions} />
	</Canvas>
</div>

<style>
  .scene {
    position: absolute;
    height: 100%;
    width: 100%;
    inset: 0;
    background-color: hsl(200, 10%, 10%);
  }
</style>
