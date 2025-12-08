<script>
	import Button from '$lib/components/ui/Button.svelte';
	import TiptapEditor from '$lib/components/editor/TiptapEditor.svelte';
	import { ArrowLeft } from 'lucide-svelte';

	let { form, data } = $props();
	let content = $state(form?.content ?? '');

	function handleContentChange(newContent) {
		content = newContent;
	}
</script>

<div class="page-header">
	<div class="left">
		<Button variant="ghost" size="sm" href="/admin">
			<ArrowLeft size={18} />
			Назад
		</Button>
		<h1>Новая статья</h1>
	</div>
</div>

<div class="editor-container">
	<form method="POST">
		{#if form?.error}
			<div class="error-banner">{form.error}</div>
		{/if}

		<div class="meta-sidebar">
			<div class="field">
				<label for="title">Заголовок</label>
				<input type="text" id="title" name="title" value={form?.title ?? ''} required placeholder="Например: Правила Сервера" />
			</div>

			<div class="field">
				<label for="slug">URL (Slug)</label>
				<input type="text" id="slug" name="slug" value={form?.slug ?? ''} required placeholder="rules" />
			</div>

			<div class="field">
				<label for="groupId">Раздел</label>
				<select id="groupId" name="groupId" value={form?.groupId ?? ''}>
					<option value="">Без раздела</option>
					{#each data.groups as group}
						<option value={group.id}>{group.name}</option>
					{/each}
				</select>
			</div>
			
			<div class="actions">
				<Button type="submit" size="lg" class="save-btn">Опубликовать</Button>
			</div>
		</div>

		<div class="main-editor">
			<input type="hidden" name="content" value={content} />
			<label class="editor-label">Содержание</label>
			<TiptapEditor {content} onchange={handleContentChange} />
		</div>
	</form>
</div>

<style lang="scss">
	@use '$lib/styles/variables' as *;

	.page-header {
		margin-bottom: 2rem;
		.left {
			display: flex;
			align-items: center;
			gap: 1rem;
			h1 { 
				font-size: 1.1rem; 
				color: $text-main; 
				margin: 0; 
				font-weight: 600;
			}
		}
	}

	.editor-container {
		height: calc(100vh - 180px);
		display: flex;
		flex-direction: column;

		form {
			display: grid;
			grid-template-columns: 300px 1fr;
			gap: 2rem;
			align-items: start;
			height: 100%;

			@media (max-width: 1024px) {
				grid-template-columns: 1fr;
				height: auto;
			}
		}
	}

	.meta-sidebar {
		background-color: $bg-card;
		padding: 1.5rem;
		border-radius: $radius;
		border: 1px solid $border;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		height: 100%;
		overflow-y: auto;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		label {
			font-size: 0.9rem;
			color: $text-secondary;
			font-weight: 500;
		}

		input, select {
			padding: 0.75rem;
			background-color: rgba(255, 255, 255, 0.05);
			border: 1px solid $border;
			border-radius: $radius;
			color: $text-main;
			font-size: 1rem;
			transition: border-color 0.2s;

			&:focus {
				outline: none;
				border-color: $primary;
			}
		}
	}

	.main-editor {
		display: flex;
		flex-direction: column;
		height: 100%;
		min-height: 0;

		.editor-label {
			display: block;
			margin-bottom: 0.5rem;
			font-weight: 500;
			color: $text-secondary;
		}
	}

	.save-btn {
		width: 100%;
	}

	.error-banner {
		grid-column: 1 / -1;
		background-color: rgba(255, 0, 0, 0.1);
		border: 1px solid rgba(255, 0, 0, 0.3);
		color: #ff4d4d;
		padding: 1rem;
		border-radius: $radius;
	}
</style>
