module.exports = {
  filenameHashing: false,
  configureWebpack: {
    output: {
      filename: "crontab.js",
      libraryExport: "default",
      libraryTarget: "umd",
      umdNamedDefine: true
    }
  },
  css: {
    extract: false
  },
  chainWebpack: config => {
    config.plugins.delete("html");
    config.plugins.delete("preload");
    config.plugins.delete("prefetch");
  }
};
