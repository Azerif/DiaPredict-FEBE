const supabase = require('../utils/supabase/supabaseClient');

class TestimonialModel {
  async getAll() {
    const { data, error } = await supabase
      .from('testimonials')
      .select(`
        *,
        users (
          id,
          name,
          email
        )
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  async getById(id) {
    const { data, error } = await supabase
      .from('testimonials')
      .select(`
        *,
        users (
          id,
          name,
          email
        )
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  async getByUserId(userId) {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  async create(testimonialData) {
    const now = new Date();
    const localISOTime = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString();
    
    const { data, error } = await supabase
      .from('testimonials')
      .insert([{
        ...testimonialData,
        created_at: localISOTime,
        updated_at: localISOTime
      }])
      .select();
    
    if (error) throw error;
    return data[0];
  }

  async update(id, updates) {
    const now = new Date();
    const localISOTime = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString();
    
    const { data, error } = await supabase
      .from('testimonials')
      .update({
        ...updates,
        updated_at: localISOTime
      })
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return data[0];
  }

  async delete(id) {
    const { data, error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return data[0];
  }

  // Get latest testimonials for landing page
  async getLatestForLanding(limit = 6) {
    const { data, error } = await supabase
      .from('testimonials')
      .select(`
        id,
        title,
        comment,
        profile_picture,
        created_at,
        users (
          name
        )
      `)
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data;
  }
}

module.exports = new TestimonialModel();