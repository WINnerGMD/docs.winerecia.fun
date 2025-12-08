<script>
	import favicon from '$lib/assets/favicon.svg';
	import '../app.scss';
	import Header from '$lib/components/Header.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	
	import { page } from '$app/stores';

	let { children, data } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="app-layout">
	{#if !$page.url.pathname.startsWith('/admin/articles/')}
		<Header />
	{/if}
	
	<div class="app-body">
		<!-- Sidebar is persistent on all pages if data is present, BUT NOT in admin panel -->
		{#if data.navigation && !$page.url.pathname.startsWith('/admin')}
			<Sidebar navigation={data.navigation} />
		{/if}
		
		<main class="main-content">
			{@render children()}
		</main>
	</div>
</div>

<style lang="scss">
	@use '$lib/styles/variables' as *;

	.app-layout {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: var(--bg-dark);
		color: var(--text-main);
	}



	.app-body {
		display: flex;
		flex: 1;
		width: 100%;
		margin: 0 auto;
	}

	.main-content {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
	}
</style>
