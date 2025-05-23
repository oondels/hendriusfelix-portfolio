import { ref, watch } from 'vue';

type Theme = 'dark' | 'light';

// Create a composable for theme management
export function useTheme() {
  const theme = ref<Theme>(
    localStorage.getItem('theme') as Theme || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  );

  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark';
  };

  // Watch for theme changes and update localStorage and document class
  watch(theme, (newTheme) => {
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(newTheme);
  }, { immediate: true });

  // Watch for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      theme.value = e.matches ? 'dark' : 'light';
    }
  });

  return {
    theme,
    toggleTheme,
  };
}