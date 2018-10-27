<template>
      <div class="column" v-if="column3.face"
      @click="$emit('judge')" @dblclick="$emit('foundation')"
      :style="`
      background-image:url(${imgPath});
      top:${(index*20)+220}px;
      `"/>
      <div class="column" v-else
      :style="`
      background-image:url(${frontImg});
      top:${(index*20)+220}px;
      `"/>
</template>

<script>
export default {
  props: ["column3", "index"],
  computed: {
    imgPath() {
      return require(`@/assets/${this.column3.pattern}/${
        this.column3.number
      }.png`);
    },
    frontImg() {
      return require(`@/assets/cardFront.png`);
    }
  },
  methods: {}
};
</script>

<style scoped>
.column {
  position: fixed;
  left: 246px;
  width: 101px;
  height: 140px;
  background-size: cover;
  background-position: center;
}
</style>
