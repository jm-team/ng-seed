var routers = [
  ["home", require("./page/home/home.router.js")],
  ["notFound", require("./page/error/404.router.js")],
  ["about", require("./page/about/about.router.js")],
  ["help", require("./page/help/help.router.js")],

  // components
  ["components", require("./page/components/components.router.js")],
  ["components.chart", require("./page/components/chart/chart.router.js")],

  ["components.ueditor", require("./page/components/ueditor/ueditor.router.js")],
  ["components.news", require("./page/components/news/news.router.js")],
  ["components.news.list", require("./page/components/news/news.list.router.js")],
  ["components.news.detail", require("./page/components/news/news.detail.router.js")],
  ["components.news.save", require("./page/components/news/news.save.router.js")],
  ["components.scroll", require("./page/components/scroll/scroll.router.js")],
  ["components.search", require("./page/components/search/search.router.js")],

  ["components.tab", require("./page/components/tab/tab.router.js")],
  ["components.pagintion", require("./page/components/pagintion/pagintion.router.js")],
  ["components.accordion", require("./page/components/accordion/accordion.router.js")],
  ["components.dialog", require("./page/components/dialog/dialog.router.js")],
  ["components.lazyimg", require("./page/components/lazyimg/lazyimg.router.js")],
  ["components.imgerror", require("./page/components/imgError/imgerror.router.js")],

  ["components.switch", require("./page/components/switch/switch.router.js")],
  ["components.rate", require("./page/components/rate/rate.router.js")],
  ["components.alert", require("./page/components/alert/alert.router.js")],
  ["components.crumb", require("./page/components/crumb/crumb.router.js")],
  ["components.anchor", require("./page/components/anchor/anchor.router.js")],
  ["components.tooltip", require("./page/components/tooltip/tooltip.router.js")],

  ["components.checkbox", require("./page/components/checkbox/checkbox.router.js")],
  ["components.autoComplete", require("./page/components/autocomplete/autocomplete.router.js")],
  ["components.pdf", require("./page/components/pdf/pdf.router.js")],
  ["components.tree", require("./page/components/tree/tree.router.js")],
  ["components.transfer", require("./page/components/transfer/transfer.router.js")],
  ["components.upload", require("./page/components/upload/upload.router.js")],
  ["components.datepicker", require("./page/components/datepicker/datepicker.router.js")],
];
module.exports = routers;