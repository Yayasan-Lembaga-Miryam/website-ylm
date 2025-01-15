import axios from 'axios';

interface AlbumData {
    judul: string;
    foto: File[];
}

export interface UpdateAlbumData {
    judul?: string;
    album_id?: string;
    foto?: File[];
}

export const GalleryService = {
    async createAlbum(data: AlbumData) {
        const formData = new FormData();
        formData.append('judul', data.judul);

        data.foto.forEach((file) => {
            formData.append('foto[]', file);
        });

        try {
            const response = await axios.post('/galeri/album', formData, {
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
                        'Ukuran file foto terlalu besar. Pastikan ukuran setiap file tidak melebihi 2MB.',
                    );
                } else if (error.response?.data?.errors) {
                    throw new Error(
                        Object.values(error.response.data.errors)
                            .flat()
                            .join('\n'),
                    );
                }
            }
            throw new Error('Gagal membuat album. Silakan coba lagi.');
        }
    },

    async updateAlbum(slug: string, data: UpdateAlbumData) {
        try {
            const promises = [];

            if (data.judul) {
                const formData = new FormData();
                formData.append('judul', data.judul);
                formData.append('_method', 'PUT');

                promises.push(axios.post(`/galeri/album/${slug}`, formData));
            }

            if (data.foto && data.foto.length > 0 && data.album_id) {
                const formData = new FormData();
                formData.append('album_id', data.album_id);
                data.foto.forEach((file) => {
                    formData.append('foto[]', file);
                });

                promises.push(
                    axios.post('/galeri/foto', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }),
                );
            }

            if (promises.length > 0) {
                await Promise.all(promises);
            }

            return true;
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
            throw new Error('Gagal mengupdate album. Silakan coba lagi.');
        }
    },

    async deletePhoto(photoId: number) {
        try {
            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute('content');
            await fetch(`/galeri/foto/${photoId}`, {
                method: 'DELETE',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': csrfToken || '',
                },
                redirect: 'manual',
            });
            return true;
        } catch (error) {
            throw new Error('Gagal menghapus foto. Silakan coba lagi.');
        }
    },
};
