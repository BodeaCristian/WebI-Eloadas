import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
	base: './',
	plugins: [react()],
	// server: {
		// proxy: {
			// '/api.php': 'http://localhost:8000',
		// },
	// },
	build: {
		rollupOptions: {
			input: {
				index: resolve(__dirname, 'index.html'),
				javascript: resolve(__dirname, 'javascript.html'),
				react: resolve(__dirname, 'react.html'),
				axios: resolve(__dirname, 'axios.html'),
			},
		},
	},
})
