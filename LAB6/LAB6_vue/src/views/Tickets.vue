<template>
    <div class="tickets-container">
      <h1>Tickets</h1>
      <h4>Ovo je demonstracija za one-way binding</h4>
      <label>Za koji predmet postavljaš pitanje(web2, nasp, nb): </label>
      <input class="input-tickets-subj" type="text" v-bind="subject">
      <hr/>
      <h4>Ovo je demonstracija za two-way binding</h4>
      <label>Postavi pitanje profesoru: </label>
      <input class="input-tickets" type="text" v-model="ticket">
      <p>Trenutno postavljeni ticket glasi: {{ ticket }}</p>
    </div>
  </template>

 

<script>
export default {
  data() {
    return {
      ticket: "",
      subject: "" 
    };
  },
};
</script>
<style scoped>
.tickets-container {
    padding-top: 60px;
}
.input-tickets {
    width: 80%;
    border: 1px solid black;
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
}
.input-tickets-subj {
  width: 20%;
    border: 1px solid black;
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
}
</style>