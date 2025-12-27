/**
 * Format repository name - show only repo name if owner is the current user,
 * otherwise show full "owner/repo" format
 */
export function formatRepoName(fullRepoName: string, currentUserName?: string): string {
    if (!fullRepoName) {
        return ''
    }

    const parts = fullRepoName.split('/')
    if (parts.length !== 2) {
        return fullRepoName
    }

    const [owner, repo] = parts

    // If owner matches current user, show only repo name
    if (currentUserName && owner.toLowerCase() === currentUserName.toLowerCase()) {
        return repo
    }

    return fullRepoName
}
