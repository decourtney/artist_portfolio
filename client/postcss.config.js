const tailwindcss = require("tailwindcss");
// import tailwindcss from "tailwindcss";

module.exports = {
  plugins: {
    tailwindcss: require("./tailwind.config.js"),
    autoprefixer: require("autoprefixer"),
  },
};
