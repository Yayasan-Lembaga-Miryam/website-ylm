import axios from 'axios';

interface NewsData {
    judul: string;
    isi: string;
    gambar?: File;
}

export const NewsService = {
    async createNews(data: NewsData) {
        const formData = new FormData();
        formData.append('judul', data.judul);
        formData.append('isi', data.isi);
        if (data.gambar) {
            formData.append('gambar', data.gambar);
        }

        try {
            const response = await axios.post('/berita', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 500) {
                    throw new Error(
                        'Terjadi kesalahan server. Silakan coba lagi nanti.',
                    );
                } else if (error.response?.status === 413) {
                    throw new Error(
                        'Ukuran file gambar terlalu besar. Pastikan ukuran file tidak melebihi 2MB.',
                    );
                } else if (error.response?.data?.errors) {
                    throw new Error(
                        Object.values(error.response.data.errors)
                            .flat()
                            .join('\n'),
                    );
                }
            }
            throw new Error('Gagal membuat berita. Silakan coba lagi.');
        }
    },

    async editNews(slug: string, data: NewsData) {
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('judul', data.judul);
        formData.append('isi', data.isi);
        if (data.gambar) {
            formData.append('gambar', data.gambar);
        }
        try {
            const response = await axios.post(`/berita/${slug}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 500) {
                    throw new Error(
                        'Terjadi kesalahan server. Silakan coba lagi nanti.',
                    );
                } else if (error.response?.data?.errors) {
                    throw new Error(
                        Object.values(error.response.data.errors)
                            .flat()
                            .join('\n'),
                    );
                }
            }
            throw new Error('Gagal mengubah berita. Silakan coba lagi.');
        }
    },

    async getNewsDetail(slug: string) {
        try {
            const response = await axios.get(`/berita/${slug}`);
            return response.data;
        } catch (error) {
            throw new Error(
                'Gagal mengambil detail berita. Silakan coba lagi.',
            );
        }
    },
};
