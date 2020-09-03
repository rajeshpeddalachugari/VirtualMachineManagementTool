<template>
  <div>
    <header-main></header-main>
    <div class="w3-container margin-top">
      <!-- <input
        class="w3-input w3-border w3-margin-top w3-round-large"
        type="text"
        placeholder="Search Machines"
      /> -->
      <div class="w3-row-padding w3-margin-top">
        <div class="w3-col w3-center w3-third">
          <div class="w3-container w3-card w3-purple  w3-round-large">
            <h2>{{ $store.state.Machines.length }}</h2>
            <p>Available Machines</p>
          </div>
        </div>
        <div class="w3-col w3-center w3-third">
          <div class="w3-container w3-card w3-teal  w3-round-large">
            <h2>{{ $store.getters.getAssignedVms.length }}</h2>
            <p>Assigned Machines</p>
          </div>
        </div>
        <div class="w3-col w3-center w3-third">
          <div class="w3-container w3-card w3-pink  w3-round-large">
            <h2>{{ $store.getters.getUnAssignedVms.length }}</h2>
            <p>Un-Assigned Machines</p>
          </div>
        </div>
      </div>
      <hr />
      <div class="w3-container w3-margin-top">
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
              ></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderMain from "./Header";
import AssignedMachines from "./components/Admin/AssignedVMs/AssignedVMItems";
import UnAssignedMachines from "./components/Admin/AssignedVMs/UnAssignedVMItems";
import { store } from "../src/store";
export default {
  data() {
    return {
      assignedFilter: null,
      unassignedFilter: null,
    };
  },
  components: {
    "header-main": HeaderMain,
    "assigned-vms": AssignedMachines,
    "unassigned-vms": UnAssignedMachines,
  },
  created() {},
  computed: {
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
};
</script>
<style scoped>
.margin-top {
  margin-top: 32px;
}
ul.horizontal-list {
  min-width: 696px;
  list-style: none;
  padding-top: 20px;
}
ul.horizontal-list li {
  margin: 2px;

  display: inline;
}
.totalVms {
  background: #f953c6; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #b91d73,
    #f953c6
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #b91d73,
    #f953c6
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.AssignedVms {
  background: #1d976c; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #93f9b9,
    #1d976c
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #93f9b9,
    #1d976c
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.UnAssignedVms {
  background: #c31432; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #240b36,
    #c31432
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #240b36,
    #c31432
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
