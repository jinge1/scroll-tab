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
      maxNum: 10,
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
          tabDirection: 'x',
          changeTab: (index)=> {
            this.tabIndex = index
          }
        })
      })
    },
    changeTab(index){
      this.scrollTab.changeTab(index)
    }
  }
}
</script>
<style lang="postcss" scoped>
.scroll-main {
  & .scroll-tap {
    display: flex;
    flex-wrap: nowrap;
    background: #e1e1e1;
    position: relative;
    width: 100%;
    overflow: auto;
    front-size: 14px;
    & .tab-item {
      padding: 10px;
      width: 260px;
      white-space: nowrap;
      border-bottom: solid 1px #fff;
      &.active {
        color: orange;
      }
    }
  }
  & .scroll-content {
    line-height: 100px;
    padding-left: 100px;
    max-height: 300px;
    position: relative;
    overflow: auto;
    box-shadow: 0 0 6px #ccc;
    & .content-item{
      background: orange;
      &:nth-child(odd){
        background: green;
      }
    }
  }
}
</style>