import axios from 'axios';

interface CreatePengurusData {
    nama: string;
    jabatan: string;
    keterangan_jabatan?: string | null;
    foto: File;
    unit_id?: number | null;
    category?: string | null;
    prioritas: number;
}

interface UpdatePengurusData {
    nama: string;
    jabatan: string;
    keterangan_jabatan: string | null;
    foto?: File;
    unit_id?: number | null;
    category?: string | null;
    prioritas?: number;
}

export const staffService = {
    async createPengurus(data: CreatePengurusData) {
        const formData = new FormData();

        formData.append('nama', data.nama);
        formData.append('jabatan', data.jabatan);

        if (data.keterangan_jabatan !== undefined) {
            formData.append(
                'keterangan_jabatan',
                data.keterangan_jabatan || '',
            );
        }

        formData.append('foto', data.foto);

        if (data.unit_id !== undefined) {
            formData.append('unit_id', String(data.unit_id));
        }

        if (data.category) {
            formData.append('category', data.category);
        }

        formData.append('prioritas', String(data.prioritas));

        return axios.post('/pengurus', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    async updatePengurus(pengurus: number, data: UpdatePengurusData) {
        const formData = new FormData();

        formData.append('_method', 'PUT');
        formData.append('nama', data.nama);
        formData.append('jabatan', data.jabatan);

        if (data.keterangan_jabatan !== null) {
            formData.append('keterangan_jabatan', data.keterangan_jabatan);
        } else {
            formData.append('keterangan_jabatan', '');
        }

        if (data.foto) {
            formData.append('foto', data.foto);
        }

        if (data.unit_id !== undefined) {
            formData.append('unit_id', String(data.unit_id));
        }

        if (data.category) {
            formData.append('category', data.category);
        }

        if (data.prioritas !== undefined) {
            formData.append('prioritas', String(data.prioritas));
        }

        return axios.post(`/pengurus/${pengurus}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    async deletePengurus(id: number) {
        return axios.delete(`/pengurus/${id}`);
    },
};
