<script lang="ts">
	import ProgressBar from '$lib/utilities/ProgressBar.svelte';
	import Spinner from '$lib/utilities/Spinner.svelte';
	import Modal from '$lib/utilities/Modal.svelte';
	import Cast from '$lib/components/Cast.svelte';
	import { media_type } from '$lib/stores/store';
	import { onMount } from 'svelte';
	import { focus, activate, deactivate } from '$lib/stores/keyNavigation';

	const pageId = 'movie-media';
	onMount(() => {
		console.info('[MovieMedia] onMount');
		activate(pageId);
	  focus('movie-play');
	  return () => deactivate(pageId);
	});

	export let movie_details: MovieType;
	export let trailer_id: number;
	// export let movie_id: string;
	export let cast

	const IMAGE_API = 'https://image.tmdb.org/t/p/';

	let modal: { show: () => any };
	window.scrollTo({ top: -1000, behavior: 'smooth' });
</script>

{#if movie_details.id && trailer_id}
	<section
		id={pageId}
		tabindex="0"
		class="text-skin-inverted xl:mt-5 bg-no-repeat bg-right-top bg-contain xl:bg-cover xl:rounded-2xl max-w-7xl mx-auto"
		style="background-image: url({IMAGE_API}original/{movie_details.backdrop_path})"
	>
		<div
			class="bg-gradient-to-r xl:rounded-2xl"
			style="background-image: linear-gradient(to right, rgb(5, 69, 112) 150px, rgba(37, 137, 204, 0.84) 100%)"
		>
			<div class="grid max-w-7xl xl:grid-cols-4 px-10 py-8 mx-auto xl:rounded-2xl">
				<div class="col-start-1 col-end-2 ">
					<img
						class="h-96 w-64 xl:h-120 xl:w-80 overflow-hidden rounded-2xl mx-auto"
						src={movie_details.poster_path
							? IMAGE_API + 'w500' + movie_details.poster_path
							: '/default.jpg'}
						alt="movie poster"
					/>
				</div>
				<div class="xl:col-start-2 xl:col-end-5 flex flex-wrap content-start xl:pl-10">
					<div class="mt-6 xl:mt-0 w-full mb-6 flex flex-wrap">
						<h4 class="w-full xl:text-4xl">
							{movie_details.title}
							<span class="text-lg xl:text-4xl text-skin-inverted">
								{movie_details.release_date ? movie_details.release_date.substring(0, 4) : ''}
							</span>
						</h4>
						<div class="xl:flex">
							<div class="pl-0">
								{movie_details.release_date ? movie_details.release_date : 'No Date Available'}
								<span class="hidden xl:px-2 xl:inline">&#x2022;</span>
							</div>
							<div>
								{#each movie_details.genres as { id, name }, i}
									<a class="hover:text-skin-selected" href="/genre/{$media_type}/{id}">{name}</a>
									{#if i !== movie_details.genres.length - 1}<span class="mx-2">|</span>{/if}
								{/each}
							</div>
							{#if 'runtime' in movie_details}
								<div class="duration">
									<span class="hidden xl:px-2 xl:inline">&#x2022;</span>{(movie_details.runtime -
										(movie_details.runtime % 60)) /
										60}h {movie_details.runtime % 60}m
								</div>
							{/if}
						</div>
					</div>
					<div class="mb-5 w-full h-16 flex items-center justify-start">
						{#if movie_details.vote_average}
							<div
								class="bg-transparent inline-flex align-center justify-center transform -translate-x-5 scale-60"
							>
								<ProgressBar progress={movie_details.vote_average} />
							</div>
						{/if}
						{#if trailer_id !== 999}
							<div
								id="movie-play"
								tabindex="0"
								class="transform -translate-x-10 flex pl-5 cursor-pointer hover:opacity-80"
								on:click={() => modal.show()}
							>
								<i class="flex items-center fa fa-play fa-2x" aria-hidden="true" />
								<p class="flex justify-center ml-4 text-2xl items-center">Play Trailer</p>
							</div>
						{:else}
							<div class="flex pl-5">
								<p class="flex justify-center ml-4">No Trailer Available</p>
							</div>
						{/if}
					</div>
					<div class="w-full">
						<div class="text-lg italic opacity-70">{movie_details.tagline}</div>
						<h4 class="my-2 w-full font-semibold">Overview</h4>
						<div class="overview-details">{movie_details.overview}</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<Cast {cast} />

	{#if trailer_id !== 999}
		<Modal bind:this={modal} {trailer_id} />
	{/if}
{:else}
	<Spinner />
{/if}
