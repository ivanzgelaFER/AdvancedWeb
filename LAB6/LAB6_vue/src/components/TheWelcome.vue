 <template>
  <div class="homepage-container">
    <h1>Dobrodošli u Edgar za sirotinju</h1>
    <p>trenutno vrijeme: {{ this.timer }}</p>
    <p>Edgar za sirotinju je aplikacija koja služi studentima za pisanju ispita.</p>
  </div>
</template>

<style scoped>
.homepage-container {
    padding-top: 60px;
}
</style>

<script>
export default {
  data() {
    return {
      timer: new Date().toLocaleTimeString("hr-HR"),
    };
  },
  mounted() {
    window.setInterval(() => {
      this.timer = new Date().toLocaleTimeString("hr-HR");
    }, 1000);
  }
};
</script>