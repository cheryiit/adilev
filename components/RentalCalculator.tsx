'use client'

import { useState } from 'react'
import { Calculator, Home, MapPin, Waves, Car, TreePine, Wifi, Volume2 } from 'lucide-react'

interface RentalData {
  // Temel özellikler
  luxuryLevel: 'minimal' | 'standard' | 'premium' | 'ultra'
  netArea: number
  balconyArea: number
  terraceArea: number
  buildingAge: number
  rooms: number
  
  // Kat bilgisi
  floorType: 'middle' | 'high-entrance' | 'entrance' | 'garden' | 'penthouse'

  // Konum ve görünüm
  distanceToSea: number
  seaView: 'none' | 'partial' | 'full' | 'panoramic'
  distanceToMetro: number
  nearbyBusStops: number
  nearestMarketDistance: number

  // Bina özellikleri
  hasHeating: 'underfloor' | 'gas' | 'central' | 'none'
  hasInsulation: boolean
  isEarthquakeCompliant: boolean
  facade: 'excellent' | 'good' | 'bad' | 'terrible'
  isAmericanKitchen: boolean
  hasParking: boolean

  // Teknoloji ve konfor
  hasFiber: boolean
  isFurnished: boolean
  noiseLevel: 'none' | 'low' | 'high'
  
  // Güvenlik ve çevre
  isNeighborhoodSafe: boolean
  areRoadsGood: boolean
}

// Lüks seviyelerine göre sabitler
const LUXURY_LEVELS = {
  minimal: {
    baseRent: 9000,
    pricePerSqm: 200,
    minArea: 40,
    minRent: 7000
  },
  standard: {
    baseRent: 18000,
    pricePerSqm: 350,
    minArea: 60,
    minRent: 14000
  },
  premium: {
    baseRent: 30000,
    pricePerSqm: 550,
    minArea: 90,
    minRent: 25000
  },
  ultra: {
    baseRent: 45000,
    pricePerSqm: 850,
    minArea: 120,
    minRent: 38000
  }
}

