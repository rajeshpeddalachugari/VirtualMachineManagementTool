<template>
  <div class="">
    <div class="w3-card-4 w3-round-large">
      <div v-show="!isEditing">
        <header class="w3-container w3-light-grey mineader headerStyle">
          <h3 class="w3-text-indigo">{{ userItem.name }}</h3>
        </header>
        <div class="w3-container w3-text-grey minContainer">
          <p class="w3-padding">
            <span class="w3-text-indigo">Email : </span>
            <span> {{ userItem.email }}</span>
          </p>
          <p class="w3-padding">
            <span class="w3-text-indigo">Role :</span>
            <span> {{ userItem.role }}</span>
          </p>
          <p class="w3-padding">
            <span class="w3-text-indigo">Team :</span>
            <span> {{ userItem.team }}</span>
          </p>
          <hr />
          <div class="w3-rest">
            <button
              @click="removeUser"
              class="w3-right w3-margin-left w3-margin-bottom"
            >
              <i class="fa fa-trash" aria-hidden="true"></i>
            </button>
            <button
              @click="Editing"
              class="w3-right w3-margin-left w3-margin-bottom"
            >
              <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>

      <div v-show="isEditing">
        <header class="w3-container w3-light-grey mineader">
          <input
            class="w3-input margin-top margin-bottom w3-border w3-round-large"
            type="text"
            v-model="userItem.name"
          />
        </header>
        <div class="w3-container minContainer w3-text-grey">
          <p>
            <!-- <span>Email : </span> -->
            <input
              class="w3-input w3-border w3-round-large"
              type="text"
              v-model="userItem.email"
            />
          </p>
          <p>
            <!-- <span>Role :</span>  -->
            <v-select
              class=""
              placeholder="select role"
              v-model="userItem.role"
              :options="['Developer', 'QA']"
            ></v-select>
          </p>
          <p>
            <!-- <span>Team :</span>  -->
            <v-select
              v-model="userItem.team"
              :options="['Tejas', 'Pheonix']"
            ></v-select>
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
</template>
<script>
export default {
  props: ["userItem"],
  data() {
    return {
      isEditing: false,
    };
  },
  methods: {
    removeUser() {
      this.$emit("Remove");
    },
    Editing() {
      this.isEditing = true;
      //document.getElementById(this.userItem.name).style.display = "block";
    },
    Saving() {
      this.isEditing = false;
    },
  },
};
</script>
<style>
.headerStyle {
  text-transform: uppercase;
  /* font-variant: small-caps; */
}
.margin-top {
  margin-top: 8px;
}
.margin-bottom {
  margin-bottom: 8px;
}

.minContainer {
  min-width: 355px;
  min-height: 250px;
}
.mineader {
  min-height: 57px;
}

.style-chooser .vs__search::placeholder,
.style-chooser .vs__dropdown-toggle,
.style-chooser .vs__dropdown-menu {
  color: gray;
  text-transform: lowercase;
  font-variant: small-caps;
}
</style>
