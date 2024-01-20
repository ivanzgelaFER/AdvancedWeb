 <template>
  <div class="homepage-container">
    <div>
      <img src="/edgar.png">
    </div>
    <div class="desc">
      <h1>Dobrodošli u Edgar za sirotinju</h1>
      <p>Trenutno vrijeme: <b>{{ this.timer }}</b></p>
      <p>Edgar za sirotinju je aplikacija koja služi studentima za pisanju ispita, pregled rezultata prethodno napisanih ispita i slanje pitanja profesorima.</p>
    </div>
  </div>
</template>

<style scoped>
.homepage-container {
    padding-top: 80px;
    display: flex;
    flex-direction: row;
    gap: 30px;
}

b {
  color: rgb(11, 157, 224);
}
.desc {
  font-size: 1.3rem;
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