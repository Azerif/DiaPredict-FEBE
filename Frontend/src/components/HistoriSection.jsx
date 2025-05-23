import { useState } from 'react';
import { ChevronDown, ChevronUp, Trash2, User } from 'lucide-react';

const data = [
  {
    date: 'Jumat, 13 Juni 2025',
    items: [
        {
          time: '07:00',
          result: 50,
          risk: 'sedang',
          name: 'Kevin',
        },
        {
          time: '12:34',
          result: 78,
          risk: 'tinggi',
          name: 'John Doe',
        },
    ],
  },
  {
    date: 'Kamis, 1 Mei 2025',
    items: [
        { time: '12:34', result: 78, risk: 'tinggi', name: 'Alexander' },
        { time: '14:00', result: 40, risk: 'rendah', name: 'Immanuel' },
        { time: '16:30', result: 90, risk: 'tinggi', name: 'Delvan' },
    ],
  },
];

export default function HistoriSection() {
  const [openDetailIndex, setOpenDetailIndex] = useState({});
  const [riskFilter, setRiskFilter] = useState('');

  const toggleDetail = (dateIndex, itemIndex) => {
    setOpenDetailIndex((prev) => ({
      ...prev,
      [`${dateIndex}-${itemIndex}`]: !prev[`${dateIndex}-${itemIndex}`],
    }));
  };

  const handleRiskChange = (e) => {
    setRiskFilter(e.target.value);
  };

  const filteredData = data.map((group) => ({
    ...group,
    items: group.items.filter((item) =>
      riskFilter ? item.risk === riskFilter : true
    ),
  })).filter((group) => group.items.length > 0);

  return (
    <section className="max-w-3xl mx-auto p-4 text-black mb-20">
        <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                Riwayat Prediksi <span>🕒</span>
            </h2>

            <div className="flex flex-col md:flex-row gap-2 mb-4">
                <select 
                    className="border px-4 py-2 rounded"
                    onChange={handleRiskChange}
                    value={riskFilter}
                >
                <option disabled selected value="">berdasarkan risiko</option>
                <option value="">Semua</option>
                <option value="rendah">Risiko Rendah</option>
                <option value="sedang">Risiko Sedang</option>
                <option value="tinggi">Risiko Tinggi</option>
                </select>
                <select className="border px-4 py-2 rounded">
                <option disabled selected value="">berdasarkan terbaru</option>
                <option>Hari ini</option>
                <option>Minggu ini</option>
                <option>Bulan ini</option>
                </select>
            </div>
      </div>

      {filteredData.map((group, dateIndex) => (
        <div key={group.date} className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-2">{group.date}</h3>

          {group.items.map((item, itemIndex) => {
            const isOpen = openDetailIndex[`${dateIndex}-${itemIndex}`];
            return (
              <div
                key={itemIndex}
                className="flex flex-col border-b py-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex gap-6 items-center">
                    <span className="w-16">{item.time}</span>
                    <span>
                      Hasil Diabetes ➔ <strong>{item.result}%</strong>
                    </span>
                    <span>
                      Status risiko:{' '}
                      <span className="text-red-500 font-semibold">
                        {item.risk}
                      </span>
                    </span>
                  </div>

                  <button
                    className="text-gray-500 hover:text-black"
                    onClick={() => toggleDetail(dateIndex, itemIndex)}
                  >
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>

                {isOpen && item.name && (
                  <div className="mt-2 ml-20 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <User size={18} />
                      <span className="text-sm">Nama: <strong>{item.name}</strong></span>
                    </div>
                    <button className="border rounded-full px-4 py-1 text-sm hover:bg-gray-100 flex items-center gap-1">
                      <Trash2 size={16} /> Hapus
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </section>
  );
}
