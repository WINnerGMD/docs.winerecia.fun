<script>
	import { page } from '$app/stores';
	import { Folder, FileText, ChevronRight, Menu } from 'lucide-svelte';
	
	let { data } = $props();
</script>

<article class="wiki-content">
	<header class="article-header">
		<h1>{data.article.title}</h1>
	</header>

	<div class="content-body">
		<!-- Render raw HTML from Tiptap -->
		{@html data.article.content}
	</div>
</article>

<style lang="scss">
	@use '$lib/styles/variables' as *;




	/* Main Content Area */
	.wiki-content {
		padding: 3rem 4rem 6rem; /* Increased left padding slightly for aesthetics, but aligned left */
		max-width: 1000px;
		margin: 0; /* Align left */
		width: 100%;

		@media (max-width: 1280px) {
			padding: 1rem;
			max-width: 100%;
		}
	}

	.article-header {
		margin-bottom: 2rem;
		/* border-bottom removed */
		
		h1 {
			font-size: 2.5rem;
			font-weight: 800;
			line-height: 1.2;
			margin-bottom: 1rem;
			background: linear-gradient(135deg, #fff 0%, #a5b4fc 100%);
			background-clip: text; /* Standard property */
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
		}
	}

	.breadcrumbs {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: $text-secondary;
		font-size: 0.9rem;
		margin-bottom: 1rem;

		.current {
			color: $text-main;
			font-weight: 500;
		}
	}

	/* Typography & Prose */
	.content-body {
		font-size: 1.05rem;
		line-height: 1.8;
		color: $text-secondary;

		/* Headings */
		:global(h2) {
			font-size: 1.75rem;
			margin-top: 3rem;
			margin-bottom: 1rem;
			color: $text-main;
			font-weight: 700;
		}

		:global(h3) {
			font-size: 1.4rem;
			margin-top: 2rem;
			margin-bottom: 1rem;
			color: $text-main;
			font-weight: 600;
		}

		:global(p) {
			margin-bottom: 1.5rem;
		}

		:global(ul), :global(ol) {
			margin-bottom: 1.5rem;
			padding-left: 1.5rem;
			color: rgba($text-main, 0.9);
			
			:global(li) {
				margin-bottom: 0.5rem;
				padding-left: 0.5rem;
			}
		}

		:global(blockquote) {
			border-left: 4px solid $primary;
			margin: 2rem 0;
			background: rgba($primary, 0.05); /* Very subtle tint */
			padding: 1.25rem 1.5rem;
			border-radius: 0 $radius $radius 0;
			color: $text-secondary;
			font-style: italic;
			
			:global(p) {
				margin-bottom: 0;
			}
		}

		:global(img) {
			max-width: 100%;
			border-radius: $radius;
			margin: 2rem 0;
			border: 1px solid $border;
			box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
		}
		
		:global(a) {
			color: $primary;
			text-decoration: underline;
			text-decoration-thickness: 1px;
			text-decoration-color: rgba($primary, 0.4);
			text-underline-offset: 3px;
			transition: all 0.2s;
			
			&:hover {
				text-decoration-color: $primary;
				background: rgba($primary, 0.1);
				border-radius: 2px;
			}
		}

		/* Callout/Info blocks (custom styles you might use) */
		:global(.callout) {
			background: $bg-card;
			border: 1px solid $border;
			border-radius: $radius;
			padding: 1.5rem;
			margin: 1.5rem 0;
		}

		/* Code blocks */
		:global(pre) {
			background: #1e1e1e !important;
			border-radius: $radius;
			padding: 1.5rem;
			margin: 1.5rem 0;
			overflow-x: auto;
			border: 1px solid $border;
		}
		
		:global(code) {
			background: rgba(255, 255, 255, 0.1);
			padding: 0.2rem 0.4rem;
			border-radius: 4px;
			font-size: 0.85em;
			font-family: 'JetBrains Mono', monospace;
			color: mix(white, $primary, 15%);
		}
	}
</style>
