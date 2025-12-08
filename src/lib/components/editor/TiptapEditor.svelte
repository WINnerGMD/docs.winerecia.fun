<script>
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Image from '@tiptap/extension-image';
	import TextAlign from '@tiptap/extension-text-align';
	import Typography from '@tiptap/extension-typography';
	import { 
		Bold, Italic, Strikethrough, Heading1, Heading2, Heading3, 
		List, ListOrdered, Quote, AlignLeft, AlignCenter, AlignRight, 
		Image as LucideImage, Undo, Redo 
	} from 'lucide-svelte';
	import Button from '../ui/Button.svelte';

	let { content = '', onchange } = $props();

	let element;
	let editor = $state(null);

	/* Реактивное состояние кнопок тулбара */
	let editorState = $state({
		bold: false,
		italic: false,
		strike: false,
		h1: false,
		h2: false,
		h3: false,
		bulletList: false,
		orderedList: false,
		blockquote: false,
		alignLeft: false,
		alignCenter: false,
		alignRight: false,
		canUndo: false,
		canRedo: false
	});

	function updateEditorState() {
		if (!editor) return;
		editorState.bold = editor.isActive('bold');
		editorState.italic = editor.isActive('italic');
		editorState.strike = editor.isActive('strike');
		editorState.h1 = editor.isActive('heading', { level: 1 });
		editorState.h2 = editor.isActive('heading', { level: 2 });
		editorState.h3 = editor.isActive('heading', { level: 3 });
		editorState.bulletList = editor.isActive('bulletList');
		editorState.orderedList = editor.isActive('orderedList');
		editorState.blockquote = editor.isActive('blockquote');
		editorState.alignLeft = editor.isActive({ textAlign: 'left' });
		editorState.alignCenter = editor.isActive({ textAlign: 'center' });
		editorState.alignRight = editor.isActive({ textAlign: 'right' });
		editorState.canUndo = editor.can().undo();
		editorState.canRedo = editor.can().redo();
	}

	onMount(() => {
		try {
			editor = new Editor({
				// ... existing config ...
				element: element,
				extensions: [
					StarterKit,
					Image.configure({
						inline: true,
						allowBase64: true, 
					}),
					TextAlign.configure({
						types: ['heading', 'paragraph'],
					}),
					Typography,
				],
				content: content,
				onTransaction: () => {
					updateEditorState();
					// Триггерим реактивность Svelte
					editor = editor;
				},
				onUpdate: ({ editor }) => {
					if (onchange) {
						onchange(editor.getHTML());
					}
				},
				editorProps: {
					attributes: {
						class: 'prose prose-invert max-w-none focus:outline-none min-h-[400px] p-4'
					}
				}
			});
			// Initial state update
			updateEditorState();
		} catch (e) {
			console.error('Editor Init Error:', e);
			alert('Не удалось запустить редактор: ' + e.message);
		}
	});

	// ... onDestroy and addImage ...

