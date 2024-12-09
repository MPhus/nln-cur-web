import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  define: {
    'process.env': {}
  },
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        // svgr options
      },
    })
  ],
  resolve: {
    alias: [
      { find: '~', replacement: '/src' }
    ]
  }
})
