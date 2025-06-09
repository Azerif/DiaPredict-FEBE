const supabase = require('../utils/supabase/supabaseClient');

class UserModel {
  async getById(id) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  async getByEmail(email) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async create(userData) {
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select();
    
    if (error) throw error;
    return data[0];
  }

  async update(id, updates) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return data[0];
  }

  async delete(id) {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  }
  // Update reset code
  async updateResetCode(userId, resetCode, resetCodeExpiry) {
    try {
      // resetCodeExpiry sudah dalam format ISO string dari controller
      const { data, error } = await supabase
        .from('users')
        .update({
          reset_code: resetCode,
          reset_code_expiry: resetCodeExpiry // sudah dalam format ISO string
        })
        .eq('id', userId)
        .select();
      
      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error('Error updating reset code:', error);
      throw error;
    }
  }

  // Get user by email and reset code
  async getByEmailAndResetCode(email, resetCode) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('reset_code', resetCode)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    } catch (error) {
      console.error('Error getting user by email and reset code:', error);
      throw error;
    }
  }

  // Reset password and clear reset code
  async resetPassword(userId, hashedPassword) {
    try {
      const { data, error } = await supabase
        .from('users')
        .update({
          password: hashedPassword,
          reset_code: null,
          reset_code_expiry: null
        })
        .eq('id', userId)
        .select();
      
      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    }
  }
}

module.exports = new UserModel();