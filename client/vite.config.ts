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
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
