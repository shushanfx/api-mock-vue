<template>
  <div v-html="html" class="ui-marked"></div>
</template>

<script>
export default {
  name: "ui-marked",
  props: {
    html: {
      type: String,
      default: ""
    }
  }
};
</script>


<style>
.ui-marked {
  font: 15px "Frutiger", Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  line-height: 1.7;
  padding: 3px;
  background: #fff;
  border-radius: 3px;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
}

.ui-marked p {
  margin: 1em 0;
}

.ui-marked a {
  color: #4183c4;
  text-decoration: none;
}

.ui-marked {
  background-color: #fff;
  padding: 10px;
  font-size: 15px;
}

.ui-marked > *:first-child {
  margin-top: 0 !important;
}

.ui-marked > *:last-child {
  margin-bottom: 0 !important;
}

.ui-marked h1,
.ui-marked h2,
.ui-marked h3,
.ui-marked h4,
.ui-marked h5,
.ui-marked h6 {
  font-weight: 700;
  line-height: 1;
  cursor: text;
  position: relative;
  margin: 1em 0 15px;
  padding: 0;
}

.ui-marked h1 {
  font-size: 2.5em;
  border-bottom: 1px solid #ddd;
}

.ui-marked h2 {
  font-size: 2em;
  border-bottom: 1px solid #eee;
  color: #00f;
}

.ui-marked h3 {
  font-size: 1.5em;
}

.ui-marked h4 {
  font-size: 1.2em;
}

.ui-marked h5 {
  font-size: 1em;
}

.ui-marked h6 {
  color: #777;
  font-size: 1em;
}

.ui-marked p,
.ui-marked blockquote,
.ui-marked table,
.ui-marked pre {
  margin: 3px 0;
}

.ui-marked ul {
  padding-left: 30px;
}

.ui-marked ol {
  padding-left: 30px;
}

.ui-marked ol li ul:first-of-type {
  margin-top: 0px;
}

.ui-marked hr {
  background: transparent
    url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAECAYAAACtBE5DAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OENDRjNBN0E2NTZBMTFFMEI3QjRBODM4NzJDMjlGNDgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OENDRjNBN0I2NTZBMTFFMEI3QjRBODM4NzJDMjlGNDgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4Q0NGM0E3ODY1NkExMUUwQjdCNEE4Mzg3MkMyOUY0OCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4Q0NGM0E3OTY1NkExMUUwQjdCNEE4Mzg3MkMyOUY0OCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqqezsUAAAAfSURBVHjaYmRABcYwBiM2QSA4y4hNEKYDQxAEAAIMAHNGAzhkPOlYAAAAAElFTkSuQmCC)
    repeat-x 0 0;
  border: 0 none;
  color: #ccc;
  height: 4px;
  margin: 15px 0;
  padding: 0;
}

.ui-marked > h2:first-child {
  margin-top: 0;
  padding-top: 0;
}

.ui-marked > h1:first-child {
  margin-top: 0;
  padding-top: 0;
}

.ui-marked > h1:first-child + h2 {
  margin-top: 0;
  padding-top: 0;
}

.ui-marked > h3:first-child,
.ui-marked > h4:first-child,
.ui-marked > h5:first-child,
.ui-marked > h6:first-child {
  margin-top: 0;
  padding-top: 0;
}

.ui-marked a:first-child h1,
.ui-marked a:first-child h2,
.ui-marked a:first-child h3,
.ui-marked a:first-child h4,
.ui-marked a:first-child h5,
.ui-marked a:first-child h6 {
  margin-top: 0;
  padding-top: 0;
}

.ui-marked h1 + p,
.ui-marked h2 + p,
.ui-marked h3 + p,
.ui-marked h4 + p,
.ui-marked h5 + p,
.ui-marked h6 + p,
.ui-marked ul li > :first-child,
.ui-marked ol li > :first-child {
  margin-top: 0;
}

.ui-marked dl {
  padding: 0;
}

.ui-marked dl dt {
  font-size: 14px;
  font-weight: bold;
  font-style: italic;
  padding: 0;
  margin: 15px 0 5px;
}

.ui-marked dl dt:first-child {
  padding: 0;
}

.ui-marked dl dt > :first-child {
  margin-top: 0;
}

.ui-marked dl dt > :last-child {
  margin-bottom: 0;
}

