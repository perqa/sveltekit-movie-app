<script lang="ts">
	import { media_type } from '$lib/stores/store';
	import Spinner from '$lib/utilities/Spinner.svelte';
	import { registerNode } from '$lib/stores/keyNavigation';

	const IMAGE_API = 'https://image.tmdb.org/t/p/w500';

	export let datum: PersonType;
	export let rowCount;
	export let dataCount;
	export let id = registerNode('person-card-' + (10*rowCount + dataCount), 'card', $media_type + '-row-' + rowCount);
</script>

{#if datum.id}
	<section class="h-full">
		<section
			id={id}
			class="w-44 xl:h-108 xl:w-60 my-0.5 xl:my-2 bg-skin-primary xl:rounded-lg"
			tabindex="0"
		>
			<a href={`/person/${datum.id}`} class=" top-0 right-0 text-skin-base  xl:rounded-lg">
				<img
					class="oject-cover w-44 h-64 xl:w-60 xl:h-90 xl:rounded-t-lg text-skin-base"
					src={datum.profile_path === null ? '/person.svg' : IMAGE_API + datum.profile_path}
					alt={datum.name}
				/>
				<div class="p-2 h-18 w-44 xl:w-60 bg-skin-bg">
					<h6
						class="text-sm xl:text-lg text-textDark w-40 xl:w-52 whitespace-nowrap overflow-hidden overflow-ellipsis"
					>
						{datum.name}
					</h6>
				</div>
			</a>
		</section>
	</section>

	<!--    -->
{:else}
	<Spinner />
{/if}
