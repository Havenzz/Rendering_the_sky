import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { prismjsPlugin } from 'vite-plugin-prismjs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    prismjsPlugin({
			// ['json', 'css'] 按需引入，'all' 所有语言
			languages: 'all',
			// 配置行号插件
			plugins: ['line-numbers','copy-to-clipboard'],
			// 主题名
			theme: 'tomorrow',
			css: true
		})
  ],
  server: {
    host: '0.0.0.0',
    port: 8080
  }
})
