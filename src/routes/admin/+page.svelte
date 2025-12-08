<script>
	import Button from '$lib/components/ui/Button.svelte';
	import { Plus, Edit, Trash2, FileText, Folder } from 'lucide-svelte';
	
	let { data } = $props();
</script>

<div class="dashboard-header">
	<h1>Dashboard</h1>
	<Button href="/admin/articles/new">
		<Plus size={18} />
		Новая статья
	</Button>
</div>

<div class="stats-grid">
	<div class="stat-card">
		<div class="icon-wrapper">
			<FileText size={24} color="#ec4899" />
		</div>
		<div class="stat-info">
			<span class="label">Всего статей</span>
			<span class="value">{data.articles.length}</span>
		</div>
	</div>
</div>

<div class="content-section">
	<h2>Последние статьи</h2>
	
	<div class="articles-list">
		{#if data.articles.length === 0}
			<div class="empty-state">
				<p>Статей пока нет. Создайте первую!</p>
			</div>
		{:else}
			{#each data.articles as article}
				<div class="article-item">
					<div class="article-info">
						<h3>{article.title}</h3>
						<span class="meta">
							Slug: /{article.slug} • 
							{#if article.group}
								<span class="group-tag">
									<Folder size={12} />
									{article.group.name}
								</span>
							{:else}
								<span class="no-group">Без раздела</span>
							{/if}
						</span>
					</div>
					<div class="actions">
						<Button variant="ghost" size="sm" href="/admin/articles/{article.id}">
							<Edit size={16} />
						</Button>
						<!-- Delete functionality to be implemented properly with form action -->
						<Button variant="ghost" size="sm" class="danger">
							<Trash2 size={16} />
						</Button>
					</div>
				</div>
			{/each}
		{/if}
	</div>
</div>

<style lang="scss">
	@use '$lib/styles/variables' as *;

	.dashboard-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;

		h1 {
			font-size: 2rem;
			color: $text-main;
		}
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1.5rem;
		margin-bottom: 3rem;
	}

	.stat-card {
		background-color: $bg-card;
		padding: 1.5rem;
		border-radius: $radius;
		border: 1px solid $border;
		display: flex;
		align-items: center;
		gap: 1rem;

		.icon-wrapper {
			width: 48px;
			height: 48px;
			border-radius: 50%;
			background-color: rgba($primary, 0.1);
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.stat-info {
			display: flex;
			flex-direction: column;
		}

		.label {
			font-size: 0.875rem;
			color: $text-secondary;
		}

		.value {
			font-size: 1.5rem;
			font-weight: 700;
			color: $text-main;
		}
	}

	.content-section {
		h2 {
			margin-bottom: 1.5rem;
			font-size: 1.25rem;
			color: $text-main;
		}
	}

	.articles-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.article-item {
		background-color: $bg-card;
		padding: 1rem 1.5rem;
		border-radius: $radius;
		border: 1px solid $border;
		display: flex;
		justify-content: space-between;
		align-items: center;
		transition: border-color 0.2s;

		&:hover {
			border-color: rgba($primary, 0.5);
		}

		.article-info {
			h3 {
				font-size: 1.1rem;
				margin-bottom: 0.25rem;
			}

			.meta {
				display: flex;
				align-items: center;
				gap: 0.5rem;
				font-size: 0.875rem;
				color: $text-secondary;
			}

			.group-tag, .no-group {
				display: inline-flex;
				align-items: center;
				gap: 0.25rem;
				background-color: rgba(255, 255, 255, 0.05);
				padding: 0.125rem 0.5rem;
				border-radius: 4px;
				font-size: 0.75rem;
			}
		}

		.actions {
			display: flex;
			gap: 0.5rem;
		}
	}

	.empty-state {
		text-align: center;
		padding: 3rem;
		background-color: $bg-card;
		border-radius: $radius;
		color: $text-secondary;
		border: 1px dashed $border;
	}

	:global(.danger) {
		color: #ff4d4d !important;
		&:hover {
			background-color: rgba(255, 0, 0, 0.1) !important;
		}
	}
</style>
