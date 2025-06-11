import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Trash2, Calendar, Clock, TrendingUp } from "lucide-react";
import GrafikSection from "./GrafikSection";
import { confirmAlert, alertSuccess } from "../lib/alerts";
import { getAllPredictions, deletePrediction } from "../api/prediction";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export default function HistoriSection() {
  const [openDetailIndex, setOpenDetailIndex] = useState({});
  const [riskFilter, setRiskFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [heading, setHeading] = useState("");
  const [dataGrafikBar, setDataGrafikBar] = useState([]);
  const [dataGrafikLine, setDataGrafikLine] = useState([]);
  const [modeGrafik, setModeGrafik] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch predictions dari API saat komponen dimount
  useEffect(() => {
    fetchPredictions();
  }, []);

  const fetchPredictions = async () => {
    try {
      setLoading(true);
      const response = await getAllPredictions();
      setPredictions(response.data || []);
      setError(null);
    } catch (error) {
      console.error("Error fetching predictions:", error);
      setError("Gagal memuat riwayat prediksi");
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk format tanggal
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDay = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
    });
  };

  const getMonthYear = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", { month: "long", year: "numeric" });
  };

  // Grouping predictions berdasarkan bulan
  const groupPredictionsByMonth = (predictions) => {
    const grouped = {};

    predictions.forEach((prediction) => {
      const monthYear = getMonthYear(prediction.created_at);

      if (!grouped[monthYear]) {
        grouped[monthYear] = {
          bulan: monthYear,
          items: [],
        };
      }

      grouped[monthYear].items.push({
        id: prediction.id,
        time: formatTime(prediction.created_at),
        date: formatDate(prediction.created_at),
        result: prediction.diabetes_percentage.toFixed(2),
        risk: prediction.risk_status,
        cluster: prediction.cluster,
        created_at: prediction.created_at,
      });
    });
    // Convert object ke array dan sort berdasarkan tanggal terbaru
    return Object.values(grouped).sort(
      (a, b) => new Date(b.items[0].created_at) - new Date(a.items[0].created_at)
    );
  };

  // Fungsi untuk mendapatkan minggu dalam bulan
  const getWeekOfMonth = (date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const dayOfMonth = date.getDate();
    const dayOfWeek = firstDay.getDay();
    
    return Math.ceil((dayOfMonth + dayOfWeek) / 7);
  };

  // Fungsi untuk mendapatkan label minggu
  const getWeekLabel = (date) => {
    const weekNum = getWeekOfMonth(date);
    const monthName = date.toLocaleDateString("id-ID", { month: "long" });
    const year = date.getFullYear();
    
    return `Minggu ${weekNum} ${monthName} ${year}`;
  };

  // Grouping predictions berdasarkan minggu dalam bulan
  const groupPredictionsByWeek = (predictions) => {
    const grouped = {};

    predictions.forEach((prediction) => {
      const predictionDate = new Date(prediction.created_at);
      const weekLabel = getWeekLabel(predictionDate);

      if (!grouped[weekLabel]) {
        grouped[weekLabel] = {
          bulan: weekLabel,
          items: [],
          weekOrder: getWeekOfMonth(predictionDate),
          monthYear: predictionDate.getFullYear() * 100 + predictionDate.getMonth()
        };
      }

      grouped[weekLabel].items.push({
        id: prediction.id,
        time: formatTime(prediction.created_at),
        date: formatDate(prediction.created_at),
        result: prediction.diabetes_percentage.toFixed(2),
        risk: prediction.risk_status,
        cluster: prediction.cluster,
        created_at: prediction.created_at,
      });
    });

    // Convert object ke array dan sort berdasarkan bulan-tahun descending, lalu minggu descending
    return Object.values(grouped).sort((a, b) => {
      // Sort berdasarkan bulan-tahun (descending)
      if (b.monthYear !== a.monthYear) {
        return b.monthYear - a.monthYear;
      }
      // Jika bulan-tahun sama, sort berdasarkan minggu (descending)
      return b.weekOrder - a.weekOrder;
    });
  };

  const toggleDetail = (dateIndex, itemIndex) => {
    setOpenDetailIndex((prev) => ({
      ...prev,
      [`${dateIndex}-${itemIndex}`]: !prev[`${dateIndex}-${itemIndex}`],
    }));
  };

  const handleDelete = async (predictionId) => {
    const result = await confirmAlert(
      "Apakah Anda yakin ingin menghapus histori ini?"
    );
    if (result.isConfirmed) {
      try {
        await deletePrediction(predictionId);

        setPredictions((prev) => prev.filter((p) => p.id !== predictionId));
        await alertSuccess("Histori ini telah dihapus");
      } catch (error) {
        console.error("Error deleting prediction:", error);
        alert("Gagal menghapus histori");
      }
    }
  };

  // Grouping data predictions
  const groupedData = groupPredictionsByMonth(predictions);

  // Filtering data
  const filteredData = (() => {
    let dataToFilter;
    
    // Jika filter minggu dipilih, gunakan grouping berdasarkan minggu
    if (dateFilter === "minggu") {
      dataToFilter = groupPredictionsByWeek(predictions);
    } else {
      dataToFilter = groupedData;
    }

    return dataToFilter
      .map((group) => {
        const today = new Date();
        let filteredItems = group.items;

        // Filter berdasarkan waktu
        if (dateFilter === "hari") {
          const todayStr = today.toDateString();
          filteredItems = group.items.filter((item) => {
            const itemDate = new Date(item.created_at);
            return itemDate.toDateString() === todayStr;
          });
        } else if (dateFilter === "minggu") {
          // Untuk filter minggu, ambil semua item karena sudah di-group per minggu
          // Tapi tetap filter berdasarkan rentang waktu minggu ini
          const oneWeekAgo = new Date();
          oneWeekAgo.setDate(today.getDate() - 7);
          
          filteredItems = group.items.filter((item) => {
            const itemDate = new Date(item.created_at);
            return itemDate >= oneWeekAgo && itemDate <= today;
          });
        } else if (dateFilter === "bulan") {
          const currentMonth = today.getMonth();
          const currentYear = today.getFullYear();
          
          filteredItems = group.items.filter((item) => {
            const itemDate = new Date(item.created_at);
            return itemDate.getMonth() === currentMonth && 
                   itemDate.getFullYear() === currentYear;
          });
        }

        // Filter berdasarkan status risiko
        if (riskFilter) {
          filteredItems = filteredItems.filter((item) => item.risk === riskFilter);
        }

        return filteredItems.length > 0
          ? { ...group, items: filteredItems }
          : null;
      })
      .filter(Boolean);
  })();

  const hitungRisikoPerBulan = (items) => {
    const count = {
      rendah: 0,
      sedang: 0,
      tinggi: 0,
    };

    items.forEach((item) => {
      if (count[item.risk] !== undefined) {
        count[item.risk]++;
      }
    });

    return Object.entries(count).map(([kategori, jumlah]) => ({
      kategori,
      jumlah,
    }));
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case "tinggi":
        return { bg: "bg-red-50", text: "text-red-600", border: "border-red-200", dot: "bg-red-500" };
      case "sedang":
        return { bg: "bg-yellow-50", text: "text-yellow-600", border: "border-yellow-200", dot: "bg-yellow-500" };
      case "rendah":
        return { bg: "bg-green-50", text: "text-green-600", border: "border-green-200", dot: "bg-green-500" };
      default:
        return { bg: "bg-gray-50", text: "text-gray-600", border: "border-gray-200", dot: "bg-gray-500" };
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00B7E0]"></div>
            <span className="ml-3 text-gray-600">Memuat riwayat prediksi...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 mb-3">{error}</p>
            <button
              onClick={fetchPredictions}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-[#00B7E0] rounded-full mb-3">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            Riwayat Prediksi
          </h1>
          <p className="text-sm text-gray-600">
            Lihat dan kelola riwayat prediksi diabetes Anda
          </p>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter Status Risiko
            </label>
            <select
              className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 focus:border-[#00B7E0] focus:outline-none text-sm"
              onChange={(e) => setRiskFilter(e.target.value)}
              value={riskFilter}
            >
              <option value="">Semua Status</option>
              <option value="rendah">Risiko Rendah</option>
              <option value="sedang">Risiko Sedang</option>
              <option value="tinggi">Risiko Tinggi</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter Waktu
            </label>
            <select
              className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 focus:border-[#00B7E0] focus:outline-none text-sm"
              onChange={(e) => setDateFilter(e.target.value)}
              value={dateFilter}
            >
              <option value="">Semua Waktu</option>
              <option value="hari">Hari ini</option>
              <option value="minggu">Minggu ini</option>
              <option value="bulan">Bulan ini</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content Section */}
      {filteredData.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg mb-2">
              {predictions.length === 0
                ? "Belum ada riwayat prediksi"
                : "Tidak ada data yang sesuai dengan filter"}
            </p>
            <p className="text-gray-400 text-sm">
              {predictions.length === 0
                ? "Lakukan prediksi pertama Anda untuk melihat riwayat"
                : "Coba ubah filter untuk melihat data lainnya"}
            </p>
          </div>
        </div>
      ) : (
        filteredData.map((group, monthIndex) => (
          <div key={group.bulan} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            {/* Month Header */}
            <div className="flex flex-col gap-4 items-center justify-between mb-4 pb-3 border-b border-gray-200">
              {/* Left side - Month info */}
              <div className="flex items-center gap-3"> 
                  <div className="w-8 h-8 bg-[#CCF1F9] rounded-full flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-[#00B7E0]" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {group.bulan}
                  </h2>
              </div>

              {/* Right side - Action buttons */}
              <div className="flex items-center gap-2">
                <span className="bg-[#CCF1F9] text-[#00B7E0] px-2 py-1 rounded-full text-xs font-medium">
                  {group.items.length} prediksi
                </span>
                <button
                  className="flex items-center gap-1 px-3 py-1 bg-[#00B7E0] hover:bg-[#0099CC] text-white rounded-lg text-xs font-medium"
                  onClick={() => {
                    const data = hitungRisikoPerBulan(group.items);
                    setDataGrafikBar(data);
                    setHeading("Frekuensi Risiko Bulan " + group.bulan);
                    setModeGrafik("bar");
                    document.getElementById("my_modal_3").showModal();
                  }}
                >
                  <TrendingUp className="w-3 h-3" />
                  Grafik
                </button>
                
                <button
                  className="flex items-center gap-1 px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-medium"
                  onClick={() => {
                    const data = [...group.items]
                      .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
                      .map((item) => ({
                        time: formatDay(item.created_at),
                        result: item.result,
                      }));
                    setDataGrafikLine(data);
                    setHeading("Grafik Perkembangan Risiko Per Hari");
                    setModeGrafik("line");
                    document.getElementById("my_modal_3").showModal();
                  }}
                >
                  <TrendingUp className="w-3 h-3" />
                  Trend
                </button>
              </div>
            </div>

            {/* Prediction Items */}
            <div className="space-y-3">
              {group.items.map((item, itemIndex) => {
                const isOpen = openDetailIndex[`${monthIndex}-${itemIndex}`];
                const riskColors = getRiskColor(item.risk);
                
                return (
                  <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    {/* Main Card */}
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="flex flex-col items-center">
                            <div className="text-lg font-bold text-gray-800">
                              {new Date(item.created_at).getDate()}
                            </div>
                            <div className="text-xs text-gray-500">
                              {new Date(item.created_at).toLocaleDateString("id-ID", { weekday: "short" })}
                            </div>
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{item.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-600">Hasil Diabetes:</span>
                              <span className="font-bold text-[#00B7E0]">{item.result}%</span>
                            </div>
                            <div className={`w-1/2 md:w-1/5 mt-2 flex items-center gap-2 px-3 py-1 rounded-full ${riskColors.bg} ${riskColors.border} border`}>
                                <div className={`w-2 h-2 rounded-full ${riskColors.dot}`}></div>
                                <span className={`text-xs font-medium ${riskColors.text} capitalize`}>
                                  {item.risk}
                                </span>
                            </div>
                          </div>
                        </div>

                        <button
                          className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          onClick={() => toggleDetail(monthIndex, itemIndex)}
                        >
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Detail Card */}
                    {isOpen && (
                      <div className="border-t border-gray-200 bg-gray-50 p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="bg-white rounded-lg p-3 border border-gray-200">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Detail Prediksi</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Tanggal:</span>
                                <span className="font-medium">{item.date}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Status Risiko:</span>
                                <span className={`font-medium ${riskColors.text} capitalize`}>
                                  {item.risk}
                                </span>
                              </div>
                            </div>
                          </div>

                          {item.cluster && (
                            <div className="bg-white rounded-lg p-3 border border-gray-200">
                              <h4 className="text-sm font-medium text-gray-700 mb-2">Kategori Kesehatan</h4>
                              <div className="text-sm">
                                <span className="text-blue-600 font-medium">
                                  {item.cluster}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Delete Button Only */}
                        <div className="flex justify-end">
                          <button
                            className="flex items-center gap-2 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium"
                            onClick={() => handleDelete(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                            Hapus
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}

      {/* Modal Grafik */}
      <GrafikSection heading={heading}>
        <ResponsiveContainer width="100%" height={300}>
          {modeGrafik === "bar" && (
            <BarChart data={dataGrafikBar}>
              <XAxis dataKey="kategori" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="jumlah" fill="#00b7e0" />
            </BarChart>
          )}
          {modeGrafik === "line" && (
            <LineChart data={dataGrafikLine}>
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="result" stroke="#82ca9d" />
            </LineChart>
          )}
        </ResponsiveContainer>
      </GrafikSection>
    </div>
  );
}
