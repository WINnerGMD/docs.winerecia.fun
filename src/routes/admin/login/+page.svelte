<script>
	import Button from '$lib/components/ui/Button.svelte';
	let { form } = $props();
</script>

<div class="login-container">
	<div class="card">
		<h1>Вход в маму кендала</h1>
		
		{#if form?.error}
			<div class="error">{form.error}</div>
		{/if}

		<form method="POST">
			<div class="field">
				<label for="username">Имя пользователя</label>
				<input type="text" id="username" name="username" required autocomplete="username" />
			</div>

			<div class="field">
				<label for="password">Пароль</label>
				<input type="password" id="password" name="password" required autocomplete="current-password" />
			</div>

			<Button type="submit" variant="primary" size="lg" class="submit-btn">Войти</Button>
		</form>
	</div>
</div>

<style lang="scss">
	@use '$lib/styles/variables' as *;

	.login-container {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: calc(100vh - 70px); // Subtract header height
	}

	.card {
		background-color: $bg-card;
		padding: 2.5rem;
		border-radius: $radius;
		border: 1px solid $border;
		width: 100%;
		max-width: 400px;

		h1 {
			margin-bottom: 2rem;
			text-align: center;
			color: $primary;
			font-size: 1.75rem;
		}
	}

	.field {
		margin-bottom: 2rem;

		label {
			display: block;
			margin-bottom: 0.75rem;
			font-size: 0.95rem;
			color: $text-secondary;
			font-weight: 500;
		}

		input {
			width: 100%;
			padding: 0.875rem 1rem;
			background-color: rgba(255, 255, 255, 0.03);
			border: 1px solid rgba(255, 255, 255, 0.1);
			border-radius: $radius;
			color: $text-main;
			font-size: 1rem;
			transition: all 0.2s ease;
			box-shadow: none; /* Flattens the input */

			&::placeholder {
				color: rgba($text-secondary, 0.5);
			}

			&:hover {
				border-color: rgba(255, 255, 255, 0.2);
				background-color: rgba(255, 255, 255, 0.05);
			}

			&:focus {
				outline: none;
				border-color: $primary;
				background-color: rgba(255, 255, 255, 0.08);
				box-shadow: 0 0 0 3px rgba($primary, 0.2);
			}
		}
	}

	.submit-btn {
		width: 100%;
		justify-content: center;
		margin-top: 1rem;
		font-size: 1.1rem;
		padding: 1rem;
	}

	.error {
		background-color: rgba(255, 59, 48, 0.1);
		border: 1px solid rgba(255, 59, 48, 0.2);
		color: #ff453a;
		padding: 1rem;
		border-radius: $radius;
		margin-bottom: 2rem;
		text-align: center;
		font-size: 0.95rem;
	}
</style>