.ui-marked dl dd {
  margin: 0 0 15px;
  padding: 0 15px;
}

.ui-marked dl dd > :first-child {
  margin-top: 0;
}

.ui-marked dl dd > :last-child {
  margin-bottom: 0;
}

.ui-marked blockquote {
  border-left: 4px solid #ddd;
  padding: 0 15px;
  color: #777;
}

.ui-marked blockquote > :first-child {
  margin-top: 0;
}

.ui-marked blockquote > :last-child {
  margin-bottom: 10px;
}

.ui-marked em {
  font-style: normal;
  border: 1px solid #f00;
  border-radius: 3px;
  background-color: #efefef;
  padding-left: 3px;
  padding-right: 3px;
  margin-left: 1px;
  margin-right: 1px;
}

.ui-marked table {
  border-collapse: collapse;
  border-spacing: 0;
  font-size: 100%;
}

.ui-marked table th {
  font-weight: bold;
  border: 1px solid #ccc;
  padding: 6px 13px;
}

.ui-marked table td {
  border: 1px solid #ccc;
  padding: 6px 13px;
}

.ui-marked table tr {
  border-top: 1px solid #ccc;
  background-color: #fff;
}

.ui-marked table tr:nth-child(2n) {
  background-color: #f8f8f8;
}

.ui-marked img {
  max-width: 100%;
}

.ui-marked code,
.ui-marked tt {
  margin: 0 2px;
  padding: 0 5px;
  white-space: nowrap;
  border: 1px solid #eaeaea;
  background-color: #f8f8f8;
  border-radius: 3px;
  font-family: "Source Code Pro", Consolas, Courier, monospace;
  font-size: 80%;
  color: #333333;
}

.ui-marked pre > code {
  margin: 0;
  padding: 0;
  white-space: pre;
  border: none;
  background: transparent;
}

.ui-marked .highlight pre {
  background-color: #f8f8f8;
  border: 1px solid #ccc;
  font-size: 80%;
  line-height: 19px;
  overflow: auto;
  padding: 6px 10px;
  border-radius: 3px;
}

.ui-marked pre {
  background-color: #f8f8f8;
  border: 1px solid #ccc;
  font-size: 110%;
  line-height: 19px;
  overflow: auto;
  padding: 6px 10px;
  border-radius: 3px;
  margin: 26px 0;
}

.ui-marked pre code,
.ui-marked pre tt {
  background-color: transparent;
  border: none;
}

.ui-marked .poetry pre {
  font-family: Garamond, Georgia, serif !important;
  font-style: italic;
  font-size: 110% !important;
  line-height: 1.6em;
  display: block;
  margin-left: 1em;
}

.ui-marked .poetry pre code {
  font-family: Garamond, Georgia, serif !important;
  word-break: break-all;
  word-break: break-word;
  /* Non standard for webkit */

  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  hyphens: auto;
  white-space: pre-wrap;
}

.ui-marked sup,
.ui-marked sub,
.ui-marked a.footnote {
  font-size: 1.4ex;
  height: 0;
  line-height: 1;
  vertical-align: super;
  position: relative;
}

.ui-marked sub {
  vertical-align: sub;
  top: -1px;
}

@media screen {
  .ui-marked ::selection {
    background: rgba(157, 193, 200, 0.5);
  }
  .ui-marked h1::selection {
    background-color: rgba(45, 156, 208, 0.3);
  }
  .ui-marked h2::selection {
    background-color: rgba(90, 182, 224, 0.3);
  }
  .ui-marked h3::selection,
  .ui-marked h4::selection,
  .ui-marked h5::selection,
  .ui-marked h6::selection,
  .ui-marked li::selection,
  .ui-marked ol::selection {
    background-color: rgba(133, 201, 232, 0.3);
  }
  .ui-marked code::selection {
    background-color: rgba(0, 0, 0, 0.7);
    color: #eeeeee;
  }
  .ui-marked code span::selection {
    background-color: rgba(0, 0, 0, 0.7) !important;
    color: #eeeeee !important;
  }
  .ui-marked a::selection {
    background-color: rgba(255, 230, 102, 0.2);
  }
  .ui-marked .inverted a::selection {
    background-color: rgba(255, 230, 102, 0.6);
  }
  .ui-marked td::selection,
  .ui-marked th::selection,
  .ui-marked caption::selection {
    background-color: rgba(180, 237, 95, 0.5);
  }
}

