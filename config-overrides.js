const { override, addWebpackAlias, addBabelPlugins } = require("customize-cra");
const path = require("path");

module.exports = override(
  addWebpackAlias({
    "@components": path.resolve(__dirname, "src", "components"),
    "@assets": path.resolve(__dirname, "src", "assets"),
    "@styles": path.resolve(__dirname, "src", "styles"),
    "@hooks": path.resolve(__dirname, "src", "hooks"),
    "@contexts": path.resolve(__dirname, "src", "contexts"),
    "@atoms": path.resolve(__dirname, "src", "atoms"),
    "@molecules": path.resolve(__dirname, "src", "molecules"),
    "@contracts": path.resolve(__dirname, "src", "contracts"),
    "@eth": path.resolve(__dirname, "src", "eth"),
    "@services": path.resolve(__dirname, "src", "services"),
  }),
  ...addBabelPlugins(["babel-plugin-styled-components"])
);
