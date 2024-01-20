<template>
    <div class="card-container">
        <h3>{{ ispit }} iz predmeta {{ predmet }}</h3>
        <div>
            <p>Dvorana: {{ dvorana }}</p>
            <p>Ostvareni bodovi: {{ ostvareniBodovi }}</p>
            <p>Ukupno bodova: {{ ukupnoBodova }}</p>
            <p>Postotak: {{ ostvareniBodovi / ukupnoBodova }} %</p>
        </div>
        <div>
            <button class="delete-btn" @click="deleteExam">
                Delete
            </button>
        </div>
    </div>
</template>

<script>
export default {
    emits: ["deleteExam"],
    props: [
        "id",
        "ispit",
        "predmet",
        "dvorana",
        "ostvareniBodovi",
        "ukupnoBodova",
    ],
    methods: {
        deleteExam() {
            this.$emit("deleteExam", { id: this.id });
        },
    }
};
</script>

<style scoped>
.card-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 1px solid black;
    margin: 10px;
    padding: 10px;
}
.delete-btn {
    width: 100px;
    height: 50px;   
    background-color: red;
    cursor: pointer;
    color: white;
}
</style>