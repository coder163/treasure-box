<template>
  <div id="markdown">

    <div id="fictitious"></div>

    <div id="article" ref="hlDiv" v-html="code"></div>
  </div>
</template>

<script>
const fs = require('fs')
const path = require('path')
// import MarkdownItVue from 'markdown-it-vue'
// import 'markdown-it-vue/dist/markdown-it-vue-light.css'
// import { MarkdownPreview } from 'vue-meditor'
// import marked from 'marked';
// import hljs from "highlight.js";
import 'highlight.js/styles/darcula.css';

const cheerio = require('cheerio')

// let AutocJS = require('autocjs');
import {generateTree} from '@/common'


export default {
  props: ['filePath'],
  data() {
    return {
      code: null,
      hlDiv: null,
      treeHtml: ''
    }
  },
  watch: {

    filePath() {
      this.getContent();
    }
  },
  mounted() {
    this.getContent();

  },
  methods: {
    getContent() {

      const pathToDbFile = path.join(process.cwd(), `${decodeURIComponent(this.filePath)}`,);
      console.log(pathToDbFile)
      let temp = fs.readFileSync(pathToDbFile).toString()
      let $ = cheerio.load(temp);
      let fictitious = document.getElementById('fictitious');
      fictitious.innerHTML = $('#post-content').html();
      let headers = fictitious.querySelectorAll("h1, h2, h3, h4, h5, h6");
      let fictitiousToc = generateTree(headers, fictitious)
      $('#outline-content').html(fictitiousToc)

      fictitious.innerHTML = "";
      $("#outline-panel").css('display', 'block')
      this.code = $.html()
    }
  },
  computed: {}
}
</script>

<style lang="sass">


