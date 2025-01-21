<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UnitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $unit = [
            [
                'nama' => 'KB MIRYAM BANJAR AGUNG',
                'slug' => 'kb-miryam-banjar-agung',
                'alamat_singkat' => 'Kabupaten Tulang Bawang, Provinsi Lampung',
                'thumbnail_path' => 'unit/images/kb-miryam-banjar-agung/thumbnail.jpg',
                'banner_path' => 'unit/images/kb-miryam-banjar-agung/banner.jpg',
                'visi' => 'Mewujudkan pribadi belaskasih yang ber-CHYBK',
                'misi' => '1. Mewujudkan pribadi yang mampu memecahkan masalah, berpikir logis, dan simbolis
2. Menumbuhkan kesadaran diri, tanggung jawab, dan perilaku prososial
3. Mewujudkan pribadi yang mampu bertindak kreatif
4. Menanamkan kebiasaan hidup sehat
5. Membangun kebiasaan menerima dan menghargai sesama dengan bersikap sopan dan santun serta peduli lingkungan
6. Menumbuhkan sikap menerima Allah sebagai penyelenggara hidup dengan kebiasaan berdoa sebelum dan sesudah kegiatan, serta bersyukur
7. Menumbuhkan pribadi mandiri, jujur, dan disiplin
8. Melatih kerja sama dalam permainan berkelompok',
                'profil_pembuka' => 'Kami siap membangun jiwa Kristiani pada generasi muda',
                'profil_isi' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non imperdiet magna, sed commodo mauris. Cras lobortis neque in nulla hendrerit, eu efficitur nulla dapibus. Sed quis aliquet enim. Nulla leo enim, dapibus id risus et, malesuada rhoncus lacus. Mauris placerat ac risus a venenatis. Duis et ligula sit amet dolor finibus ullamcorper. In a accumsan dolor, eu viverra nisi porttitor.',
                'alamat_lengkap' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sodales sem augue, quis porttitor est tempor id. Praesent id augue vel quam tristique malesuada. Aenean eu molestie augue nullam sodales.',
                'email' => 'loremipsum@example.com',
                'instagram' => '@loremipsum',
                'nomor_telepon' => '6281234567890',
                'peta_url' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3256.858304393876!2d112.61110207405257!3d-7.952459679231565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78827f2d620975%3A0xf19b7459bbee5ed5!2sUniversitas%20Brawijaya!5e1!3m2!1sid!2sid!4v1736495597269!5m2!1sid!2sid',
            ],
            [
                'nama' => 'TK XAVERIUS NGESTI RAHAYU',
                'slug' => 'tk-xaverius-ngesti-rahayu',
                'alamat_singkat' => 'Kabupaten Lampung Tengah, Provinsi Lampung',
                'thumbnail_path' => 'unit/images/tk-xaverius-ngesti-rahayu/thumbnail.jpg',
                'banner_path' => 'unit/images/tk-xaverius-ngesti-rahayu/banner.jpg',
                'visi' => 'Mewujudkan pribadi belaskasih yang ber-CHYBK',
                'misi' => '1. Mewujudkan pribadi yang mampu memecahkan masalah, berpikir logis, dan simbolis
2. Menumbuhkan kesadaran diri, tanggung jawab, dan perilaku prososial
3. Mewujudkan pribadi yang mampu bertindak kreatif
4. Menanamkan kebiasaan hidup sehat
5. Membangun kebiasaan menerima dan menghargai sesama dengan bersikap sopan dan santun serta peduli lingkungan
6. Menumbuhkan sikap menerima Allah sebagai penyelenggara hidup dengan kebiasaan berdoa sebelum dan sesudah kegiatan, serta bersyukur
7. Menumbuhkan pribadi mandiri, jujur, dan disiplin
8. Melatih kerja sama dalam permainan berkelompok',
                'profil_pembuka' => 'Kami siap membangun jiwa Kristiani pada generasi muda',
                'profil_isi' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non imperdiet magna, sed commodo mauris. Cras lobortis neque in nulla hendrerit, eu efficitur nulla dapibus. Sed quis aliquet enim. Nulla leo enim, dapibus id risus et, malesuada rhoncus lacus. Mauris placerat ac risus a venenatis. Duis et ligula sit amet dolor finibus ullamcorper. In a accumsan dolor, eu viverra nisi porttitor.',
                'alamat_lengkap' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sodales sem augue, quis porttitor est tempor id. Praesent id augue vel quam tristique malesuada. Aenean eu molestie augue nullam sodales.',
                'email' => 'loremipsum@example.com',
                'instagram' => '@loremipsum',
                'nomor_telepon' => '6281234567890',
                'peta_url' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3256.858304393876!2d112.61110207405257!3d-7.952459679231565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78827f2d620975%3A0xf19b7459bbee5ed5!2sUniversitas%20Brawijaya!5e1!3m2!1sid!2sid!4v1736495597269!5m2!1sid!2sid',
            ],
            [
                'nama' => 'TK XAVERIUS SEPUTIH BANYAK',
                'slug' => 'tk-xaverius-seputih-banyak',
                'alamat_singkat' => 'Kabupaten Tulang Bawang, Provinsi Lampung',
                'thumbnail_path' => 'unit/images/tk-xaverius-seputih-banyak/thumbnail.jpg',
                'banner_path' => 'unit/images/tk-xaverius-seputih-banyak/banner.jpg',
                'visi' => 'Mewujudkan pribadi belaskasih yang ber-CHYBK',
                'misi' => '1. Mewujudkan pribadi yang mampu memecahkan masalah, berpikir logis, dan simbolis
2. Menumbuhkan kesadaran diri, tanggung jawab, dan perilaku prososial
3. Mewujudkan pribadi yang mampu bertindak kreatif
4. Menanamkan kebiasaan hidup sehat
5. Membangun kebiasaan menerima dan menghargai sesama dengan bersikap sopan dan santun serta peduli lingkungan
6. Menumbuhkan sikap menerima Allah sebagai penyelenggara hidup dengan kebiasaan berdoa sebelum dan sesudah kegiatan, serta bersyukur
7. Menumbuhkan pribadi mandiri, jujur, dan disiplin
8. Melatih kerja sama dalam permainan berkelompok',
                'profil_pembuka' => 'Kami siap membangun jiwa Kristiani pada generasi muda',
                'profil_isi' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non imperdiet magna, sed commodo mauris. Cras lobortis neque in nulla hendrerit, eu efficitur nulla dapibus. Sed quis aliquet enim. Nulla leo enim, dapibus id risus et, malesuada rhoncus lacus. Mauris placerat ac risus a venenatis. Duis et ligula sit amet dolor finibus ullamcorper. In a accumsan dolor, eu viverra nisi porttitor.',
                'alamat_lengkap' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sodales sem augue, quis porttitor est tempor id. Praesent id augue vel quam tristique malesuada. Aenean eu molestie augue nullam sodales.',
                'email' => 'loremipsum@example.com',
                'instagram' => '@loremipsum',
                'nomor_telepon' => '6281234567890',
                'peta_url' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3256.858304393876!2d112.61110207405257!3d-7.952459679231565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78827f2d620975%3A0xf19b7459bbee5ed5!2sUniversitas%20Brawijaya!5e1!3m2!1sid!2sid!4v1736495597269!5m2!1sid!2sid',
            ],
            [
                'nama' => 'TK XAVERIUS METRO',
                'slug' => 'tk-xaverius-metro',
                'alamat_singkat' => 'Kota Metro, Provinsi Lampung ',
                'thumbnail_path' => 'unit/images/tk-xaverius-metro/thumbnail.jpg',
                'banner_path' => 'unit/images/tk-xaverius-metro/banner.jpg',
                'visi' => 'Mewujudkan pribadi belaskasih yang ber-CHYBK',
                'misi' => '1. Mewujudkan pribadi yang mampu memecahkan masalah, berpikir logis, dan simbolis
2. Menumbuhkan kesadaran diri, tanggung jawab, dan perilaku prososial
3. Mewujudkan pribadi yang mampu bertindak kreatif
4. Menanamkan kebiasaan hidup sehat
5. Membangun kebiasaan menerima dan menghargai sesama dengan bersikap sopan dan santun serta peduli lingkungan
6. Menumbuhkan sikap menerima Allah sebagai penyelenggara hidup dengan kebiasaan berdoa sebelum dan sesudah kegiatan, serta bersyukur
7. Menumbuhkan pribadi mandiri, jujur, dan disiplin
8. Melatih kerja sama dalam permainan berkelompok',
                'profil_pembuka' => 'Kami siap membangun jiwa Kristiani pada generasi muda',
                'profil_isi' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non imperdiet magna, sed commodo mauris. Cras lobortis neque in nulla hendrerit, eu efficitur nulla dapibus. Sed quis aliquet enim. Nulla leo enim, dapibus id risus et, malesuada rhoncus lacus. Mauris placerat ac risus a venenatis. Duis et ligula sit amet dolor finibus ullamcorper. In a accumsan dolor, eu viverra nisi porttitor.',
                'alamat_lengkap' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sodales sem augue, quis porttitor est tempor id. Praesent id augue vel quam tristique malesuada. Aenean eu molestie augue nullam sodales.',
                'email' => 'loremipsum@example.com',
                'instagram' => '@loremipsum',
                'nomor_telepon' => '6281234567890',
                'peta_url' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3256.858304393876!2d112.61110207405257!3d-7.952459679231565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78827f2d620975%3A0xf19b7459bbee5ed5!2sUniversitas%20Brawijaya!5e1!3m2!1sid!2sid!4v1736495597269!5m2!1sid!2sid',
            ],
            [
                'nama' => 'TK XAVERIUS 1 BANDAR LAMPUNG',
                'slug' => 'tk-xaverius-1-bandar-lampung',
                'alamat_singkat' => 'Kota Bandar Lampung, Provinsi Lampung ',
                'thumbnail_path' => 'unit/images/tk-xaverius-1-bandar-lampung/thumbnail.jpg',
                'banner_path' => 'unit/images/tk-xaverius-1-bandar-lampung/banner.jpg',
                'visi' => 'Mewujudkan pribadi belaskasih yang ber-CHYBK',
                'misi' => '1. Mewujudkan pribadi yang mampu memecahkan masalah, berpikir logis, dan simbolis
2. Menumbuhkan kesadaran diri, tanggung jawab, dan perilaku prososial
3. Mewujudkan pribadi yang mampu bertindak kreatif
4. Menanamkan kebiasaan hidup sehat
5. Membangun kebiasaan menerima dan menghargai sesama dengan bersikap sopan dan santun serta peduli lingkungan
6. Menumbuhkan sikap menerima Allah sebagai penyelenggara hidup dengan kebiasaan berdoa sebelum dan sesudah kegiatan, serta bersyukur
7. Menumbuhkan pribadi mandiri, jujur, dan disiplin
8. Melatih kerja sama dalam permainan berkelompok',
                'profil_pembuka' => 'Kami siap membangun jiwa Kristiani pada generasi muda',
                'profil_isi' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non imperdiet magna, sed commodo mauris. Cras lobortis neque in nulla hendrerit, eu efficitur nulla dapibus. Sed quis aliquet enim. Nulla leo enim, dapibus id risus et, malesuada rhoncus lacus. Mauris placerat ac risus a venenatis. Duis et ligula sit amet dolor finibus ullamcorper. In a accumsan dolor, eu viverra nisi porttitor.',
                'alamat_lengkap' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sodales sem augue, quis porttitor est tempor id. Praesent id augue vel quam tristique malesuada. Aenean eu molestie augue nullam sodales.',
                'email' => 'loremipsum@example.com',
                'instagram' => '@loremipsum',
                'nomor_telepon' => '6281234567890',
                'peta_url' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3256.858304393876!2d112.61110207405257!3d-7.952459679231565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78827f2d620975%3A0xf19b7459bbee5ed5!2sUniversitas%20Brawijaya!5e1!3m2!1sid!2sid!4v1736495597269!5m2!1sid!2sid',
            ],
            [
                'nama' => 'TK XAVERIUS 1 PALEMBANG',
                'slug' => 'tk-xaverius-1-palembang',
                'alamat_singkat' => 'Kota Palembang, Provinsi Sumatera Selatan',
                'thumbnail_path' => 'unit/images/tk-xaverius-1-palembang/thumbnail.jpg',
                'banner_path' => 'unit/images/tk-xaverius-1-palembang/banner.jpg',
                'visi' => 'Mewujudkan pribadi belaskasih yang ber-CHYBK',
                'misi' => '1. Mewujudkan pribadi yang mampu memecahkan masalah, berpikir logis, dan simbolis
2. Menumbuhkan kesadaran diri, tanggung jawab, dan perilaku prososial
3. Mewujudkan pribadi yang mampu bertindak kreatif
4. Menanamkan kebiasaan hidup sehat
5. Membangun kebiasaan menerima dan menghargai sesama dengan bersikap sopan dan santun serta peduli lingkungan
6. Menumbuhkan sikap menerima Allah sebagai penyelenggara hidup dengan kebiasaan berdoa sebelum dan sesudah kegiatan, serta bersyukur
7. Menumbuhkan pribadi mandiri, jujur, dan disiplin
8. Melatih kerja sama dalam permainan berkelompok',
                'profil_pembuka' => 'Kami siap membangun jiwa Kristiani pada generasi muda',
                'profil_isi' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non imperdiet magna, sed commodo mauris. Cras lobortis neque in nulla hendrerit, eu efficitur nulla dapibus. Sed quis aliquet enim. Nulla leo enim, dapibus id risus et, malesuada rhoncus lacus. Mauris placerat ac risus a venenatis. Duis et ligula sit amet dolor finibus ullamcorper. In a accumsan dolor, eu viverra nisi porttitor.',
                'alamat_lengkap' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sodales sem augue, quis porttitor est tempor id. Praesent id augue vel quam tristique malesuada. Aenean eu molestie augue nullam sodales.',
                'email' => 'loremipsum@example.com',
                'instagram' => '@loremipsum',
                'nomor_telepon' => '6281234567890',
                'peta_url' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3256.858304393876!2d112.61110207405257!3d-7.952459679231565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78827f2d620975%3A0xf19b7459bbee5ed5!2sUniversitas%20Brawijaya!5e1!3m2!1sid!2sid!4v1736495597269!5m2!1sid!2sid',
            ],
            [
                'nama' => 'SD XAVERIUS METRO',
                'slug' => 'sd-xaverius-metro',
                'alamat_singkat' => 'Kota Metro, Provinsi Lampung',
                'thumbnail_path' => 'unit/images/sd-xaverius-metro/thumbnail.jpg',
                'banner_path' => 'unit/images/sd-xaverius-metro/banner.jpg',
                'visi' => 'Mewujudkan pribadi belaskasih yang ber-CHYBK',
                'misi' => '1. Mewujudkan kemampuan berpikir kritis, kreatif, dan praktis
2. Membangun kesadaran diri, manajemen diri, dan kesadaran sosial
3. Mengembangkan kemampuan memaknai pengalaman, menemukan nilai, dan bertindak kreatif
4. Mewujudkan jiwa optimisme, daya juang, dan kebiasaan hidup sehat
5. Mengembangkan pribadi yang mampu menerima dan menghargai sesama tanpa membedakan SARA, secara khusus peduli kepada kaum KLMTD dan lingkungan
6. Mengembangkan pribadi yang mampu menerima Allah sebagai penyelenggara hidup dengan kebiasaan bersyukur dan beriman teguh
7. Mewujudkan kemandirian, kejujuran, disiplin, dan tanggung jawab
8. Membangun kemampuan berkomunikasi dan berkolaborasi dalam suasana saling menghormati dan menghargai demi tumbuhnya persaudaraan sejati',
                'profil_pembuka' => 'Kami siap membangun jiwa Kristiani pada generasi muda',
                'profil_isi' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non imperdiet magna, sed commodo mauris. Cras lobortis neque in nulla hendrerit, eu efficitur nulla dapibus. Sed quis aliquet enim. Nulla leo enim, dapibus id risus et, malesuada rhoncus lacus. Mauris placerat ac risus a venenatis. Duis et ligula sit amet dolor finibus ullamcorper. In a accumsan dolor, eu viverra nisi porttitor.',
                'alamat_lengkap' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sodales sem augue, quis porttitor est tempor id. Praesent id augue vel quam tristique malesuada. Aenean eu molestie augue nullam sodales.',
                'email' => 'loremipsum@example.com',
                'instagram' => '@loremipsum',
                'nomor_telepon' => '6281234567890',
                'peta_url' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3256.858304393876!2d112.61110207405257!3d-7.952459679231565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78827f2d620975%3A0xf19b7459bbee5ed5!2sUniversitas%20Brawijaya!5e1!3m2!1sid!2sid!4v1736495597269!5m2!1sid!2sid',
            ],
            [
                'nama' => 'SD XAVERIUS 1 BANDAR LAMPUNG',
                'slug' => 'sd-xaverius-1-bandar-lampung',
                'alamat_singkat' => 'Kota Bandar Lampung, Provinsi Lampung',
                'thumbnail_path' => 'unit/images/sd-xaverius-1-bandar-lampung/thumbnail.jpg',
                'banner_path' => 'unit/images/sd-xaverius-1-bandar-lampung/banner.jpg',
                'visi' => 'Mewujudkan pribadi belaskasih yang ber-CHYBK',
                'misi' => '1. Mewujudkan kemampuan berpikir kritis, kreatif, dan praktis
2. Membangun kesadaran diri, manajemen diri, dan kesadaran sosial
3. Mengembangkan kemampuan memaknai pengalaman, menemukan nilai, dan bertindak kreatif
4. Mewujudkan jiwa optimisme, daya juang, dan kebiasaan hidup sehat
5. Mengembangkan pribadi yang mampu menerima dan menghargai sesama tanpa membedakan SARA, secara khusus peduli kepada kaum KLMTD dan lingkungan
6. Mengembangkan pribadi yang mampu menerima Allah sebagai penyelenggara hidup dengan kebiasaan bersyukur dan beriman teguh
7. Mewujudkan kemandirian, kejujuran, disiplin, dan tanggung jawab
8. Membangun kemampuan berkomunikasi dan berkolaborasi dalam suasana saling menghormati dan menghargai demi tumbuhnya persaudaraan sejati',
                'profil_pembuka' => 'Kami siap membangun jiwa Kristiani pada generasi muda',
                'profil_isi' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non imperdiet magna, sed commodo mauris. Cras lobortis neque in nulla hendrerit, eu efficitur nulla dapibus. Sed quis aliquet enim. Nulla leo enim, dapibus id risus et, malesuada rhoncus lacus. Mauris placerat ac risus a venenatis. Duis et ligula sit amet dolor finibus ullamcorper. In a accumsan dolor, eu viverra nisi porttitor.',
                'alamat_lengkap' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sodales sem augue, quis porttitor est tempor id. Praesent id augue vel quam tristique malesuada. Aenean eu molestie augue nullam sodales.',
                'email' => 'loremipsum@example.com',
                'instagram' => '@loremipsum',
                'nomor_telepon' => '6281234567890',
                'peta_url' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3256.858304393876!2d112.61110207405257!3d-7.952459679231565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78827f2d620975%3A0xf19b7459bbee5ed5!2sUniversitas%20Brawijaya!5e1!3m2!1sid!2sid!4v1736495597269!5m2!1sid!2sid',
            ],
            [
                'nama' => 'SD XAVERIUS 1 PALEMBANG',
                'slug' => 'sd-xaverius-1-palembang',
                'alamat_singkat' => 'Kota Palembang, Provinsi Sumatera Selatan',
                'thumbnail_path' => 'unit/images/sd-xaverius-1-palembang/thumbnail.jpg',
                'banner_path' => 'unit/images/sd-xaverius-1-palembang/banner.jpg',
                'visi' => 'Mewujudkan pribadi belaskasih yang ber-CHYBK',
                'misi' => '1. Mewujudkan kemampuan berpikir kritis, kreatif, dan praktis
2. Membangun kesadaran diri, manajemen diri, dan kesadaran sosial
3. Mengembangkan kemampuan memaknai pengalaman, menemukan nilai, dan bertindak kreatif
4. Mewujudkan jiwa optimisme, daya juang, dan kebiasaan hidup sehat
5. Mengembangkan pribadi yang mampu menerima dan menghargai sesama tanpa membedakan SARA, secara khusus peduli kepada kaum KLMTD dan lingkungan
6. Mengembangkan pribadi yang mampu menerima Allah sebagai penyelenggara hidup dengan kebiasaan bersyukur dan beriman teguh
7. Mewujudkan kemandirian, kejujuran, disiplin, dan tanggung jawab
8. Membangun kemampuan berkomunikasi dan berkolaborasi dalam suasana saling menghormati dan menghargai demi tumbuhnya persaudaraan sejati',
                'profil_pembuka' => 'Kami siap membangun jiwa Kristiani pada generasi muda',
                'profil_isi' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non imperdiet magna, sed commodo mauris. Cras lobortis neque in nulla hendrerit, eu efficitur nulla dapibus. Sed quis aliquet enim. Nulla leo enim, dapibus id risus et, malesuada rhoncus lacus. Mauris placerat ac risus a venenatis. Duis et ligula sit amet dolor finibus ullamcorper. In a accumsan dolor, eu viverra nisi porttitor.',
                'alamat_lengkap' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sodales sem augue, quis porttitor est tempor id. Praesent id augue vel quam tristique malesuada. Aenean eu molestie augue nullam sodales.',
                'email' => 'loremipsum@example.com',
                'instagram' => '@loremipsum',
                'nomor_telepon' => '6281234567890',
                'peta_url' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3256.858304393876!2d112.61110207405257!3d-7.952459679231565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78827f2d620975%3A0xf19b7459bbee5ed5!2sUniversitas%20Brawijaya!5e1!3m2!1sid!2sid!4v1736495597269!5m2!1sid!2sid',
            ],
            [
                'nama' => 'SMP XAVERIUS 1 BANDAR LAMPUNG',
                'slug' => 'smp-xaverius-1-bandar-lampung',
                'alamat_singkat' => 'Kota Bandar Lampung, Provinsi Lampung',
                'thumbnail_path' => 'unit/images/smp-xaverius-1-bandar-lampung/thumbnail.jpg',
                'banner_path' => 'unit/images/smp-xaverius-1-bandar-lampung/banner.jpg',
                'visi' => 'Mewujudkan pribadi belaskasih yang ber-CHYBK',
                'misi' => '1. Mewujudkan kemampuan berpikir kritis, kreatif, praktis, dan bijaksana
2. Membangun kesadaran diri, manajemen diri, kesadaran sosial, dan manajemen hubungan
3. Mengembangkan kemampuan memaknai pengalaman, menemukan nilai, memiliki visi pribadi, dan motivasi internal, serta bertindak kreatif
4. Mewujudkan jiwa optimisme, daya juang, pola pikir, sikap, dan tindakan positif, serta kebiasaan hidup sehat
5. Mengembangkan pribadi yang mampu menerima, menghargai, dan memperjuangkan martabat dan kebe- basan manusia, pe- duli lingkungan, serta berwawasan kebangsaan
6. Mengembangkan pribadi yang mampu menerima Allah sebagai penyelenggara hidup dengan taat menjalankan ajaran agamanya
7. Mewujudkan keberanian, kerja keras, kesiapsediaan, dan ketulusan
8. Membangun kemampuan berkomunikasi dan berkolaborasi dengan sesama baik di sekolah maupun lingkungan tempat tinggal dalam suasana saling menghormati, menghargai, dan menjunjung tinggi hak asasi manusia',
                'profil_pembuka' => 'Kami siap membangun jiwa Kristiani pada generasi muda',
                'profil_isi' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non imperdiet magna, sed commodo mauris. Cras lobortis neque in nulla hendrerit, eu efficitur nulla dapibus. Sed quis aliquet enim. Nulla leo enim, dapibus id risus et, malesuada rhoncus lacus. Mauris placerat ac risus a venenatis. Duis et ligula sit amet dolor finibus ullamcorper. In a accumsan dolor, eu viverra nisi porttitor.',
                'alamat_lengkap' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sodales sem augue, quis porttitor est tempor id. Praesent id augue vel quam tristique malesuada. Aenean eu molestie augue nullam sodales.',
                'email' => 'loremipsum@example.com',
                'instagram' => '@loremipsum',
                'nomor_telepon' => '6281234567890',
                'peta_url' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3256.858304393876!2d112.61110207405257!3d-7.952459679231565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78827f2d620975%3A0xf19b7459bbee5ed5!2sUniversitas%20Brawijaya!5e1!3m2!1sid!2sid!4v1736495597269!5m2!1sid!2sid',
            ],
            [
                'nama' => 'SMP XAVERIUS 6 PALEMBANG',
                'slug' => 'smp-xaverius-6-palembang',
                'alamat_singkat' => 'Kota Palembang, Provinsi Sumatera Selatan',
                'thumbnail_path' => 'unit/images/smp-xaverius-6-palembang/thumbnail.jpg',
                'banner_path' => 'unit/images/smp-xaverius-6-palembang/banner.jpg',
                'visi' => 'Mewujudkan pribadi belaskasih yang ber-CHYBK',
                'misi' => '1. Mewujudkan kemampuan berpikir kritis, kreatif, praktis, dan bijaksana
2. Membangun kesadaran diri, manajemen diri, kesadaran sosial, dan manajemen hubungan
3. Mengembangkan kemampuan memaknai pengalaman, menemukan nilai, memiliki visi pribadi, dan motivasi internal, serta bertindak kreatif
4. Mewujudkan jiwa optimisme, daya juang, pola pikir, sikap, dan tindakan positif, serta kebiasaan hidup sehat
5. Mengembangkan pribadi yang mampu menerima, menghargai, dan memperjuangkan martabat dan kebe- basan manusia, pe- duli lingkungan, serta berwawasan kebangsaan
6. Mengembangkan pribadi yang mampu menerima Allah sebagai penyelenggara hidup dengan taat menjalankan ajaran agamanya
7. Mewujudkan keberanian, kerja keras, kesiapsediaan, dan ketulusan
8. Membangun kemampuan berkomunikasi dan berkolaborasi dengan sesama baik di sekolah maupun lingkungan tempat tinggal dalam suasana saling menghormati, menghargai, dan menjunjung tinggi hak asasi manusia',
                'profil_pembuka' => 'Kami siap membangun jiwa Kristiani pada generasi muda',
                'profil_isi' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non imperdiet magna, sed commodo mauris. Cras lobortis neque in nulla hendrerit, eu efficitur nulla dapibus. Sed quis aliquet enim. Nulla leo enim, dapibus id risus et, malesuada rhoncus lacus. Mauris placerat ac risus a venenatis. Duis et ligula sit amet dolor finibus ullamcorper. In a accumsan dolor, eu viverra nisi porttitor.',
                'alamat_lengkap' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sodales sem augue, quis porttitor est tempor id. Praesent id augue vel quam tristique malesuada. Aenean eu molestie augue nullam sodales.',
                'email' => 'loremipsum@example.com',
                'instagram' => '@loremipsum',
                'nomor_telepon' => '6281234567890',
                'peta_url' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3256.858304393876!2d112.61110207405257!3d-7.952459679231565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78827f2d620975%3A0xf19b7459bbee5ed5!2sUniversitas%20Brawijaya!5e1!3m2!1sid!2sid!4v1736495597269!5m2!1sid!2sid',
            ],
        ];

        foreach ($unit as $u) {
            DB::table('unit')->insert($u);
        }
    }
}
