<script>
	import Button from '$lib/components/ui/Button.svelte';
	import TiptapEditor from '$lib/components/editor/TiptapEditor.svelte';
	import { ArrowLeft } from 'lucide-svelte';

	let { form, data } = $props();
	
	// Initialize content with existing data
	let content = $state(form?.content ?? data.article.content);
	let title = $state(form?.title ?? data.article.title);
	let slug = $state(form?.slug ?? data.article.slug);
	let groupId = $state(form?.groupId ?? data.article.groupId ?? '');

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
		<h1>Редактирование статьи</h1>
	</div>
</div>

<div class="editor-container">
	<form method="POST">

		<div class="meta-sidebar">
			<div class="field">
				<label for="title">Заголовок</label>
				<input type="text" id="title" name="title" bind:value={title} required />
			</div>

			<div class="field">
				<label for="slug">URL (Slug)</label>
				<input type="text" id="slug" name="slug" bind:value={slug} required />
			</div>

			<div class="field">
				<label for="groupId">Раздел</label>
				<select id="groupId" name="groupId" bind:value={groupId}>
					<option value="">Без раздела</option>
					{#each data.groups as group}
						<option value={group.id}>{group.name}</option>
					{/each}
				</select>
			</div>
			
			<div class="actions">
				<Button type="submit" size="lg" class="save-btn" formaction="?/update">Сохранить</Button>
				<Button 
					type="submit" 
					variant="outline" 
					size="lg" 
					class="delete-btn" 
					formaction="?/delete"
					onclick={(e) => {
						if (!confirm('Вы уверены, что хотите удалить эту статью?')) {
							e.preventDefault();
						}
					}}
				>
					Удалить
				</Button>
			</div>
		</div>

		<div class="main-editor">
			<input type="hidden" name="content" value={content} />
			<!-- Removed explicit label to save space and stick to clean UI -->
			<TiptapEditor {content} onchange={handleContentChange} />
		</div>
	</form>
</div>

<style lang="scss">
	@use '$lib/styles/variables' as *;

	/* ... page-header styles ... */
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
		flex: 1; /* Grow to fill admin-content */
		min-height: 0; /* Allow shrinking */
		display: flex;
		flex-direction: column;

		form {
			display: grid;
			grid-template-columns: 300px 1fr;
			gap: 2rem;
			height: 100%;
			align-items: start;
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
		/* No sticky needed if we are locked in height, but let's keep it safe */
		height: 100%;
		overflow-y: auto;
	}

	/* ... field styles ... */
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
		min-height: 0; /* Enable flex shrinking/scrolling */

		.editor-label {
			display: block;
			margin-bottom: 0.5rem;
			font-weight: 500;
			color: $text-secondary;
		}
		
		/* Target the component instance to make it grow */
		:global(.editor-toolbar) {
			flex-shrink: 0; /* Toolbar doesn't shrink */
		}
		
		/* We need to teach the Editor component to fill this space. 
		   Since we updated TiptapEditor css to flex:1, we just need to make sure the component wrapper grows. 
		   Svelte components don't have a wrapper by default unless we wrap them.
		   We'll treat .main-editor as the flex container for the TiptapEditor internals if we could, 
		   but TiptapEditor has its own structure. 
		   Let's ensure TiptapEditor's internal .editor-content grows.
		*/
	}

	.save-btn {
		width: 100%;
	}

	.delete-btn {
		margin-left: 1rem;
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
