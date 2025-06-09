const TestimonialModel = require('../models/testimonial.model');

class TestimonialController {
  async getAllTestimonials(req, res) {
    try {
      const testimonials = await TestimonialModel.getAll();
      
      res.status(200).json({
        success: true,
        data: testimonials
      });
    } catch (error) {
      console.error('Get testimonials error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch testimonials',
        error: error.message
      });
    }
  }

  async getTestimonialsForLanding(req, res) {
    try {
      const { limit = 6 } = req.query;
      const testimonials = await TestimonialModel.getLatestForLanding(parseInt(limit));
      
      res.status(200).json({
        success: true,
        data: testimonials
      });
    } catch (error) {
      console.error('Get landing testimonials error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch testimonials for landing page',
        error: error.message
      });
    }
  }

  async getTestimonialById(req, res) {
    try {
      const testimonialId = req.params.id;
      
      const testimonial = await TestimonialModel.getById(testimonialId);
      
      if (!testimonial) {
        return res.status(404).json({ 
          success: false, 
          message: 'Testimonial not found' 
        });
      }
      
      res.status(200).json({
        success: true,
        data: testimonial
      });
    } catch (error) {
      console.error('Get testimonial error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch testimonial',
        error: error.message
      });
    }
  }

  async getUserTestimonials(req, res) {
    try {
      const userId = req.user.userId;
      
      const testimonials = await TestimonialModel.getByUserId(userId);
      
      res.status(200).json({
        success: true,
        data: testimonials
      });
    } catch (error) {
      console.error('Get user testimonials error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch user testimonials',
        error: error.message
      });
    }
  }

  async createTestimonial(req, res) {
    try {
      const userId = req.user.userId;
      const { title, comment, profile_picture } = req.body;
      
      // Validasi input
      if (!title || !comment) {
        return res.status(400).json({
          success: false,
          message: 'Title and comment are required'
        });
      }

      // Cek apakah user sudah pernah membuat testimonial
      const existingTestimonials = await TestimonialModel.getByUserId(userId);
      if (existingTestimonials.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'You can only create one testimonial. Please edit your existing testimonial instead.'
        });
      }
      
      const testimonialData = {
        user_id: userId,
        title: title.trim(),
        comment: comment.trim(),
        profile_picture: profile_picture || null
      };
      
      const newTestimonial = await TestimonialModel.create(testimonialData);
      
      res.status(201).json({
        success: true,
        message: 'Testimonial created successfully',
        data: newTestimonial
      });
    } catch (error) {
      console.error('Create testimonial error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to create testimonial',
        error: error.message
      });
    }
  }

  async updateTestimonial(req, res) {
    try {
      const testimonialId = req.params.id;
      const userId = req.user.userId;
      const { title, comment, profile_picture } = req.body;
      
      // Check if testimonial exists and belongs to user
      const existingTestimonial = await TestimonialModel.getById(testimonialId);
      if (!existingTestimonial) {
        return res.status(404).json({ 
          success: false, 
          message: 'Testimonial not found' 
        });
      }
      
      if (existingTestimonial.user_id !== userId) {
        return res.status(403).json({ 
          success: false, 
          message: 'Unauthorized to update this testimonial' 
        });
      }
      
      // Prepare update data
      const updateData = {};
      if (title !== undefined) updateData.title = title.trim();
      if (comment !== undefined) updateData.comment = comment.trim();
      if (profile_picture !== undefined) updateData.profile_picture = profile_picture;
      
      const updatedTestimonial = await TestimonialModel.update(testimonialId, updateData);
      
      res.status(200).json({
        success: true,
        message: 'Testimonial updated successfully',
        data: updatedTestimonial
      });
    } catch (error) {
      console.error('Update testimonial error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to update testimonial',
        error: error.message
      });
    }
  }

  async deleteTestimonial(req, res) {
    try {
      const testimonialId = req.params.id;
      const userId = req.user.userId;
      
      // Check if testimonial exists and belongs to user
      const existingTestimonial = await TestimonialModel.getById(testimonialId);
      if (!existingTestimonial) {
        return res.status(404).json({ 
          success: false, 
          message: 'Testimonial not found' 
        });
      }
      
      if (existingTestimonial.user_id !== userId) {
        return res.status(403).json({ 
          success: false, 
          message: 'Unauthorized to delete this testimonial' 
        });
      }
      
      await TestimonialModel.delete(testimonialId);
      
      res.status(200).json({
        success: true,
        message: 'Testimonial deleted successfully'
      });
    } catch (error) {
      console.error('Delete testimonial error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to delete testimonial',
        error: error.message
      });
    }
  }
}

module.exports = new TestimonialController();