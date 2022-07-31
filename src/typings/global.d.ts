export {}
declare global {
    interface Repository {
        name: string,
        description?: string,
        visibility: 'publish' | 'private',
        html_url: string,
        open_issues: number,
        stargazers_cout: number
    }

    interface User {
        login: string
        name: string
        bio: string
        followers: number
        following: number
        location: string
        email: string
        avatar_url: string
        url: string
        html_url: string
    }

    interface PullRequest {
        html_url: string,
        id: number,
        number: number,
        state: string,
        locked: boolean,
        title: string,
        user: User,
        body: string,
        created_at: Date,
        closed_at: Date,
        updated_at: Date,
        merged_at: Date,
        merge_commit_sha: string
    }
}
