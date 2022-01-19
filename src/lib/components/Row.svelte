<script lang="ts">
	import { media_type } from '$lib/stores/store';
	import MovieCard from '$lib/components/MovieCard.svelte';
	import PersonCard from '$lib/components/PersonCard.svelte';
	import TvCard from '$lib/components/TvCard.svelte';
	import { registerNode, getLastKey } from '$lib/stores/keyNavigation';

	let component;
	const SCROLL_RIGHT_MARGIN = 1900;
	const SCROLL_LEFT_MARGIN = 0;

	export let row: Array[];
	export let rowCount;
	export let id = registerNode($media_type + '-row-' + rowCount, 'row', $media_type + '-list');

	// Horisontal scrolling in grid does not work with current key navigation

	const scroll = e => {
		const lastKey = getLastKey();
  	if (['LEFT', 'RIGHT'].indexOf(lastKey) === -1) {
  		return;
  	}
    const target = e.target;
    const self = component;
    const cardRect = target?.getBoundingClientRect();
    const selfRect = self?.getBoundingClientRect();

    let newPos = null;
		if (lastKey === 'RIGHT' && cardRect.right > SCROLL_RIGHT_MARGIN) {
			newPos = Math.min(0, selfRect.left + SCROLL_RIGHT_MARGIN - cardRect.right);
		} else if (lastKey === 'LEFT' && cardRect.left < 0) {
			newPos = Math.max(selfRect.left, selfRect.left - cardRect.left + 8);
    }

    if (newPos !== null ) {
    	self.style.transform = 'translateX('+newPos+'px)';
    	console.info('[MovieList] selfRect', selfRect, self?.getBoundingClientRect());
			console.info('[MovieList] cardRect', cardRect, target?.getBoundingClientRect());
			console.info('[MovieList] newPos', newPos);
		}
  };

</script>

{#if row?.length}
	<div
		id={id}
		class="flex justify-around w-full mx-auto xl:mt-2 xl:rounded-2xl px-2"
		tabindex="0"
	>
	<!--
		bind:this={component}
		on:focusin={scroll}
	-->

		<!-- transition-transform duration-300  -->
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
