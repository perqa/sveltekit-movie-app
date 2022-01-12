<script lang="ts">
	import Row from '$lib/components/Row.svelte';
	import Skeleton from '$lib/utilities/Skeleton.svelte';
	import { registerNode } from '$lib/stores/keyNavigation';

	export let data: MovieType[] = [];

	import { beforeUpdate } from 'svelte';
	const getRows = datas => {
		let rowsArr = [];
		while (datas.length) {
			rowsArr.push(datas.splice(0, 5));
		}
		return rowsArr;
	}
	export let rows: Array[] = []; //  = getRows({ ...data });
	export let id = registerNode('movie-list', 'list', 'main');

	beforeUpdate(() => {
		rows = getRows([ ...data ]);
	});
</script>

<section
	id={id}
	class="bg-skin-tertiary  flex-wrap justify-around max-w-7xl mx-auto xl:mt-2 xl:rounded-2xl"
>
	{#if rows.length > 0}
		{#each rows as row, rowCount}
			<Row {row} {rowCount} />
		{/each}
	{:else}
		<Skeleton />
	{/if}
</section>