export default function RentalCalculator() {
  const [formData, setFormData] = useState<RentalData>({
    luxuryLevel: 'standard',
    netArea: 100,
    balconyArea: 0,
    terraceArea: 0,
    buildingAge: 5,
    rooms: 3,
    floorType: 'middle',
    distanceToSea: 5,
    seaView: 'none',
    distanceToMetro: 1,
    nearbyBusStops: 2,
    nearestMarketDistance: 0.3,
    hasHeating: 'gas',
    hasInsulation: false,
    isEarthquakeCompliant: true,
    facade: 'good',
    isAmericanKitchen: false,
    hasParking: true,
    hasFiber: true,
    isFurnished: false,
    noiseLevel: 'low',
    isNeighborhoodSafe: true,
    areRoadsGood: true
  })

  const [calculatedRent, setCalculatedRent] = useState<number | null>(null)

  const calculateRent = () => {
    const level = LUXURY_LEVELS[formData.luxuryLevel]
    
    // Adım 1: Başlangıç değeri
    let calculatedRent = level.baseRent

    // Adım 2: Metrekare düzenlemesi
    const areaEffect = (formData.netArea - level.minArea) * level.pricePerSqm
    calculatedRent += areaEffect

    // Balkon ve teras etkisi (sabit değerler)
    calculatedRent += formData.balconyArea * 60
    calculatedRent += formData.terraceArea * 180

    // Adım 3: Bina yaşı etkisi (maksimum -30.000 TL ceza)
    const ageEffect = Math.max(-30000, -(formData.buildingAge * 600))
    calculatedRent += ageEffect

    // Adım 4: Konum ve çevre faktörleri
    
    // Denize uzaklık (yüzdesel etki)
    let seaDistanceEffect = 0
    if (formData.distanceToSea <= 0.5) {
      seaDistanceEffect = Math.min(calculatedRent * 0.08, formData.luxuryLevel === 'minimal' ? 8000 : 
                                   formData.luxuryLevel === 'standard' ? 15000 :
                                   formData.luxuryLevel === 'premium' ? 25000 : 40000)
    } else if (formData.distanceToSea <= 1.5) {
      seaDistanceEffect = Math.min(calculatedRent * 0.04, formData.luxuryLevel === 'minimal' ? 4000 : 
                                   formData.luxuryLevel === 'standard' ? 7500 :
                                   formData.luxuryLevel === 'premium' ? 12500 : 20000)
    }
    calculatedRent += seaDistanceEffect

    // Deniz manzarası (yüzdesel etki)
    let seaViewEffect = 0
    const seaViewMaxValues = {
      minimal: { partial: 2000, full: 5000, panoramic: 8000 },
      standard: { partial: 5000, full: 10000, panoramic: 15000 },
      premium: { partial: 10000, full: 20000, panoramic: 30000 },
      ultra: { partial: 15000, full: 35000, panoramic: 50000 }
    }
    
    if (formData.seaView === 'partial') {
      seaViewEffect = Math.min(calculatedRent * 0.03, seaViewMaxValues[formData.luxuryLevel].partial)
    } else if (formData.seaView === 'full') {
      seaViewEffect = Math.min(calculatedRent * 0.07, seaViewMaxValues[formData.luxuryLevel].full)
    } else if (formData.seaView === 'panoramic') {
      seaViewEffect = Math.min(calculatedRent * 0.12, seaViewMaxValues[formData.luxuryLevel].panoramic)
    }
    calculatedRent += seaViewEffect

    // Metro uzaklığı (maksimum -15.000 TL ceza)
    const metroEffect = Math.max(-15000, -(formData.distanceToMetro * 900))
    calculatedRent += metroEffect

    // Otobüs durağı (maksimum 5 durak)
    const busStopEffect = Math.min(formData.nearbyBusStops, 5) * 550
    calculatedRent += busStopEffect

    // Market uzaklığı
    if (formData.nearestMarketDistance > 0.6) {
      calculatedRent -= 9000
    }

    // Adım 5: Bina ve daire özellikleri (sabit değerler)
    
    // Isıtma sistemi
    if (formData.hasHeating === 'underfloor') {
      calculatedRent += 4500
    } else if (formData.hasHeating === 'central') {
      calculatedRent += 2000
    } else if (formData.hasHeating === 'none') {
      calculatedRent -= 18000
    }
    // Doğalgaz (gas) için 0 ekleme

    // Yalıtım
    if (formData.hasInsulation) {
      calculatedRent += 1800
    }

    // Deprem yönetmeliği
    if (!formData.isEarthquakeCompliant) {
      calculatedRent -= 25000
    }

    // Mutfak tipi
    if (formData.isAmericanKitchen) {
      calculatedRent -= 4500
    }

    // Oda sayısı
    calculatedRent += formData.rooms * 750

    // Otopark
    if (!formData.hasParking) {
      calculatedRent -= 3500
    }

    // Cephe kalitesi
    if (formData.facade === 'excellent') {
      calculatedRent += 4500
    } else if (formData.facade === 'good') {
      calculatedRent += 2000
    } else if (formData.facade === 'bad') {
      calculatedRent -= 2000
    } else if (formData.facade === 'terrible') {
      calculatedRent -= 4500
    }

    // Gürültü
    if (formData.noiseLevel === 'none') {
      calculatedRent += 4500
    } else if (formData.noiseLevel === 'low') {
      calculatedRent -= 4500
    } else if (formData.noiseLevel === 'high') {
      calculatedRent -= 9000
    }

    // Fiber internet
    if (formData.hasFiber) {
      calculatedRent += 1800
    } else {
      calculatedRent -= 1000
    }

    // Eşyalı ev
    if (formData.isFurnished) {
      calculatedRent += 2800
    }

    // Adım 6: Kat bilgisi etkisi
    if (formData.floorType === 'garden') {
      calculatedRent -= 9000
    } else if (formData.floorType === 'entrance') {
      calculatedRent -= 4500
    } else if (formData.floorType === 'high-entrance') {
      calculatedRent -= 2500
    } else if (formData.floorType === 'penthouse') {
      calculatedRent += 6500
    }

    // Adım 7: Güvenlik ve yol durumu etkileri (YENİ!)
    let finalRent = calculatedRent
    
    // Mahalle güvensizse %30 daha düşük
    if (!formData.isNeighborhoodSafe && formData.areRoadsGood) {
      finalRent = calculatedRent * 0.7 // %30 düşüş
    }
    // Yollar düzgün değilse %20 daha düşük  
    else if (formData.isNeighborhoodSafe && !formData.areRoadsGood) {
      finalRent = calculatedRent * 0.8 // %20 düşüş
    }
    // Her ikisi de problemliyse %50 daha düşük
    else if (!formData.isNeighborhoodSafe && !formData.areRoadsGood) {
      finalRent = calculatedRent * 0.5 // %50 düşüş
    }

    // Minimum kira limiti uygulama
    const minimumRent = level.minRent
    finalRent = Math.max(finalRent, minimumRent)

    setCalculatedRent(Math.round(finalRent))
  }

  const handleInputChange = (field: keyof RentalData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Home className="w-8 h-8 text-primary-600" />
          <h1 className="text-4xl font-bold text-white">Adilev</h1>
        </div>
        <p className="text-white/90 text-lg">Evinin gerçek kira değerini hesapla</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Form Bölümü */}
        <div className="space-y-6">
          {/* Lüks Seviyesi */}
          <div className="card">
            <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
              <Home className="w-5 h-5 text-primary-600" />
              Lüks Seviyesi
            </h3>
            <div className="space-y-3">
              <label className="block text-sm font-medium mb-2">Evinizin Lüks Seviyesi Nedir?</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'minimal', label: 'Minimal/Ekonomik', desc: 'Öğrenci evi, sade' },
                  { value: 'standard', label: 'Standart', desc: 'Ortalama aile konutu' },
                  { value: 'premium', label: 'Premium/Lüks', desc: 'Yeni ve donanımlı site' },
                  { value: 'ultra', label: 'Ultra Lüks', desc: 'Akıllı ev, özel tasarım' }
                ].map(({ value, label, desc }) => (
                  <label key={value} className="flex items-start gap-3 cursor-pointer p-3 rounded-lg border hover:border-primary-300">
                    <input
                      type="radio"
                      name="luxuryLevel"
                      value={value}
                      checked={formData.luxuryLevel === value}
                      onChange={(e) => handleInputChange('luxuryLevel', e.target.value)}
                      className="mt-1 w-4 h-4 text-primary-600"
                    />
                    <div>
                      <div className="font-medium text-sm">{label}</div>
                      <div className="text-xs text-gray-500">{desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Temel Özellikler */}
          <div className="card">
            <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
              <Home className="w-5 h-5 text-primary-600" />
              Temel Özellikler
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Net Metrekare</label>
                <input
                  type="number"
                  className="input-field"
                  value={formData.netArea}
                  onChange={(e) => handleInputChange('netArea', Number(e.target.value))}
                  placeholder="Örn: 90"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Oda Sayısı</label>
                <input
                  type="number"
                  className="input-field"
                  value={formData.rooms}
                  onChange={(e) => handleInputChange('rooms', Number(e.target.value))}
                  placeholder="Örn: 3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Balkon m²</label>
                <input
                  type="number"
                  className="input-field"
                  value={formData.balconyArea}
                  onChange={(e) => handleInputChange('balconyArea', Number(e.target.value))}
                  placeholder="Yoksa 0 giriniz"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Teras m²</label>
                <input
                  type="number"
                  className="input-field"
                  value={formData.terraceArea}
                  onChange={(e) => handleInputChange('terraceArea', Number(e.target.value))}
                  placeholder="Yoksa 0 giriniz"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">Daire Tipi / Kat Bilgisi</label>
                <select
                  className="input-field"
                  value={formData.floorType}
                  onChange={(e) => handleInputChange('floorType', e.target.value)}
                >
                  <option value="middle">Ara Kat</option>
                  <option value="high-entrance">Yüksek Giriş</option>
                  <option value="entrance">Giriş Katı</option>
                  <option value="garden">Bahçe Katı</option>
                  <option value="penthouse">Çatı Katı / Dubleks</option>
                </select>
              </div>
            </div>
          </div>

          {/* Konum ve Çevre */}
          <div className="card">
            <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
              <MapPin className="w-5 h-5 text-primary-600" />
              Konum ve Çevre
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Denize Mesafe (km)</label>
                <input
                  type="number"
                  step="0.1"
                  className="input-field"
                  value={formData.distanceToSea}
                  onChange={(e) => handleInputChange('distanceToSea', Number(e.target.value))}
                  placeholder="Denize uzaklık yoksa büyük değer girin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Deniz Manzarası Durumu</label>
                <select
                  className="input-field"
                  value={formData.seaView}
                  onChange={(e) => handleInputChange('seaView', e.target.value)}
                >
                  <option value="none">Yok</option>
                  <option value="partial">Kısmi (90 dereceye kadar)</option>
                  <option value="full">Tam (180 dereceye kadar)</option>
                  <option value="panoramic">Panoramik (180 derece ve üzeri)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">En Yakın Metro/Tramvay Mesafesi (km)</label>
                <input
                  type="number"
                  step="0.1"
                  className="input-field"
                  value={formData.distanceToMetro}
                  onChange={(e) => handleInputChange('distanceToMetro', Number(e.target.value))}
                  placeholder="Toplu taşıma kullanmıyorsanız büyük değer girin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">350m İçindeki Otobüs Durağı Sayısı</label>
                <input
                  type="number"
                  className="input-field"
                  value={formData.nearbyBusStops}
                  onChange={(e) => handleInputChange('nearbyBusStops', Number(e.target.value))}
                  placeholder="0-5 arası"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">En Yakın Markete Uzaklık (km)</label>
                <input
                  type="number"
                  step="0.1"
                  className="input-field"
                  value={formData.nearestMarketDistance}
                  onChange={(e) => handleInputChange('nearestMarketDistance', Number(e.target.value))}
                  placeholder="Örn: 0.3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Ses ve Gürültü Kirliliği Düzeyi</label>
                <select
                  className="input-field"
                  value={formData.noiseLevel}
                  onChange={(e) => handleInputChange('noiseLevel', e.target.value)}
                >
                  <option value="none">Yok (Sessiz ve sakin)</option>
                  <option value="low">Az (Hafif trafik veya insan sesi)</option>
                  <option value="high">Çok (Yoğun trafik, inşaat, işlek cadde)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bina Özellikleri */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Bina Özellikleri</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Bina Yaşı</label>
                <input
                  type="number"
                  className="input-field"
                  value={formData.buildingAge}
                  onChange={(e) => handleInputChange('buildingAge', Number(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Isıtma Sistemi</label>
                <select
                  className="input-field"
                  value={formData.hasHeating}
                  onChange={(e) => handleInputChange('hasHeating', e.target.value)}
                >
                  <option value="none">Isıtma yok</option>
                  <option value="gas">Doğalgaz</option>
                  <option value="underfloor">Yerden ısıtma</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Cephe Durumu</label>
                <select
                  className="input-field"
                  value={formData.facade}
                  onChange={(e) => handleInputChange('facade', e.target.value)}
                >
                  <option value="terrible">Berbat cephe</option>
                  <option value="bad">Kötü cephe</option>
                  <option value="good">Ortalama cephe</option>
                  <option value="excellent">Çok iyi cephe</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Gürültü Durumu</label>
                <select
                  className="input-field"
                  value={formData.noiseLevel}
                  onChange={(e) => handleInputChange('noiseLevel', e.target.value)}
                >
                  <option value="none">Gürültü yok</option>
                  <option value="low">Az gürültü</option>
                  <option value="high">Çok gürültü</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Checkbox'lar ve Sonuç */}
        <div className="space-y-6">
          {/* Özellikler */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Ek Özellikler</h3>
            <div className="space-y-3">
              {[
                { key: 'hasInsulation', label: 'Yalıtım var' },
                { key: 'isEarthquakeCompliant', label: 'Deprem yönetmeliğine uygun' },
                { key: 'isAmericanKitchen', label: 'Amerikan mutfak' },
                { key: 'hasParking', label: 'Otopark var' },
                { key: 'hasFiber', label: 'Fiber internet' },
                { key: 'isFurnished', label: 'Eşyalı' },
                { key: 'isGroundFloor', label: 'Zemin kat' },
                { key: 'isEntranceFloor', label: 'Giriş katı' },
                { key: 'isHighEntrance', label: 'Yüksek giriş' },
                { key: 'isGardenFloor', label: 'Bahçe katı' },
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData[key as keyof RentalData] as boolean}
                    onChange={(e) => handleInputChange(key as keyof RentalData, e.target.checked)}
                    className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Hesapla Butonu */}
          <button
            onClick={calculateRent}
            className="btn-primary w-full flex items-center justify-center gap-2 text-lg"
          >
            <Calculator className="w-5 h-5" />
            Kira Hesapla
          </button>

          {/* Sonuç */}
          {calculatedRent !== null && (
            <div className="card bg-gradient-to-r from-primary-50 to-blue-50 border-primary-200">
              <h3 className="text-xl font-bold text-center mb-4">Hesaplanan Kira</h3>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">
                  {calculatedRent.toLocaleString('tr-TR')} ₺
                </div>
                <p className="text-gray-600">/ aylık</p>
              </div>
              
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Not:</strong> Depozito tutarının aylık kiradan fazla olması için gerekli imzalar alınmalıdır.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 