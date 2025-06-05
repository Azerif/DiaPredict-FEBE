const HealthRecordModel = require('../models/healthRecord.model');

class HealthRecordController {
  async getAllRecords(req, res) {
    try {
      const userId = req.user.userId;
      const records = await HealthRecordModel.getByUserId(userId);
      
      res.status(200).json({
        success: true,
        data: records
      });
    } catch (error) {
      console.error('Get health records error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch health records',
        error: error.message
      });
    }
  }

  async getRecordById(req, res) {
    try {
      const recordId = req.params.id;
      const userId = req.user.userId;
      
      const record = await HealthRecordModel.getById(recordId);
      
      if (!record) {
        return res.status(404).json({ 
          success: false, 
          message: 'Record not found' 
        });
      }
      
      if (record.user_id !== userId) {
        return res.status(403).json({ 
          success: false, 
          message: 'Unauthorized access to this record' 
        });
      }
      
      res.status(200).json({
        success: true,
        data: record
      });
    } catch (error) {
      console.error('Get health record error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch health record',
        error: error.message
      });
    }
  }

  async createRecord(req, res) {
    try {
      const userId = req.user.userId;
      const {
        name,
        birth_date,
        gender,
        weight,
        height,
        hypertension,
        heart_disease,
        smoking_history,
        bmi,
        hba1c_level,
        blood_glucose_level
      } = req.body;
      
      let calculatedBmi = bmi;
      if (!bmi && height && weight) {
        calculatedBmi = weight / Math.pow(height / 100, 2);
      }
      
      let age = null;
      if (birth_date) {
        const birthDate = new Date(birth_date + 'T00:00:00');
        const today = new Date();
        
        age = today.getFullYear() - birthDate.getFullYear();
        
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
      }
      
      const now = new Date();
      const localISOTime = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString();
      
      const newRecord = await HealthRecordModel.create({
        user_id: userId,
        name: name || null,
        birth_date: birth_date || null,
        gender: gender || null,
        age: age,
        weight: weight || null,
        height: height || null,
        hypertension: hypertension || false,
        heart_disease: heart_disease || false,
        smoking_history: smoking_history || null,
        bmi: calculatedBmi || null,
        hba1c_level: hba1c_level || null,
        blood_glucose_level: blood_glucose_level || null,
        created_at: localISOTime
      });
      
      res.status(201).json({
        success: true,
        data: newRecord
      });
    } catch (error) {
      console.error('Create health record error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to create health record',
        error: error.message
      });
    }
  }

  async updateRecord(req, res) {
    try {
      const recordId = req.params.id;
      const userId = req.user.userId;
      
      const existingRecord = await HealthRecordModel.getById(recordId);
      if (!existingRecord) {
        return res.status(404).json({ 
          success: false, 
          message: 'Record not found' 
        });
      }
      
      if (existingRecord.user_id !== userId) {
        return res.status(403).json({ 
          success: false, 
          message: 'Unauthorized to update this record' 
        });
      }
      
      const updateData = {};
      const fields = [
        'name', 'birth_date', 'gender', 'weight', 'height', 
        'hypertension', 'heart_disease', 'smoking_history', 
        'bmi', 'hba1c_level', 'blood_glucose_level'
      ];
      
      fields.forEach(field => {
        if (req.body[field] !== undefined) {
          updateData[field] = req.body[field];
        }
      });
      
      if ((updateData.height || updateData.weight) && 
          !updateData.bmi) {
        const height = updateData.height || existingRecord.height;
        const weight = updateData.weight || existingRecord.weight;
        
        if (height && weight) {
          updateData.bmi = weight / Math.pow(height / 100, 2);
        }
      }
      
      if (updateData.birth_date) {
        const birthDate = new Date(updateData.birth_date + 'T00:00:00');
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        
        updateData.age = age;
      }
      
      const updatedRecord = await HealthRecordModel.update(recordId, updateData);
      
      res.status(200).json({
        success: true,
        data: updatedRecord
      });
    } catch (error) {
      console.error('Update health record error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to update health record',
        error: error.message
      });
    }
  }

  async deleteRecord(req, res) {
    try {
      const recordId = req.params.id;
      const userId = req.user.userId;
      
      const existingRecord = await HealthRecordModel.getById(recordId);
      if (!existingRecord) {
        return res.status(404).json({ 
          success: false, 
          message: 'Record not found' 
        });
      }
      
      if (existingRecord.user_id !== userId) {
        return res.status(403).json({ 
          success: false, 
          message: 'Unauthorized to delete this record' 
        });
      }
      
      await HealthRecordModel.delete(recordId);
      
      res.status(200).json({
        success: true,
        message: 'Health record deleted successfully'
      });
    } catch (error) {
      console.error('Delete health record error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to delete health record',
        error: error.message
      });
    }
  }
}

module.exports = new HealthRecordController();