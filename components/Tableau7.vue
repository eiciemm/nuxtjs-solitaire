<template>
      <div class="column" v-if="column7.face" 
      @click="$emit('judge')" @dblclick="$emit('foundation')"
      :style="`
      background-image:url(${imgPath});
      top:${(index*20)+220}px;
      `"/>
      <div class="column" v-else
      @click="$emit('judge')"
      :style="`
      background-image:url(${frontImg});
      top:${(index*20)+220}px;
      `"/>
</template>

<script>
export default {
  props: ["column7", "index"],
  computed: {
    imgPath() {
      return require(`@/assets/${this.column7.pattern}/${
        this.column7.number
      }.png`);
    },
    frontImg() {
      return require(`@/assets/cardFront.png`);
    }
  },
  methods: {
    test() {
      console.log(this.column7);
    }
  }
};
</script>

<style scoped>
.column {
  position: fixed;
  left: 698px;
  width: 101px;
  height: 140px;
  background-size: cover;
  background-position: center;
}
</style>
