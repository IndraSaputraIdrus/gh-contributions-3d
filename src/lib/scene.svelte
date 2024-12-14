<script lang="ts">
	import type { Contribution } from './types';
	import { Grid, OrbitControls, Align } from '@threlte/extras';
	import { T } from '@threlte/core';
	import { Tween } from 'svelte/motion';
	import { quadInOut } from 'svelte/easing';

	type Props = {
		contributions: Contribution[][];
	};

	let { contributions }: Props = $props();
	let scaleY = new Tween(0, { duration: 2000, easing: quadInOut });

	function getColor(level: number) {
		switch (level) {
			case 1:
				return '#00442a';
			case 2:
				return '#006d35';
			case 3:
				return '#00a648';
			case 4:
				return '#00a35c';
			default:
				return '#0e0e0e';
		}
	}

	function normalize(count: number, base = 4, offset = 2) {
		switch (true) {
			case count === 0:
				return base;
			case count > 40:
				return count;
			default:
				return count * (base * offset);
		}
	}

	$effect(() => {
		scaleY.set(1);
	});
</script>

<Grid sectionColor="#4a4b4a" sectionSize={20} cellSize={20} fadeDistance={400} infiniteGrid />

<T.PerspectiveCamera makeDefault position={[10, 200, 400]} fov={60}>
	<OrbitControls enableDamping autoRotate />
</T.PerspectiveCamera>

<T.AmbientLight color="#fff" intensity={0.4} />
<T.DirectionalLight position={[0, 200, 200]} intensity={2} color="#fff" />
<T.DirectionalLight position={[0, 200, -200]} intensity={2} color="#fff" />

<Align auto position.y={70}>
	{#each contributions as row, i}
		{#each row as col, j}
			{#if col}
				<T.Group position={[0, 0, 12 * i]} scale.y={scaleY.current}>
					{@const color = getColor(col.level)}
					{@const y = normalize(col.count)}
					{@const px = 12 * j}
					{@const py = y / 2}
					{@const pz = 0}
					<T.Mesh position.x={px} position.y={py} position.z={pz}>
						<T.BoxGeometry args={[10, y, 10]} />
						<T.MeshStandardMaterial {color} />
					</T.Mesh>
				</T.Group>
			{/if}
		{/each}
	{/each}
</Align>
