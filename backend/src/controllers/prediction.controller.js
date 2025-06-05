const PredictionModel = require('../models/prediction.model');
const HealthRecordModel = require('../models/healthRecord.model');
const axios = require('axios');
const { BASE_URL_MODEL_FAUZAN, BASE_URL_MODEL_AZERIF } = process.env;

// Helper function untuk memanggil ML API Diabetes
const callMLDiabetesPrediction = async (healthRecord) => {
  try {
    const smokingHistoryMap = {
      "tidak": "never",
      "mantan": "former", 
      "aktif": "current",
      "tidak_lagi": "not current",
      "tidak_diketahui": "No Info"
    };

    const mlData = {
      age: healthRecord.age,
      hypertension: healthRecord.hypertension ? 1 : 0,
      heart_disease: healthRecord.heart_disease ? 1 : 0,
      bmi: healthRecord.bmi,
      HbA1c_level: healthRecord.hba1c_level,
      blood_glucose_level: healthRecord.blood_glucose_level,
      gender: healthRecord.gender === "Laki-Laki" ? "Male" : "Female",
      smoking_history: smokingHistoryMap[healthRecord.smoking_history] || "No Info"
    };

    console.log('Calling Diabetes ML API with data:', mlData);

    const response = await axios.post(BASE_URL_MODEL_FAUZAN + '/predict/', mlData, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000
    });

    return response.data;
  } catch (error) {
    console.error('Diabetes ML API call failed:', error.message);
    throw new Error('Failed to get diabetes prediction from ML model: ' + error.message);
  }
};

// Helper function untuk memanggil ML API Cluster dengan format yang benar
const callMLClusterPrediction = async (healthRecord) => {
  try {
    const smokingHistoryMap = {
      "tidak": "never",
      "mantan": "former", 
      "aktif": "current",
      "tidak_lagi": "not current",
      "tidak_diketahui": "No Info"
    };

    const mlData = {
      gender: healthRecord.gender === "Laki-Laki" ? "Male" : "Female",
      age: parseInt(healthRecord.age),
      hypertension: healthRecord.hypertension ? 1 : 0,
      heart_disease: healthRecord.heart_disease ? 1 : 0,
      bmi: parseFloat(healthRecord.bmi),
      HbA1c_level: parseFloat(healthRecord.hba1c_level),
      blood_glucose_level: parseInt(healthRecord.blood_glucose_level),
      smoking_history: smokingHistoryMap[healthRecord.smoking_history] || "never"
    };

    console.log('Calling Cluster ML API with data:', mlData);

    const response = await axios.post(BASE_URL_MODEL_AZERIF + '/predict', mlData, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000
    });

    return response.data;
  } catch (error) {
    console.error('Cluster ML API call failed:', error.message);
    console.error('Error response:', error.response?.data);
    throw new Error('Failed to get cluster prediction from ML model: ' + error.message);
  }
};

// Function untuk mapping cluster number ke cluster name
const getClusterName = (clusterNumber) => {
  const clusterNames = {
    0: 'Dewasa/Lansia dengan Potensi Risiko Kesehatan',
    1: 'Dewasa Muda/Paruh Baya dengan Kesehatan Relatif Baik',
    2: 'Anak-anak/Remaja Sehat',
    3: 'Dewasa Muda dengan Perhatian pada Gula Darah'
  };
  return clusterNames[clusterNumber] || 'Kategori Tidak Diketahui';
};

// Helper function untuk memanggil kedua model ML dengan fallback
const callBothMLPredictions = async (healthRecord) => {
  let diabetesResult = null;
  let clusterResult = null;
  
  try {
    diabetesResult = await callMLDiabetesPrediction(healthRecord);
    console.log('Diabetes prediction successful:', diabetesResult);
  } catch (diabetesError) {
    console.error('Diabetes prediction failed:', diabetesError.message);
    throw diabetesError;
  }

  try {
    clusterResult = await callMLClusterPrediction(healthRecord);
    console.log('Cluster prediction successful:', clusterResult);
  } catch (clusterError) {
    console.error('Cluster prediction failed, using fallback:', clusterError.message);
    clusterResult = {
      predicted_cluster: 0,
      cluster_name: 'Dewasa/Lansia dengan Potensi Risiko Kesehatan', // Updated fallback name
      confidence: 0.5,
      explanation: "Cluster prediction unavailable, using default value"
    };
  }

  return {
    diabetes: diabetesResult,
    cluster: clusterResult
  };
};

