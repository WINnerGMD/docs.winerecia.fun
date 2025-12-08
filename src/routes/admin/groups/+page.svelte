<script>
	import Button from '$lib/components/ui/Button.svelte';
	import { Trash2, Edit2, Plus, Save, X } from 'lucide-svelte';
	import * as Icons from 'lucide-svelte';
	
	let { data, form } = $props();

	let editingGroup = $state(null);
	let name = $state('');
	let slug = $state('');
	let icon = $state('Folder');
	let order = $state(0);

	function startEdit(group) {
		editingGroup = group;
		name = group.name;
		slug = group.slug;
		icon = group.icon || 'Folder';
		order = group.order;
	}

	function cancelEdit() {
		editingGroup = null;
		name = '';
		slug = '';
		icon = 'Folder';
		order = 0;
	}
</script>

<div class="page-header">
	<h1>Разделы Wiki</h1>
</div>

<div class="groups-container">
	<div class="create-card">
		<h2>{editingGroup ? 'Редактировать раздел' : 'Добавить раздел'}</h2>
		<form method="POST" action={editingGroup ? '?/update' : '?/create'} onsubmit={() => setTimeout(cancelEdit, 500)}>
			{#if form?.error}
				<div class="error">{form.error}</div>
			{/if}
			
			{#if editingGroup}
				<input type="hidden" name="id" value={editingGroup.id} />
			{/if}

			<div class="field">
				<label for="name">Название</label>
				<input type="text" name="name" required placeholder="Основное" bind:value={name} />
			</div>
			
			<div class="field">
				<label for="slug">Slug (URL)</label>
				<input type="text" name="slug" required placeholder="main" bind:value={slug} />
			</div>

			<div class="field">
				<label for="icon">Иконка (название Lucide)</label>
				<input type="text" name="icon" placeholder="Folder, Star, Zap..." bind:value={icon} />
			</div>

			<div class="field">
				<label for="order">Порядок</label>
				<input type="number" name="order" bind:value={order} />
			</div>

			<div class="actions">
				<Button type="submit" size="md">
					{#if editingGroup}
						<Save size={16} /> Сохранить
					{:else}
						<Plus size={16} /> Создать
					{/if}
				</Button>
				{#if editingGroup}
					<Button type="button" variant="ghost" size="md" onclick={cancelEdit}>
						<X size={16} /> Отмена
					</Button>
				{/if}
			</div>
		</form>
	</div>

	<div class="list-card">
		<h2>Существующие разделы</h2>
		<div class="groups-list">
			{#each data.groups as group}
				{@const Icon = Icons[group.icon] || Icons.Folder}
				<div class="group-item" class:editing={editingGroup?.id === group.id}>
					<div class="info">
						<div class="top">
							<Icon size={18} color="#ec4899" />
							<span class="name">{group.name}</span>
						</div>
						<span class="meta">/{group.slug} • Articles: {group._count.articles} • Order: {group.order}</span>
					</div>
					<div class="group-actions">
						<Button variant="ghost" size="sm" onclick={() => startEdit(group)}>
							<Edit2 size={16} />
						</Button>
						<form method="POST" action="?/delete" style="display:inline;">
							<input type="hidden" name="id" value={group.id} />
							<Button type="submit" variant="ghost" size="sm" class="danger">
								<Trash2 size={16} />
							</Button>
						</form>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	@use '$lib/styles/variables' as *;
    
    /* ... existing styles ... */
	
    .actions {
        display: flex;
        gap: 0.5rem;
    }

    .group-actions {
        display: flex;
        gap: 0.25rem;
    }

	.page-header {
		margin-bottom: 2rem;
		h1 { color: $text-main; }
	}
    /* ... rest of styles ... */

	.groups-container {
		display: grid;
		grid-template-columns: 350px 1fr;
		gap: 2rem;
		align-items: start;

		@media (max-width: 900px) {
			grid-template-columns: 1fr;
		}
	}

	.create-card, .list-card {
		background-color: $bg-card;
		padding: 1.5rem;
		border-radius: $radius;
		border: 1px solid $border;

		h2 {
			font-size: 1.25rem;
			margin-bottom: 1.5rem;
			color: $text-main;
		}
	}

	.field {
		margin-bottom: 1rem;
		label { display: block; margin-bottom: 0.5rem; color: $text-secondary; font-size: 0.9rem; }
		input {
			width: 100%;
			padding: 0.6rem;
			background: rgba(255,255,255,0.05);
			border: 1px solid $border;
			border-radius: $radius;
			color: $text-main;
			&:focus { outline: none; border-color: $primary; }
		}
	}

	.error {
		color: #ff4d4d;
		margin-bottom: 1rem;
		font-size: 0.9rem;
	}

	.groups-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.group-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		background: rgba(255,255,255,0.03);
		border-radius: $radius;
		border: 1px solid transparent;

		.info {
			.top { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem; }
			.name { font-weight: 500; }
			.meta { font-size: 0.8rem; color: $text-secondary; }
		}
	}
</style>
