<template lang="jade">
	.background(:style="{ layer0 }")
		.background(:style="{ layer1 }")
</template>

<script>
export default {
	props: ['colors'],
	data: {
		layer0:{
			backgroundColor: colors.bg
		},
		layer1:{
			opacity: colors.gradient.opacity,
			background: 'linear-gradient(to ' + colors.gradient.direction + ', ' + colors.gradient.start + '0%, ' + colors.gradient.end + ' 100%)'
		}
	}
}
</script>

<style lang="scss">
#player > .background{
	position: fixed;
	z-index: -1;
}
</style>