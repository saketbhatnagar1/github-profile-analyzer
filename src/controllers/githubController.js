const axios = require("axios");
const { saveProfile } = require("../services/profileService");
const db = require("../config/db");
const analyzeProfile = async (req, res) => {
    try {
        const { username } = req.params;
        const userResponse = await axios.get(
            `https://api.github.com/users/${username}`
        );
        const reposResponse = await axios.get(
            `https://api.github.com/users/${username}/repos`
        );
        const user = userResponse.data;
        const repos = reposResponse.data;
        const totalStars = repos.reduce((acc, repo) => {
            return acc + repo.stargazers_count;
        }, 0);
        // to geth most used languge
        const languageCount = {};
        repos.forEach((repo) => {
            if (repo.language) {
                languageCount[repo.language] =
                    (languageCount[repo.language] || 0) + 1;
            }
        });
        let topLanguage = null;
        let maxCount = 0;
        for (const language in languageCount) {
            if (languageCount[language] > maxCount) {
                maxCount = languageCount[language];
                topLanguage = language;
            }
        }
        const insights = {
            githubId: user.id || null,
            username: user.login || null,
            name: user.name || null,
            followers: user.followers || 0,
            following: user.following || 0,
            publicRepos: user.public_repos || 0,
            totalStars: totalStars || 0,
            topLanguage: topLanguage || null,
            accountCreated: user.created_at || null,
        };
        console.log(insights);
        await saveProfile(insights);
        console.log("Profile saved");
        res.json({
            success: true,
            data: insights,
        });
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return res.status(404).json({
                success: false,
                message: "GitHub user not found",
            });
        }
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    analyzeProfile,
};