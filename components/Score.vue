<template>
    <div>
      <div class="score">
        <span class="scoreNum">SCORE: {{$store.getters.getScore}}</span>
        移動したいカードをクリックし、置きたいカードをクリックすると移動。組札への移動はダブルクリック。
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
.score {
  position: fixed;
  top: 20px;
  left: 20px;
  color: white;
  font-size: 11px;
}

.scoreNum {
  font-size: 17px;
  font-weight: 400;
  margin-right: 20px;
}
</style>
