<script lang="ts">
	import Row from '$lib/components/Row.svelte';
	import Skeleton from '$lib/utilities/Skeleton.svelte';
	import { getRows } from '$lib/stores/utilityFunctions';
	import { registerNode, activate, deactivate, addPage } from '$lib/stores/keyNavigation';
	import { beforeUpdate, onMount } from 'svelte';

	const pageId = 'person-list';

	export let data: PersonType[] = [];
	export let rows: Array[] = []; //  = getRows({ ...data });
	export let id = registerNode(pageId, 'list', 'container');

	beforeUpdate(() => {
		rows = getRows([ ...data ]);
	});

	onMount(() => {
		addPage(pageId);
	  activate(pageId);
	  return () => {
	  	deactivate(pageId);
	  }
	});
</script>

<section
	id={id}
	class="bg-skin-tertiary justify-around w-full xl:mt-2 px-2 xl:rounded-2xl"
	tabindex="0"
>
	{#if rows.length > 0}
		{#each rows as row, rowCount}
			<Row {row} {rowCount} />
		{/each}
	{:else}
		<Skeleton />
	{/if}
</section>
