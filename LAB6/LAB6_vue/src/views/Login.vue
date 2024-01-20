<template>
    <div class="login-container">
        <div>
            <div>
                <h3>Prijavi se kako bi mogao dalje nastaviti</h3>
                <p>Ovo je demonstracija prijave kako bi se ostvarilo globalno stanje</p>
            </div>
            <div class="form-container">
                <form @submit.prevent="login">
                  <div class="input-container">
                    <label class="">Login</label>
                    <div>
                        <div>
                            <input
                              placeholder="username"
                              v-model.trim="username"
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="password"
                                v-model="password"
                            />
                        </div>
                    </div>
                  </div>
                  <div class=" ">
                    <button class="btn btn-success m-3" type="submit">Prijavi se</button>
                  </div>
                </form>
            </div>
        </div>
    </div>
  </template>
<style scoped>
.login-container {
    padding-top: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 1.3rem !important;
}

.form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
}

.input-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
}

.form-container > form {
    padding: 10px;
    background-color: aliceblue;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    font-size: 1.9rem;
    border: 1px solid black;
    
}
</style>
  
  <script>
  import { mapActions, mapState } from "pinia";
  import { useAuthStore } from "../stores/auth";
  export default {
    data() {
      return {
        username: "",
      };
    },
    computed: {
      ...mapState(useAuthStore, ["landingUrl"]),
    },
    methods: {
      ...mapActions(useAuthStore, ["setUsername"]),
      login() {
        this.setUsername(this.username);
        this.$router.push({ path: this.landingUrl });
      },
    },
  };
  </script>
  