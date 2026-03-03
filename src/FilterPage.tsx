import { useLoaderData, useSearchParams } from 'react-router';
import { RegionFilterLoaderData } from './loader';
import React from 'react';

export default function FilterPage() {
    const { data } = useLoaderData() as RegionFilterLoaderData;
    const [searchParams, setSearchParams] = useSearchParams();

    const provinceId = searchParams.get('province') || '';
    const regencyId = searchParams.get('regency') || '';
    const districtId = searchParams.get('district') || '';

    // Filter options based on selections
    const availableRegencies = provinceId
        ? data.regencies.filter((r) => r.province_id === parseInt(provinceId))
        : [];

    const availableDistricts = regencyId
        ? data.districts.filter((d) => d.regency_id === parseInt(regencyId))
        : [];

    // Handlers
    const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        if (val) {
            setSearchParams({ province: val });
        } else {
            setSearchParams({});
        }
    };

    const handleRegencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        const newParams = new URLSearchParams(searchParams);
        if (val) {
            newParams.set('regency', val);
            newParams.delete('district');
        } else {
            newParams.delete('regency');
            newParams.delete('district');
        }
        setSearchParams(newParams);
    };

    const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        const newParams = new URLSearchParams(searchParams);
        if (val) {
            newParams.set('district', val);
        } else {
            newParams.delete('district');
        }
        setSearchParams(newParams);
    };

    const handleReset = () => {
        setSearchParams({});
    };

    // Get selected names for breadcrumb and main content
    const selectedProvinceName = data.provinces.find((p) => p.id === parseInt(provinceId))?.name;
    const selectedRegencyName = data.regencies.find((r) => r.id === parseInt(regencyId))?.name;
    const selectedDistrictName = data.districts.find((d) => d.id === parseInt(districtId))?.name;

    return (
        <div className="flex min-h-screen bg-white md:bg-[#f8fafc] flex-col md:flex-row font-sans text-gray-800">
            {/* Sidebar */}
            <aside className="w-full md:w-80 bg-white border-r border-[#eaecf0] flex flex-col md:h-screen shrink-0 md:sticky md:top-0">
                <div className="p-6 border-b border-[#eaecf0] flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                        <svg className="w-5 h-5 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <h1 className="font-[800] text-[#1f2937] text-[15px] tracking-tight">Frontend Assessment</h1>
                </div>

                <div className="p-6 flex-1 flex flex-col gap-6">
                    <h2 className="text-[11px] font-bold text-[#9ca3af] tracking-widest uppercase">Filter Wilayah</h2>

                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-[6px]">
                            <label htmlFor="province" className="text-[10px] font-bold text-[#6b7280] uppercase tracking-wider">Provinsi</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <svg className="w-4 h-4 text-[#9ca3af]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                                </div>
                                <select
                                    id="province"
                                    name="province"
                                    value={provinceId}
                                    onChange={handleProvinceChange}
                                    className="w-full pl-9 pr-10 py-[12px] bg-white border border-[#6b7280] rounded-lg text-[13px] text-[#374151] font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 appearance-none cursor-pointer transition-all"
                                >
                                    <option value="" className="text-gray-400">Pilih Provinsi</option>
                                    {data.provinces.map(p => (
                                        <option key={p.id} value={p.id}>{p.name}</option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-[6px]">
                            <label htmlFor="regency" className="text-[10px] font-bold text-[#6b7280] uppercase tracking-wider">Kota/Kabupaten</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="w-4 h-4 text-[#9ca3af]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                                </div>
                                <select
                                    id="regency"
                                    name="regency"
                                    value={regencyId}
                                    onChange={handleRegencyChange}
                                    disabled={!provinceId}
                                    className="w-full pl-9 pr-10 py-[12px] bg-white border border-[#6b7280] rounded-lg text-[13px] text-[#374151] font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 appearance-none cursor-pointer disabled:bg-[#f3f4f6] disabled:text-[#9ca3af] disabled:border-[#e5e7eb] disabled:cursor-not-allowed transition-all"
                                >
                                    <option value="" className="text-gray-400">Pilih Kota/Kabupaten</option>
                                    {availableRegencies.map(r => (
                                        <option key={r.id} value={r.id}>{r.name}</option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-[6px]">
                            <label htmlFor="district" className="text-[10px] font-bold text-[#6b7280] uppercase tracking-wider">Kecamatan</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="w-4 h-4 text-[#9ca3af]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                </div>
                                <select
                                    id="district"
                                    name="district"
                                    value={districtId}
                                    onChange={handleDistrictChange}
                                    disabled={!regencyId}
                                    className="w-full pl-9 pr-10 py-[12px] bg-white border border-[#6b7280] rounded-lg text-[13px] text-[#374151] font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 appearance-none cursor-pointer disabled:bg-[#f3f4f6] disabled:text-[#9ca3af] disabled:border-[#e5e7eb] disabled:cursor-not-allowed transition-all"
                                >
                                    <option value="" className="text-gray-400">Pilih Kecamatan</option>
                                    {availableDistricts.map(d => (
                                        <option key={d.id} value={d.id}>{d.name}</option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleReset}
                        className="mt-4 w-full flex items-center justify-center gap-2 py-[12px] px-4 bg-white hover:bg-[#f8fafc] text-[#475467] font-semibold text-[13px] rounded-lg border border-[#6b7280] transition-colors focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                        RESET
                    </button>
                </div>
            </aside>

            {/* Main Area */}
            <div className="flex-1 flex flex-col min-h-screen relative bg-white">
                <header className="bg-white border-b border-[#eaecf0] px-8 py-[18px] sticky top-0 z-10 w-full">
                    <nav className="breadcrumb flex items-center flex-wrap gap-2 text-[13px] text-[#9ca3af] font-medium">
                        <span className={provinceId ? 'text-[#9ca3af]' : 'text-[#6b7280]'}>Indonesia</span>
                        {selectedProvinceName && (
                            <>
                                <svg className="w-3 h-3 text-[#6b7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                                <span className={regencyId ? 'text-[#9ca3af]' : 'text-[#3b82f6] font-semibold'}>{selectedProvinceName}</span>
                            </>
                        )}
                        {selectedRegencyName && (
                            <>
                                <svg className="w-3 h-3 text-[#6b7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                                <span className={districtId ? 'text-[#9ca3af]' : 'text-[#3b82f6] font-semibold'}>{selectedRegencyName}</span>
                            </>
                        )}
                        {selectedDistrictName && (
                            <>
                                <svg className="w-3 h-3 text-[#6b7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                                <span className="text-[#3b82f6] font-semibold">{selectedDistrictName}</span>
                            </>
                        )}
                    </nav>
                </header>

                <main className="flex-1 p-8 flex flex-col items-center justify-center min-h-[500px] w-full bg-white">
                    {!provinceId && (
                        <div className="text-[#9ca3af] flex flex-col items-center gap-4">
                            <p className="font-medium text-sm">Silakan pilih filter wilayah di samping untuk melihat hierarki.</p>
                        </div>
                    )}

                    <div className="w-full max-w-4xl flex flex-col items-center justify-center gap-4 py-8">
                        {selectedProvinceName && (
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-[10px] sm:text-[11px] md:text-xs font-[800] tracking-[0.2em] text-[#60a5fa] mb-[4px] md:mb-[6px] uppercase">Provinsi</span>
                                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-[800] text-[#111827] tracking-tight text-center leading-none">{selectedProvinceName}</h1>
                            </div>
                        )}

                        {selectedRegencyName && (
                            <>
                                <div className="my-4 md:my-8 h-10 md:h-14 text-[#e5e7eb] flex items-center justify-center">
                                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <span className="text-[10px] sm:text-[11px] md:text-xs font-[800] tracking-[0.2em] text-[#60a5fa] mb-[4px] md:mb-[6px] uppercase">Kota / Kabupaten</span>
                                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-[800] text-[#1f2937] tracking-tight text-center leading-none">{selectedRegencyName}</h2>
                                </div>
                            </>
                        )}

                        {selectedDistrictName && (
                            <>
                                <div className="my-4 md:my-8 h-10 md:h-14 text-[#e5e7eb] flex items-center justify-center">
                                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <span className="text-[10px] sm:text-[11px] md:text-xs font-[800] tracking-[0.2em] text-[#60a5fa] mb-[4px] md:mb-[6px] uppercase">Kecamatan</span>
                                    <h3 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-[800] text-[#111827] tracking-tight text-center leading-none">{selectedDistrictName}</h3>
                                </div>
                            </>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
