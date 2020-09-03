<template>
  <div class="w3-container ">
    <div class="w3-row-padding">
      <div class="w3-col w3-margin-top">
        <div class="w3-card w3-round-large">
          <div v-show="!isEditing">
            <header class="w3-container w3-light-grey mineader headerStyle">
              <h3 class="w3-text-indigo">{{ machineItem.nodeName }}</h3>
            </header>
            <div class="w3-container">
              <ul class="w3-ul">
                <p>
                  <span>Configured Softwares : </span>
                  <template v-for="(item, index) in machineItem.data.softwares">
                    <span
                      v-bind:key="item.id"
                      v-bind:class="
                        $store.getters.getLabelColor(index) + ' tag-margin'
                      "
                      >{{ item.name }}</span
                    >
                  </template>
                </p>
              </ul>

              <hr />
              <div class="w3-row">
                <div class="w3-col m2">
                  Memory : {{ machineItem.data.memory }}Gb
                </div>
                <div class="w3-col m2">
                  Domain : {{ machineItem.data.domain }}
                </div>
                <div class="w3-rest">
                  <button
                    v-show="!isEditing"
                    @click="RemoveMachine"
                    class="w3-right w3-margin-left w3-margin-bottom"
                  >
                    <i class="fa fa-trash" aria-hidden="true"></i>
                  </button>
                  <button
                    @click="editItem"
                    v-show="!isEditing"
                    class="w3-right w3-margin-left w3-margin-bottom"
                  >
                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                  </button>
                  <button
                    @click="saveItem"
                    v-show="isEditing"
                    class="w3-right w3-margin-left w3-margin-bottom"
                  >
                    <i class="fa fa-floppy-o" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div v-show="isEditing" class="w3-container">
            <p>
              <label>Machine Name</label>
              <input
                class="w3-input w3-border w3-round-large"
                type="text"
                placeholder="Machine name"
                v-model="machineItem.nodeName"
              />
            </p>

            <p>
              <label>Softwares</label>
              <v-select
                multiple
                :options="Softwares"
                v-model="machineItem.data.softwares"
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

            <div class="w3-row">
              <div class="w3-col m3 ">
                <p>
                  <label>Memory (Gb)</label>
                  <input
                    type="number"
                    class=" w3-border w3-round"
                    v-model="machineItem.data.memory"
                  />
                </p>
              </div>
              <div class="w3-col m3 ">
                <p>
                  <label>Domain</label>
                  <v-select
                    v-model="machineItem.data.domain"
                    :options="['IND', 'HSV']"
                  ></v-select>
                </p>
              </div>
            </div>

            <button
              @click="saveItem"
              v-show="isEditing"
              class="w3-right w3-margin-left w3-margin-bottom"
            >
              <i class="fa fa-floppy-o" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { store } from "../../../store";
export default {
  props: ["machineItem"],
  data() {
    return {
      isEditing: false,
    };
  },
  computed: {
    Softwares() {
      return store.state.Softwares;
    },
  },
  methods: {
    RemoveMachine() {
      this.$emit("Remove");
    },
    editItem() {
      this.machineItem.data.softwares = [];
      this.isEditing = true;
    },
    saveItem() {
      this.$emit("updateItem");
      this.isEditing = false;
    },
  },
};
</script>
<style scoped>
.tag-margin {
  margin: 2px;
}
</style>
