const router = require('express').Router();
module.exports = router;
const axios = require('axios');

router.get('/wine', async (req, res, next) => {
    try {
        const wines = await axios.get(
        // do I want to call api to get wine list on backend? tbd.
        )
    }
    catch (error) {
        next (error)
    }
})