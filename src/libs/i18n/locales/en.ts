export default {
    // Common
    common: {
        error: 'Error occurred',
        refreshFailed: 'Refresh failed',
        clickToView: 'Click to view',
        noData: 'No data available',
        noDataDescription: 'Start your activity to see it here',
        activityRatio: 'My activity ratio',
        loading: 'Loading data...',
        refresh: 'Refresh',
        refreshAll: 'Refresh all data',
        more: 'More',
        collapse: 'Collapse',
        times: '{{count}} times',
        items: '{{count}}',
        comments: '{{count}} comments',
    },

    // Auth
    auth: {
        login: 'Login',
        logout: 'Logout',
        loginWithGitHub: 'Continue with GitHub',
        loginWithToken: 'Continue with Token',
        privacyNotice: 'All data is processed only in your browser',
        privacyNotice2: 'and is not stored on any server',
        patLogin: {
            title: 'Login',
            description: 'With Personal Access Token,',
            description2: "check this year's activity",
            createToken: 'Create token',
            requiredScopes: '(Required scopes: repo, read:user)',
            continue: 'Continue',
            checking: 'Checking...',
            invalidToken: 'Invalid token',
            enterToken: 'Please enter your token',
        },
        oauthLogin: {
            title: 'Login',
            description: 'With GitHub account,',
            description2: "check this year's activity",
            loginButton: 'Login with GitHub',
            loggingIn: 'Logging in...',
            failed: 'OAuth login failed',
        },
    },

    // Routes
    routes: {
        invalidYear: 'Invalid year',
        goHome: 'Go to home',
    },

    // Intro Section
    intro: {
        scrollHint: 'Scroll or use arrow keys',
    },

    // Outro Section
    outro: {
        yearLabel: '{{year}}',
        thankYou: 'Great job!',
        message1: 'Line by line, commit by commit,',
        message2: 'you created an amazing year',
        message3: "Let's write an even better story next year!",
    },

    // Commit Section
    commit: {
        activity: {
            title: 'Commits in {{year}}',
            subtitle: 'Your record built line by line',
        },
        byHour: {
            title: '24 Hours of Code',
            subtitle: 'When do you focus the most?',
            hour: '{{hour}}:00',
        },
        byDay: {
            title: '7 Days Pattern',
            subtitle: 'What rhythm do you work with during the week?',
            days: {
                0: 'Sun',
                1: 'Mon',
                2: 'Tue',
                3: 'Wed',
                4: 'Thu',
                5: 'Fri',
                6: 'Sat',
            },
            dayFormat: '{{day}}',
        },
        timeline: {
            title: '12 Months Journey',
            subtitle: 'Your development story throughout the year',
            month: '{{month}}',
        },
        repository: {
            title: "Where {{year}}'s code lives",
            countLabel: 'commits',
        },
    },

    // PR Section
    pr: {
        contributed: {
            title: 'Contributed Pull Requests',
            subtitle: 'Number of PRs participated',
        },
        activity: {
            title: 'Building together',
            title2: 'better code',
            subtitle: 'Collaborate and grow with Pull Requests',
        },
        cards: {
            created: {
                title: 'Created PRs',
                description: 'Pull requests authored',
            },
            merged: {
                title: 'Merged PRs',
                description: 'Successfully merged',
            },
            closed: {
                title: 'Closed PRs',
                description: 'Not merged',
            },
            approved: {
                title: 'Approved PRs',
            },
            requestedChanges: {
                title: 'Changes requested',
            },
            reviews: {
                title: 'PR Reviews',
                description: 'PRs reviewed',
            },
            reviewComments: {
                title: 'Review Comments',
                description: 'Code review comments',
            },
            mostDiscussed: {
                title: 'Most Discussed PR',
                description: 'By comment count',
            },
            fastestMerged: {
                title: 'Fastest Merged PR',
                description: 'Merge speed',
            },
            slowestMerged: {
                title: 'Slowest Merged PR',
                description: 'Merge speed',
            },
            avgMergeTime: {
                title: 'Avg Merge Time',
                description: 'From creation to merge',
            },
        },
    },

    // Issue Section
    issue: {
        contributed: {
            title: 'Issues & Discussions',
            subtitle: 'Where your voice reached',
        },
        activity: {
            title: 'Finding problems',
            title2: 'and solving them',
            subtitle: 'Growing together through issues and discussions',
        },
        repository: {
            title: 'Issue Participation by Repository',
            subtitle: 'Repositories with most issue participation',
            countLabel: 'issues',
        },
        cards: {
            participatedIssues: {
                title: 'Participated Issues',
                description: 'Created + Commented',
            },
            issueComments: {
                title: 'Issue Comments',
                description: 'Comments',
            },
            participatedDiscussions: {
                title: 'Participated Discussions',
                description: 'Created + Commented',
            },
            discussionComments: {
                title: 'Discussion Comments',
                description: 'Comments',
            },
            mostDiscussedIssue: {
                title: 'Most Discussed Issue',
                description: 'By comment count',
            },
            mostDiscussedDiscussion: {
                title: 'Most Discussed Discussion',
                description: 'By comment count',
            },
        },
    },

    // Mention Section
    mention: {
        count: {
            title: 'Mentions in {{year}}',
            subtitle: 'Attention towards you',
        },
        topMentionedBy: {
            title: 'Who mentioned you the most?',
            subtitle: 'TOP 10 Mentioners',
        },
    },

    // Growth Section
    growth: {
        title: 'Compare with last year',
        subtitle: 'Changes in numbers for the same period',
        metrics: {
            commits: 'Commits',
            createdPR: 'Created Pull Requests',
            reviewedPR: 'Reviewed Pull Requests',
            issues: 'Issues & Discussions',
        },
        year: '{{year}}',
        change: 'Change',
    },

    // Time formats
    time: {
        seconds: '{{count}}s',
        minutes: '{{count}}m',
        hours: '{{count}}h',
        days: '{{count}}d',
        daysAndHours: '{{days}}d {{hours}}h',
    },

    // Share
    share: {
        button: 'Share My Recap',
        title: 'Share Your Recap',
        generating: 'Generating image...',
        previewFailed: 'Preview failed',
        download: 'Download',
        share: 'Share',
        image: {
            commits: 'Commits',
            prsCreated: 'PRs Created',
            prsMerged: 'PRs Merged',
            reviews: 'PRs Reviewed',
            issues: 'Issues Created',
            mentions: 'Times Mentioned',
        },
    },
}
