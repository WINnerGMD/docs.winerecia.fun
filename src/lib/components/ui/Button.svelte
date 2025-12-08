<script>
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 * @property {'primary' | 'secondary' | 'ghost' | 'outline'} [variant]
	 * @property {'sm' | 'md' | 'lg'} [size]
	 * @property {string} [href]
	 * @property {string} [class]
	 * @property {() => void} [onclick]
	 */

	/** @type {Props} */
	let { 
		children, 
		variant = 'primary', 
		size = 'md', 
		href = '', 
		class: className = '',
		onclick = undefined,
		...rest 
	} = $props();
</script>

{#if href}
	<a {href} class="btn {variant} {size} {className}" {...rest}>
		{@render children?.()}
	</a>
{:else}
	<button class="btn {variant} {size} {className}" {onclick} {...rest}>
		{@render children?.()}
	</button>
{/if}

<style lang="scss">
	@use '$lib/styles/variables' as *;

	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 10px; // Чуть более скругленные
		font-weight: 600;
		transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
		cursor: pointer;
		border: 1px solid transparent;
		text-decoration: none;
		font-family: inherit;
		gap: 0.5rem;
		position: relative;
		overflow: hidden;

		&:active {
			transform: scale(0.98);
		}

		&.sm {
			padding: 0.375rem 0.875rem;
			font-size: 0.875rem;
		}

		&.md {
			padding: 0.625rem 1.25rem;
			font-size: 0.95rem;
		}

		&.lg {
			padding: 0.875rem 2rem;
			font-size: 1.125rem;
		}

		&.primary {
			background: linear-gradient(135deg, lighten($primary, 5%), darken($primary, 5%));
			color: #fff;
			border: 1px solid rgba(255, 255, 255, 0.1);

			&:hover {
				transform: translateY(-2px);
				filter: brightness(1.1);
			}
		}

		&.secondary {
			background-color: $bg-card;
			color: $text-main;
			border-color: $border;
			
			&:hover {
				background-color: $bg-card-hover;
				border-color: rgba(255, 255, 255, 0.1);
				transform: translateY(-1px);
			}
		}

		&.ghost {
			background-color: transparent;
			color: $text-secondary;
			
			&:hover {
				color: $text-main;
				background-color: rgba(255, 255, 255, 0.05);
			}
		}

		&.outline {
			background-color: transparent;
			border: 1px solid rgba($primary, 0.5);
			color: $primary;
			
			&:hover {
				background-color: rgba($primary, 0.1);
				border-color: $primary;
				box-shadow: 0 0 12px rgba($primary, 0.2);
			}
		}
	}
</style>
