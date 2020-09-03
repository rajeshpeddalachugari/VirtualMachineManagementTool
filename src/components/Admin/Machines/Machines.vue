<template>
  <div class="w3-container">
    <div class="w3-container">
      <div v-if="!editingMode" class="w3-container w3-margin-top">
        <button class="w3-button w3-indigo  w3-round" @click="openModal">
          Add New
        </button>
      </div>
    </div>
    <div id="machineModal" class="w3-modal">
      <div
        class="w3-modal-content w3-round-large w3-card-4"
        style="max-width:600px"
      >
        <div class="w3-container">
          <form v-on:submit.prevent="AddMachines">
            <p>
              <label>Node Name</label>
              <input
                required
                class="w3-input w3-border w3-round-large"
                v-model="newItem.nodeName"
                type="text"
              />
            </p>
            <p>
              <label>Products installed</label>
              <v-select
                multiple
                :options="Softwares"
                v-model="newItem.softwares"
                label="name"
              >
                <template #option="{name,Version}">
                  <div style="display: flex; align-items: baseline;">
                    <strong>{{ name }}</strong>
                    <em style="margin-left: .5rem;"> {{ Version }}</em>
                  </div>
                </template>
              </v-select>
            </p>
            <p>
              <label>Memory(Gb)</label>
              <input
                required
                type="number"
                v-model="newItem.memory"
                class="w3-input w3-border w3-round-large"
              />
            </p>
            <p>
              <label>Domain</label>
              <v-select v-model="newItem.domain" :options="Domains">
                <template #search="{attributes, events}">
                  <input
                    class="vs__search"
                    :required="!newItem.domain"
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

    <div class="w3-container">
      <ul>
        <li
          is="machine-items"
          v-for="item in Machines"
          v-bind:key="item.id"
          :machineItem="item"
          @Remove="removeMachine(item.id)"
          @updateItem="updateMachine(item)"
        ></li>
      </ul>
    </div>
  </div>
</template>
<script>
import machineItems from "../Machines/MachineItems";
import { store } from "../../../store";
export default {
  components: {
    "machine-items": machineItems,
  },
  data() {
    return {
      editingMode: false,
      Domains: ["HSV", "IND"],
      newItem: {
        nodeName: "",
        softwares: [],
        memory: "",
        domain: "",
        assigned: false,
      },
    };
  },
  computed: {
    Softwares() {
      return store.state.Softwares;
    },
    Machines() {
      return store.state.Machines;
    },
  },
  methods: {
    Editing() {
      this.editingMode = true;
      console.log(this.Softwares);
    },
    openModal() {
      document.getElementById("machineModal").style.display = "block";
    },
    CloseModal() {
      this.clearModal();
      document.getElementById("machineModal").style.display = "none";
    },
    clearModal() {
      this.newItem = {
        nodeName: "",
        softwares: [],
        memory: "",
        domain: "",
        assigned: false,
      };
    },
    AddMachines() {
      store.dispatch("addMachine", {
        nodeName: this.newItem.nodeName,
        data: this.newItem,
        allocation: {},
        assigned: false,
      });
      this.CloseModal();
    },
    removeMachine(index) {
      store.dispatch("removeMachine", index);
    },
    updateMachine(payload) {
      store.dispatch("updateMachine", payload);
    },
  },
};
</script>
