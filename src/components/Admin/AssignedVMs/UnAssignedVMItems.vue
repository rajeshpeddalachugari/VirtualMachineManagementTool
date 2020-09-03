<template>
  <div class="w3-card w3-margin-top w3-round-large">
    <div>
      <div class="tabs">
        <div class="tab">
          <input
            class="tabchk"
            type="checkbox"
            v-bind:id="'chck1' + itemIndex + UnAssignedVMItem.assigned"
          />
          <label
            class="tab-label"
            v-bind:for="'chck1' + itemIndex + UnAssignedVMItem.assigned"
          >
            {{ UnAssignedVMItem !== null ? UnAssignedVMItem.nodeName : "" }}
          </label>

          <div class="tab-content">
            <div class="w3-container w3-text-grey">
              <p class="w3-padding">
                <span class="w3-text-indigo"> Products Installed: </span>

                <span
                  class="capital"
                  v-for="(item, index) in UnAssignedVMItem !== null
                    ? UnAssignedVMItem.data.softwares
                    : []"
                  v-bind:key="index"
                  v-bind:class="getColorCode(index) + ' ' + 'tag-margin'"
                >
                  {{ item.name }}
                </span>
              </p>
              <table class="w3-table">
                <tr>
                  <td class="w3-padding">
                    <span class="w3-text-indigo"> Memory : </span>
                    <span class="capital">{{
                      UnAssignedVMItem.data.memory
                    }}</span>
                  </td>
                  <td class="w3-padding">
                    <span class="w3-text-indigo"> Domain : </span>
                    <span class="capital">{{
                      UnAssignedVMItem.data.domain
                    }}</span>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { store } from "../../../store";
export default {
  props: ["UnAssignedVMItem", "itemIndex"],
  methods: {
    getColorCode(index) {
      return store.getters.getLabelColor(index);
    },
  },
  computed: {
    Machines() {
      return store.state.Machines;
    },
  },
};
</script>
