import axios from 'axios';

interface UpdatePengurusData {
    nama: string;
    jabatan: string;
    keterangan_jabatan: string | null;
    foto?: File;
}

export const staffService = {
    async updatePengurus(id: number, data: UpdatePengurusData) {
        const formData = new FormData();

        console.log('Data being sent:', data);

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

        return axios.post(`/pengurus/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
};
