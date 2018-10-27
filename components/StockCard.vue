<template>
	<div class="stockCard" 
  @click="$emit('judge')" @dblclick="$emit('foundation')"
  :style="`background-image:url(${imgPath});`"/>
</template>

<script>
export default {
  props: ["stock"],

  computed: {
    imgPath() {
      return require(`@/assets/${this.stock.pattern}/${this.stock.number}.png`);
    }
  },

  methods: {}
};
</script>

<style scoped>
.stockCard {
  position: fixed;
  top: 50px;
  left: 133px;
  width: 101px;
  height: 140px;
  background-size: cover;
  background-position: center;
}
</style>
