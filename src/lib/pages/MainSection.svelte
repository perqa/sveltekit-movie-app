<script lang="ts">
	import MovieList from '$lib/pages/MovieList.svelte';
	import TvList from '$lib/pages/TvList.svelte';
	import PersonList from '$lib/pages/PersonList.svelte';

	import { current_page, media_type, hide_header } from '$lib/stores/store';
	import { get } from 'svelte/store';
	import { onMount } from 'svelte';
	import { addPage } from '$lib/stores/keyNavigation';
	import { getLastKey } from '$lib/stores/utilityFunctions';

	export let data = [];
	export let total_pages = 1;
	export let genres = undefined;

	let nRes = 20;
	let isLoadMore = false;
	let component;

	const SCROLL_TOP_MARGIN = 200; //pixels
	const LOAD_MARGIN = 1000; //pixels
	const HEADER_HIDE_SCROLL_POS = -10; // pixels

	onMount(loadMorePages);

  const scroll = e => {
  	const lastKey = getLastKey();
  	if (['UP', 'DOWN'].indexOf(lastKey) === -1) {
  		return;
  	}
    const target = e.target;
    const self = component;
    const cardRect = target?.getBoundingClientRect();
    const selfRect = self?.getBoundingClientRect();

    const newPos = Math.min(0, selfRect.top + SCROLL_TOP_MARGIN - cardRect.top);
    $hide_header = (newPos < HEADER_HIDE_SCROLL_POS);
    self.style.transform = 'translate3d(0, '+newPos+'px, 0)';
    const offset = selfRect.bottom - cardRect.bottom;
    console.info('[MovieList] self offset', offset);
    if ($current_page < total_pages && offset <= LOAD_MARGIN) {
			if (!isLoadMore) {
				console.info('[MovieList] LOADING');
				loadMorePages();
			} else {
				console.info('[MovieList] NOT LOADING', $current_page, total_pages, offset);
			}
			isLoadMore = true;
		} else {
			isLoadMore = false;
		}
  };

	async function moreData() {
		let res;
		if ((genres === undefined)) {
			res = await fetch('../api/getShow', {
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({
					media: get(media_type),
					page: get(current_page)
				})
			});
		} else {
			res = await fetch('../../api/getShowGenre', {
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({
					media: get(media_type),
					page: get(current_page),
					genre: genres
				})
			});
		}

		const datas = await res.json();
		const res_results = datas.res.results;
		nRes = res_results.length;
		data = [...data, ...res_results];
	}

	async function loadMorePages() {
		$current_page++;
		await moreData();
		// ToDo: check if the new nodes have been registered before calling addPage
		addPage(/*$media_type + '-list'*/);
	}
</script>

<section
	id="main-section"
	class="h-full transition-transform duration-300"
	on:focusin={scroll}
  bind:this={component}
 >
	<!-- <PageTitle /> -->

	{#if $media_type === 'person'}
		<PersonList {data} />
	{:else if $media_type === 'movie'}
		<MovieList {data}/>
	{:else if $media_type === 'tv'}
		<TvList {data} />
	{/if}

</section>
