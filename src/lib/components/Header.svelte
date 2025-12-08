<script>
	import Button from './ui/Button.svelte';
	import { Search, ExternalLink, Menu, X } from 'lucide-svelte';
	
	let isMenuOpen = $state(false);

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}
</script>

<header class="header">
	<div class="content">
		<div class="left">
			<button class="menu-btn" onclick={toggleMenu} aria-label="Menu">
				{#if isMenuOpen}
					<X size={24} />
				{:else}
					<Menu size={24} />
				{/if}
			</button>

			<a href="/" class="logo">
				<div class="logo-icon">
					<span class="icon-text">W</span>
				</div>
				<span class="logo-text">WINERECIA <span class="subtitle">WIKI</span></span>
			</a>
		</div>

		<div class="search-container">
			<div class="search-input-wrapper">
				<Search size={18} class="search-icon" />
				<input type="text" placeholder="Поиск по статьям..." aria-label="Search" />
				<div class="shortcut">⌘K</div>
			</div>
		</div>

		<div class="right">
			<a href="https://winerecia.fun" class="main-site-link" target="_blank">
				<span>На сайт</span>
				<ExternalLink size={14} />
			</a>
		</div>
	</div>
</header>


<style lang="scss">
	@use '$lib/styles/variables' as *;

	/* Локальные стили */
	.header {
		height: $header-height;
		padding: 0 25px; /* Отступы только по горизонтали */
		position: sticky; /* Sticky вместо fixed для натурального потока */
		top: 0;
		/* width: 100%; - implied in flex/block */
		background-color: rgba($bg-dark, 0.95); /* Более плотный фон */
		backdrop-filter: blur(12px);
		border-bottom: 1px solid rgba(255, 255, 255, 0.1); /* Более заметная граница */
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); /* Тень для глубины */
		z-index: 50;
		display: flex;
		justify-content: center;
		align-items: center; /* Центрирование по вертикали */
	}

	.content {
		width: 100%;
		max-width: 1600px; /* Ширина как у основного лейаута */
		padding: 0 1.5rem; /* Выравнивание с сайдбаром */
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 100%;
	}

	.left {
		display: flex;
		align-items: center;
		gap: 1rem;
		min-width: 200px;
	}

	.menu-btn {
		display: none;
		background: none;
		border: none;
		color: $text-secondary;
		cursor: pointer;
		padding: 0.5rem;
		margin-left: -0.5rem;
		
		@media (max-width: 1024px) {
			display: block;
		}
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		text-decoration: none;
		
		.logo-icon {
			width: 32px;
			height: 32px;
			background: linear-gradient(135deg, $primary, darken($primary, 5%));
			border-radius: 8px;
			display: flex;
			align-items: center;
			justify-content: center;
			color: white;
			font-weight: 800;
			font-size: 1.1rem;
			box-shadow: 0 2px 10px rgba($primary, 0.25);
		}

		.logo-text {
			font-size: 1.1rem;
			font-weight: 700;
			color: $text-main;
			letter-spacing: -0.01em;
			display: flex;
			align-items: center;
			gap: 0.5rem;
		}

		.subtitle {
			font-size: 0.7rem;
			font-weight: 600;
			color: $text-secondary;
			background: rgba(255, 255, 255, 0.05);
			padding: 2px 6px;
			border-radius: 4px;
			border: 1px solid rgba(255, 255, 255, 0.1);
			letter-spacing: 0.05em;
		}
	}

	.search-container {
		flex: 1;
		max-width: 600px;
		margin: 0 2rem;
		
		@media (max-width: 768px) {
			display: none;
		}
	}

	.search-input-wrapper {
		position: relative;
		display: flex;
		align-items: center;
		width: 100%;

		:global(.search-icon) {
			position: absolute;
			left: 12px;
			color: $text-secondary;
			pointer-events: none;
		}

		input {
			width: 100%;
			height: 40px;
			padding: 0 40px 0 38px;
			background-color: rgba(255, 255, 255, 0.03);
			border: 1px solid rgba(255, 255, 255, 0.08);
			border-radius: 8px;
			color: $text-main;
			font-size: 0.9rem;
			font-family: inherit;
			transition: all 0.15s ease;

			&::placeholder {
				color: rgba($text-secondary, 0.6);
			}

			&:focus {
				outline: none;
				background-color: rgba(255, 255, 255, 0.06);
				border-color: rgba($primary, 0.5);
				box-shadow: 0 0 0 2px rgba($primary, 0.1);
			}
			
			&:focus + .shortcut {
				opacity: 0; // Скрываем шорткат при вводе
			}
		}

		.shortcut {
			position: absolute;
			right: 10px;
			display: flex;
			align-items: center;
			padding: 0 5px;
			height: 20px;
			border-radius: 4px;
			background: rgba(255, 255, 255, 0.05);
			border: 1px solid rgba(255, 255, 255, 0.05);
			color: $text-secondary;
			font-size: 0.7rem;
			font-family: monospace;
			pointer-events: none;
			transition: opacity 0.15s;
		}
	}

	.right {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		min-width: 200px;
		gap: 1rem;
	}

	.main-site-link {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: $text-secondary;
		font-size: 0.85rem;
		font-weight: 500;
		text-decoration: none;
		transition: color 0.2s;
		padding: 0.5rem;
		
		&:hover {
			color: $text-main;
		}
	}

</style>
