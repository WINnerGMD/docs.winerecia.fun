<script>
	import '../../app.scss';
	import { page } from '$app/stores';
	import { FileText, Settings, LogOut, LayoutGrid, Plus, Folder } from 'lucide-svelte';
	
	let { children } = $props();
</script>

{#if $page.url.pathname === '/admin/login'}
	{@render children()}
{:else}
	<div class="admin-layout">
		<aside class="sidebar">
			<div class="sidebar-header">
				<h2>Пишем статейки 1.0</h2>
			</div>

			<nav class="sidebar-nav">
				<a href="/admin" class:active={$page.url.pathname === '/admin'}>
					<LayoutGrid size={20} />
					<span>Главная</span>
				</a>
				<a href="/admin/articles/new" class:active={$page.url.pathname === '/admin/articles/new'}>
					<Plus size={20} />
					<span>Новая статья</span>
				</a>
				<a href="/admin/groups" class:active={$page.url.pathname === '/admin/groups'}>
					<Folder size={20} />
					<span>Разделы</span>
				</a>
			</nav>

			<div class="sidebar-footer">
				<form action="/admin/logout" method="POST">
					<button type="submit" class="logout-btn">
						<LogOut size={20} />
						<span>Сьебаться</span>
					</button>
				</form>
			</div>
		</aside>

		<main class="admin-content">
			{@render children()}
		</main>
	</div>
{/if}

<style lang="scss">
	@use '$lib/styles/variables' as *;

	.admin-layout {
		display: flex;
		height: 100vh; /* Fixed full height */
		overflow: hidden; /* Prevent body scroll */
	}

	.sidebar {
		width: 280px;
		background-color: $bg-card; // Lighter bg for sidebar
		border-right: 1px solid $border;
		display: flex;
		flex-direction: column;
		position: fixed;
		height: 100vh;
		box-shadow: 4px 0 24px rgba(0,0,0,0.1); // Subtle depth
	}

	.sidebar-header {
		padding: 2rem 1.5rem; // More breathing room
		border-bottom: 1px solid $border;
		h2 {
			color: $text-main;
			font-size: 1.1rem;
			font-weight: 700;
			display: flex;
			align-items: center;
			gap: 0.5rem;
			
			&::before {
				content: '';
				display: block;
				width: 8px;
				height: 8px;
				border-radius: 50%;
				background: $primary;
				box-shadow: 0 0 10px $primary;
			}
		}
	}

	.sidebar-nav {
		flex: 1;
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		a {
			display: flex;
			align-items: center;
			gap: 1rem;
			padding: 0.875rem 1rem;
			border-radius: $radius;
			color: $text-secondary;
			transition: all 0.2s ease;
			font-weight: 500;
			font-size: 0.95rem;

			&:hover {
				background-color: rgba(255, 255, 255, 0.05);
				color: $text-main;
				transform: translateX(4px);
			}

			&.active {
				background-color: rgba($primary, 0.1);
				color: $primary;
				border: 1px solid rgba($primary, 0.1);
			}
		}
	}

	.sidebar-footer {
		padding: 1.5rem;
		border-top: 1px solid $border;
	}

	.logout-btn {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 1rem;
		width: 100%;
		background: none;
		border: none;
		color: #ff4d4d;
		cursor: pointer;
		font-size: 1rem;
		border-radius: $radius;
		transition: background 0.2s;

		&:hover {
			background-color: rgba(255, 0, 0, 0.1);
		}
	}

	.admin-content {
		flex: 1;
		margin-left: 280px;
		padding: 2rem;
		background-color: $bg-dark;
		height: 100%;
		overflow: hidden; /* Prevent page scroll, force internal scroll */
		display: flex;
		flex-direction: column;
	}
</style>
