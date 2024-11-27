// build-tools/config.js

const path = require("path");

module.exports = {
  paths: {
    src: path.resolve(__dirname, "../src"),
    dist: path.resolve(__dirname, "../dist"),
    themes: (theme) => path.resolve(__dirname, `../src/scss/themes/${theme}`),
    baseScss: path.resolve(__dirname, "../src/scss/base"),
    componentsScss: path.resolve(__dirname, "../src/scss/components"),
    utilsScss: path.resolve(__dirname, "../src/scss/utils"),
    sharedLayouts: path.resolve(__dirname, "../Views/Shared/Layouts"),
    sharedViews: path.resolve(__dirname, "../Views/Shared"),
    sharedComponents: path.resolve(__dirname, "../Views/Shared/Components"),
    sharedBlocks: path.resolve(__dirname, "../Views/Shared/Blocks"),
    reactJs: path.resolve(__dirname, "../src/js/react"),
    js: path.resolve(__dirname, "../src/js"),
    icons: path.resolve(__dirname, "../src/assets/icons"),
  },
  themes: ["polypipe", "nuauire", "manthorpe"],
};
