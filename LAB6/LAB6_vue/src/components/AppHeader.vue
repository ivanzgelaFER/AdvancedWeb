<template>
    <div class="app-header">
      <nav>
        <router-link class="link-dec" to="/">Home</router-link>
        <router-link class="link-dec" to="/myPreviousExams">My previous exams</router-link>
        <router-link class="link-dec" to="/tickets">My tickets</router-link>
       </nav>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AppHeader',
  }
  </script>
  
  <style scoped>
  .app-header {
    z-index: 2000;
    height: 60px;
    width: 100%;
    color: white;
    background-color: #333;  
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;  
  }
  
  nav {
    display: flex;
    align-items: center;
    gap: 20px;  
  }
  
    .link-dec {
        color: white; 
        text-decoration: none;
        font-weight: bold;
    }
  </style>