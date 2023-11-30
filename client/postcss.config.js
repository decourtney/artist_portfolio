// const tailwindcss = require("tailwindcss");
import tailwindcss from "tailwindcss";

module.exports = {
  plugins: [tailwindcss("./tailwind.js"), require("autoprefixer")],
};