#article
  margin: 0 auto
  font-family: Consolas, "Segoe UI", Helvetica, sans-serif, Tahoma, Arial, Geneva, Georgia, Palatino, "Times New Roman", "Hiragino Sans GB", 冬青黑体, "Microsoft YaHei", 微软雅黑, "Microsoft YaHei UI", "WenQuanYi Micro Hei", 文泉驿雅黑, Dengxian, 等线体, STXihei, 华文细黑, "Liberation Sans", "Droid Sans", NSimSun, 新宋体, SimSun, 宋体
  color: rgb(34, 34, 34)
  line-height: 1.5
  padding: 15px
  font-size: 16px
  display: block
  text-align: left
  border: none

  //滚动条整体样式
  ::-webkit-scrollbar
    width: 4px
    height: 10px

  ::-webkit-scrollbar-thumb
    border-radius: 9px
    width: 20px
    -webkit-box-shadow: inset 0 0 15px #027be3

  ::-webkit-scrollbar-track
    background: #cce5f9

  code, kbd, pre, samp
    font-family: Consolas, "Segoe UI", Helvetica, sans-serif, Tahoma, Arial, Geneva, Georgia, Palatino, "Times New Roman", "Hiragino Sans GB", 冬青黑体, "Microsoft YaHei", 微软雅黑, "Microsoft YaHei UI", "WenQuanYi Micro Hei", 文泉驿雅黑, Dengxian, 等线体, STXihei, 华文细黑, "Liberation Sans", "Droid Sans", NSimSun, 新宋体, SimSun, 宋体

  #outline-panel
    display: block

  .container-fluid
    width: 100%
    padding-right: 15px
    padding-left: 15px
    margin-right: auto
    margin-left: auto

  //.col, .col-1, .col-10, .col-11, .col-12, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-auto, .col-lg, .col-lg-1, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-auto, .col-md, .col-md-1, .col-md-10, .col-md-11, .col-md-12, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-auto, .col-sm, .col-sm-1, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-auto, .col-xl, .col-xl-1, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-auto
  //    position: relative
  //    width: 100%
  //    min-height: 1px
  //    padding-right: 15px
  //    padding-left: 15px
  //
  //.col-12
  //    -webkit-box-flex: 0
  //    -ms-flex: 0 0 100%
  //    flex: 0 0 100%
  //    max-width: 100%

  .outline-bold
    font-weight: bolder !important

  .bd-content
    -webkit-box-ordinal-group: 1
    -ms-flex-order: 0
    order: 0

  .bd-toc
    position: -webkit-sticky
    position: sticky
    top: 4rem
    height: calc(100vh - 10rem)
    overflow-y: auto
    -webkit-box-ordinal-group: 2
    -ms-flex-order: 1
    order: 1
    padding-top: 1.5rem
    padding-bottom: 1.5rem
    font-size: .875rem


  h1, h2, h3, h4, h5, h6

    color: rgb(34, 34, 34)
    font-weight: bold
    margin-top: 20px
    margin-bottom: 10px
    padding: 0

  h1
    font-size: 26px

  h2
    font-size: 24px

  h3
    font-size: 22px

  h4
    font-size: 20px

  h5
    font-size: 19px

  h6
    font-size: 18px

  p
    padding: 0
    margin-top: 16px
    margin-bottom: 16px

  a
    color: rgb(0, 153, 255)
    margin: 0
    padding: 0
    vertical-align: baseline
    text-decoration: none
    word-break: break-word

  a:hover
    text-decoration: underline
    color: rgb(255, 102, 0)

  a:visited
    color: purple

  p, ul, ol
    font-size: 16px
    line-height: 24px

  ul, ol
    padding: 0 0 0 24px

    li
      line-height: 24px

      ul, ol
        margin-left: 16px

  blockquote
    color: rgb(102, 102, 102)
    border-left: 0.5em solid rgb(122, 122, 122)
    padding: 0 1em
    margin-left: 0

    p
      color: rgb(102, 102, 102)

  hr
    display: block
    text-align: left
    margin: 1em 0
    border: none
    height: 2px
    background: rgb(153, 153, 153)

  .section-nav
    padding-left: 0

    ul
      font-size: .875rem
      list-style-type: none

    li
      font-size: .875rem

    a
      color: inherit !important

  .row
    display: -webkit-box
    display: -ms-flexbox
    display: flex
    -ms-flex-wrap: wrap
    flex-wrap: wrap
    margin-right: -15px
    margin-left: -15px

  .highlighted-anchor
    animation: flash 1s

  span.modal-close
    position: absolute
    z-index: 1000
    top: 15px
    right: 35px
    color: rgb(218, 218, 218)
    font-size: 40px
    font-weight: bold
    transition: 0.3s

  .vnote-anchor
    font-weight: 400
    color: rgba(0, 123, 255, 0.498039)
    transition: color 0.16s linear
    padding-left: 0.375em
    -webkit-font-smoothing: antialiased
    text-decoration: none
    opacity: 0

  .vnote-anchor:hover
    color: rgb(0, 123, 255)
    text-decoration: none
    opacity: 1

  .vnote-anchor::after
    content: attr(data-anchor-icon)

  table
    padding: 0
    margin: 1rem 0.5rem
    border-collapse: collapse

  table tr
    border-top: 2px solid rgb(204, 204, 204)
    background-color: white
    margin: 0
    padding: 0

  table tr:nth-child(2n)
    background-color: rgb(248, 248, 248)

  table tr th
    font-weight: bold
    border: 2px solid rgb(204, 204, 204)
    margin: 0
    padding: 6px 13px

  table tr td
    border: 2px solid rgb(204, 204, 204)
    margin: 0
    padding: 6px 13px

  table tr th :first-child, table tr td :first-child
    margin-top: 0

  table tr th :last-child, table tr td :last-child
    margin-bottom: 0

  table.hljs-ln tr
    border: none
    background-color: transparent

  table.hljs-ln tr td
    border: none
    background-color: transparent

  table.hljs-ln tr td.hljs-ln-numbers
    user-select: none
    text-align: center
    color: rgb(170, 170, 170)
    border-right: 1px solid rgb(204, 204, 204)
    vertical-align: top
    padding-right: 5px
    white-space: nowrap

  table.hljs-ln tr td.hljs-ln-code
    padding-left: 10px


  .img-package
    text-align: center

  img.img-center
    display: block
    margin-left: auto
    margin-right: auto

  span.img-caption
    min-width: 20%
    max-width: 80%
    display: inline-block
    padding: 10px
    margin: 0 auto
    border-bottom: 1px solid rgb(192, 192, 192)
    color: rgb(108, 108, 108)
    text-align: center
    line-height: 1.5

  div.preview-hint
    opacity: 0.5
    margin-top: 30%
    margin-bottom: 30%
    align-items: center
    display: flex
    flex-direction: column
    justify-content: center

  div.flowchart-diagram
    padding: 0 5px
    margin: 16px 0
    width: fit-content
    overflow: hidden


  #floating-button
    width: 2.5rem
    height: 2.5rem
    border-radius: 50%
    background: #00897B
    position: fixed
    top: .5rem
    right: .5rem
    cursor: pointer
    box-shadow: 0 2px 5px #666

  #floating-button .more
    color: #F5F5F5
    position: absolute
    top: 0
    display: block
    bottom: 0
    left: 0
    right: 0
    text-align: center
    padding: 0
    margin: 0
    line-height: 2.5rem
    font-size: 2rem
    font-family: 'monospace'
    font-weight: 300


//@media (min-width: 1200px)
//    #article
//        .col-md-9
//            -webkit-box-flex: 0
//            -ms-flex: 0 0 83%
//            flex: 0 0 83%
//            max-width: 83%
//    #article
//        .col-md-3
//            flex: 0 0 17%
//            max-width: 17%

</style>