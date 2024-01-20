<template>
  <div class="exam-container">
    <h1>Prethodni ispiti koje ste pisali na Edgaru</h1>
    <p>U slučaju da se ispiti ne prikazuju pričekajte (render je spor)!</p>
    <div class="exams-container-cards">
      <exam-card
        v-for="exam in allExams"
        v-bind="exam"
        :key="exam.id"
        @delete-exam="deleteExam"
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
  deleteExam(args) {
    console.log("deleting exame", args, this.allExams.length);
    this.allExams = this.allExams.filter((x) => x.id !== args.id);
      if (this.selectedRecipe && this.selectedRecipe.id === args.id) {
        this.selectedRecipe = null;
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
