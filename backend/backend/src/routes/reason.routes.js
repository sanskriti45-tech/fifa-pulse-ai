const { Router } = require('express');
const asyncHandler = require('../utils/asyncHandler');
const { postReason } = require('../controllers/reason.controller');

const router = Router();

router.post('/', asyncHandler(postReason));

module.exports = router;
