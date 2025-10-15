module.exports = {
  multipass: true,

  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          removeViewBox: false,
          cleanupIDs: false,
        },
      },
    },
    {
      name: "addAttributesToSVGElement",
      params: {
        attributes: [{ "aria-hidden": "true" }, { focusable: "false" }],
      },
    },
  ],
};
