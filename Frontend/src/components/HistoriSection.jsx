import { useState } from "react";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import GrafikSection from "./GrafikSection";
import { confirmAlert, alertSuccess } from "../lib/alerts";
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

const data = [
  {
    bulan: "Mei",
    date: "Kamis, 1 Mei 2025",
    items: [
      { time: "12:34", result: 78, risk: "tinggi" },
      { time: "14:00", result: 40, risk: "rendah" },
      { time: "16:30", result: 90, risk: "tinggi" },
    ],
  },
  {
    bulan: "Juni",
    date: "Jumat, 13 Juni 2025",
    items: [
      {
        time: "07:00",
        result: 50,
        risk: "sedang",
      },
      {
        time: "12:34",
        result: 78,
        risk: "tinggi",
      },
    ],
  },
];

export default function HistoriSection() {
  const [openDetailIndex, setOpenDetailIndex] = useState({});
  const [riskFilter, setRiskFilter] = useState("");
  const [dateFilter, setDateFilter] = useState();
  const [heading, setHeading] = useState("");
  const [dataGrafikBar, setDataGrafikBar] = useState([]);
  const [dataGrafikLine, setDataGrafikLine] = useState([]);
  const [modeGrafik, setModeGrafik] = useState("");

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

  const handleDelete = async (e) => {
    const result = await confirmAlert(
      "Apakah Anda yakin ingin menghapus histori ini?"
    );
    if (result.isConfirmed) {
      await alertSuccess("Histori ini telah dihapus");
    }
  };

  const filteredData = data
    .map((group) => {
      const groupDate = new Date(group.date.replace(/^.*?,\s*/, ""));
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
            <option disabled selected value="">
              berdasarkan risiko
            </option>
            <option value="">Semua</option>
            <option value="rendah">Risiko Rendah</option>
            <option value="sedang">Risiko Sedang</option>
            <option value="tinggi">Risiko Tinggi</option>
          </select>
          <select
            className="border px-4 py-2 rounded"
            onChange={handleDateChange}
            value={dateFilter}
          >
            <option disabled selected value="">
              berdasarkan terbaru
            </option>
            <option value="">Semua</option>
            <option value="hari">Hari ini</option>
            <option value="minggu">Minggu ini</option>
            <option value="bulan">Bulan ini</option>
          </select>
        </div>
      </div>

      {filteredData.map((group, dateIndex) => (
        <div key={group.date} className="mb-6">
          <h2 className="font-semibold text-gray-700">Bulan {group.bulan}</h2>
          <h3 className="font-semibold text-gray-700 mb-2">{group.date}</h3>

          {group.items.map((item, itemIndex) => {
            const isOpen = openDetailIndex[`${dateIndex}-${itemIndex}`];
            return (
              <div key={itemIndex} className="flex flex-col border-b py-2">
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
                    <div className="flex items-center pl-2 gap-2">
                      <span>
                        Status risiko:{" "}
                        <span className="text-red-500 font-semibold">
                          {item.risk}
                        </span>
                      </span>
                    </div>
                    <button
                      className="border rounded-full px-4 py-1 text-sm hover:bg-gray-100 flex items-center gap-1"
                      onClick={handleDelete}
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
                  setHeading("Grafik Perkembangan Risiko Per Bulan");
                  setModeGrafik("line");
                  document.getElementById("my_modal_3").showModal();
                }}
              >
                Lihat Grafik Perkembangan
              </button>
            </div>
          </div>
        </div>
      ))}
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
