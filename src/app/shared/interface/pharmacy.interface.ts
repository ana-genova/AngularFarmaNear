export interface PharmacyNear {
  id: number,
  name: string,
  coordinates: {
    lng: number,
    lat: number
  }
}

export interface PharmacyStorage {
  name: string,
  brand: string,
  quantity: number,
  dosage: string,
  type: string,
  expirationDate: string,
  drugstorecnpj: string,
  price: number
}
