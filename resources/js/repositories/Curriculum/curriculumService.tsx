import axios from 'axios';

interface CurriculumData {
    judul: string;
    url: string;
}

export const CurriculumService = {
    async createCurriculum(data: CurriculumData) {
        try {
            const response = await axios.post('/kurikulum', data);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 500) {
                    throw new Error('Terjadi kesalahan server. Silakan coba lagi nanti.');
                } else if (error.response?.data?.errors) {
                    throw new Error(Object.values(error.response.data.errors).flat().join('\n'));
                }
            }
            throw new Error('Gagal membuat kurikulum. Silakan coba lagi.');
        }
    },

    async editCurriculum(id: number, data: CurriculumData) {
        try {
            const response = await axios.put(`/kurikulum/${id}`, data);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 500) {
                    throw new Error('Terjadi kesalahan server. Silakan coba lagi nanti.');
                } else if (error.response?.data?.errors) {
                    throw new Error(Object.values(error.response.data.errors).flat().join('\n'));
                }
            }
            throw new Error('Gagal mengubah kurikulum. Silakan coba lagi.');
        }
    }
};