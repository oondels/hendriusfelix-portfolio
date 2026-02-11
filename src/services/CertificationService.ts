import { api } from '../config/api';

export interface Certification {
  id?: number;
  name: string;
  issuing_organization: string;
  issue_date: string;
  expiration_date?: string | null;
  credential_url: string;
}

class CertificationService {
  async getCertifications(): Promise<Certification[]> {
    try {
      const response = await api.get(`/api/certifications`)
      const data = response.data;

      if (response.status === 200 && Array.isArray(data)) {
        return data;
      }

      console.warn("API indisponível ou vazia. Retornando lista vazia.");
      return [];
    } catch (error) {
      console.warn("API indisponível ou vazia. Retornando lista vazia.");
      return [];
    }
  }

  async createCertification(certificationData: Certification): Promise<Certification> {
    try {
      const response = await api.post(`/api/certifications`, certificationData)
      return response.data;
    } catch (error) {
      console.error("Error creating certification:", error);
      throw new Error("Failed to create certification");
    }
  }

  async updateCertification(
    certificationId: number,
    certificationData: Certification,
  ): Promise<Certification> {
    try {
      const response = await api.put(
        `/api/certifications/${certificationId}`,
        certificationData,
      )
      return response.data;
    } catch (error) {
      console.error("Error updating certification:", error);
      throw new Error("Failed to update certification");
    }
  }

  async deleteCertification(certificationId: number): Promise<void> {
    try {
      await api.delete(`/api/certifications/${certificationId}`)
    } catch (error) {
      console.error("Error deleting certification:", error);
      throw new Error("Failed to delete certification");
    }
  }
}

export const certificationService = new CertificationService();
