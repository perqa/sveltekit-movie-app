<script lang="ts">
	import { media_type } from '$lib/stores/store';
	import MovieCard from '$lib/components/MovieCard.svelte';
	import PersonCard from '$lib/components/PersonCard.svelte';
	import TvCard from '$lib/components/TvCard.svelte';
	import { registerNode } from '$lib/stores/keyNavigation';

	export let row: Array[];
	export let rowCount;
	export let id = registerNode($media_type + '-row-' + rowCount, 'row', $media_type + '-list');

</script>

{#if row?.length}
	<div id={id} class="flex justify-around max-w-7xl mx-auto xl:mt-2 xl:rounded-2xl" >
		{#if $media_type === 'movie'}
			{#each row as datum, dataCount}
				<MovieCard {datum} {rowCount} {dataCount} />
			{/each}
		{:else if $media_type === 'person'}
			{#each row as datum, dataCount}
				<PersonCard {datum} {rowCount} {dataCount} />
			{/each}
		{:else if $media_type === 'tv'}
			{#each row as datum, dataCount}
				<TvCard {datum} {rowCount} {dataCount} />
			{/each}
		{/if}
	</div>
{/if}
