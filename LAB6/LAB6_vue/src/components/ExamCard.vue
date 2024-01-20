<template>
    <div class="card-container">
        <h3>{{ ispit }} iz predmeta {{ predmet }}</h3>
        <div>
            <p>Dvorana: {{ dvorana }}</p>
            <p>Ostvareni bodovi: {{ ostvareniBodovi }}</p>
            <p>Ukupno bodova: {{ ukupnoBodova }}</p>
            <p>Prosjek: {{ ostvareniBodovi / ukupnoBodova }} %</p>
        </div>
    </div>
</template>

<script>
export default {
  props: [
    "ispit",
    "predmet",
    "dvorana",
    "ostvareniBodovi",
    "ukupnoBodova",
  ]
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

</style>