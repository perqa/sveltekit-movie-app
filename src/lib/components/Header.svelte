<script lang="ts">
	import Search from '$lib/utilities/Search.svelte';
	import Selector from '$lib/utilities/Selector.svelte';
	import { goto } from '$app/navigation';

	import ToggleDarkMode from '$lib/utilities/ToggleDarkMode.svelte';
	import { current_page, media_type } from '$lib/stores/store';
	import { fly } from 'svelte/transition';

	function toggleHome() {
		$media_type = 'movie';
		$current_page = 1;
		goto('/', { keepfocus: true });
	}
</script>

<header class="bg-skin-secondary" id="header" transition:fly="{{ y: -60, duration: 1000 }}">
	<div class="max-w-7xl mx-auto flex justify-between pl-2 md:pl-5 lg:pl-7 pr-1 items-center h-10">
		<div class="flex flex-row items-center">
			<button
			id="button-home"
			on:click|preventDefault={toggleHome}
			class="text-3xl text-skin-base hover:text-skin-selected" href="/"
				><i class="fa fa-home" />
			</button>
			<Selector />
		</div>
		<ToggleDarkMode />
		<Search />
	</div>
</header>
