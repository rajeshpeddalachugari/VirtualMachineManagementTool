<template>
  <nav
    class="w3-sidebar  w3-collapse w3-white w3-animate-left w3-border"
    style="z-index:3;width:10%;"
    id="mySidebar"
  >
    <div class="w3-bar-block w3-text-indigo" style="margin-top:42px">
      <router-link to="/admin" class="w3-bar-item w3-button w3-padding">
        <i class="fa fa-home"></i> Home
      </router-link>
      <router-link
        :to="{ name: 'softwares' }"
        class="w3-bar-item w3-button w3-padding"
      >
        <i class="fa fa-terminal"></i> Softwares
      </router-link>
      <router-link
        :to="{ name: 'machines' }"
        class="w3-bar-item w3-button w3-padding"
      >
        <i class="fa fa-desktop"></i> Machines
      </router-link>
      <router-link
        :to="{ name: 'users' }"
        class="w3-bar-item w3-button w3-padding"
      >
        <i class="fa fa-users fa-fw"></i> Users
      </router-link>
    </div>
  </nav>
</template>
