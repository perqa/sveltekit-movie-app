import preprocess from 'svelte-preprocess';
// import { resolve } from "path";
import path from 'path';
import adapter from '@sveltejs/adapter-netlify';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		})
	],

	kit: {
		adapter: adapter(),
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		vite: {
			server:{
				fs: {
					allow: ['./libs']
				}
			},
			resolve: {
				alias: {
					// src: path.resolve('./src'),
					// lib: path.resolve('./src/lib'),
					// routes: path.resolve('./src/routes'),
     //      components: path.resolve('./src/lib/components'),
     //      pages: path.resolve('./src/lib/pages'),
     //      stores: path.resolve('./src/lib/stores'),
     //      utilities: path.resolve('./src/lib/utilities'),
     //      api: path.resolve('./src/routes/api'),
     //      episode: path.resolve('./src/routes/episode'),
     //      genre: path.resolve('./src/routes/genre'),
     //      movie: path.resolve('./src/routes/movie'),
     //      person: path.resolve('./src/routes/person'),
     //      search: path.resolve('./src/routes/search'),
     //      seasons: path.resolve('./src/routes/seasons'),
     //      trending: path.resolve('./src/routes/trending'),
     //      tv: path.resolve('./src/routes/tv'),
					'@': path.resolve('./src/')
					// $components: path.resolve('./src/lib/components'),
					// $stores: path.resolve('./src/lib/stores'),
					// //$actions: path.resolve('./src/actions'),
					// $api: path.resolve('./src/routes/api')
				}
			}
		}
	}
};

export default config;
