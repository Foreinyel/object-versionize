module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: process.env.NODE_ENV === "test" ? "commonjs" : false,
        loose: true,
        targets: {
          browsers: "defaults",
        },
      },
    ],
    "@babel/preset-typescript",
  ],
  plugins: [
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-proposal-class-properties",
  ],
};
