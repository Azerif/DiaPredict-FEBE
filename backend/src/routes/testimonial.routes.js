const express = require('express');
const router = express.Router();
const TestimonialController = require('../controllers/testimonial.controller');
const { authMiddleware } = require('../middlewares');

// Public routes
router.get('/', TestimonialController.getAllTestimonials);
router.get('/landing', TestimonialController.getTestimonialsForLanding);
router.get('/:id', TestimonialController.getTestimonialById);

// Protected routes (require authentication)
router.use(authMiddleware);

// User testimonial management
router.get('/user/me', TestimonialController.getUserTestimonials);
router.post('/', TestimonialController.createTestimonial);
router.put('/:id', TestimonialController.updateTestimonial);
router.delete('/:id', TestimonialController.deleteTestimonial);

module.exports = router;