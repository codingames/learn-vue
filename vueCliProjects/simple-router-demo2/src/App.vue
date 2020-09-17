<template>
  <div id="app">
    <img src="./assets/logo.png" />
    <header>
      <router-link to="/home">Home</router-link>
      <br>
      <router-link to="/about">About</router-link>
      <br>
      <!--  增加两个到user组件的导航，可以看到这里使用了不同的to属性 -->
      <router-link to="/user/123">User123</router-link>
      <br>
      <router-link to="/user/456">User456</router-link>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>