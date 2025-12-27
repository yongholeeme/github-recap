export default {
    // Common
    common: {
        error: 'エラーが発生しました',
        refreshFailed: '更新に失敗しました',
        clickToView: 'クリックして表示',
        noData: 'データがありません',
        noDataDescription: 'アクティビティを開始するとここに表示されます',
        activityRatio: 'アクティビティ比率',
        loading: 'データを読み込み中...',
        refresh: '更新',
        refreshAll: 'すべてのデータを更新',
        more: 'もっと見る',
        collapse: '閉じる',
        times: '{{count}}回',
        items: '{{count}}件',
        comments: '{{count}}件のコメント',
    },

    // Auth
    auth: {
        login: 'ログイン',
        logout: 'ログアウト',
        loginWithGitHub: 'GitHubで続ける',
        loginWithToken: 'トークンで続ける',
        privacyNotice: 'すべてのデータはブラウザ内でのみ処理され',
        privacyNotice2: 'サーバーには保存されません',
        patLogin: {
            title: 'ログイン',
            description: 'Personal Access Tokenで',
            description2: '今年のアクティビティを確認',
            createToken: 'トークンを作成',
            requiredScopes: '(必要なスコープ: repo, read:user)',
            continue: '続ける',
            checking: '確認中...',
            invalidToken: '無効なトークンです',
            enterToken: 'トークンを入力してください',
        },
        oauthLogin: {
            title: 'ログイン',
            description: 'GitHubアカウントで',
            description2: '今年のアクティビティを確認',
            loginButton: 'GitHubでログイン',
            loggingIn: 'ログイン中...',
            failed: 'OAuthログインに失敗しました',
        },
    },

    // Routes
    routes: {
        invalidYear: '無効な年です',
        goHome: 'ホームに戻る',
    },

    // Intro Section
    intro: {
        scrollHint: 'スクロールまたは矢印キーで確認',
    },

    // Outro Section
    outro: {
        yearLabel: '{{year}}年',
        thankYou: 'お疲れ様でした',
        message1: '一行一行、コミットごとに',
        message2: '素晴らしい一年を作り上げました',
        message3: '来年はもっと素晴らしい物語を書きましょう！',
    },

    // Commit Section
    commit: {
        activity: {
            title: '{{year}}年のコミット',
            subtitle: '一行ずつ積み上げたあなたの記録',
        },
        byHour: {
            title: '24時間の軌跡',
            subtitle: '一日の中でいつ最も集中しますか？',
            hour: '{{hour}}時',
        },
        byDay: {
            title: '7日間のパターン',
            subtitle: '一週間でどんなリズムで作業しましたか？',
            days: {
                0: '日',
                1: '月',
                2: '火',
                3: '水',
                4: '木',
                5: '金',
                6: '土',
            },
            dayFormat: '{{day}}曜日',
        },
        timeline: {
            title: '12ヶ月の旅',
            subtitle: '一年間のあなたの開発ストーリー',
            month: '{{month}}月',
        },
        repository: {
            title: '{{year}}年のコードが集まる場所',
            countLabel: 'コミット',
        },
    },

    // PR Section
    pr: {
        contributed: {
            title: '貢献したPull Request',
            subtitle: '参加したPRの数',
        },
        activity: {
            title: '一緒に作る',
            title2: 'より良いコード',
            subtitle: 'Pull Requestでコラボレーションして成長',
        },
        cards: {
            created: {
                title: '作成したPR',
                description: '作成したプルリクエスト',
            },
            merged: {
                title: 'マージされたPR',
                description: 'マージ完了',
            },
            closed: {
                title: 'クローズしたPR',
                description: 'マージされなかった',
            },
            approved: {
                title: '承認したPR',
            },
            requestedChanges: {
                title: '変更リクエスト',
            },
            reviews: {
                title: 'PRレビュー',
                description: 'レビューしたPR',
            },
            reviewComments: {
                title: 'レビューコメント',
                description: 'コードレビューコメント',
            },
            mostDiscussed: {
                title: '最も議論されたPR',
                description: 'コメント数順',
            },
            fastestMerged: {
                title: '最速マージPR',
                description: 'マージ速度',
            },
            slowestMerged: {
                title: '最長マージPR',
                description: 'マージ速度',
            },
            avgMergeTime: {
                title: '平均マージ時間',
                description: '作成からマージまで',
            },
        },
    },

    // Issue Section
    issue: {
        contributed: {
            title: 'Issue & Discussion',
            subtitle: 'あなたの声が届いた場所',
        },
        activity: {
            title: '問題を見つけて',
            title2: '解決する',
            subtitle: 'IssueとDiscussionで一緒に成長するコミュニティ',
        },
        repository: {
            title: 'リポジトリ別Issue参加度',
            subtitle: '最も多く参加したIssueがあるリポジトリ',
            countLabel: 'イシュー',
        },
        cards: {
            participatedIssues: {
                title: '参加したIssue',
                description: '作成 + コメント',
            },
            issueComments: {
                title: 'Issueコメント',
                description: 'コメント',
            },
            participatedDiscussions: {
                title: '参加したDiscussion',
                description: '作成 + コメント',
            },
            discussionComments: {
                title: 'Discussionコメント',
                description: 'コメント',
            },
            mostDiscussedIssue: {
                title: '最も議論されたIssue',
                description: 'コメント数順',
            },
            mostDiscussedDiscussion: {
                title: '最も議論されたDiscussion',
                description: 'コメント数順',
            },
        },
    },

    // Mention Section
    mention: {
        count: {
            title: '{{year}}年のメンション数',
            subtitle: 'あなたへの注目',
        },
        topMentionedBy: {
            title: '誰が最も多くメンションしましたか？',
            subtitle: 'TOP 10 メンショナー',
        },
    },

    // Growth Section
    growth: {
        title: '昨年と比較してみましょう',
        subtitle: '同期間の数値変化',
        metrics: {
            commits: 'コミット',
            createdPR: '作成したPull Request',
            reviewedPR: 'レビューしたPull Request',
            issues: 'Issue & Discussion',
        },
        year: '{{year}}年',
        change: '変化量',
    },

    // Time formats
    time: {
        seconds: '{{count}}秒',
        minutes: '{{count}}分',
        hours: '{{count}}時間',
        days: '{{count}}日',
        daysAndHours: '{{days}}日{{hours}}時間',
    },

    // Share
    share: {
        button: 'シェアする',
        title: 'Wrappedをシェア',
        generating: '画像を生成中...',
        previewFailed: 'プレビュー失敗',
        download: 'ダウンロード',
        share: 'シェア',
        image: {
            commits: 'コミット',
            prsCreated: '作成したPR',
            prsMerged: 'マージされたPR',
            reviews: 'レビューしたPR',
            issues: '作成したイシュー',
            mentions: 'メンションされた回数',
        },
    },
}
