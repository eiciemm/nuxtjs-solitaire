<template>
    <div class="foundation"
        :style="`background-image:url(${imgPath});`"
        @click="$emit('judge')">
    </div>
</template>

<script>
export default {
  props: ["fnd4", "index"],
  computed: {
    imgPath() {
      return require(`@/assets/${this.fnd4.pattern}/${this.fnd4.number}.png`);
    }
  },
  methods: {}
};
</script>

<style scoped>
.foundation {
  position: fixed;
  top: 50px;
  left: 698px;
  width: 101px;
  height: 140px;
  background-size: cover;
  background-position: center;
}
</style>
