/**
 * Application Configuration
 *
 * This file allows customization for GitHub Enterprise Server deployments.
 * For GitHub.com (default), no changes are needed.
 * For GitHub Enterprise Server, set the baseUrl to your instance URL.
 */

export const config = {
  /**
   * GitHub API Base URL
   *
   * Default: 'https://api.github.com' (GitHub.com)
   * Enterprise: 'https://your-github-enterprise.com/api/v3'
   *
   * Example for GitHub Enterprise Server:
   * baseUrl: 'https://github.your-company.com/api/v3'
   */
  github: {
    // baseUrl: "https://api.github.com",
    baseUrl: "https://oss.fin.navercorp.com/api/v3",
  },
} as const;

// github: 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
// oss:
