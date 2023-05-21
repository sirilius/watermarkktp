# Contributing

Terima kasih atas minat Anda untuk berkontribusi pada Watermark KTP! Kami menghargai dukungan dan usaha Anda dalam membuat alat ini lebih baik. Sebelum memulai, harap membaca panduan kontribusi ini dengan seksama.

# Getting Started

Untuk mulai berkontribusi ke proyek ini, ikuti langkah-langkah berikut:

1. Pastikan Anda memiliki lingkungan pengembangan yang memenuhi persyaratan berikut:
   - Node.js (versi 12 atau lebih baru)
   - npm (Node Package Manager) atau Yarn
2. Fork repositori ini ke akun GitHub Anda.
3. Clone repositori yang telah Anda fork ke dalam sistem lokal Anda:

   ```sh
   git clone https://github.com/usernameAnda/watermarkktp.git
   ```

4. Masuk ke direktori proyek:

   ```sh
   cd watermark-ktp
   ```

5. Instal dependensi proyek dengan menjalankan perintah berikut:

   ```sh
   npm install
   ```

6. Bangun project assets, termasuk pengaturan Eleventy dan Tailwind CSS, dengan menjalankan perintah berikut:

   ```sh
   npm run build
   ```

7. Buat branch baru untuk pekerjaan Anda:

   ```sh
   git checkout -b nama-branch
   ```

8. Mulailah membuat perubahan yang diinginkan dan implementasikan fitur baru sesuai kebutuhan.

9. Jalankan proyek secara lokal untuk menguji perubahan Anda:

   ```sh
   npm run dev
   ```

   Ini akan memulai server pengembangan lokal menggunakan Eleventy. Anda dapat mengakses Watermark KTP di browser melalui URL http://localhost:8080

10. Setelah selesai, tambahkan perubahan yang telah Anda lakukan ke staging area dengan perintah berikut:

    ```sh
    git add .
    ```

11. Setelah Anda melakukan perubahan, buat commit dengan pesan deskriptif:

    ```sh
    git commit -m "Deskripsi singkat tentang perubahan"
    ```

12. Push commit ke branch yang Anda buat di repositori GitHub Anda:

    ```sh
    git push origin nama-branch
    ```

13. Buat pull request ke repositori utama (https://github.com/sirilius/watermarkktp) menggunakan _interface_ GitHub.

# Pull Request

Untuk menghindari situasi di mana Anda menghabiskan waktu dan usaha dalam membuat _pull request_ yang kemudian ditolak, kami menyarankan untuk **membuka _issue_ terlebih dahulu**. Dengan membuka _issue_, Anda dapat berdiskusi dengan kami untuk memastikan bahwa perubahan yang Anda rencanakan sesuai dengan tujuan project ini dan sejalan dengan arah pengembangan yang diinginkan.

Jika Anda mengalami masalah, seperti _merge conflict_, atau tidak tahu bagaimana cara membuka _pull request_, Anda dapat mengikuti [tutorial _pull request_ GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests) untuk mempelajari cara menyelesaikan _merge conflict_ dan masalah lainnya. Setelah PR Anda digabungkan, Anda akan tercantum sebagai kontributor dalam [contributor chart](https://github.com/sirilius/watermarkktp/graphs/contributors).

# Contributor

<a href="https://github.com/sirilius/watermarkktp/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=sirilius/watermarkktp" />
</a>

# Terjemahan

- [English](CONTRIBUTING.md)
