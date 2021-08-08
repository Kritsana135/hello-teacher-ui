/* craco.config.js */
const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#D3B26D",
              "@text-color": "#D3B26D",
              "@body-background":"#D3B26D"
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
