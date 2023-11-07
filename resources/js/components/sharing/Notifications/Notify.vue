<template>
	<notifications
		group="message"
		:duration="2000"
		:width="300"
		:max="4"
		animation-name="fade-left"
		position="top right"
	>
		<template slot="body" slot-scope="props">
			<div class="notify-box-message":class="props.item.type">
				<div class="notify-message-title" :class="props.item.type">{{ props.item.title }}</div>

				<button class="btn-notify-close" @click="props.close"></button>

				<div class="mt-1">{{ props.item.text }}</div>
			</div>
		</template>
	</notifications>
</template>

<script>

export default {
	name: 'Notify',
};
</script>

<style lang="scss">
.vue-notification-wrapper {
	overflow: unset !important;
}

.fade-left-enter-active,
.fade-left-leave-active,
.fade-left-move {
	transition: all 0.5s;
}

.fade-left-enter,
.fade-left-leave-to {
	opacity: 0;
	transform: translateX(100%);
}
</style>
