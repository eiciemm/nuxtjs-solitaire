<template>
      <div class="column" v-if="column5.face"
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
  props: ["column5", "index"],
  computed: {
    imgPath() {
      return require(`@/assets/${this.column5.pattern}/${
        this.column5.number
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
  left: 472px;
  width: 101px;
  height: 140px;
  background-size: cover;
  background-position: center;
}
</style>
