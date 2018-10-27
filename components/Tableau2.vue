<template>
      <div class="column" v-if="column2.face"
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
  props: ["column2", "index"],
  computed: {
    imgPath() {
      return require(`@/assets/${this.column2.pattern}/${
        this.column2.number
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
  left: 133px;
  width: 101px;
  height: 140px;
  background-size: cover;
  background-position: center;
}
</style>
