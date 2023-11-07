

const { Router } = require('express');

const router = Router();


router.get('/', (req, res) => {
    res.json({
        msg: 'Get API response get'
    });
});

router.put('/', (req, res) => {
    res.json({
        msg: 'Get API response put'
    });
});

router.post('/', (req, res) => {
    res.json({
        msg: 'Get API response post'
    });
});

router.delete('/', (req, res) => {
    res.json({
        msg: 'Get API response delete'
    });
});

router.patch('/', (req, res) => {
    res.json({
        msg: 'Get API response patch'
    });
});












module.exports = router;