<script lang="ts">
	import { media_type, show_name, fast_mode } from '$lib/stores/store';
	import ProgressBar from '$lib/utilities/ProgressBar.svelte';
	import Spinner from '$lib/utilities/Spinner.svelte';
	import { registerNode } from '$lib/stores/keyNavigation';

	const IMAGE_API = 'https://image.tmdb.org/t/p/w300';

	export let datum: TvType;
	$show_name = datum.name;
	export let rowCount;
	export let dataCount;
	export let id = registerNode('tv-card-' + (10*rowCount + dataCount), 'card', $media_type + '-row-' + rowCount);
</script>

{#if datum.id}
	<section id={id} class="group perspective-1000 w-44 xl:w-60 my-0.5 xl:my-2 xl:rounded-lg" tabindex="0">
		<div class="relative preserve-3d w-full {$fast_mode ? '' : 'duration-700 group-hover:rotate-y-180 group-focus:rotate-y-180 group-focus:delay-500'}">
			<div class="top-0 right-0 text-skin-base bg-skin-bg xl:rounded-lg {$fast_mode ? '' : 'backface-hidden'}">
				<img
					class="oject-cover w-44 h-64 xl:w-60 xl:h-90 xl:rounded-t-lg  text-skin-muted "
					src={datum.poster_path ? IMAGE_API + datum.poster_path : '/default.jpg'}
					alt={datum.name}
				/>
				<div class="transform scale-44 origin-top-left h-20 -mt-10">
				{#if !$fast_mode}
					<ProgressBar progress={datum.vote_average} />
				{/if}
				</div>
				<div class="p-2 xl:ml-4 -mt-10">
					<h6
						class="text-sm xl:text-lg text-skin-base w-40 xl:w-52 whitespace-nowrap overflow-hidden overflow-ellipsis"
					>
						{datum.name}
					</h6>
					<h6 class="xl:text-lg font-bold">
						{datum.first_air_date ? datum.first_air_date.substring(0, 4) : '-'}
					</h6>
				</div>
			</div>
			{#if !$fast_mode}
			<a
				class="w-full backface-hidden text-skin-base top-0 right-0 bg-skin-bg rounded-lg absolute bottom-0 text-decoration-none rotate-y-180 p-2 h-full ease-in-out movie-back text-sm overflow-auto duration-300 z-10"
				href={`/${$media_type}/${datum.id}`}
			>
				<h6 class="mt-1 xl:text-xl uppercase text-skin-base bg-secondary rounded">Overview</h6>
				<p class="md:text-base mt-1">{datum.overview}</p>
			</a>
			{/if}
		</div>
	</section>
{:else}
	<Spinner />
{/if}
