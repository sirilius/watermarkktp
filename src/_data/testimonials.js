const testimonials = [
  {
    name: "Arsenal's Kitchen",
    username: "@arsenalskitchen",
    profession: "Netizen",
    url: "https://x.com/arsenalskitchen/status/1546643994716778496",
    icon: "twitter-x-line",
    content:
      'Watermark KTP memang <span class="bg-violet-600 text-white py-0.5 px-1">sangat berguna,</span> salah satunya untuk <span class="bg-violet-600 text-white py-0.5 px-1">memerangi pinjol laknat.</span>',
  },
  {
    name: "Dwinawan",
    username: "@dwinawan_",
    profession: "UI Designer",
    url: "https://x.com/dwinawan_/status/1460471493578526720",
    icon: "twitter-x-line",
    content:
      '1. Buka https://watermarkktp.com <br> 2. Disconnect Internet <br> 3. Tetep bisa edit & download foto <br><br> Dari percobaan ini membuktikan:<br><span class="bg-violet-600 text-white py-0.5 px-1">- Gambar tidak diupload</span><br><span class="bg-violet-600 text-white py-0.5 px-1">- Semua proses berjalan di browser masing2 pengguna</span>',
  },
  {
    name: "Azharie Muhammad",
    username: "@azharieazharou",
    profession: "Software Engineer",
    url: "https://x.com/azharieazharou/status/1447406774596763652 ",
    icon: "twitter-x-line",
    content:
      'Project open source yang coba  <span class="bg-violet-600 text-white py-0.5 px-1">menyelesaikan masalah besar penyalahgunaan data KTP.</span>',
  },
  {
    name: "Adi",
    username: "@adinugrhoo",
    profession: "Product Designer",
    url: "https://x.com/adinugrhoo/status/1447447993154637824",
    icon: "twitter-x-line",
    content:
      '<span class="bg-violet-600 text-white py-0.5 px-1">The easiest way</span> to put a watermark on your KTP 🙌👏',
  },
  {
    name: "Teguh Aprianto",
    username: "@secgron",
    profession: "Cybersecurity Consultant",
    url: "https://x.com/secgron/status/1447231684139573255",
    icon: "twitter-x-line",
    content:
      'Buat yg nanya aman atau engga, <span class="bg-violet-600 text-white py-0.5 px-1">semua proses dilakukan dari sisi client.</span> Artinya tidak ada perpindahan file yg kamu upload ke sisi server. Semuanya tetap berada di perangkat yg kamu gunakan.',
  },
  {
    name: "Frans Allen",
    username: "@fransallen",
    profession: "Software Engineer",
    url: "https://x.com/fransallen/status/1546407297681063936",
    icon: "twitter-x-line",
    content:
      'Watermark KTP adalah solusi berbasis web yang <span class="bg-violet-600 text-white py-0.5 px-1">aman dan praktis</span> untuk memberi penandaan pada hasil scan KTP.',
  },
  {
    name: "Dean",
    username: "@dean",
    profession: "Cyber Security Analyst",
    url: "https://x.com/Dynbnyy/status/1447237372333027334",
    icon: "twitter-x-line",
    content:
      '<span class="bg-violet-600 text-white py-0.5 px-1">Gila keren banget ini</span>, you will be big in future!',
  },
  {
    name: "Taufiq Muhammadi",
    username: "@taufiqmuhammadi",
    profession: "Software Engineer",
    url: "https://x.com/waruboy/status/1448621936750186499",
    icon: "twitter-x-line",
    content:
      'Wah <span class="bg-violet-600 text-white py-0.5 px-1">berguna banget ni</span>',
  },
  {
    name: "𝕃𝕦𝕗𝕗𝕪𝕞𝕒𝕥𝕔𝕙𝕒 🍵",
    username: "@luffymatcha",
    profession: "Netizen",
    url: "https://x.com/luffymatcha/status/1447124951211778052",
    icon: "twitter-x-line",
    content:
      'Berarti sebetulnya <span class="bg-violet-600 text-white py-0.5 px-1"> untuk keperluan general bisa, ga cuma KTP aja.</span>',
  },
  {
    name: "Vasto Lorde",
    username: "@vastolorde",
    profession: "Netizen",
    url: "https://twitter.com/diemutnangis/status/1474372079499702272",
    icon: "twitter-x-line",
    content:
      'Ini keren banget, mungkin bisa digunain bagi yang mau <span class="bg-violet-600 text-white py-0.5 px-1">Watermark KTP tanpa ribet edit.</span>',
  },
  {
    name: "Sandi Hidayat",
    username: "@sandihidayat",
    profession: "Netizen",
    url: "https://www.youtube.com/watch?v=eliNihJWAG4&lc=UgzO9h0PPtVwajCilAJ4AaABAg",
    icon: "youtube-fill",
    content:
      'Keren, <span class="bg-violet-600 text-white py-0.5 px-1">sederhana tapi bermanfaat.</span>',
  },
  {
    name: "Khabib Thoha",
    username: "@khabibthoha",
    profession: "Netizen",
    url: "https://www.youtube.com/watch?v=eliNihJWAG4&lc=Ugy4buw2DekA9ieIu6N4AaABAg",
    icon: "youtube-fill",
    content:
      'Anak muda cerdas yang berusaha membuat <span class="bg-violet-600 text-white py-0.5 px-1">solusi dari masalah yg terjadi di masyarakat.</span>',
  },
  {
    name: "Zaenal Fachri",
    username: "@zaenalfachri",
    profession: "Netizen",
    url: "https://www.youtube.com/watch?v=eliNihJWAG4&lc=Ugzo6P2_nibTBbCq3zF4AaABAg",
    icon: "youtube-fill",
    content:
      '3 Kata Untuk Mas Kevin: <span class="bg-violet-600 text-white py-0.5 px-1">Genius, Peduli, Bermanfaat.</span>',
  },
  {
    name: "Zriemunem",
    username: "@zriemunem",
    profession: "Netizen",
    url: "https://www.youtube.com/watch?v=eliNihJWAG4&lc=UgzQqQHSzLchaUMUG9x4AaABAg",
    icon: "youtube-fill",
    content:
      '14 tahun belum punya KTP tapi udah <span class="bg-violet-600 text-white py-0.5 px-1">peduli banget sama isu-isu kriminal melalui KTP 👍🏼</span>',
  },
  {
    name: "Faisal",
    username: "@faisalzakaria",
    profession: "Netizen",
    url: "https://www.youtube.com/watch?v=eliNihJWAG4&lc=UgyzPT-qfyGEKjxppgN4AaABAg",
    icon: "youtube-fill",
    content:
      '<span class="bg-violet-600 text-white py-0.5 px-1">Idenya ini mahal sekali 😭</span> <br> Asli, keren-keren. Secara adanya web ini, saya gak perlu repot-repot open PS saya kalo mau verifikasi sesuatu 😂',
  },
];

module.exports = testimonials;
