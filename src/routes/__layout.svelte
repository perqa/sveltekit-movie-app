<script context="module" lang="ts">
	export const load = async ({ fetch }) => {

		const resTv = await fetch('api/getTvGenres');
		const resTv_json = await resTv.json();
		const tv_genre: Genre[] = resTv_json.tv_genres;

		const resMovie = await fetch('api/getMovieGenres');
		const resMovie_json = await resMovie.json();
		const movie_genre: Genre[] = resMovie_json.movie_genres;

		const tvNetworks = await fetch('api/getTvNetworks')
		const resTvNetworks_json = await tvNetworks.json()
		const tv_networks = resTvNetworks_json.tv_network

		return {
			props: {
				tv_genre,
				movie_genre,
				tv_networks
			}
		};
	};
</script>

<script lang="ts">
	import '../app.postcss';
	export let tv_genre: Genre[];
	export let movie_genre: Genre[];
	export let tv_networks: Network[];
	import Header from '$lib/components/Header.svelte';
	import { tv_genres, movie_genres, tv_network, hide_header } from '$lib/stores/store';
	import { theme } from '$lib/stores/theme-store';
	import { onMount } from 'svelte';
	import { addPage, initNavigation } from '$lib/stores/keyNavigation';

	// How to detect route changes
	// import { page } from '$app/stores';
	// page.subscribe(({ url, params }) => {
	// 	console.info('>>> url',url,params);
	// });

	onMount(() => {
		initNavigation();
	  addPage('movie-list');
	});
	theme.init();
	$tv_genres = tv_genre;
	$movie_genres = movie_genre;
	$tv_network = tv_networks

</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,400;0,600;0,700;1,400&display=swap"
	/>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
	/>
	<title>TMDB on Sveltekit</title>
	<meta name="description" content="TMDB movie & tv database" />
	<meta name="keywords" content="HTML, CSS, JavaScript, svelte" />
	<meta name="author" content="Wayne Morgan" />
</svelte:head>

<main class:$theme class="bg-skin-bg">
	{#if (!$hide_header)}
		<Header/>
	{/if}
	<section class="w-480 px-4 mx-auto">
		<slot />
	</section>
</main>
