import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';

export default defineConfig({
    plugins: [
        vue(),
        vuetify({ autoImport: true }) // This ensures Vuetify components are auto-imported
    ]
});
