const { Router } = require('express');
const asyncHandler = require('../utils/asyncHandler');
const { getDashboard } = require('../controllers/dashboard.controller');

const router = Router();

router.get('/', asyncHandler(getDashboard));

module.exports = router;
