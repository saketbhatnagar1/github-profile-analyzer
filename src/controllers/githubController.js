const axios = require("axios");

const analyzeProfile = async (req, res) => {
    try {
        const { username } = req.params;
        const response = await axios.get(
            `https://api.github.com/users/${username}`
        );
        const githubData = response.data;
        res.json({
            success: true,
            data: githubData,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
module.exports = {
    analyzeProfile,
};