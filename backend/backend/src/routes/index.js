const { Router } = require('express');

const healthRoutes = require('./health.routes');
const dashboardRoutes = require('./dashboard.routes');
const eventsRoutes = require('./events.routes');
const reasonRoutes = require('./reason.routes');

const router = Router();

router.use('/health', healthRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/events', eventsRoutes);
router.use('/reason', reasonRoutes);

module.exports = router;