</script>

	<div class="editor-toolbar" class:disabled={!editor}>
		<!-- Картинка -->
		<div class="toolbar-group">
			<button type="button" onclick={addImage} title="Вставить изображение" class="image-btn" disabled={!editor}>
				<LucideImage size={18} />
			</button>
		</div>
		<div class="divider"></div>

		<!-- Форматирование -->
		<div class="toolbar-group">
			<button type="button" disabled={!editor} class:active={editorState.bold} onclick={() => editor?.chain().focus().toggleBold().run()} title="Жирный">
				<Bold size={18} />
			</button>
			<button type="button" disabled={!editor} class:active={editorState.italic} onclick={() => editor?.chain().focus().toggleItalic().run()} title="Курсив">
				<Italic size={18} />
			</button>
			<button type="button" disabled={!editor} class:active={editorState.strike} onclick={() => editor?.chain().focus().toggleStrike().run()} title="Зачеркнутый">
				<Strikethrough size={18} />
			</button>
		</div>

		<div class="divider"></div>

		<!-- Заголовки -->
		<div class="toolbar-group">
			<button type="button" disabled={!editor} class:active={editorState.h1} onclick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}>
				<Heading1 size={18} />
			</button>
			<button type="button" disabled={!editor} class:active={editorState.h2} onclick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>
				<Heading2 size={18} />
			</button>
			<button type="button" disabled={!editor} class:active={editorState.h3} onclick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}>
				<Heading3 size={18} />
			</button>
		</div>

		<div class="divider"></div>

		<!-- Списки -->
		<div class="toolbar-group">
			<button type="button" disabled={!editor} class:active={editorState.bulletList} onclick={() => editor?.chain().focus().toggleBulletList().run()}>
				<List size={18} />
			</button>
			<button type="button" disabled={!editor} class:active={editorState.orderedList} onclick={() => editor?.chain().focus().toggleOrderedList().run()}>
				<ListOrdered size={18} />
			</button>
			<button type="button" disabled={!editor} class:active={editorState.blockquote} onclick={() => editor?.chain().focus().toggleBlockquote().run()}>
				<Quote size={18} />
			</button>
		</div>

		<div class="divider"></div>

		<!-- Выравнивание -->
		<div class="toolbar-group">
			<button type="button" disabled={!editor} class:active={editorState.alignLeft} onclick={() => editor?.chain().focus().setTextAlign('left').run()}>
				<AlignLeft size={18} />
			</button>
			<button type="button" disabled={!editor} class:active={editorState.alignCenter} onclick={() => editor?.chain().focus().setTextAlign('center').run()}>
				<AlignCenter size={18} />
			</button>
			<button type="button" disabled={!editor} class:active={editorState.alignRight} onclick={() => editor?.chain().focus().setTextAlign('right').run()}>
				<AlignRight size={18} />
			</button>
		</div>

		<div class="spacer"></div>

		<!-- История -->
		<div class="toolbar-group">
			<button type="button" disabled={!editor || !editorState.canUndo} onclick={() => editor?.chain().focus().undo().run()}>
				<Undo size={18} />
			</button>
			<button type="button" disabled={!editor || !editorState.canRedo} onclick={() => editor?.chain().focus().redo().run()}>
				<Redo size={18} />
			</button>
		</div>
	</div>



<div class="editor-content" bind:this={element}></div>

<style lang="scss">
	@use '$lib/styles/variables' as *;

	.editor-toolbar {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		padding: 0.75rem;
		background-color: $bg-card;
		border: 1px solid $border;
		border-bottom: none;
		border-radius: $radius $radius 0 0;
		align-items: center;
		
		&.disabled {
			opacity: 0.5;
			pointer-events: none;
		}
	}

	.toolbar-group {
		display: flex;
		gap: 0.25rem;
	}

	.divider {
		width: 1px;
		height: 24px;
		background-color: $border;
		margin: 0 0.5rem;
	}

	.spacer {
		flex: 1;
	}

	button {
		padding: 0.4rem;
		border-radius: 4px;
		background: transparent;
		color: $text-secondary;
		border: none;
		cursor: pointer;
		transition: all 0.2s;
		display: flex;
		align-items: center;
		justify-content: center;

		&:hover {
			background-color: rgba(255, 255, 255, 0.1);
			color: $text-main;
		}

		&.active {
			background-color: $primary; /* Сплошной цвет */
			color: #fff; /* Белый текст для контраста */
		}

		&:disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}
	}

	.editor-content {
		border: 1px solid $border;
		border-radius: 0 0 $radius $radius;
		background-color: rgba(0, 0, 0, 0.2);
		flex: 1;
		min-height: 0;
		display: flex;
		flex-direction: column;
		
		:global(.ProseMirror) {
			flex: 1;
			padding: 1.5rem;
			outline: none;
			color: $text-main;
			line-height: 1.6;
			overflow-y: auto; /* Скролл внутри редактора */

			:global(> :first-child) { margin-top: 0; }
		}

		:global(h1), :global(h2), :global(h3) {
			color: $text-main;
			margin-top: 1.5em;
			margin-bottom: 0.5em;
		}

		:global(h1) { font-size: 2em; font-weight: 800; }
		:global(h2) { font-size: 1.5em; font-weight: 700; color: $primary; }
		:global(h3) { font-size: 1.25em; font-weight: 600; }
		
		:global(ul), :global(ol) { padding-left: 1.5rem; margin: 1em 0; }
		:global(ul) { list-style-type: disc; }
		:global(ol) { list-style-type: decimal; }

		:global(blockquote) {
			border-left: 4px solid $primary;
			margin: 1.5em 0;
			padding-left: 1em;
			font-style: italic;
			color: $text-secondary;
		}

		:global(img) {
			max-width: 100%;
			border-radius: $radius;
			margin: 1.5rem 0;
			display: block;
			
			&.ProseMirror-selectednode {
				outline: 2px solid $primary;
			}
		}

		:global(p) { margin-bottom: 1em; }
	}
</style>
