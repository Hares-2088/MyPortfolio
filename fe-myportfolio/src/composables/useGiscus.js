import { onMounted } from 'vue';

export function useGiscus() {
  onMounted(() => {
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'Hares-2088/MyPortfolio');  // Update this
    script.setAttribute('data-repo-id', '909110904');  // Update this
    script.setAttribute('data-category', 'General');
    script.setAttribute('data-category-id', 'your-category-id');  // Update this
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-theme', 'light');
    script.crossOrigin = 'anonymous';
    script.async = true;
    
    document.getElementById('giscus')?.appendChild(script);
  });
}
