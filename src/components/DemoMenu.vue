<template>
  <div class="demo-menu">
    <p class="menu" @click="isShow = !isShow">menu</p>
    <ul class="menu-content" v-if="isShow">
      <li>
        <router-link to="/index">content高度固定</router-link>
      </li>
      <li>
        <router-link to="/body">body 滚动效果</router-link>
      </li>
      <li>
        <router-link to="/height">content高度区间大效果</router-link>
      </li>
      <li>
        <router-link to="/xdemo">tabs横向滚动定位</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShow: false
    }
  }
}
</script>
<style scoped>
.menu {
  position: fixed;
  z-index: 100;
  left: 30px;
  bottom: 30px;
  background: orange;
  color: #fff;
  width: 50px;
  line-height: 50px;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
}
.menu-content {
  position: fixed;
  z-index: 99;
  left: 100px;
  bottom: 0;
  background: #fff;
  line-height: 2em;
  width: 200px;
  box-shadow: 0 0 10px #eee;
}
.menu-content a {
  color: #999;
  text-decoration: none;
}
.menu-content a:hover {
  color: blue;
}
</style>
