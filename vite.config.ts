import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import viteTsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: "/",
  plugins: [react(), viteTsconfigPaths()],
  server: {
    host: "0.0.0.0",
    proxy: {
      "/graphql": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
      },
    },
  },
});
