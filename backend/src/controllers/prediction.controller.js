const PredictionModel = require('../models/prediction.model');
const HealthRecordModel = require('../models/healthRecord.model');
const axios = require('axios');
const { BASE_URL_MODEL_FAUZAN, BASE_URL_MODEL_AZERIF, BASE_URL_MODEL_ARUL, BASE_URL_MODEL_AZERIF2 } = process.env;

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

// Helper function untuk memanggil ML API Cluster baru (tanpa data medis)
const callMLClusterSimplePrediction = async (healthRecord) => {
  try {
    const smokingHistoryMap = {
      "tidak": "never",
      "mantan": "former", 
      "aktif": "current",
      "tidak_lagi": "not current",
      "tidak_diketahui": "never"
    };

    const mlData = {
      gender: healthRecord.gender === "Laki-Laki" ? "Male" : "Female",
      age: parseInt(healthRecord.age),
      hypertension: healthRecord.hypertension ? 1 : 0,
      heart_disease: healthRecord.heart_disease ? 1 : 0,
      bmi: parseFloat(healthRecord.bmi),
      smoking_history: smokingHistoryMap[healthRecord.smoking_history] || "never"
    };

    console.log('Calling Simple Cluster ML API with data:', mlData);

    const response = await axios.post(BASE_URL_MODEL_AZERIF2 + '/predict', mlData, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000
    });

    return response.data;
  } catch (error) {
    console.error('Simple Cluster ML API call failed:', error.message);
    throw new Error('Failed to get cluster prediction from simple ML model: ' + error.message);
  }
};

// Function untuk mapping cluster number ke cluster name (model lama dengan data medis)
const getClusterName = (clusterNumber) => {
  const clusterNames = {
    0: 'Dewasa/Lansia dengan Potensi Risiko Kesehatan',
    1: 'Dewasa Muda/Paruh Baya dengan Kesehatan Relatif Baik',
    2: 'Anak-anak/Remaja Sehat',
    3: 'Dewasa Muda dengan Perhatian pada Gula Darah'
  };
  return clusterNames[clusterNumber] || 'Kategori Tidak Diketahui';
};

// Function untuk mapping cluster number ke cluster name (model baru tanpa data medis)
const getClusterNameSimple = (clusterNumber) => {
  const clusterNames = {
    0: 'Populasi Lansia dengan Riwayat Kesehatan Kompleks',
    1: 'Anak dan Remaja dalam Kondisi Fisik Optimal',
    2: 'Dewasa dengan Pola Hidup Kurang Sehat',
    3: 'Dewasa Muda Aktif dan Relatif Sehat'
  };
  return clusterNames[clusterNumber] || 'Kategori Tidak Diketahui';
};

// Helper function untuk memanggil kedua model ML dengan fallback
const callBothMLPredictions = async (healthRecord) => {
  let diabetesResult = null;
  let clusterResult = null;
  
  // Add unique request ID untuk tracking
  const requestId = Math.random().toString(36).substring(7);
  console.log(`[${requestId}] Starting ML predictions for user`);
  
  try {
    console.log(`[${requestId}] Calling diabetes prediction...`);
    diabetesResult = await callMLDiabetesPrediction(healthRecord);
    console.log(`[${requestId}] Diabetes prediction successful`);
  } catch (diabetesError) {
    console.error(`[${requestId}] Diabetes prediction failed:`, diabetesError.message);
    throw diabetesError;
  }

  try {
    console.log(`[${requestId}] Calling cluster prediction...`);
    clusterResult = await callMLClusterPrediction(healthRecord);
    console.log(`[${requestId}] Cluster prediction successful`);
  } catch (clusterError) {
    console.error(`[${requestId}] Cluster prediction failed, using fallback:`, clusterError.message);
    clusterResult = {
      predicted_cluster: 0,
      cluster_name: 'Dewasa/Lansia dengan Potensi Risiko Kesehatan',
      confidence: 0.5,
      explanation: "Cluster prediction unavailable, using default value"
    };
  }

  console.log(`[${requestId}] Both ML predictions completed`);
  return {
    diabetes: diabetesResult,
    cluster: clusterResult
  };
};

