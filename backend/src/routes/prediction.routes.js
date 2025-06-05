const express = require('express');
const router = express.Router();
const { PredictionController } = require('../controllers');
const { authMiddleware } = require('../middlewares');


router.use(authMiddleware);

router.get('/', PredictionController.getAllPredictions);

router.get('/:id', PredictionController.getPredictionById);

router.post('/', PredictionController.createPrediction);

router.delete('/:id', PredictionController.deletePrediction);

module.exports = router;