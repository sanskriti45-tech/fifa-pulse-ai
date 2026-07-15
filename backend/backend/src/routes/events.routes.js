const { Router } = require('express');
const asyncHandler = require('../utils/asyncHandler');
const { listEvents, createEvent } = require('../controllers/events.controller');

const router = Router();

router.get('/', asyncHandler(listEvents));
router.post('/', asyncHandler(createEvent));

module.exports = router;
