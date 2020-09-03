<template>
  <div class="w3-container">
    <div v-if="!editingMode" class="w3-container w3-margin-top">
      <button class="w3-button w3-border w3-indigo  w3-round" @click="Editing">
        Add New
      </button>
    </div>
    <div v-else class="w3-container w3-text-indigo  w3-third">
      <p>
        <label>Name</label>
        <input
          class="w3-input w3-border w3-round-large"
          v-model="newSoftware.name"
          type="text"
        />
      </p>
      <p>
        <label>Version</label>
        <input
          class="w3-input w3-border w3-round-large"
          v-model="newSoftware.Version"
          type="text"
        />
      </p>
      <div class="w3-bar">
        <button
          class="w3-button w3-indigo w3-right w3-margin-left  w3-round-large"
          @click="addSoftware"
        >
          Add
        </button>
        <button
          class="w3-button w3-indigo w3-right w3-margin-left w3-round-large"
          @click="Cancel"
        >
          Cancel
        </button>
      </div>
    </div>
    <!-- <div class="w3-container">
      <v-select label="title" :options="Softwares"></v-select>
    </div> -->
    <div class="w3-container">
      <h3 class="w3-text-indigo" v-if="Softwares.length">
        Configured Softwares
      </h3>
      <ul class="w3-ul" style="width:50%">
        <li
          is="software-item"
          class="w3-padding-small"
          v-for="(sItem, index) in Softwares"
          v-bind:key="index"
          :softwareItem="sItem"
          @Remove="removeSoftware(sItem.id)"
          @Update="updateSoftware(sItem)"
        ></li>
      </ul>
    </div>
  </div>
</template>

<script>
import softwareItem from "./SoftwareItem";
import { store } from "../../../store";
export default {
  components: {
    "software-item": softwareItem,
  },
  data() {
    return {
      newSoftware: {
        name: "",
        Version: "",
      },
      editingMode: false,
    };
  },
  computed: {
    Softwares() {
      return store.state.Softwares;
    },
  },
  methods: {
    Editing() {
      this.editingMode = true;
    },
    Cancel() {
      this.newSoftware.name = "";
      this.newSoftware.Version = "";
      this.editingMode = false;
    },
    addSoftware() {
      if (this.newSoftware.name !== "") {
        store.dispatch("addSoftware", {
          name: this.newSoftware.name,
          Version: this.newSoftware.Version,
        });
        this.newSoftware = {
          name: "",
          Version: "",
        };
      }
      console.log(this.Softwares.length);
    },
    removeSoftware(index) {
      store.dispatch("removeSoftware", index);
    },
    updateSoftware(payload) {
      store.dispatch("updateSoftware", payload);
    },
  },
};
</script>
