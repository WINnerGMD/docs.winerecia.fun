<script>
	import { page } from '$app/stores';
	import * as Icons from 'lucide-svelte';
	
	let { navigation } = $props();
</script>

<aside class="wiki-sidebar">
	<nav class="nav-tree">
		{#if navigation}
			{#each navigation as group}
				{#if group.articles && group.articles.length > 0}
					<div class="nav-group">
						<div class="group-header">
							{#if !group.isOrphan}
								{@const Icon = Icons[group.icon] || Icons.Folder}
								<Icon size={16} class="icon" />
							{/if}
							<span>{group.name}</span>
						</div>
						<div class="group-items">
							{#each group.articles as item}
								<a 
									href="/{item.slug}" 
									class="nav-item" 
									class:active={$page.params.slug === item.slug}
								>
									{item.title}
								</a>
							{/each}
						</div>
					</div>
				{/if}
			{/each}
		{/if}
	</nav>
</aside>

<style lang="scss">
	@use '$lib/styles/variables' as *;

	.wiki-sidebar {
		width: 280px;
		flex-shrink: 0;
		border-right: none; /* Убираем боковой бордер */
		border: 1px solid rgba(255, 255, 255, 0.1); /* Полная обводка */
		border-radius: 15px; /* Скругленные углы */
		
		/* Плавающее позиционирование */
		margin: 1rem 1rem 1rem;
		height: calc(100vh - $header-height - 2rem);
		position: sticky;
		top: calc($header-height + 1rem);
		overflow-y: auto;
		padding: 2rem 1.75rem;
		background-color: rgba(43, 39, 62, 0.1); /* Сплошной фон карточки */
		
		&::-webkit-scrollbar {
			width: 4px;
		}
		&::-webkit-scrollbar-thumb {
			background: rgba(255, 255, 255, 0.1);
			border-radius: 2px;
		}

		@media (max-width: 1024px) {
			display: none;
		}
	}

	.nav-group {
		margin-bottom: 2rem;
	}

	.group-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		color: $text-main;
		font-size: 0.9rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: 0.75rem;
		opacity: 0.8;

		:global(.icon) {
			color: $primary;
		}
	}

	.group-items {
		display: flex;
		flex-direction: column;
		gap: 2px;
		border-left: 1px solid rgba(255, 255, 255, 0.05);
		margin-left: 7px;
		padding-left: 1rem;
	}

	.nav-item {
		display: block;
		padding: 0.5rem 0.75rem;
		border-radius: 6px;
		font-size: 0.95rem;
		color: $text-secondary;
		transition: all 0.15s ease;
		text-decoration: none;
		line-height: 1.4;

		&:hover {
			color: $text-main;
			background-color: rgba(255, 255, 255, 0.05);
		}

		&.active {
			color: $primary;
			background-color: rgba($primary, 0.1);
			font-weight: 500;
		}
	}
</style>
