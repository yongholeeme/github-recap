export const config = {
  github: {
    url: import.meta.env.VITE_GITHUB_URL || "https://github.com",
    apiUrl: import.meta.env.VITE_GITHUB_API_URL || "https://api.github.com",
  },
} as const;

