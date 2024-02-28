import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import viteTsconfigPaths from "vite-tsconfig-paths";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";

const PORT = process.env.PORT || 3000;
const HOSTNAME = process.env.HOSTNAME

export default defineConfig({
  base: "/",
  plugins: [react(), viteTsconfigPaths()],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  server: {
    host: "0.0.0.0",
    proxy: {
      "/graphql": {
        target: `http://${HOSTNAME}:${PORT}`,
        changeOrigin: true,
      },
    },
  },
});