class PredictionController {
  async getAllPredictions(req, res) {
    try {
      const userId = req.user.userId;
      const predictions = await PredictionModel.getByUserId(userId);
      
      res.status(200).json({
        success: true,
        data: predictions
      });
    } catch (error) {
      console.error('Get predictions error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch predictions',
        error: error.message
      });
    }
  }

  async getPredictionById(req, res) {
    try {
      const predictionId = req.params.id;
      
      const prediction = await PredictionModel.getById(predictionId);
      
      if (!prediction) {
        return res.status(404).json({ 
          success: false, 
          message: 'Prediction not found' 
        });
      }
      
      if (prediction.user_id !== req.user.userId) {
        return res.status(403).json({ 
          success: false, 
          message: 'Unauthorized access to this prediction' 
        });
      }
      
      res.status(200).json({
        success: true,
        data: prediction
      });
    } catch (error) {
      console.error('Get prediction error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch prediction',
        error: error.message
      });
    }
  }

  async createPrediction(req, res) {
    try {
      const userId = req.user.userId;
      const { health_record_id } = req.body;
      
      const healthRecord = await HealthRecordModel.getById(health_record_id);
      if (!healthRecord) {
        return res.status(404).json({ 
          success: false, 
          message: 'Health record not found' 
        });
      }
      
      if (healthRecord.user_id !== userId) {
        return res.status(403).json({ 
          success: false, 
          message: 'Unauthorized to use this health record' 
        });
      }
      
      // Call kedua ML prediction API dengan data health record user
      let mlResults;
      try {
        mlResults = await callBothMLPredictions(healthRecord);
        console.log('ML prediction results:', mlResults);
      } catch (mlError) {
        console.error('ML predictions failed:', mlError);
        return res.status(500).json({
          success: false,
          message: 'Failed to get diabetes prediction from ML model',
          error: mlError.message
        });
      }

      // Process ML diabetes result untuk mendapatkan persentase diabetes dan risk status
      let diabetesPercentage;
      let riskStatus;

      if (mlResults.diabetes.probabilities && mlResults.diabetes.probabilities.diabetes !== undefined) {
        diabetesPercentage = mlResults.diabetes.probabilities.diabetes;
      } else if (mlResults.diabetes.predicted_class !== undefined) {
        diabetesPercentage = mlResults.diabetes.predicted_class === 1 ? 0.8 : 0.2;
      } else {
        diabetesPercentage = 0.5;
      }

      const diabetesPercentageValue = parseFloat((diabetesPercentage * 100).toFixed(3));

      if (diabetesPercentageValue >= 70) {
        riskStatus = 'tinggi';
      } else if (diabetesPercentageValue >= 40) {
        riskStatus = 'sedang';
      } else {
        riskStatus = 'rendah';
      }

      // Extract cluster information dari response API
      let clusterNumber = 0;
      let clusterName = 'Dewasa/Lansia dengan Potensi Risiko Kesehatan';
      
      if (mlResults.cluster) {
        if (mlResults.cluster.predicted_cluster !== undefined) {
          clusterNumber = mlResults.cluster.predicted_cluster;
        }
        
        if (mlResults.cluster.cluster_name && mlResults.cluster.cluster_name !== 'string') {
          clusterName = mlResults.cluster.cluster_name;
        } else {
          clusterName = getClusterName(clusterNumber);
        }
      }

      const now = new Date();
      const localISOTime = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString();

      // Create prediction record dengan hasil kedua ML model
      const prediction = await PredictionModel.create({
        user_id: userId,
        health_record_id,
        diabetes_percentage: diabetesPercentageValue,
        risk_status: riskStatus,
        cluster: clusterName,
        created_at: localISOTime
      });
      
      res.status(201).json({
        success: true,
        data: {
          ...prediction,
          cluster_number: clusterNumber,
          cluster_confidence: mlResults.cluster?.confidence ? parseFloat(mlResults.cluster.confidence.toFixed(3)) : 0.5,
          ml_results: mlResults
        }
      });
    } catch (error) {
      console.error('Create prediction error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to create prediction',
        error: error.message
      });
    }
  }

  async deletePrediction(req, res) {
    try {
      const predictionId = req.params.id;
      const userId = req.user.userId;
      
      const prediction = await PredictionModel.getById(predictionId);
      
      if (!prediction) {
        return res.status(404).json({ 
          success: false, 
          message: 'Prediction not found' 
        });
      }
      
      if (prediction.user_id !== userId) {
        return res.status(403).json({ 
          success: false, 
          message: 'Unauthorized to delete this prediction' 
        });
      }
      
      await PredictionModel.delete(predictionId);
      
      res.status(200).json({
        success: true,
        message: 'Prediction deleted successfully'
      });
    } catch (error) {
      console.error('Delete prediction error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to delete prediction',
        error: error.message
      });
    }
  }
}

module.exports = new PredictionController();