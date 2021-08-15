module.exports = {
  pages: {
    // popup: {
    //   template: "public/browser-extension.html",
    //   entry: "./src/popup/main.js",
    //   title: "NewTab",
    // },
    override: {
      template: "public/browser-extension.html",
      entry: "./src/override/main.js",
      title: "NewTab",
    },
  },
  pluginOptions: {
    browserExtension: {
      componentOptions: {
        background: {
          entry: "src/background.js",
        },
      },
    },
  },
};
