<script setup>
import Sidebar from "../components/Sidebar.vue";
</script>

<template>
  <div class="layout">
    <Sidebar />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
}

.main-content {
  margin-left: 220px;
  padding: 2rem;
  width: 100%;
}
</style>
