<template>
  <div class="scroll-main">
    <div class="scroll-tap" ref="tabEle">
      <p
        class="tab-item"
        v-for="(item, index) in tabs"
        :key="index"
        @click="changeTab(index)"
        :class="{active: tabIndex === index}"
      >{{item}}</p>
    </div>
    <div class="scroll-content" ref="contentEle">
      <p class="content-item" v-for="(item, index) in content" :key="index">{{item}}</p>
    </div>
  </div>
</template>
<script>
import ScrollTab from '../utils/ScrollTab'
export default {
  data() {
    return {
      tabs: [],
      content: [],
      maxNum: 4,
      tabIndex: 0,
      scrollTab: null
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      const { maxNum } = this
      for (let i = 0; i < maxNum; i++) {
        this.tabs.push(`这是一个tab${i + 1}`)
        this.content.push(`这是一个内容${i + 1}`)
      }
      this.$nextTick(() => {
        this.scrollTab = new ScrollTab({
          tabEle: this.$refs.tabEle,
          contentEle: this.$refs.contentEle,
          changeTab: (index)=> {
            console.log('index: ', index)
            this.tabIndex = index
          }
        })
      })
    },
    changeTab(index){
      // this.scrollTab.changeTab(index)
    }
  }
}
</script>
<style lang="postcss" scoped>
.scroll-main {
  display: flex;
  & .scroll-tap {
    width: 260px;
    background: #e1e1e1;
    max-height: 200px;
    position: relative;
    overflow: auto;
    front-size: 14px;
    & .tab-item {
      padding: 10px;
      border-bottom: solid 1px #fff;
      &.active {
        color: orange;
      }
    }
  }
  & .scroll-content {
    line-height: 100px;
    padding-left: 100px;
    max-height: 360px;
    box-shadow: 0 0 6px #ccc;
    position: relative;
    overflow: auto;
    & .content-item{
      background: orange;
      &:nth-child(odd){
        background: green;
        /* height: 150px; */
      }
    }
  }
}
</style>