// Helper function untuk memanggil ML API Diabetes baru (tanpa data medis)
const callMLDiabetesSimplePrediction = async (healthRecord) => {
  try {
    const smokingHistoryMap = {
      "tidak": "never",
      "mantan": "former", 
      "aktif": "current",
      "tidak_lagi": "not current",
      "tidak_diketahui": "never"
    };

    const mlData = {
      age: parseInt(healthRecord.age),
      hypertension: healthRecord.hypertension ? 1 : 0,
      heart_disease: healthRecord.heart_disease ? 1 : 0,
      bmi: parseFloat(healthRecord.bmi),
      gender: healthRecord.gender === "Laki-Laki" ? "Male" : "Female",
      smoking_history: smokingHistoryMap[healthRecord.smoking_history] || "never"
    };

    console.log('Calling Simple Diabetes ML API with data:', mlData);
    const response = await axios.post(BASE_URL_MODEL_ARUL + '/predict/', mlData, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000
    });

    return response.data;
  } catch (error) {
    console.error('Simple Diabetes ML API call failed:', error.message);
    throw new Error('Failed to get diabetes prediction from simple ML model: ' + error.message);
  }
};

// Helper function untuk memanggil kedua model ML dengan fallback (versi baru)
const callBothMLPredictionsNew = async (healthRecord, useSimpleModel = false) => {
  let diabetesResult = null;
  let clusterResult = null;
  
  const requestId = Math.random().toString(36).substring(7);
  console.log(`[${requestId}] Starting ML predictions for user (Simple Model: ${useSimpleModel})`);
  
  try {
    console.log(`[${requestId}] Calling diabetes prediction...`);
    
    if (useSimpleModel) {
      diabetesResult = await callMLDiabetesSimplePrediction(healthRecord);
    } else {
      diabetesResult = await callMLDiabetesPrediction(healthRecord);
    }
    
    console.log(`[${requestId}] Diabetes prediction successful`);
  } catch (diabetesError) {
    console.error(`[${requestId}] Diabetes prediction failed:`, diabetesError.message);
    
    // Jika model utama gagal, coba model sederhana
    if (!useSimpleModel) {
      try {
        console.log(`[${requestId}] Trying simple diabetes model as fallback...`);
        diabetesResult = await callMLDiabetesSimplePrediction(healthRecord);
        console.log(`[${requestId}] Simple diabetes prediction successful`);
      } catch (simpleError) {
        console.error(`[${requestId}] Simple diabetes prediction also failed:`, simpleError.message);
        throw diabetesError;
      }
    } else {
      throw diabetesError;
    }
  }

  try {
    console.log(`[${requestId}] Calling cluster prediction...`);
    clusterResult = await callMLClusterPrediction(healthRecord);
    console.log(`[${requestId}] Cluster prediction successful`);
  } catch (clusterError) {
    console.error(`[${requestId}] Cluster prediction failed, using fallback:`, clusterError.message);
    clusterResult = {
      predicted_cluster: 0,
      cluster_name: 'Dewasa/Lansia dengan Potensi Risiko Kesehatan',
      confidence: 0.5,
      explanation: "Cluster prediction unavailable, using default value"
    };
  }

  console.log(`[${requestId}] Both ML predictions completed`);
  return {
    diabetes: diabetesResult,
    cluster: clusterResult
  };
};

