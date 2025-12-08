<div class="welcome-container">
	<div class="content">
		<div class="header-group">
			<div class="icon-wrapper">👋</div>
			<h1>Добро пожаловать</h1>
		</div>

		<p class="lead">Хотим от лица администрации поблагодарить вас за выбор нашего проекта.</p>
		<p>В данной документации вы сможете получше узнать сервер, а так-же разобраться с его механиками.</p>

		<blockquote class="info-block">
			<p>🍷 <strong>Winerecia</strong> - Политический Minecraft сервер с упором на политику и тесные взаимодействия между игроками. На винном сервере вы встретите уникальные плагины и события.</p>
		</blockquote>

		<h2>Для кого подойдет наш сервер??</h2>
		<p>Наш сервер развивается всесторонне, в нем добавляется как PVE, так и PVP контент.</p>

		<h2>Полезные ссылки:</h2>
		<ul>
			<li><a href="https://map.winerecia.fun" target="_blank">Онлайн карта</a> - Следите за миром в реальном времени.</li>
			<li><a href="https://discord.gg/winerecia" target="_blank">Discord</a> - Наше комьюнити.</li>
			<li><a href="https://winerecia.fun" target="_blank">Магазин</a> - Поддержка сервера.</li>
		</ul>
	</div>
</div>

<style lang="scss">
	@use '$lib/styles/variables' as *;

	.welcome-container {
		max-width: 900px;
		margin: 0 auto;
		padding: 4rem 2rem;
		min-height: calc(100vh - 70px);
	}

	.header-group {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 2rem;

		.icon-wrapper {
			font-size: 2.5rem;
		}

		h1 {
			font-size: 3rem;
			font-weight: 800;
			color: $text-main;
			letter-spacing: -0.03em;
		}
	}

	.lead {
		font-size: 1.25rem;
		color: $text-secondary;
		margin-bottom: 2rem;
		line-height: 1.6;
	}

	p {
		font-size: 1.1rem;
		line-height: 1.7;
		color: rgba($text-main, 0.9);
		margin-bottom: 1.5rem;
	}

	h2 {
		font-size: 1.8rem;
		font-weight: 700;
		margin-top: 3rem;
		margin-bottom: 1.5rem;
		color: $text-main;
	}

	.info-block {
		background: rgba($primary, 0.08);
		border-left: 4px solid $primary;
		padding: 1.5rem;
		border-radius: $radius;
		margin: 2.5rem 0;
		
		p {
			margin-bottom: 0;
			color: lighten($text-secondary, 10%);
		}

		strong {
			color: $text-main;
		}
	}

	ul {
		list-style: none;
		padding: 0;
		
		li {
			margin-bottom: 1rem;
			padding-left: 1.5rem;
			position: relative;
			font-size: 1.05rem;
			color: $text-secondary;
			
			&::before {
				content: '•';
				position: absolute;
				left: 0;
				color: $primary;
				font-weight: bold;
			}

			a {
				color: $primary;
				text-decoration: none;
				border-bottom: 1px solid rgba($primary, 0.3);
				transition: all 0.2s;
				
				&:hover {
					border-bottom-color: $primary;
					color: lighten($primary, 10%);
				}
			}
		}
	}
</style>
