<template>
		<div class="stock" @click="$emit('openStock')"
    :style="`
      background-image:url(${imgPath});
    `"/>
</template>

<script>
export default {
  computed: {
    imgPath() {
      if(this.$store.state.stock.length >= 1){
        return require('@/assets/cardFront.png');
      }else if(this.$store.state.stock.length == 0 && this.$store.state.stockcard.length >= 1){
        return require('@/assets/reload.png');
      }else if(this.$store.state.stock.length == 0 && this.$store.state.stockcard.length == 0){
        return require('@/assets/empty.png');
      }
    },
  }
};
</script>

<style scoped>
.stock {
  position: fixed;
  top: 50px;
  left: 20px;
  width: 101px;
  height: 140px;
  background-size: cover;
  background-position: center;
  margin-right: 12px;
}
</style>
