<template>
  <div class="w3-container w3-text-indigo">
    <div class="w3-container w3-round-large w3-padding w3-card">
      <div v-show="!isEditing">
        <h4>{{ softwareItem.name }}</h4>
        <em>
          <span v-if="softwareItem.Version !== ''">version:</span>
          {{ softwareItem.Version }}</em
        >
      </div>
      <div v-show="isEditing">
        <p>
          <input
            type="text"
            v-model="softwareItem.name"
            class="w3-input w3-border w3-round-large"
            placeholder="Product Title"
          />
        </p>
        <p>
          <input
            type="text"
            v-model="softwareItem.Version"
            class="w3-input w3-border w3-round-large"
            placeholder="Version"
          />
        </p>
      </div>

      <button
        v-show="!isEditing"
        class="w3-right w3-margin-left  w3-border"
        @click="Remove"
      >
        <i class="fa fa-trash w3-text-indigo" aria-hidden="true"></i>
      </button>
      <button
        v-show="!isEditing"
        class="w3-right  w3-border w3-margin-left"
        @click="Edit"
      >
        <i class="fa w3-text-indigo fa-pencil-square-o" aria-hidden="true"></i>
      </button>

      <button
        @click="saveItem"
        v-show="isEditing"
        class="w3-right w3-margin-left  w3-border"
      >
        <i class="fa fa-floppy-o" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: ["softwareItem"],
  data() {
    return {
      isEditing: false,
    };
  },
  methods: {
    Remove() {
      this.$emit("Remove");
    },
    saveItem() {
      this.$emit("Update");
      this.isEditing = false;
    },
    Edit() {
      this.isEditing = true;
    },
  },
};
</script>
