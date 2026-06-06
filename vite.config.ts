
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild', // Изменено с terser на esbuild
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  base: './', // Относительные пути для VK Mini Apps
});
