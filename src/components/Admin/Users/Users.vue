<template>
  <div class="w3-container">
    <div v-if="!editingMode" class="w3-container w3-margin-top">
      <button class="w3-button w3-indigo  w3-round" @click="openModal">
        Add New
      </button>
    </div>
    <div id="userModal" class="w3-modal">
      <div
        class="w3-modal-content w3-round-large w3-card-4"
        style="max-width:600px"
      >
        <div class="w3-container">
          <form v-on:submit.prevent="AddUser">
            <p>
              <label>Name</label>
              <input
                required
                class="w3-input w3-border w3-round-large"
                v-model="newItem.name"
                type="text"
              />
            </p>
            <p>
              <label>Email</label>
              <input
                required
                class="w3-input w3-border w3-round-large"
                v-model="newItem.email"
                type="email"
              />
            </p>
            <p>
              <label>Role</label>
              <v-select v-model="newItem.role" :options="['Developer', 'QA']">
                <template #search="{attributes, events}">
                  <input
                    class="vs__search"
                    :required="!newItem.role"
                    v-bind="attributes"
                    v-on="events"
                  />
                </template>
              </v-select>
            </p>
            <p>
              <label>Team</label>
              <v-select v-model="newItem.team" :options="['Tejas', 'Pheonix']">
                <template #search="{attributes, events}">
                  <input
                    class="vs__search"
                    :required="!newItem.team"
                    v-bind="attributes"
                    v-on="events"
                  />
                </template>
              </v-select>
            </p>
            <div class="w3-bar w3-padding-16">
              <button
                type="submit"
                class="w3-button w3-indigo w3-right w3-margin-right  w3-round"
              >
                Add
              </button>
              <button
                type="button"
                @click="CloseModal"
                class="w3-button w3-indigo w3-right w3-margin-right w3-round"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="w3-container w3-row-padding w3-margin-top">
      <div
        is="user-item"
        class="w3-col m4 w3-margin-top"
        v-for="(user, index) in Users"
        v-bind:key="index"
        :userItem="user"
        @Remove="RemoveUser(user.id)"
      ></div>
    </div>
  </div>
</template>
<script>
import userItem from "./UserItem";
import { store } from "../../../store";
export default {
  components: {
    "user-item": userItem,
  },
  data() {
    return {
      editingMode: false,
      newItem: {
        name: "",
        email: "",
        role: "",
        team: "",
      },
    };
  },
  methods: {
    Editing() {
      this.editingMode = true;
    },
    openModal() {
      document.getElementById("userModal").style.display = "block";
    },
    CloseModal() {
      this.clearModal();
      document.getElementById("userModal").style.display = "none";
    },
    clearModal() {
      this.newItem = {
        name: "",
        email: "",
        role: "",
        team: "",
      };
    },
    AddUser() {
      store.dispatch("addUser", {
        name: this.newItem.name,
        email: this.newItem.email,
        role: this.newItem.role,
        team: this.newItem.team,
      });
      this.CloseModal();
    },
    RemoveUser(index) {
      store.dispatch("removeUser", index);
    },
  },
  computed: {
    Users() {
      return store.state.Users;
    },
  },
};
</script>
