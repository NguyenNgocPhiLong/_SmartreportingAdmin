import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createStyleImportPlugin } from 'vite-plugin-style-import';

// Sử dụng cách import phù hợp với cách xuất ra
export default defineConfig({
  plugins: [
    react(),
    createStyleImportPlugin({
      // Cấu hình plugin nếu cần
    }),
  ],
});