.ui-marked .highlight .c {
  color: #998;
  font-style: italic;
}

.ui-marked .highlight .err {
  color: #a61717;
  background-color: #e3d2d2;
}

.ui-marked .highlight .k,
.ui-marked .highlight .o {
  font-weight: bold;
}

.ui-marked .highlight .cm {
  color: #998;
  font-style: italic;
}

.ui-marked .highlight .cp {
  color: #999;
  font-weight: bold;
}

.ui-marked .highlight .c1 {
  color: #998;
  font-style: italic;
}

.ui-marked .highlight .cs {
  color: #999;
  font-weight: bold;
  font-style: italic;
}

.ui-marked .highlight .gd {
  color: #000;
  background-color: #fdd;
}

.highlight .gd .x {
  color: #000;
  background-color: #faa;
}

.ui-marked .highlight .ge {
  font-style: italic;
}

.ui-marked .highlight .gr {
  color: #a00;
}

.ui-marked .highlight .gh {
  color: #999;
}

.ui-marked .highlight .gi {
  color: #000;
  background-color: #dfd;
}

.ui-marked .highlight .gi .x {
  color: #000;
  background-color: #afa;
}

.ui-marked .highlight .go {
  color: #888;
}

.ui-marked .highlight .gp {
  color: #555;
}

.ui-marked .highlight .gs {
  font-weight: bold;
}

.ui-marked .highlight .gu {
  color: #800080;
  font-weight: bold;
}

.ui-marked .highlight .gt {
  color: #a00;
}

.ui-marked .highlight .kc,
.ui-marked .highlight .kd,
.ui-marked .highlight .kn,
.ui-marked .highlight .kp,
.ui-marked .highlight .kr {
  font-weight: bold;
}

.ui-marked .highlight .kt {
  color: #458;
  font-weight: bold;
}

.ui-marked .highlight .m {
  color: #099;
}

.ui-marked .highlight .s {
  color: #d14;
}

.ui-marked .highlight .na {
  color: #008080;
}

.ui-marked .highlight .nb {
  color: #0086b3;
}

.ui-marked .highlight .nc {
  color: #458;
  font-weight: bold;
}

.ui-marked .highlight .no {
  color: #008080;
}

.ui-marked .highlight .ni {
  color: #800080;
}

.ui-marked .highlight .ne,
.ui-marked .highlight .nf {
  color: #900;
  font-weight: bold;
}

.ui-marked .highlight .nn {
  color: #555;
}

.ui-marked .highlight .nt {
  color: #000080;
}

.ui-marked .highlight .nv {
  color: #008080;
}

.ui-marked .highlight .ow {
  font-weight: bold;
}

.ui-marked .highlight .w {
  color: #bbb;
}

.ui-marked .highlight .mf,
.ui-marked .highlight .mh,
.ui-marked .highlight .mi,
.ui-marked .highlight .mo {
  color: #099;
}

.ui-marked .highlight .sb,
.ui-marked .highlight .sc,
.ui-marked .highlight .sd,
.ui-marked .highlight .s2,
.ui-marked .highlight .se,
.ui-marked .highlight .sh,
.ui-marked .highlight .si,
.ui-marked .highlight .sx {
  color: #d14;
}

.ui-marked.highlight .sr {
  color: #009926;
}

.ui-marked .highlight .s1 {
  color: #d14;
}

.ui-marked .highlight .ss {
  color: #990073;
}

.ui-marked .highlight .bp {
  color: #999;
}

.ui-marked .highlight .vc,
.ui-marked .highlight .vg,
.ui-marked .highlight .vi {
  color: #008080;
}

.ui-marked .highlight .il {
  color: #099;
}

.ui-marked .highlight .gc {
  color: #999;
  background-color: #eaf2f5;
}

.ui-marked .type-csharp .highlight .k,
.ui-marked .type-csharp .highlight .kt {
  color: #00f;
}

.ui-marked .type-csharp .highlight .nf {
  color: #000;
  font-weight: normal;
}

.ui-marked .type-csharp .highlight .nc {
  color: #2b91af;
}

.ui-marked .type-csharp .highlight .nn {
  color: #000;
}

.ui-marked .type-csharp .highlight .s,
.ui-marked .type-csharp .highlight .sc {
  color: #a31515;
}
</style>

