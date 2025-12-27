# GitHub Recap

Your year on GitHub, beautifully wrapped.

GitHub Recap visualizes your GitHub activity in a beautiful way. It displays your commits, Pull Requests, Issues, code reviews, and more in an interactive story format.

## Features

- **Commit Analytics** - Analyze commit patterns by hour, day of week, and month
- **Pull Request Insights** - Stats on created/merged/reviewed PRs, average merge time
- **Issue & Discussion** - Track your issue and discussion participation
- **Mentions** - See who mentioned you the most
- **Year-over-Year Growth** - Compare your growth with last year
- **Share Your Recap** - Share as an image

## Privacy First

**All data is processed entirely in your browser.**

- GitHub API calls are made directly from your browser
- No data is stored on any server
- Token information is stored only in browser session

## Self-Hosted (On-Premise)

For self-hosted deployments, OAuth from the public instance is not available. You'll need to use Personal Access Token (PAT) authentication.

### 1. Configuration

Set the auth method to `pat` in `config.ts`:

```typescript
export const config = {
    auth: {
        method: 'pat', // 'oauth' | 'pat'
    },
    // ...
}
```

### 2. Create GitHub PAT

1. Go to GitHub Settings > Developer settings > [Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Select required scopes:
    - `repo` - Access to private repositories
    - `read:user` - Read user information
4. Generate and copy the token

## Tech Stack

- React 19 + TypeScript
- TanStack Router & Query
- Tailwind CSS 4
- Vite (rolldown)

## Supported Years

Supports data from 2008 (GitHub launch) to 2025.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

MIT

---

Made with ❤️
