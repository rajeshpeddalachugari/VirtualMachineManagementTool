<template>
  <div class="w3-container">
    <!-- <input
      class="w3-input w3-border w3-margin-top w3-round-large"
      type="text"
      placeholder="Search Machines"
    /> -->
    <div class="w3-margin-top">
      <div class="w3-row-padding w3-margin-top">
        <div class="w3-col w3-center w3-quarter">
          <div class="w3-container w3-card w3-purple  w3-round-large">
            <h2>{{ $store.state.Machines.length }}</h2>
            <p>Available Machines</p>
          </div>
        </div>
        <div class="w3-col w3-center w3-quarter">
          <div class="w3-container w3-card w3-teal  w3-round-large">
            <h2>{{ $store.getters.getAssignedVms.length }}</h2>
            <p>Assigned Machines</p>
          </div>
        </div>
        <div class="w3-col w3-center w3-quarter">
          <div class="w3-container w3-card w3-pink  w3-round-large">
            <h2>{{ $store.getters.getUnAssignedVms.length }}</h2>
            <p>Un-Assigned Machines</p>
          </div>
        </div>
        <div class="w3-col w3-center w3-quarter">
          <button class="w3-button w3-indigo  w3-round" @click="openModal">
            + Configure New
          </button>
        </div>
        <!-- <div class="w3-col w3-rest">
          <button class="w3-button w3-indigo  w3-round" @click="openModal">
            + Configure New
          </button>
        </div> -->
      </div>
    </div>
    <div id="AssignedVMsModal" class="w3-modal">
      <div
        class="w3-modal-content w3-round-large w3-card-4"
        style="max-width:600px"
      >
        <div
          v-if="!$store.getters.getUnAssignedVms.length == 0"
          class="w3-container"
        >
          <form v-on:submit.prevent="assignMachine">
            <div class="w3-container">
              <p>
                <label>User</label>
                <v-select v-model="newItem.user" :options="Users" label="name">
                  <template #search="{attributes, events}">
                    <input
                      class="vs__search"
                      :required="!newItem.user"
                      v-bind="attributes"
                      v-on="events"
                    />
                  </template>
                </v-select>
              </p>
              <p>
                <label>Machine</label>
                <v-select
                  v-model="newItem.machine"
                  :options="unassignedList"
                  label="nodeName"
                >
                  <template #search="{attributes, events}">
                    <input
                      class="vs__search"
                      :required="!newItem.machine"
                      v-bind="attributes"
                      v-on="events"
                    />
                  </template>
                </v-select>
              </p>
              <p>
                <label>Test Cycle</label>
                <v-select
                  v-model="newItem.testCycle"
                  :options="[
                    'Sanity',
                    'Stabilization',
                    'CR Verification',
                    'others',
                  ]"
                >
                  <template #search="{attributes, events}">
                    <input
                      class="vs__search"
                      :required="!newItem.testCycle"
                      v-bind="attributes"
                      v-on="events"
                    />
                  </template>
                </v-select>
              </p>
              <p>
                <label>Remarks</label>
                <textarea
                  class="w3-input w3-border w3-round-large"
                  v-model="newItem.remarks"
                  id=""
                  cols="30"
                  rows="3"
                ></textarea>
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
            </div>
          </form>
        </div>
        <div v-else class="w3-container">
          <p class="w3-text-indigo">
            Sorry, No new machines available for configuring.
          </p>
          <div class="w3-bar w3-padding-16">
            <button
              type="button"
              @click="CloseModal"
              class="w3-button w3-indigo w3-right w3-margin-right w3-round "
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

    <hr />
    <div class="w3-container">
      <div class="w3-row-padding">
        <div class="w3-half">
          <header class="w3-container w3-center mineader headerStyle">
            <h3 class="w3-text-green">Assigned Machines</h3>
          </header>
          <input
            class="w3-input w3-text-indigo w3-border w3-round-large"
            type="text"
            v-model="assignedFilter"
            placeholder="Search Assigned Machines"
          />
          <ul class="w3-ul ">
            <li
              is="assigned-vms"
              v-for="(assignedItem, index) in assignedList"
              v-bind:key="index"
              :itemIndex="index"
              :assignedVMItem="assignedItem"
              @UnAssign="UnAssignMachine(assignedItem)"
              @updateAssignedMachine="updateAssignedMachine(assignedItem)"
            ></li>
          </ul>
        </div>

        <div class="w3-half">
          <header class="w3-container w3-center mineader headerStyle">
            <h3 class="w3-text-red">Un-Assigned Machines</h3>
          </header>
          <input
            class="w3-input w3-text-indigo w3-border w3-round-large"
            type="text"
            v-model="unassignedFilter"
            placeholder="Search Un-Assigned Machines"
          />
          <ul class="w3-ul ">
            <li
              is="unassigned-vms"
              v-for="(assignedItem, index) in unassignedList"
              v-bind:key="index"
              :itemIndex="index"
              :UnAssignedVMItem="assignedItem"
              @Remove="RemoveAssignedVM(index)"
            ></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import assignedVMItems from "./AssignedVMItems";
import unassignedVMItems from "./UnAssignedVMItems";
import { store } from "./../../../store";
import "../../../styleSCSS/style.scss";
export default {
  components: {
    "assigned-vms": assignedVMItems,
    "unassigned-vms": unassignedVMItems,
  },
  data() {
    return {
      assignedFilter: null,
      unassignedFilter: null,
      newItem: {
        user: "",
        machine: "",
        testCycle: "",
        remarks: "",
      },
    };
  },
  computed: {
    Users() {
      return store.state.Users;
    },
    Machines() {
      return store.state.Machines;
    },
    assignedList() {
      if (this.assignedFilter) {
        return store.getters.getAssignedVms.filter((it) => {
          return it.nodeName
            .toLowerCase()
            .includes(this.assignedFilter.toLowerCase());
        });
      } else {
        return store.getters.getAssignedVms;
      }
    },
    unassignedList() {
      if (this.unassignedFilter) {
        return store.getters.getUnAssignedVms.filter((it) => {
          return it.nodeName
            .toLowerCase()
            .includes(this.unassignedFilter.toLowerCase());
        });
      } else {
        return store.getters.getUnAssignedVms;
      }
    },
  },

  methods: {
    openModal() {
      document.getElementById("AssignedVMsModal").style.display = "block";
    },
    CloseModal() {
      this.clearModal();
      document.getElementById("AssignedVMsModal").style.display = "none";
    },
    clearModal() {
      this.newItem = {
        user: "",
        machine: "",
        testCycle: "",
        remarks: "",
      };
    },
    assignMachine() {
      store.dispatch("assignMachine", {
        user: this.newItem.user,
        machine: this.newItem.machine,
        testCycle: this.newItem.testCycle,
        remarks: this.newItem.remarks,
      });
      this.CloseModal();
    },
    UnAssignMachine(payload) {
      store.dispatch("unAssignMachine", payload);
    },
    updateAssignedMachine(payload) {
      console.log("updateAssignedMachine", payload);
      store.dispatch("updateAssignedMachine", payload);
    },
  },
};
// return this.assignedFilter
//   .toLowerCase()
//   .includes(it.nodeName.toLowerCase());
// .split(" ")
// .every((v) => it.nodeName.toLowerCase().includes(v));
</script>
<style scoped lang="scss">
.vl {
  border-left: 6px solid #f1f1f1;
  height: 500px;
  position: relative;
  left: 50%;
  margin-left: -3px;
  top: 0;
}
</style>
