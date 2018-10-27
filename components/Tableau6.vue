<template>
      <div class="column" v-if="column6.face"
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
  props: ["column6", "index"],
  computed: {
    imgPath() {
      return require(`@/assets/${this.column6.pattern}/${
        this.column6.number
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
  left: 585px;
  width: 101px;
  height: 140px;
  background-size: cover;
  background-position: center;
}
</style>
