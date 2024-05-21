import ApiService from './ApiService'
import StorageService from './StorageService'

export default class ImageApiService extends ApiService {
  constructor() {
    super('/api/v1/image')
    this.storageService = new StorageService()
  }

  getEquipmentImageUrl(equipmentCode: string): string {
    const s = `${this.getBaseUrl()}${this.endpoint}/partnumber?code=${equipmentCode}`;
    return s;
  }

  getUserProfileImageUrl(imageCode: string): string{
    const s = `${this.getBaseUrl()}/${imageCode}`;
    return s;
  }
}
