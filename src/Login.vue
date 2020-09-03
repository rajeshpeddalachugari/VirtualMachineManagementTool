<template>
  <div style="height:100%;">
    <header-main></header-main>
    <div class="w3-container " full-height>
      <div class="w3-display-middle w3-container login ">
        <form
          class="w3-container w3-round-large w3-card-4"
          v-on:submit.prevent="Login"
        >
          <p>
            <label class="w3-text-indigo"><b>Email</b></label>
            <input
              v-model="email"
              class="w3-input w3-border"
              name="first"
              type="email"
            />
          </p>

          <p>
            <label class="w3-text-indigo"><b>Password</b></label>
            <input
              v-model="password"
              class="w3-input w3-border"
              name="last"
              type="password"
            />
          </p>

          <p>
            <button type="submit" class="w3-btn w3-round-large w3-indigo">
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import header from "./Header";
import firebase from "firebase";
export default {
  components: {
    "header-main": header,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    Login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          (user) => {
            console.log("user logged in :", user);
            this.$router.push("/admin");
          },
          (error) => {
            console.log(error);
          }
        );
    },
  },
};
</script>
<style>
html,
body {
  height: 100%;
  margin: 0;
}
.full-height {
  height: 100%;
  background: yellow;
}
.login {
  width: 30%;
}
</style>
