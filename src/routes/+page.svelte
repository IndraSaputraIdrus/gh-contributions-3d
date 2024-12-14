<script lang="ts">
	import type { Contribution } from '$lib/types';

	type Props = {
		data: {
			contributions: Contribution[][];
		};
	};

	let props: Props = $props();

	let contributions = $derived(props.data.contributions);
</script>

<h1>Github contrib</h1>

<table>
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

<a href="/3d?user=indrasaputraidrus&year=2023">View 3d</a>

<style>
	h1 {
		text-align: center;
		margin-bottom: 1rem;
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
    margin-top: 1.5rem;
    transition: opacity 100ms ease-in-out;
    font-weight: 600;

    &:hover {
      opacity: 60%;
    }
  }
</style>
