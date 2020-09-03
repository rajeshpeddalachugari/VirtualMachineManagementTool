<template>
  <div class="w3-top" style="z-index:4">
    <div class="w3-bar w3-indigo w3-large">
      <button
        class="w3-bar-item w3-button w3-hide-large w3-hover-none w3-hover-text-light-grey"
      >
        <i class="fa fa-bars"></i> Menu
      </button>
      <span class="w3-bar-item w3-left">Virtual Machines</span>
      <span v-if="isLoggedIn" class="w3-bar-item w3-right"
        ><i
          @click="SignOut"
          class="fa fa-power-off cursor"
          aria-hidden="true"
        ></i>
      </span>
      <router-link v-if="!isLoggedIn" to="/admin">
        <span class="w3-bar-item w3-right"
          ><i class="fa fa-cog" aria-hidden="true"> </i>
        </span>
      </router-link>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";
export default {
  computed: {
    isLoggedIn() {
      return firebase.auth().currentUser;
    },
  },
  methods: {
    SignOut() {
      console.log("signout");
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/");
        });
    },
  },
};
</script>
<style scoped>
.cursor {
  cursor: pointer;
}
/* .headerBg {
  background-image: linear-gradient(135deg, #52e5e7 10%, #130cb7 100%);
} */
</style>
