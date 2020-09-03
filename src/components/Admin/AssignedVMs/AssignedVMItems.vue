<template>
  <div class="w3-card w3-margin-top w3-round-large">
    <div>
      <div class="tabs">
        <div class="tab">
          <input
            class="tabchk"
            type="checkbox"
            v-bind:id="'chck1' + itemIndex + assignedVMItem.assigned"
          />
          <label
            class="tab-label"
            v-bind:for="'chck1' + itemIndex + assignedVMItem.assigned"
          >
            {{ assignedVMItem !== null ? assignedVMItem.nodeName : "" }}
          </label>

          <div class="tab-content">
            <div v-if="!isEditing" class="w3-container w3-text-grey">
              <p class="w3-padding">
                <span class="w3-text-indigo"> Assigned to : </span>
                <span class="capital">{{
                  assignedVMItem.allocation.user.name
                }}</span>
              </p>
              <p class="w3-padding">
                <span class="w3-text-indigo"> Products Installed: </span>

                <span
                  class="capital"
                  v-for="(item, index) in assignedVMItem !== null
                    ? assignedVMItem.data.softwares
                    : []"
                  v-bind:key="index"
                  v-bind:class="getColorCode(index) + ' ' + 'tag-margin'"
                >
                  {{ item.name }}
                </span>
              </p>

              <div>
                <table class="w3-table">
                  <tr>
                    <td>
                      <span class="w3-text-indigo">Test Cycle : </span>
                      <span class="capital">{{
                        assignedVMItem.allocation.testCycle
                      }}</span>
                    </td>
                    <td>
                      <span class="w3-text-indigo">RAM : </span>
                      <span class="capital">{{
                        assignedVMItem.data.memory
                      }}</span
                      ><span>Gb</span>
                    </td>
                    <td>
                      <span class="w3-text-indigo">Domain : </span>
                      <span class="capital">{{
                        assignedVMItem.data.domain
                      }}</span>
                    </td>
                  </tr>
                </table>
              </div>

              <p class="w3-padding">
                <span class="w3-text-indigo"> Remarks : </span>
                <span class="capital">{{
                  assignedVMItem.allocation.remarks
                }}</span>
              </p>
              <hr />
              <div v-if="isLoggedIn" class="w3-rest">
                <button
                  @click="unAssignMachine"
                  class="w3-right w3-margin-left w3-margin-bottom"
                >
                  <i class="fa fa-chain-broken" aria-hidden="true"></i>
                </button>
                <button
                  @click="Editing"
                  class="w3-right w3-margin-left w3-margin-bottom"
                >
                  <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                </button>
              </div>
            </div>

            <div
              v-if="isEditing"
              class="w3-container w3-text-grey minContainer"
            >
              <p>
                <span>Assign To :</span>
                <v-select
                  v-model="assignedVMItem.allocation.user"
                  :options="Users"
                  label="name"
                ></v-select>
              </p>
              <p>
                <span>Test Cycle :</span>
                <input
                  type="text"
                  v-model="assignedVMItem.allocation.testCycle"
                  class="w3-input w3-padding w3-round-large w3-border"
                />
              </p>
              <p>
                <span>Remarks :</span>
                <input
                  type="text"
                  v-model="assignedVMItem.allocation.remarks"
                  class="w3-input w3-padding w3-round-large w3-border"
                />
              </p>
              <hr />
              <div class="w3-rest">
                <button
                  @click="Saving"
                  class="w3-right w3-margin-left w3-margin-bottom"
                >
                  <i class="fa fa-floppy-o" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { store } from "../../../store";
import firebase from "firebase";
export default {
  props: ["assignedVMItem", "itemIndex"],
  data() {
    return {
      isEditing: false,
    };
  },
  computed: {
    isLoggedIn() {
      return firebase.auth().currentUser;
    },
    Users() {
      return store.state.Users;
    },
    Machines() {
      return store.state.Machines;
    },
  },

  methods: {
    unAssignMachine() {
      this.$emit("UnAssign");
    },

    Editing() {
      this.isEditing = true;
    },
    getColorCode(index) {
      return store.getters.getLabelColor(index);
    },
    Saving() {
      this.$emit("updateAssignedMachine");
      this.isEditing = false;
    },
  },
};
</script>
<style scoped>
.capital {
  text-transform: capitalize;
}
.tag-margin {
  margin: 2px;
}
</style>
