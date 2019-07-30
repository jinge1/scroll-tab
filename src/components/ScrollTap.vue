<template>
  <div>
    <slot></slot>
  </div>
</template>
<script>
/**
 * 滚动tab效果封装
 */
export default {
  props: {
    tabId: {
      type: String,
      default: ''
    },
    contentId: {
      type: String,
      default: ''
    },
    limit: {
      type: Number,
      default: 10
    },
    tabIndex: {
      type: Number,
      default: 0
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.$nextTick(() => {
        const { tabId, contentId } = this
        // 该元素需使用relative 或者 absolute定位，否则会导致后续获取子节点的offsetTop不准确
        const tabEle = this.getElement(tabId)

        // 该元素需使用relative 或者 absolute定位，否则会导致后续获取子节点的offsetTop不准确
        const contentEle = this.getElement(contentId)

        this.tabEle = tabEle
        this.contentEle = contentEle
        this.setEvent()
      })
    },
    setEvent() {
      const { contentEle, scrollEvent } = this
      contentEle.addEventListener('scroll', scrollEvent)
    },
    scrollEvent(event) {
      const { limit } = this
      const ul = event.target
      const list = ul ? ul.children : null

      if (list) {
        const ulHeight = ul.offsetHeight
        const ulScrollTop = ul.scrollTop
        const listArr = Array.from(list)
        let loadingIndex = 0
        let tabIndex = 0

        // 内容总高度
        const contentHeight = listArr.reduce(
          (pre, { offsetHeight }) => pre + offsetHeight,
          0
        )

        listArr.forEach(({ offsetHeight, offsetTop }, index) => {
          if (ulScrollTop + ulHeight > offsetTop + limit) {
            loadingIndex = index
          }
          if (ulScrollTop + ulHeight > offsetTop + ulHeight / 2) {
            tabIndex = index
          }
          if (ulScrollTop < limit) {
            loadingIndex = 0
          }
          if (contentHeight - (ulScrollTop + ulHeight) < limit) {
            tabIndex = listArr.length - 1
            loadingIndex = listArr.length - 1
          }
        })

        this.$emit('loading', loadingIndex)
        this.$emit('changeTab', tabIndex)
      }
    },
    getElement(str) {
      return document.querySelector(str)
    },
    setScrollTop() {
      const { contentEle, tabIndex } = this
      this.removeEvent()
      let top = contentEle.children[tabIndex].offsetTop
      // 内容总高度
      const contentHeight = Array.from(contentEle.children).reduce(
        (pre, { offsetHeight }) => pre + offsetHeight,
        0
      )
      if (top > contentHeight - contentEle.offsetHeight) {
        top = contentHeight - contentEle.offsetHeight
      }
      contentEle.scrollTop = top
      this.setEvent()
    },
    removeEvent() {
      const { contentEle, scrollEvent } = this
      contentEle.removeEventListener('scroll', scrollEvent)
    },
    setTabScrollTop() {
      const { tabEle, tabIndex } = this
      const tabHeight = tabEle.offsetHeight
      // 内容总高度
      const totalHeight = Array.from(tabEle.children).reduce(
        (pre, { offsetHeight }) => pre + offsetHeight,
        0
      )

      if (totalHeight > tabHeight) {
        let top = tabEle.children[tabIndex].offsetTop - tabHeight / 2
        top = top < 0 ? 0 : top
        top = top > totalHeight - tabHeight ? totalHeight - tabHeight : top
        tabEle.scrollTop = top
      }
    }
  },
  watch: {
    tabIndex() {
      this.setScrollTop()
      this.setTabScrollTop()
    }
  },
  beforeDestroy() {
    this.removeEvent()
  }
}
</script>

