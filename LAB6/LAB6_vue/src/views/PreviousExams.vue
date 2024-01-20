<template>
  <div class="exam-container">
    <h1>Prethodni ispiti koje ste pisali na Edgaru</h1>
    <div class="exams-container-cards">
      <exam-card
        v-for="exam in allExams"
        v-bind="exam"
      ></exam-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allExams: [],
      selectedExam: null,
  };
},
methods: {
  async refreshExams() {
    try {
      let response = await fetch("https://web2-lab6-backend-yvvu.onrender.com/exams");
      if (response.ok) {
        this.allExams = await response.json();
      } else {
        throw new Error("HTTP-Error: " + response.status);
      }
    } catch (error) {
      console.error(error);
    }
  },
},
async mounted() {
  await this.refreshExams();
},
};
</script>

<style scoped>
.exam-container {
  padding-top: 60px;
}
 
</style>
