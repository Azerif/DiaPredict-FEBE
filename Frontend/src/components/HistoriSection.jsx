import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
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
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("id-ID", options);
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getMonthName = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", { month: "long" });
  };

  // Grouping predictions berdasarkan tanggal
  const groupPredictionsByDate = (predictions) => {
    const grouped = {};

    predictions.forEach((prediction) => {
      const date = new Date(prediction.created_at);
      const dateKey = date.toDateString();

      if (!grouped[dateKey]) {
        grouped[dateKey] = {
          bulan: getMonthName(prediction.created_at),
          date: formatDate(prediction.created_at),
          items: [],
        };
      }

      grouped[dateKey].items.push({
        id: prediction.id,
        time: formatTime(prediction.created_at),
        result: prediction.diabetes_percentage.toFixed(2),
        risk: prediction.risk_status,
        cluster: prediction.cluster,
        created_at: prediction.created_at
      });
    });

    // Convert object ke array dan sort berdasarkan tanggal terbaru
    return Object.values(grouped).sort(
      (a, b) => new Date(b.items[0].created_at) - new Date(a.items[0].created_at)
    );
  };

  const toggleDetail = (dateIndex, itemIndex) => {
    setOpenDetailIndex((prev) => ({
      ...prev,
      [`${dateIndex}-${itemIndex}`]: !prev[`${dateIndex}-${itemIndex}`],
    }));
  };

  const handleRiskChange = (e) => {
    setRiskFilter(e.target.value);
  };

  const handleDateChange = (e) => {
    setDateFilter(e.target.value);
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
  const groupedData = groupPredictionsByDate(predictions);

  // Filtering data
  const filteredData = groupedData
    .map((group) => {
      const groupDate = new Date(group.items[0].created_at);
      const today = new Date();
      let isValidDate = true;

      if (dateFilter === "hari") {
        isValidDate = groupDate.toDateString() === today.toDateString();
      } else if (dateFilter === "minggu") {
        const lastWeek = new Date();
        lastWeek.setDate(today.getDate() - 7);
        isValidDate = groupDate >= lastWeek;
      } else if (dateFilter === "bulan") {
        isValidDate =
          groupDate.getMonth() === today.getMonth() &&
          groupDate.getFullYear() === today.getFullYear();
      }

      if (!isValidDate) return null;

      const filteredItems = group.items.filter((item) =>
        riskFilter ? item.risk === riskFilter : true
      );

      return filteredItems.length > 0
        ? { ...group, items: filteredItems }
        : null;
    })
    .filter(Boolean);

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
        return "text-red-500";
      case "sedang":
        return "text-yellow-500";
      case "rendah":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  if (loading) {
    return (
      <section className="max-w-3xl mx-auto p-4 text-black mb-20">
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-3">Memuat riwayat prediksi...</span>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-3xl mx-auto p-4 text-black mb-20">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
          <button
            onClick={fetchPredictions}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Coba Lagi
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-3xl mx-auto p-4 text-black mb-20">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 mt-3 md:mt-5">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          Riwayat Prediksi <span>🕒</span>
        </h2>

        <div className="flex flex-col md:flex-row gap-2 mb-4">
          <select
            className="border px-4 py-2 rounded"
            onChange={handleRiskChange}
            value={riskFilter}
          >
            <option value="">Semua Risiko</option>
            <option value="rendah">Risiko Rendah</option>
            <option value="sedang">Risiko Sedang</option>
            <option value="tinggi">Risiko Tinggi</option>
          </select>
          <select
            className="border px-4 py-2 rounded"
            onChange={handleDateChange}
            value={dateFilter}
          >
            <option value="">Semua Waktu</option>
            <option value="hari">Hari ini</option>
            <option value="minggu">Minggu ini</option>
            <option value="bulan">Bulan ini</option>
          </select>
        </div>
      </div>

      {filteredData.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">
            {predictions.length === 0
              ? "Belum ada riwayat prediksi"
              : "Tidak ada data yang sesuai dengan filter"}
          </p>
        </div>
      ) : (
        filteredData.map((group, dateIndex) => (
          <div key={group.date} className="mb-6">
            <h2 className="font-semibold text-gray-700">Bulan {group.bulan}</h2>
            <h3 className="font-semibold text-gray-700 mb-2">{group.date}</h3>

            {group.items.map((item, itemIndex) => {
              const isOpen = openDetailIndex[`${dateIndex}-${itemIndex}`];
              return (
                <div key={item.id} className="flex flex-col border-b py-2">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-6 items-center">
                      <span className="w-16">{item.time}</span>
                      <span>
                        Hasil Diabetes ➔ <strong>{item.result}%</strong>
                      </span>
                    </div>

                    <button
                      className="text-gray-500 hover:text-black"
                      onClick={() => toggleDetail(dateIndex, itemIndex)}
                    >
                      {isOpen ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </button>
                  </div>

                  {isOpen && (
                    <div className="mt-2 ml-20 flex justify-between items-center">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center pl-2 gap-2">
                          <span>
                            Status risiko:{" "}
                            <span
                              className={`${
                                getRiskColor(item.risk)
                              } font-semibold capitalize`}
                            >
                              {item.risk}
                            </span>
                          </span>
                        </div>
                        {item.cluster && (
                          <div className="flex items-center pl-2 gap-2">
                            <span>
                              Cluster:{" "}
                              <span className="text-blue-600 font-semibold">
                                {item.cluster}
                              </span>
                            </span>
                          </div>
                        )}
                      </div>
                      <button
                        className="border rounded-full px-4 py-1 text-sm hover:bg-gray-100 flex items-center gap-1"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 size={16} /> Hapus
                      </button>
                    </div>
                  )}
                </div>
              );
            })}

            <div className="flex gap-2">
              <div>
                <button
                  className="p-2 bg-blueFigma rounded text-white text-sm mt-3"
                  onClick={() => {
                    const data = hitungRisikoPerBulan(group.items);
                    setDataGrafikBar(data);
                    setHeading("Frekuensi Risiko Bulan " + group.bulan);
                    setModeGrafik("bar");
                    document.getElementById("my_modal_3").showModal();
                  }}
                >
                  Lihat Grafik
                </button>
              </div>
              <div>
                <button
                  className="p-2 bg-blueFigma rounded text-white text-sm mt-3"
                  onClick={() => {
                    const data = [...group.items]
                      .sort((a, b) => a.time.localeCompare(b.time))
                      .map((item) => ({
                        time: item.time,
                        result: item.result,
                      }));

                    setDataGrafikLine(data);
                    setHeading("Grafik Perkembangan Risiko Per Hari");
                    setModeGrafik("line");
                    document.getElementById("my_modal_3").showModal();
                  }}
                >
                  Lihat Grafik Perkembangan
                </button>
              </div>
            </div>
          </div>
        ))
      )}

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
    </section>
  );
}
