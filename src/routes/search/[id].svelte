<script context="module" lang="ts">
	import { media_type } from '$lib/stores/store';
	import { get } from 'svelte/store';
	export async function load({ fetch, params }) {
		const res = await fetch('../api/getSearch', {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({
				media: get(media_type),
				page: '1',
				query: params.id
			})
		});
		const datas = await res.json();
		const data = await datas.res.results;
		const total_pages = await datas.res.total_pages;
		return {
			props: {
				data,
				total_pages
			}
		};
	}
</script>

<script lang="ts">
	export let data;
	export let total_pages:number;

	import MainSection from '$lib/pages/MainSection.svelte';

</script>



	<MainSection {data} {total_pages}/>