// Helper function untuk memanggil kedua model ML dengan fallback (versi lengkap)
const callBothMLPredictionsComplete = async (healthRecord, useSimpleModel = false) => {
  let diabetesResult = null;
  let clusterResult = null;
  
  const requestId = Math.random().toString(36).substring(7);
  console.log(`[${requestId}] Starting ML predictions for user (Simple Model: ${useSimpleModel})`);
  
  // === DIABETES PREDICTION ===
  try {
    console.log(`[${requestId}] Calling diabetes prediction...`);
    
    if (useSimpleModel) {
      // Gunakan API diabetes baru (tanpa data medis)
      console.log(`[${requestId}] Using simple diabetes model (without medical data)`);
      diabetesResult = await callMLDiabetesSimplePrediction(healthRecord);
    } else {
      // Gunakan API diabetes lama (dengan data medis)
      console.log(`[${requestId}] Using full diabetes model (with medical data)`);
      diabetesResult = await callMLDiabetesPrediction(healthRecord);
    }
    
    console.log(`[${requestId}] Diabetes prediction successful`);
  } catch (diabetesError) {
    console.error(`[${requestId}] Diabetes prediction failed:`, diabetesError.message);
    
    // Jika model utama gagal, coba model sederhana
    if (!useSimpleModel) {
      try {
        console.log(`[${requestId}] Trying simple diabetes model as fallback...`);
        diabetesResult = await callMLDiabetesSimplePrediction(healthRecord);
        console.log(`[${requestId}] Simple diabetes prediction successful`);
        // Update flag karena sekarang menggunakan model sederhana
        useSimpleModel = true;
      } catch (simpleError) {
        console.error(`[${requestId}] Simple diabetes prediction also failed:`, simpleError.message);
        throw diabetesError;
      }
    } else {
      throw diabetesError;
    }
  }

  // === CLUSTER PREDICTION ===
  try {
    console.log(`[${requestId}] Calling cluster prediction...`);
    
    if (useSimpleModel) {
      // Gunakan API cluster baru (tanpa data medis)
      console.log(`[${requestId}] Using simple cluster model (without medical data)`);
      clusterResult = await callMLClusterSimplePrediction(healthRecord);
    } else {
      // Gunakan API cluster lama (dengan data medis)
      console.log(`[${requestId}] Using full cluster model (with medical data)`);
      clusterResult = await callMLClusterPrediction(healthRecord);
    }
    
    console.log(`[${requestId}] Cluster prediction successful`);
  } catch (clusterError) {
    console.error(`[${requestId}] Cluster prediction failed, using fallback:`, clusterError.message);
    
    // Jika model utama gagal, coba model sederhana
    if (!useSimpleModel) {
      try {
        console.log(`[${requestId}] Trying simple cluster model as fallback...`);
        clusterResult = await callMLClusterSimplePrediction(healthRecord);
        console.log(`[${requestId}] Simple cluster prediction successful`);
      } catch (simpleClusterError) {
        console.error(`[${requestId}] Simple cluster prediction also failed:`, simpleClusterError.message);
        // Gunakan default fallback sesuai model yang digunakan
        clusterResult = {
          predicted_cluster: 0,
          cluster_name: useSimpleModel ? 'Populasi Lansia dengan Riwayat Kesehatan Kompleks' : 'Dewasa/Lansia dengan Potensi Risiko Kesehatan',
          confidence: 0.5,
          probabilities: [0.5, 0.5, 0.5, 0.5]
        };
      }
    } else {
      // Gunakan default fallback untuk model sederhana
      clusterResult = {
        predicted_cluster: 0,
        cluster_name: 'Populasi Lansia dengan Riwayat Kesehatan Kompleks',
        confidence: 0.5,
        probabilities: [0.5, 0.5, 0.5, 0.5]
      };
    }
  }

  console.log(`[${requestId}] Both ML predictions completed using ${useSimpleModel ? 'simple' : 'full'} model set`);
  return {
    diabetes: diabetesResult,
    cluster: clusterResult,
    modelUsed: useSimpleModel ? 'simple' : 'full'
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
      const { health_record_id, use_simple_model = false } = req.body;
      
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
      
      // Tentukan model mana yang akan digunakan berdasarkan ketersediaan data medis
      const hasHbA1c = healthRecord.hba1c_level && healthRecord.hba1c_level > 0;
      const hasGlucose = healthRecord.blood_glucose_level && healthRecord.blood_glucose_level > 0;
      const shouldUseSimpleModel = use_simple_model || (!hasHbA1c || !hasGlucose);
      
      console.log(`Using ${shouldUseSimpleModel ? 'simple' : 'full'} model set for both diabetes and cluster prediction`);
      
      // Call kedua ML prediction API dengan model set yang sesuai
      let mlResults;
      try {
        mlResults = await callBothMLPredictionsComplete(healthRecord, shouldUseSimpleModel);
        console.log('ML prediction results:', mlResults);
      } catch (mlError) {
        console.error('ML predictions failed:', mlError);
        return res.status(500).json({
          success: false,
          message: 'Failed to get predictions from ML models',
          error: mlError.message
        });
      }

      // Process ML diabetes result untuk mendapatkan persentase diabetes dan risk status
      let diabetesPercentage;
      let riskStatus;

      // Handle response dari API diabetes (bisa dari model lama atau baru)
      if (mlResults.diabetes.diabetes_probability !== undefined) {
        // Response dari model baru (tanpa data medis)
        diabetesPercentage = mlResults.diabetes.diabetes_probability;
      } else if (mlResults.diabetes.probabilities && mlResults.diabetes.probabilities.diabetes !== undefined) {
        // Response dari model lama (dengan data medis)
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
      let clusterName = 'Kategori Tidak Diketahui';
      
      if (mlResults.cluster) {
        if (mlResults.cluster.predicted_cluster !== undefined) {
          clusterNumber = mlResults.cluster.predicted_cluster;
        }
        
        if (mlResults.cluster.cluster_name && mlResults.cluster.cluster_name !== 'string') {
          clusterName = mlResults.cluster.cluster_name;
        } else {
          // Gunakan mapping berdasarkan model set yang digunakan
          if (mlResults.modelUsed === 'simple') {
            clusterName = getClusterNameSimple(clusterNumber);
          } else {
            clusterName = getClusterName(clusterNumber);
          }
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
          model_used: mlResults.modelUsed,
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