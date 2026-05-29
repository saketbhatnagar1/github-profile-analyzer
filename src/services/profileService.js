const db = require("../config/db");

const saveProfile = async (profileData) => {
    const {
        githubId,
        username,
        name,
        followers,
        following,
        publicRepos,
        totalStars,
        topLanguage,
        accountCreated,
    } = profileData;

    await db.execute(
        `
        INSERT INTO github_profiles
        (
            github_id,
            username,
            name,
            followers,
            following,
            public_repos,
            total_stars,
            top_language,
            account_created_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)

        ON DUPLICATE KEY UPDATE
            name = VALUES(name),
            followers = VALUES(followers),
            following = VALUES(following),
            public_repos = VALUES(public_repos),
            total_stars = VALUES(total_stars),
            top_language = VALUES(top_language)
        `,
        [
            githubId,
            username,
            name,
            followers,
            following,
            publicRepos,
            totalStars,
            topLanguage,
            accountCreated,
        ]
    );
};

module.exports = {
    saveProfile,
};