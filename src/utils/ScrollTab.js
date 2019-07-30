/*
 * @Author: lixiong 
 * @Date: 2019-07-30 23:55:29 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-07-31 00:16:23
 */


/**
 * 
 */
export default class ScrollTabs {
  constructor(options = {}) {
    const { tabEle, contentEle, limit = 10, ...other } = options
    this.tabEle = this.getEle(tabEle)
    this.contentEle = this.getEle(contentEle)
    this.limit = limit
    this.conf = other
    this.init()
  }

  init() {
    const { contentEle, tabEle, conf } = this
    const { initIndex = 0 } = conf

    // content元素未进行定位，则判断滚动元素未body，而非contentEle
    // 如果滚动元素为contentEle，则需要设置contentEle的position为relative/absolute/fixed
    // 否则后续获取元素距离顶部距离的offsetTop取值可能不准确
    const isScrollDoc = !this.isEleScroll(contentEle)

    // 判断tab元素是否也需要动态计算scroll值
    const isScrollTab = this.isEleScroll(tabEle)

    // 判断滚动元素
    const contentScrollEle = isScrollDoc ? document.documentElement : contentEle
    this.contentScrollEle = contentScrollEle

    // 判断绑定滚动事件的元素，documentElement元素需绑定事件到window上
    this.scrollEventEle = isScrollDoc ? window : contentScrollEle
    this.isScrollDoc = isScrollDoc
    this.isScrollTab = isScrollTab

    // 初始tab设定
    this.changeTab(initIndex, true)
  }

  setScrollEvent() {
    const { scrollEventEle } = this
    this.handleScroll = this.scrollEvent.bind(this)
    scrollEventEle.addEventListener('scroll', this.handleScroll)
  }

  removeEvent() {
    const { scrollEventEle } = this
    scrollEventEle.removeEventListener('scroll', this.handleScroll)
  }

  scrollEvent() {
    const { contentEle, conf, contentScrollEle, limit } = this
    const list = contentEle.children
    const listArr = Array.from(list)
    const scrollTop = contentScrollEle.scrollTop
    const { clientHeight, totalHeight } = this.getEleInfo(contentEle)
    const totalScroll = totalHeight - clientHeight

    const len = listArr.length
    let tabIndex = 0
    let firstEnableIndex = -1
    let lastEnableIndex = -1

    listArr.forEach(({ offsetTop }, index) => {
      if (
        offsetTop > clientHeight / 2 &&
        offsetTop - totalScroll < clientHeight / 2
      ) {
        if (firstEnableIndex === -1) {
          firstEnableIndex = index
        }
        lastEnableIndex = index
      }
    })

    if (firstEnableIndex > -1) {
      const firstEnableEle = listArr[firstEnableIndex]
      const lastEnableEle = listArr[lastEnableIndex]

      // 滚动条到滚动到可视区一半所需要滚动的距离
      const startScroll = firstEnableEle.offsetTop - clientHeight / 2
      const lastScroll = lastEnableEle.offsetTop - clientHeight / 2

      if (scrollTop <= startScroll) {
        tabIndex = this.equally(startScroll, scrollTop, firstEnableIndex)
      }
      if (scrollTop > startScroll && scrollTop <= lastScroll) {
        tabIndex = listArr.findIndex(({ offsetTop, offsetHeight }) => {
          return (
            scrollTop >= offsetTop - clientHeight / 2 &&
            scrollTop < offsetTop + offsetHeight - clientHeight / 2
          )
        })
      }

      if (scrollTop > lastScroll) {
        tabIndex =
          lastEnableIndex +
          this.equally(
            totalScroll - lastScroll,
            scrollTop - lastScroll,
            len - lastEnableIndex
          )
      }
    } else {
      // 平均分配可滚动距离到每个元素
      tabIndex = this.equally(totalScroll, scrollTop, len)
    }

    // 最后修正范围
    if (tabIndex < 0) {
      tabIndex = 0
    }
    if (tabIndex >= len) {
      tabIndex = len - 1
    }
    console.log('tabIndex: ', tabIndex)
    tabIndex = this.getClientIndex(scrollTop, tabIndex)
    this.setTab(tabIndex, false)
  }

  equally(totalScroll, scrollTop, len) {
    const each = totalScroll / len
    return parseInt(scrollTop / each)
  }

  getClientIndex(scrollTop, index) {
    const { contentEle } = this
    const list = contentEle.children
    const listArr = Array.from(list)
    const { clientHeight } = this.getEleInfo(contentEle)
    // 当前在可视区的元素
    const clientArr = listArr.filter(({ offsetHeight, offsetTop }) => {
      return (
        (offsetTop < clientHeight &&
          offsetTop + offsetHeight - scrollTop > 0) ||
        (offsetTop > clientHeight &&
          offsetTop - scrollTop < clientHeight &&
          offsetTop + offsetHeight - scrollTop > 0)
      )
    })
    if (
      !clientArr.some(({ offsetTop }) => offsetTop === listArr[index].offsetTop)
    ) {
      // 若平均计算出的结果元素不在可视区，则取可视区第一个元素下标
      index = listArr.findIndex(
        ({ offsetTop }) => offsetTop === clientArr[0].offsetTop
      )
    }
    return index
  }

