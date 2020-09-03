<template>
  <div>
    <admin-header></admin-header>
    <admin-side-nav></admin-side-nav>
    <div class="w3-container" style="margin-left:10%">
      <router-view style="margin-top:43px"></router-view>
    </div>
  </div>
</template>
<script>
import adminHeader from "./Header";
import adminSideNav from "./components/Admin/SideNav";
export default {
  components: {
    adminHeader,
    adminSideNav,
  },
};
</script>
