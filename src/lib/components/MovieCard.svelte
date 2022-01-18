<script lang="ts">
	import { media_type } from '$lib/stores/store';
	import ProgressBar from '$lib/utilities/ProgressBar.svelte';
	import Spinner from '$lib/utilities/Spinner.svelte';
  import { registerNode } from '$lib/stores/keyNavigation';

	const IMAGE_API = 'https://image.tmdb.org/t/p/w300';

	export let datum: MovieType;
	export let rowCount;
	export let dataCount;
	export let id = registerNode('movie-card-' + (10*rowCount + dataCount), 'card', $media_type + '-row-' + rowCount);

</script>

{#if datum.id}

	<!-- ToDo: All this works, but every card is repainted on very scroll-step.
	Problems are backface-hidden and ProgressBar.
	If one child renders, so does the rest of the component.

	<div id={id} class="w-44 h-96 xl:w-60 my-0.5 xl:my-2 xl:rounded-lg bg-red-500 relative perspective-1000" tabindex="0">
		<div class="w-12 h-12 preserve-3d duration-700 group-hover:rotate-y-180 group-focus:rotate-y-180 group-focus:delay-500 overflow-hidden overflow-ellipsis absolute transform origin-top-left">HEJ</div>
	</div>
-->
	<section id={id} class="group perspective-1000 w-44 xl:w-60 my-0.5 xl:my-2 xl:rounded-lg" tabindex="0" >
		<div class="relative preserve-3d w-full duration-700 group-hover:rotate-y-180 group-focus:rotate-y-180 group-focus:delay-500" >
			<div class="backface-hidden top-0 right-0 text-skin-base bg-skin-bg xl:rounded-lg">
				<img
					class="oject-cover w-44 h-64 xl:w-60 xl:h-90 xl:rounded-t-lg  text-skin-muted "
					src={datum.poster_path ? IMAGE_API + datum.poster_path : '/default.jpg'}
					alt={datum.title}
				/>
				<div class="p-2 xl:ml-4">
					<h6
						class="text-sm xl:text-lg text-skin-base w-40 xl:w-52 whitespace-nowrap overflow-hidden overflow-ellipsis"
					>
						{datum.title}
					</h6>
					<h6 class="xl:text-lg font-bold">
						{datum.release_date ? datum.release_date.substring(0, 4) : '-'}
					</h6>
				</div>
				<div class="transform scale-44 origin-top-left absolute left-1 top-56 xl:top-80">
					<ProgressBar progress={datum.vote_average} />
				</div>
			</div>
			<a
				class="w-full backface-hidden text-skin-base top-0 right-0 bg-skin-bg rounded-lg absolute bottom-0 text-decoration-none rotate-y-180 p-2 h-full ease-in-out movie-back text-sm overflow-auto duration-300 z-10"
				href={`/${$media_type}/${datum.id}`}
			>
				<h6 class="mt-1 xl:text-xl uppercase text-skin-base bg-secondary rounded">Overview</h6>
				<p class="md:text-base mt-1">{datum.overview}</p>
			</a>
		</div>
	</section>
{:else}
	<Spinner />
{/if}