  setLoadingIndex(index) {
    // console.log(index)
  }

  changeTab(index, isInit = false) {
    const { contentEle } = this
    const currentEle = contentEle.children[index]
    const offsetTop = currentEle ? currentEle.offsetTop : 0

    // 根据index设置滚动元素及tab的滚动位置
    this.setPosition(offsetTop, index, isInit)
  }

  /**
   * 设置tab或content元素滚动位置
   * @param top {number} 需设置的值
   * @param index {number} 需设置的tab下标
   * @param isInit {Boolent} 是否为初始化，初始化的时候，不需要调用回调
   */
  setPosition(top, index, isInit = false) {
    const { contentScrollEle } = this

    // 获取元素高度与总高度
    const { clientHeight, totalHeight } = this.getEleInfo(contentScrollEle)

    // 有滚动调出现的情况才设置滚动值
    if (totalHeight > clientHeight) {
      // 如果有水品滚动条，则保持水平滚动条位置
      const scrollLeft = contentScrollEle.scrollLeft || 0
      const maxScroll = totalHeight - clientHeight
      this.removeEvent()

      // 滚动距离不能超过最大值
      top = Math.min(maxScroll, top)
      contentScrollEle.scrollTo(scrollLeft, top)

      this.setTab(index, isInit)

      // 避免触发上述scrollTo事件，scrollTo为异步事件？
      setTimeout(() => {
        this.setScrollEvent()
      }, 10)
    }
  }

  /**
   * 设定tab位置
   * @param {Number} 当前下标
   * @param isInit {Boolent} 是否为初始化，初始化的时候，不需要调用回调
   */
  setTab(index, isInit = false) {
    const { tabEle, isScrollTab, conf } = this
    const { tabDirection = 'y', changeTab } = conf

    // tab元素也可以滚动的情况
    if (isScrollTab) {
      const {
        clientHeight,
        totalHeight,
        clientWidth,
        totalWidth
      } = this.getEleInfo(tabEle, true)
      const currTab = tabEle.children[index]
      const scrollLeft = tabEle.scrollLeft || 0
      const scrollTop = tabEle.scrollTop || 0
      let offsetTop = currTab ? currTab.offsetTop : 0
      let offsetLeft = currTab ? currTab.offsetLeft : 0

      // 当前tab纵向居中处理
      if (totalHeight > clientHeight && tabDirection === 'y') {
        // 居中位置
        offsetTop = offsetTop - clientHeight / 2 + currTab.offsetHeight / 2
        const maxTop = totalHeight - clientHeight
        // 控制不能超过最大可滚动范围
        const tabTop = Math.min(maxTop, offsetTop)
        tabEle.scrollTo(scrollLeft, tabTop)
      }

      // 当前tab横向居中处理
      if (totalWidth > clientWidth && tabDirection === 'x') {
        offsetLeft = offsetLeft - clientWidth / 2 + currTab.offsetWidth / 2
        const maxLeft = totalWidth - clientWidth
        // 控制不能超过最大可滚动范围
        const tabLeft = Math.min(maxLeft, offsetLeft)
        tabEle.scrollTo(tabLeft, scrollTop)
      }
    }

    // 初始化时不需要调用回调
    if (!isInit && typeof changeTab === 'function') {
      changeTab(index)
    }
  }

  /**
   *
   * @param {Object} ele dom元素
   * @param {Boolean} isTab 元素是否为tab元素
   */
  getEleInfo(ele, isTab = false) {
    const { isScrollDoc } = this
    let clientHeight = ele.offsetHeight
    const clientWidth = ele.offsetWidth

    // 总高度为元素子节点高度和
    let totalHeight = Array.from(ele.children).reduce(
      (pre, { offsetHeight = 0 }) => {
        pre = pre + offsetHeight
        return pre
      },
      0
    )

    // 总宽度，tab滚动可能为横向滚动，需要计算总宽度
    const totalWidth = Array.from(ele.children).reduce(
      (pre, { offsetWidth = 0 }) => {
        pre = pre + offsetWidth
        return pre
      },
      0
    )

    // documentElement计算方式
    if (isScrollDoc && !isTab) {
      clientHeight = document.documentElement.clientHeight
      totalHeight = document.documentElement.offsetHeight
    }
    return {
      clientHeight,
      totalHeight,
      clientWidth,
      totalWidth
    }
  }

  // 根据元素样式设定，判断是否为滚动元素
  isEleScroll(ele) {
    const position = this.getStyleValue(ele, 'position')
    const height = this.getStyleValue(ele, 'height')
    const overflow = this.getStyleValue(ele, 'overflow')
    if (position === 'static' || height === 'auto' || overflow === 'visible') {
      // 未设置内容元素自身自身可滚动，则判断滚动元素未window
      return false
    }
    return true
  }

  getStyleValue(ele, attr) {
    return window.getComputedStyle(ele, null).getPropertyValue(attr)
  }

  getEle(str) {
    return typeof str === 'string' ? document.querySelector(str) : str
  }
}
