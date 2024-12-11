<template>
  <div class="my-form pt-5">
    <main class="form-signin align-middle mt-5 py-5 px-4 rounded shadow">
    <h1 class="icon text-center"><i class="bi bi-person-lock"></i></h1>
    <h1 class="h3 mb-3 fw-normal text-center">Se connecter</h1>
    <div class="form-floating">
      <input
        type="email"
        class="form-control"
        id="floatingInput"
        placeholder="name@example.com"
        v-model="email"
      />
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating">
      <input
        type="password"
        class="form-control"
        id="floatingPassword"
        placeholder="Password"
        v-model="password"
      />
      <label for="floatingPassword">Password</label>
    </div>

    <button class="w-100 btn btn-lg btn-success" @click="login()">
      Se connnecter
    </button>
  </main>
  </div>
  
</template>

<script>
import router from "@/router";
import axios from "axios";

export default {
  name: "LoginVue",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/login?email=" +
            this.email +
            "&password=" +
            this.password
        );
        this.email = "";
        this.password = "";
        if (response.data.message == "Successfully logged in") {
          localStorage.token = response.data.token;
          router.push({ name: "home" });
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}


*{
  overflow-y: hidden;
}
.my-form{
  background: #67B26F;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #4ca2cd, #67B26F); 
background: linear-gradient(to right, #4ca2cd, #67B26F);
  width: 100vw;
  height: 100vh;
  padding-top: 100px !important;
}
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
  margin-top: 200px;
  background-color: aliceblue;
}
.form-signin .form-floating:focus-within {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
