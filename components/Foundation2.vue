<template>
    <div class="foundation"
        :style="`background-image:url(${imgPath});`"
        @click="$emit('judge')">
    </div>
</template>

<script>
export default {
  props: ["fnd2", "index"],
  computed: {
    imgPath() {
      return require(`@/assets/${this.fnd2.pattern}/${this.fnd2.number}.png`);
    }
  },
  methods: {}
};
</script>

<style scoped>
.foundation {
  position: fixed;
  top: 50px;
  left: 472px;
  width: 101px;
  height: 140px;
  background-size: cover;
  background-position: center;
}
</style>
