const Sun = {
  name: 'Matahari',
  type: 'Bintang',
  description:
    `Matahari adalah bintang di pusat Tata Surya yang merupakan bola plasma raksasa berusia sekitar 4,6 miliar tahun dengan massa ~99,86% total tata surya. ` +
    `Gravitasi Matahari yang sangat besar membuat planet-planet dan benda langit lain tetap mengorbit. Energi dari reaksi fusi di intinya memancarkan cahaya dan panas ` +
    `yang menjadi sumber utama kehidupan di Bumi.`,
  orbit: null,
  atmosphere:
    `Matahari tidak memiliki permukaan padat, melainkan lapisan gas dan plasma. ` +
    `Lapisan terluarnya adalah fotosfer (~5.800 K), di atasnya kromosfer berwarna kemerahan (suhu 4.000–20.000 K), dan selanjutnya korona yang sangat panas (1–3 juta K). ` +
    `Panas ekstrim korona masih menjadi misteri. Dari korona inilah partikel berkecepatan tinggi (angin surya) terpancar ke ruang angkasa.`,
  layers: [
    {
      name: 'Inti',
      composition:
        `Di inti Matahari terjadi reaksi fusi nuklir: hidrogen diubah menjadi helium dengan pelepasan energi besar. ` +
        `Suhu di inti sekitar 15,7 juta K dan densitas ~150 g/cm³ (lebih padat dari timbal). Hampir seluruh energi Matahari dihasilkan di lapisan terdalam ini.`,
    },
    {
      name: 'Zona Radiatif',
      composition:
        `Zona ini memindahkan energi keluar dari inti melalui radiasi: foton diserap dan dipancarkan ulang oleh plasma yang sangat rapat, sehingga memakan waktu sangat lama (ratusan ribu hingga jutaan tahun) untuk mencapai bagian luar. ` +
        `Suhu di zona radiatif turun dari ~7 juta K (dekat inti) menjadi ~2 juta K di bagian atas.`,
    },
    {
      name: 'Zona Konvektif',
      composition:
        `Di zona ini plasma tidak cukup panas untuk memindahkan energi melalui radiasi, sehingga terjadi aliran konveksi: plasma panas naik ke permukaan, mendingin, lalu turun kembali, mirip air mendidih. ` +
        `Pola konveksi ini menyebabkan 'granula' yang terlihat pada fotosfer.`,
    },
    {
      name: 'Fotosfer',
      composition:
        `Fotosfer adalah 'permukaan' Matahari yang kita lihat, setebal sekitar 500 km. ` +
        `Suhu di fotosfer sekitar 6.400 K (lapisan bawah) hingga 4.000 K (lapisan atas). ` +
        `Di sini juga muncul bintik matahari, area yang lebih gelap dan lebih dingin akibat medan magnet kuat yang menghambat konveksi.`,
    },
    {
      name: 'Kromosfer',
      composition:
        `Kromosfer adalah lapisan tipis (~2.000 km) di atas fotosfer yang tampak kemerahan, terutama karena emisi cahaya hidrogen. ` +
        `Suhu naik dari ~4.000 K di bawah ke ~20.000 K di bagian atas kromosfer.`,
    },
    {
      name: 'Korona',
      composition:
        `Korona adalah atmosfer terluar Matahari, berupa plasma sangat tipis namun sangat panas (1–3 juta K). ` +
        `Korona terlihat seperti halo saat gerhana matahari total. Dari korona inilah angin surya (aliran partikel bermuatan) mengalir ke seluruh Tata Surya.`,
    },
  ],
};

const Mercury = {
  name: 'Merkurius',
  type: 'Planet Terestrial',
  description:
    `Merkurius adalah planet terkecil dan terdekat dari Matahari dalam Tata Surya. ` +
    `Planet ini tidak memiliki satelit alami. Rotasinya sangat lambat: satu putaran mengambil ~58,7 hari Bumi, ` +
    `sementara satu hari Matahari (matahari terbit-ke-terbit) berlangsung sekitar 176 hari Bumi (resonansi rotasi 3:2). ` +
    `Perbedaan panjang hari dan malam menyebabkan variasi suhu ekstrem: hingga ~700 K (~430°C) di siang hari dan ~100 K (~-173°C) di malam hari. ` +
    `Di kutub yang selalu gelap terdapat jejak es air di kawah-kawah yang terpelihara.`,
  orbit: {
    semiMajorAxis: '0,39 SA',
    period:        '88 hari Bumi',
    eccentricity:  '0,21',
    inclination:   '7,0°',
  },
  atmosphere:
    `Merkurius nyaris tidak punya atmosfer yang signifikan — hanya eksosfer sangat tipis dari atom oksigen, natrium, hidrogen, helium, dan kalium. ` +
    `Atom-atom ini terus disapu angin surya dan digantikan dari tumbukan meteoroid dan desorpsi permukaan. Tekanan di permukaan mendekati nol, ` +
    `sehingga tidak ada cuaca atau angin nyata.`,
  layers: [
    {
      name: 'Kerak',
      composition:
        `Kerak Merkurius tipis, tersusun dari batuan silikat seperti basalt dan dikelilingi debu halus (regolit) dari meteorit. ` +
        `Kerak Merkurius relatif tipis dibanding planet terestrial lain.`,
    },
    {
      name: 'Mantel',
      composition:
        `Mantel Merkurius juga tipis (lebih tipis daripada planet kebumian lainnya), terdiri dari mineral silikat seperti olivin dan piroksen. ` +
        `Tipisnya mantel ini berkaitan dengan dominasi inti yang sangat besar.`,
    },
    {
      name: 'Inti',
      composition:
        `Inti Merkurius sangat besar secara proporsional (sekitar 85% dari radius planet) dan kaya besi-nikel. ` +
        `Inti dalamnya padat, lapisan luar inti cair, menghasilkan medan magnet global yang sangat lemah.`,
    },
  ],
};

const Venus = {
  name: 'Venus',
  type: 'Planet Terestrial',
  description:
    `Venus adalah planet kedua dari Matahari dan sering disebut "kembaran Bumi" karena ukuran dan massanya yang hampir sama. ` +
    `Namun atmosfernya yang sangat tebal (96,5% karbon dioksida dan 3,5% nitrogen) menciptakan efek rumah kaca ekstrem, ` +
    `menjadikan permukaan Venus planet terpanas di Tata Surya (~735 K atau 462°C). ` +
    `Tekanan permukaannya sekitar 92 kali tekanan Bumi. Venus berotasi lambat (satu putaran ~243 hari Bumi) dan terbalik (rotasi searah jarum jam), ` +
    `sehingga matahari terbit dari barat.`,
  orbit: {
    semiMajorAxis: '0,72 SA',
    period:        '225 hari Bumi',
    eccentricity:  '0,007',
    inclination:   '3,4°',
  },
  atmosphere:
    `Atmosfer Venus sangat tebal; sebagian besar terdiri dari CO₂ (96,5%) dan N₂ (3,5%). Tekanan di permukaannya sekitar 92 kali tekanan atmosfer Bumi. ` +
    `Lapisan awan tebalnya berisi tetesan asam sulfat yang memantulkan sinar matahari. Suhu permukaan Venus sangat seragam (~735 K) siang dan malam karena konveksi atmosfer yang efisien.`,
  layers: [
    {
      name: 'Kerak',
      composition:
        `Kerak Venus kebanyakan terbuat dari basalt vulkanik. Planet ini sangat vulkanik; banyak gunung berapi besar di permukaannya dan beberapa di antaranya mungkin masih aktif.`,
    },
    {
      name: 'Mantel',
      composition:
        `Mantel Venus terdiri dari batuan silikat padat, mirip mantel Bumi. Aliran panas di mantel inilah yang memicu aktivitas vulkanik yang terus-menerus memperbarui permukaan Venus.`,
    },
    {
      name: 'Inti',
      composition:
        `Inti Venus tersusun dari logam berat (besi-nikel), kemungkinan sebagian besar cair. Karena rotasi yang sangat lambat, tidak terbentuk medan magnet global signifikan pada Venus (inti cairnya tidak membentuk dinamo).`,
    },
  ],
};

const Earth = {
  name: 'Bumi',
  type: 'Planet Terestrial',
  description:
    `Bumi adalah satu-satunya planet yang diketahui mendukung kehidupan. Planet ketiga dari Matahari ini berada di zona laik huni, sehingga suhu memungkinkan air tetap cair di permukaan. ` +
    `Ciri khasnya adalah atmosfer stabil, medan magnet pelindung, dan lempeng tektonik aktif yang membuat iklim Bumi relatif stabil.`,
  orbit: {
    semiMajorAxis: '1,00 SA',
    period:        '365,25 hari',
    eccentricity:  '0,017',
    inclination:   '0°',
  },
  atmosphere:
    `Atmosfer Bumi terdiri dari ~78% nitrogen, ~21% oksigen, ~1% argon, dan sedikit karbondioksida serta gas lainnya. ` +
    `Lapisan ozon di stratosfer melindungi permukaan dari radiasi ultraviolet berbahaya, dan atmosfer berfungsi sebagai selimut termal yang menjaga suhu permukaan relatif stabil.`,
  layers: [
    {
      name: 'Kerak',
      composition:
        `Kerak Bumi tipis relatif terhadap ukuran planet, terbagi menjadi kerak benua (granit ringan) dan kerak samudra (basalt padat). ` +
        `Ketebalannya berkisar 5–70 km (tipis di dasar lautan, tebal di bawah pegunungan).`,
    },
    {
      name: 'Mantel',
      composition:
        `Mantel Bumi sangat tebal (sekitar 2.900 km), terdiri dari batuan silikat padat (peridotit) yang bergerak sangat lambat melalui konveksi. ` +
        `Pergerakan mantel inilah yang menggerakkan lempeng tektonik, menyebabkan gempa dan aktivitas vulkanik.`,
    },
    {
      name: 'Inti luar',
      composition:
        `Inti luar Bumi adalah lapisan cair yang terutama tersusun dari besi dan nikel dengan suhu ~4.000–5.000 K. Arus konveksi dalam inti luar yang konduktif inilah yang menghasilkan medan magnet Bumi (dinamo geodynamo).`,
    },
    {
      name: 'Inti dalam',
      composition:
        `Inti dalam Bumi adalah bola padat (besi) berdiameter ~1.220 km. Meskipun suhunya sangat tinggi (~5.400 K), tekanan ekstrem mencegahnya meleleh. Inti dalam bertumbuh perlahan saat Bumi mendingin, menambah besi ke inti cair.`,
    },
  ],
};

const Moon = {
  name: 'Bulan',
  type: 'Satelit Alami',
  description:
    `Bulan adalah satu-satunya satelit alam Bumi dan satelit alami terbesar kelima di Tata Surya. ` +
    `Gravitasi Bulan menyebabkan pasang surut di lautan dan membantu menstabilkan kemiringan sumbu Bumi. ` +
    `Karena terkunci pasang surut, selalu satu sisi yang sama menghadap Bumi; sisi jauh baru terpetakan setelah era eksplorasi antariksa.`,
  orbit: {
    semiMajorAxis: '~384.400 km dari Bumi',
    period:        '27,3 hari Bumi',
    eccentricity:  '0,055',
    inclination:   '5,1° terhadap ekliptika',
  },
  atmosphere:
    `Bulan hampir tidak memiliki atmosfer, hanya eksosfer sangat tipis (total massa ~10 ton) yang mengandung helium, neon, argon, dan sedikit gas lain dari angin surya dan peluruhan radioaktif. ` +
    `Tanpa atmosfer berarti tidak ada cuaca atau suara, dan jejak kaki astronot Apollo dapat bertahan jutaan tahun.`,
  layers: [
    {
      name: 'Kerak',
      composition:
        `Kerak Bulan tersusun dari batuan silikat yang terlapisi debu halus (regolit) dari tumbukan meteorit selama miliaran tahun. ` +
        `Dataran tinggi (anorthosit pucat) bercampur dengan dataran rendah basaltik gelap (maria) terlihat dari Bumi. Kerak sisi jauh lebih tebal daripada sisi dekat.`,
    },
    {
      name: 'Mantel',
      composition:
        `Mantel Bulan tersusun dari batuan silikat berat (peridotit, olivin, piroksen). Aktivitas seismik (gempa bulan) pernah terdeteksi oleh seismometer Apollo, meski sekarang aktivitas internal sangat lemah.`,
    },
    {
      name: 'Inti',
      composition:
        `Inti Bulan relatif kecil: sebagian besi (mungkin dengan sulfur dan oksigen) padat di bagian dalam dan lapisan cair tipis di luarnya. Saat ini tidak ada medan magnet global karena inti cairnya kecil dan sebagian sudah membeku.`,
    },
  ],
};

const Mars = {
  name: 'Mars',
  type: 'Planet Terestrial',
  description:
    `Mars dikenal sebagai Planet Merah karena oksidasi (karat) besi yang memberi warna kemerahan pada permukaannya. ` +
    `Planet ini menyimpan bukti bahwa miliaran tahun lalu memiliki air cair (sungai, danau, mungkin samudra) di permukaannya. Kini Mars adalah dunia dingin dan kering dengan atmosfer sangat tipis dan dua kutub berlapis es. ` +
    `Badai debu musiman dapat menutupi seluruh planet.`,
  orbit: {
    semiMajorAxis: '1,52 SA',
    period:        '687 hari Bumi',
    eccentricity:  '0,093',
    inclination:   '1,85°',
  },
  atmosphere:
    `Atmosfer Mars sangat tipis (~1% tekanan Bumi) dan sebagian besar terdiri dari karbon dioksida (~95%), nitrogen (~2,8%), dan argon (~2%). ` +
    `Tekanan rendah membuat Mars sulit menahan panas, sehingga suhu bervariasi dari ~-125°C di kutub saat musim dingin hingga ~20°C di siang hari ekuator musim panas. ` +
    `Badai debu besar kadang meliputi planet bertahun-tahun.`,
  layers: [
    {
      name: 'Kerak',
      composition:
        `Kerak Mars lebih tebal daripada Bumi, rata-rata ~50 km, didominasi basalt kaya oksida besi (yang memberi warna merah). ` +
        `Terdapat pegunungan berapi raksasa (Olympus Mons setinggi ~22 km) dan lembah luas (Valles Marineris) akibat geologi masa lalu.`,
    },
    {
      name: 'Mantel',
      composition:
        `Mantel Mars (sampai kedalaman ~1.560 km) terdiri dari batuan silikat seperti olivin dan piroksen. Tidak ada tektonik lempeng aktif seperti Bumi; aktivitas vulkanik masa lalu terpusat di satu titik (Tharsis) sehingga gunung apinya tumbuh sangat besar.`,
    },
    {
      name: 'Inti',
      composition:
        `Inti Mars berukuran lebih besar daripada perkiraan sebelumnya (data InSight: radius ~1.830 km). Intinya terdiri dari besi, nikel, dan sulfur dalam, sebagian besar cair. Mars tidak memiliki medan magnet global aktif sekarang, kemungkinan karena inti cairnya sebagian besar membeku sekitar 4 miliar tahun lalu.`,
    },
  ],
};

const Jupiter = {
  name: 'Jupiter',
  type: 'Raksasa Gas',
  description:
    `Yupiter adalah planet terbesar di Tata Surya — massanya ~2,5 kali massa semua planet lain digabung. Berdiameter ~142.984 km, Jupiter berotasi sangat cepat (~10 jam per putaran), menyebabkan bentuknya gepeng di khatulistiwa. ` +
    `Atmosfernya yang khas memiliki pita-pita awan berwarna krem dan oranye, serta Bintik Merah Besar: badai antisiklon raksasa yang telah ada setidaknya 350 tahun dan lebarnya ~2–3 kali diameter Bumi.`,
  orbit: {
    semiMajorAxis: '5,20 SA',
    period:        '~11,86 tahun',
    eccentricity:  '0,048',
    inclination:   '1,3°',
  },
  atmosphere:
    `Atmosfer Jupiter terutama terdiri dari hidrogen (~90%) dan helium (~10%), dengan jejak metana, amonia, dan uap air membentuk awan. Tidak ada permukaan padat — tekanan dan suhu meningkat ke dalam secara bertahap hingga gas menjadi cair. Jupiter juga memiliki petir yang sangat kuat dan badai besar di kutub.`,
  layers: [
    {
      name: 'Atmosfer Atas',
      composition:
        `Di lapisan paling luar adalah awan-awan amonia dan amonium hidrosulfida yang membentuk pita-pita berawan. Awan putih amonia di lapisan atas, di bawahnya awan amonium hidrosulfida kuning-cokelat, dan kemungkinan ada lapisan awan air di bagian dalam.`,
    },
    {
      name: 'Hidrogen Cair Molekuler',
      composition:
        `Semakin jauh ke dalam, tekanan meningkat sehingga gas hidrogen berubah secara kontinu menjadi cair tanpa batas fase yang jelas. Lapisan hidrogen cair ini sangat tebal dan menyusun sebagian besar volume planet.`,
    },
    {
      name: 'Hidrogen Logam',
      composition:
        `Lebih dalam lagi, tekanan (~3 juta bar) dan suhu (~10.000 K) sangat tinggi sehingga hidrogen cair berubah menjadi 'hidrogen logam': elektron terlepas membentuk konduktor. Arus di lapisan ini menghasilkan medan magnet Yupiter yang terkuat di Tata Surya.`,
    },
    {
      name: 'Inti',
      composition:
        `Inti Jupiter diperkirakan terdiri dari campuran bebatuan, logam, dan hidrogen terkompresi. Data misi Juno menunjukkan inti tersebut bersifat 'difus' (tidak padat penuh) dengan massa sekitar 10–40 kali massa Bumi.`,
    },
  ],
};

const Saturn = {
  name: 'Saturnus',
  type: 'Raksasa Gas',
  description:
    `Saturnus adalah planet terbesar kedua di Tata Surya dan terkenal dengan sistem cincinnya yang spektakuler. Meskipun dimensinya besar, Saturnus adalah satu-satunya planet yang massa jenisnya lebih rendah dari air (~0,69 g/cm³), sehingga secara hipotesis ia bisa terapung di air. ` +
    `Planet ini juga memiliki pola awan heksagonal stabil di kutub utara (sisi ~13.800 km) yang telah diamati selama puluhan tahun.`,
  orbit: {
    semiMajorAxis: '9,58 SA',
    period:        '~29,5 tahun',
    eccentricity:  '0,056',
    inclination:   '2,5°',
  },
  atmosphere:
    `Komposisi dasar atmosfernya mirip Jupiter: ~96% hidrogen, ~3% helium, dengan jejak amonia dan metana. Sabuk awannya berwarna pastel, namun angin di ekuator Saturnus dapat mencapai ~1.800 km/jam. ` +
    `Pola heksagonal di kutub utara adalah fenomena unik yang masih dipelajari ilmuwan.`,
  layers: [
    {
      name: 'Atmosfer Berawan',
      composition:
        `Awan-awan amonia yang lebih tipis dibanding Yupiter menyelimuti Saturnus dalam pita-pita warna pastel. Di bawahnya terdapat awan amonium hidrosulfida dan kemungkinan lapisan awan air, meski kedalamannya sulit diamati.`,
    },
    {
      name: 'Hidrogen Cair Molekuler',
      composition:
        `Lapisan di bawah atmosfer terdiri dari hidrogen yang berubah dari gas ke cair seiring tekanan meningkat. Transisi ini terjadi pada kedalaman lebih kecil dibanding Jupiter karena massa Saturnus lebih kecil.`,
    },
    {
      name: 'Hidrogen Logam',
      composition:
        `Pada tekanan yang lebih tinggi, hidrogen cair berubah menjadi hidrogen metalik yang dapat menghantarkan listrik. Lapisan ini menghasilkan medan magnet Saturnus, yang meskipun lebih lemah dari Jupiter, sangat simetris dengan sumbu rotasinya.`,
    },
    {
      name: 'Inti',
      composition:
        `Inti Saturnus diperkirakan padat, tersusun dari batuan silikat dan logam, dengan massa sekitar 15–25 kali massa Bumi. Seperti Jupiter, data Cassini menunjukkan inti ini mungkin bersifat difus dengan percampuran bertahap ke lapisan gas di atasnya.`,
    },
  ],
};

const Uranus = {
  name: 'Uranus',
  type: 'Raksasa Es',
  description:
    `Uranus adalah planet biru kehijauan akibat metana dalam atmosfernya yang menyerap cahaya merah. Yang paling mencolok adalah kemiringan porosnya ~98° dari bidang orbit, sehingga planet ini tampak 'berbaring miring' saat mengorbit. Kemiringan ekstrem ini kemungkinan akibat tabrakan besar di masa awal tata surya.`,
  orbit: {
    semiMajorAxis: '19,2 SA',
    period:        '~84 tahun',
    eccentricity:  '0,046',
    inclination:   '0,77°',
  },
  atmosphere:
    `Atmosfer Uranus mengandung ~83% hidrogen, ~15% helium, dan ~2% metana. Metana menyerap cahaya merah, memantulkan biru kehijauan yang khas. Uranus adalah planet terdingin di Tata Surya, dengan suhu minimum sekitar -224°C.`,
  layers: [
    {
      name: 'Atmosfer',
      composition:
        `Lapisan awan atas Uranus berupa kabut biru homogen. Di bawahnya terdapat awan metana beku, amonia, dan air di lapisan yang lebih dalam.`,
    },
    {
      name: 'Mantel Es dan Air Panas',
      composition:
        `Sebagian besar volume Uranus adalah mantel 'es': campuran air, amonia, dan metana dalam keadaan cair pekat di bawah tekanan tinggi. Konveksi di lapisan ini mungkin menghasilkan hujan berlian ke inti.`,
    },
    {
      name: 'Inti',
      composition:
        `Inti Uranus relatif kecil dan berbatu, massanya sekitar 0,5–3,7 kali massa Bumi. Karena tekanannya tidak cukup tinggi untuk membentuk hidrogen logam, medan magnet Uranus dihasilkan oleh lapisan es cair yang bergerak di atas inti.`,
    },
  ],
};

const Neptune = {
  name: 'Neptunus',
  type: 'Raksasa Es',
  description:
    `Neptunus adalah planet kedelapan dari Matahari yang warnanya biru gelap. Mirip Uranus tetapi atmosfernya lebih dinamis. Neptunus memiliki angin tercepat di Tata Surya (lebih dari 2.100 km/jam) yang menggerakkan badai besar seperti Bintik Hitam Besar (awan gelap). ` +
    `Planet ini juga memancarkan lebih banyak energi daripada yang diterimanya dari Matahari.`,
  orbit: {
    semiMajorAxis: '30,1 SA',
    period:        '~165 tahun',
    eccentricity:  '0,009',
    inclination:   '1,8°',
  },
  atmosphere:
    `Atmosfer Neptunus terdiri dari ~80% hidrogen, ~19% helium, dan ~1% metana, yang memberi warna biru tua. Awan metana beku dan badai besar sering muncul di atmosfernya. Misalnya, saat Voyager 2 melintas pada 1989 ditemukan Bintik Hitam Besar yang kemudian menghilang.`,
  layers: [
    {
      name: 'Atmosfer',
      composition:
        `Lapisan teratas terdiri dari gas hidrogen, helium, dan metana. Awan metana beku bergerak sangat cepat, dengan sebagian angin melebihi kecepatan suara (~600 m/s).`,
    },
    {
      name: 'Mantel Es Bertekanan Tinggi',
      composition:
        `Di bawah atmosfer terdapat mantel tebal berupa 'es panas': campuran air, amonia, dan metana dalam keadaan cair pekat pada tekanan sangat tinggi. Konveksi dalam mantel ini menciptakan medan magnet Neptunus yang kuat namun sangat miring.`,
    },
    {
      name: 'Inti',
      composition:
        `Inti Neptunus padat, terbuat dari bebatuan (silikat) dan logam (besi-nikel), dengan massa sekitar 1–3 kali massa Bumi. Energi internal dari pembentukan planet membuat Neptunus lebih panas daripada yang diperkirakan dari penerimaan sinar Matahari saja.`,
    },
  ],
};

const Ceres = {
  name: 'Ceres',
  type: 'Planet kerdil',
  description:
    `Ceres adalah Planet kerdil terbesar di sabuk asteroid antara Mars dan Jupiter. Dengan diameter ~940 km, Ceres memiliki cukup massa untuk menjadikan bentuknya bulat secara gravitasional. ` +
    `Sekitar 25% massa Ceres berupa air es dalam mantelnya, membuatnya sangat menarik dalam studi asal usul tata surya dan potensi kehidupan.`,
  orbit: {
    semiMajorAxis: '2,77 SA',
    period:        '4,6 tahun Bumi',
    eccentricity:  '0,076',
    inclination:   '10,6°',
  },
  atmosphere:
    `Ceres hampir tidak memiliki atmosfer permanen. Ia hanya memiliki eksosfer tipis dari gas–gas yang berasal dari sublimasi es air permukaannya saat mendekati Matahari. Tekanan permukaannya sangat rendah (sekitar 10⁻¹⁴ atm).`,
  layers: [
    {
      name: 'Kerak',
      composition:
        `Kerak Ceres tersusun dari silikat dan campuran es, permukaan berwarna abu-abu. Ditemukan kawah-kawah tubrukan dan bintik cerah (garam karbonat) di Cekungan Occator yang menunjukkan keberadaan mineral tertentu.`,
    },
    {
      name: 'Mantel',
      composition:
        `Mantel Ceres mengandung banyak es air — sekitar 25% berdasarkan massa. Mantelnya setebal ~100 km dan mungkin menyimpan samudra air bawah tanah yang dilindungi oleh lapisan es.`,
    },
    {
      name: 'Inti',
      composition:
        `Inti Ceres relatif kecil dan padat, terutama tersusun dari batuan silikat. Ceres sudah terdiferensiasi, dengan inti berbatu terpisah dari mantel esnya.`,
    },
  ],
};

const Pluto = {
  name: 'Pluto',
  type: 'Planet kerdil',
  description:
    `Pluto adalah Planet kerdil terbesar kedua di Tata Surya (setelah Eris) dan objek terbesar di Sabuk Kuiper. Ditemukan tahun 1930 dan diklasifikasikan ulang menjadi Planet kerdil pada 2006. ` +
    `Orbit Pluto sangat elips dan miring, kadang membuatnya lebih dekat ke Matahari daripada Neptunus.`,
  orbit: {
    semiMajorAxis: '39,5 SA',
    period:        '248 tahun Bumi',
    eccentricity:  '0,249',
    inclination:   '17,2°',
  },
  atmosphere:
    `Pluto memiliki atmosfer sangat tipis yang terutama terdiri dari nitrogen dengan jejak metana dan karbon monoksida. Saat jauh dari Matahari, atmosfer ini membeku dan mengendap ke permukaan; saat mendekati Matahari, ia menguap kembali. Tekanan atmosfernya hanya sekitar 10⁻⁵ hingga 10⁻⁷ kali tekanan Bumi.`,
  layers: [
    {
      name: 'Permukaan',
      composition:
        `Permukaan Pluto terdiri dari lapisan es nitrogen, metana, dan karbon monoksida. Terdapat dataran luas es nitrogen, seperti Sputnik Planitia (dataran es berbentuk hati), gletser nitrogen yang mengalir, dan pegunungan es air setinggi beberapa km. Warnanya bervariasi dari putih ke kemerahan.`,
    },
    {
      name: 'Mantel',
      composition:
        `Mantel Pluto didominasi oleh es air yang relatif tebal (~100–200 km). Lapisan es ini berada di bawah permukaan es volatiles (nitrogen/metana) dan membentuk sebagian besar volume Planet kerdil ini.`,
    },
    {
      name: 'Inti',
      composition:
        `Inti Pluto bersifat padat dan berbatu (silikat dan logam) dengan diameter ~1.700 km. Inti ini dikelilingi oleh mantel es yang tebal.`,
    },
  ],
};

const Charon = {
  name: 'Charon',
  type: 'Satelit Alami',
  description:
    `Charon adalah bulan terbesar Pluto (diameter ~1.212 km), sekitar setengah diameter Pluto. Sistem Pluto-Charon sering disebut sistem katai ganda karena massa Charon cukup besar. ` +
    `Charon dan Pluto terkunci pasang surut satu sama lain, sehingga selalu satu sisi Charon yang menghadap Pluto. Permukaan Charon gelap keabuan dengan beberapa area merah tua.`,
  orbit: {
    semiMajorAxis: '~19.570 km dari Pluto',
    period:        '6,4 hari Bumi',
    eccentricity:  '0,0002',
    inclination:   '0° terhadap ekuator Pluto',
  },
  atmosphere:
    `Charon tidak memiliki atmosfer yang berarti. Permukaannya gelap dan kaya es air dan bebatuan.`,
  layers: [
    {
      name: 'Permukaan',
      composition:
        `Permukaan Charon terutama es air bercampur dengan batuan. Fitur paling menonjol adalah lembah panjang di hemisfer yang menghadap Pluto, menandakan peristiwa tektonik atau termo-tektonik di masa lalu.`,
    },
    {
      name: 'Mantel',
      composition:
        `Mantel Charon terdiri terutama dari es air, dengan ketebalan ~100 km.`,
    },
    {
      name: 'Inti',
      composition:
        `Inti Charon kecil dan berbatu (mungkin hanya beberapa ratus km diameternya). Saat ini tidak ada medan magnet global, menunjukkan aktivitas internal yang minimal.`,
    },
  ],
};

const Makemake = {
  name: 'Makemake',
  type: 'Planet kerdil',
  description:
    `Makemake adalah Planet kerdil terbesar ketiga di Tata Surya dan objek utama di Sabuk Kuiper klasik. Ditemukan tahun 2005, namanya berasal dari dewa pencipta dalam mitologi Rapa Nui. ` +
    `Makemake memiliki permukaan yang sangat terang dengan warna kemerahan.`,
  orbit: {
    semiMajorAxis: '45,7 SA',
    period:        '306 tahun Bumi',
    eccentricity:  '0,159',
    inclination:   '29,0°',
  },
  atmosphere:
    `Makemake kemungkinan memiliki atmosfer sangat tipis yang muncul secara musiman saat mendekati Matahari. Jika ada, mungkin tersusun dari nitrogen dan metana seperti Pluto, namun jauh lebih jarang.`,
  layers: [
    {
      name: 'Permukaan',
      composition:
        `Permukaan Makemake ditutupi oleh es metana, etana, dan mungkin es nitrogen, yang memberikan warna merah-cokelat. Tidak ada dataran luas es nitrogen seperti di Pluto.`,
    },
    {
      name: 'Mantel',
      composition:
        `Mantel Makemake kemungkinan terdiri dari es air di bawah lapisan permukaan. Data terbatas, tetapi es air diduga menyusun sebagian besar volumenya.`,
    },
    {
      name: 'Inti',
      composition:
        `Inti Makemake diperkirakan berbatu (silikat/logam) dengan diameter ~1.500 km atau lebih. Detailnya masih belum diketahui.`,
    },
  ],
};

const Eris = {
  name: 'Eris',
  type: 'Planet kerdil',
  description:
    `Eris adalah Planet kerdil terbesar yang diketahui (diameter ~2.326 km) dan objek terberat kesepuluh di Tata Surya. Ditemukan tahun 2005, penemuan Eris menjadi salah satu faktor utama penurunan status Pluto. ` +
    `Eris mengorbit sangat elips (ecc=0,44) dan bersudut tinggi (44°) terhadap ekliptika.`,
  orbit: {
    semiMajorAxis: '67,8 SA',
    period:        '558 tahun Bumi',
    eccentricity:  '0,44',
    inclination:   '44,0°',
  },
  atmosphere:
    `Eris memiliki atmosfer sangat tipis yang tersusun dari nitrogen dan metana, yang membeku di permukaan saat Eris jauh dari Matahari. Ketika Eris mendekat ke Matahari, es ini akan menyublim kembali ke atmosfer.`,
  layers: [
    {
      name: 'Permukaan',
      composition:
        `Permukaan Eris sangat reflektif karena lapisan es metana beku. Warnanya cenderung putih keputihan.`,
    },
    {
      name: 'Mantel',
      composition:
        `Mantel Eris diperkirakan terdiri dari es air di bawah permukaan es volatiles (metana/nitrogen).`,
    },
    {
      name: 'Inti',
      composition:
        `Inti Eris padat berbatu/logam dengan massa ~0,5–0,8 massa Pluto. Seperti Planet kerdil besar lain, Eris telah mengalami diferensiasi inti-mantel.`,
    },
  ],
};

const Dysnomia = {
  name: 'Dysnomia',
  type: 'Satelit Alami',
  description:
    `Dysnomia adalah bulan terbesar Eris dan satu-satunya yang diketahui. Dinamai dari dewi kekacauan dalam mitologi Yunani, Dysnomia ditemukan tahun 2005. ` +
    `Bulan ini sangat kecil (diameter ~500 km) dan gelap, hampir tidak ada albedo. Orbitnya digunakan untuk mengukur massa Eris.`,
  orbit: {
    semiMajorAxis: '~37.000 km dari Eris',
    period:        '16 hari Bumi',
    eccentricity:  '0,006',
    inclination:   '142° (terbalik dari orbit Eris)',
  },
  atmosphere:
    `Dysnomia tidak memiliki atmosfer yang berarti karena gravitasinya terlalu lemah.`,
  layers: [
    {
      name: 'Permukaan',
      composition:
        `Permukaan Dysnomia kemungkinan campuran es dan batuan, namun kondisinya sangat gelap sehingga sulit diamati.`, 
    },
  ],
};


const Haumea = {
  name: 'Haumea',
  type: 'Planet kerdil',
  description:
    `Dengan diameter khatulistiwa sekitar 1.080 mil (1.740 km), Haumea berukuran sekitar 1/7 lebar Bumi. ` +
    `Jika Bumi seukuran uang koin nikel, Haumea kira-kira sebesar biji wijen. Dari jarak rata-rata 4 miliar mil (6,5 miliar km), ` +
    `Haumea berjarak 43 satuan astronomi (SA) dari Matahari. ` +
    `Pada jarak ini, cahaya matahari membutuhkan waktu 6 jam untuk mencapai Haumea. Haumea berputar sangat cepat sehingga bentuknya memanjang seperti bola rugbi.`,
  orbit: {
    semiMajorAxis: '43 SA',
    period:        '284 tahun Bumi',
    eccentricity:  '0,196',
    inclination:   '28,2°',
  },
  atmosphere:
    `Haumea tampaknya tidak memiliki atmosfer yang berarti, meskipun mungkin ada sedikit sisa gas yang membeku di permukaannya akibat rotasi yang sangat cepat.`,
  layers: [
    {
      name: 'Permukaan',
      composition:
        `Permukaan Haumea sebagian besar diyakini terbuat dari es air kristal, yang membuatnya cerah dan reflektif, dengan titik terang merah raksasa yang tidak diketahui asalnya (kemungkinan jejak tabrakan dari masa lalu).`,
    },
    {
      name: 'Interior',
      composition:
        `Diukur dari kepadatannya, interior Haumea diperkirakan berupa batuan padat yang diselimuti oleh lapisan es tipis, ditarik menjadi bentuk elipsoid akibat dari rotasinya yang sangat cepat (satu rotasi memakan waktu sekitar 4 jam Bumi).`,
    },
  ],
};




const Phobos = {
  name: 'Phobos',
  type: 'Satelit Mars',
  description: 'Phobos adalah bulan terbesar dan paling dalam dari dua satelit alami Mars. Permukaannya sangat bopeng dengan kawah besar (Kawah Stickney) mendominasi permukaannya.',
  orbit: {
    semiMajorAxis: '9.376 km',
    period: '7 jam 39 menit',
    eccentricity: '0,0151',
    inclination: '1,093°',
  },
  atmosphere: 'Tidak ada.',
  layers: [],
};

const Deimos = {
  name: 'Deimos',
  type: 'Satelit Mars',
  description: 'Deimos adalah satelit yang lebih kecil dan bagian terluar dari kedua satelit Mars. Ukurannya hanya sekitar 12 km dan memiliki tampilan lebih halus dari kawah yang tertutup debu vulkanik.',
  orbit: {
    semiMajorAxis: '23.460 km',
    period: '30,3 jam',
    eccentricity: '0,0002',
    inclination: '0,93°',
  },
  atmosphere: 'Tidak ada.',
  layers: [],
};

const Io = {
  name: 'Io',
  type: 'Satelit Jupiter',
  description: 'Io adalah bulan terdalam dari empat satelit Galilea Jupiter. Bulan ini adalah objek paling vulkanik dalam Tata Surya, ditarik robek oleh gravitasi pasang surut Jupiter sehingga memiliki lereng berwarna belerang.',
  orbit: {
    semiMajorAxis: '421.700 km',
    period: '1,76 hari',
    eccentricity: '0,0041',
    inclination: '0,05°',
  },
  atmosphere: 'Atmosfer sangat tipis yang didominasi sulfur dioksida dari gunung apinya.',
  layers: [],
};

const Europa = {
  name: 'Europa',
  type: 'Satelit Jupiter',
  description: 'Europa dilapisi oleh kulit cangkang es tebal yang dipercaya menyembunyikan samudra cairan air di bawahnya, menjadikannya salah satu target utama untuk pencarian kehidupan mikrobial.',
  orbit: {
    semiMajorAxis: '671.034 km',
    period: '3,55 hari',
    eccentricity: '0,009',
    inclination: '0,47°',
  },
  atmosphere: 'Atmosfer molekuler oksigen lemah yang diciptakan oleh radiasi pemecah es molekular.',
  layers: [],
};

const Ganymede = {
  name: 'Ganymede',
  type: 'Satelit Jupiter',
  description: 'Ganymede adalah satelit alami terbesar di Tata Surya (bahkan lebih besar dari Merkurius). Ia adalah satu-satunya bulan yang diketahui memiliki perlindungan medan magnetnya sendiri.',
  orbit: {
    semiMajorAxis: '1.070.400 km',
    period: '7,15 hari',
    eccentricity: '0,0013',
    inclination: '0,20°',
  },
  atmosphere: 'Sangat tipis (campuran molekul oksigen dan ozon).',
  layers: [],
};

const Callisto = {
  name: 'Callisto',
  type: 'Satelit Jupiter',
  description: 'Callisto adalah satelit yang terluar dari objek Galilea Jupiter. Permukaannya adalah yang paling retak dan banyak dihias kawah per tabrakan luar angkasa, menunjukan aktivitas tektonik mati sejak era kuno.',
  orbit: {
    semiMajorAxis: '1.882.700 km',
    period: '16,69 hari',
    eccentricity: '0,0074',
    inclination: '0,192°',
  },
  atmosphere: 'Atmosfer sangat renggang berisi karbon dioksida.',
  layers: [],
};

const Enceladus = {
  name: 'Enceladus',
  type: 'Satelit Saturnus',
  description: 'Enceladus memiliki samudra es dan menyemburkan geyser debu gletser berlapis es dari kutub selatannya yang memberi cincin E milik Saturnus suplai es berkelanjutan.',
  orbit: {
    semiMajorAxis: '237.948 km',
    period: '1,37 hari',
    eccentricity: '0,0047',
    inclination: '0,019°',
  },
  atmosphere: 'Aktivitas terpusat vapor air melalui badai uap bawah es dari sisi kutub selatan.',
  layers: [],
};

const Dione = {
  name: 'Dione',
  type: 'Satelit Saturnus',
  description: 'Dione adalah satelit es yang padat, dengan kepadatan sepertiga air murni, yang mensyaratkan eksistensi sebuah inti bebatuan padat. Memiliki wilayah tebing-tebing bercorak terang cemerlang yang terbelah.',
  orbit: {
    semiMajorAxis: '377.396 km',
    period: '2,73 hari',
    eccentricity: '0,0022',
    inclination: '0,019°',
  },
  atmosphere: 'Oksigen ion yang luar biasa tipis.',
  layers: [],
};

// =============================================================================
// EXPORT — combine all bodies into one object.
// To add a new celestial body: define a new const above, then add it here.
// =============================================================================
export const celestialData = {
  Sun,
  Mercury,
  Venus,
  Earth,
  Moon,
  Mars,
  Jupiter,
  Saturn,
  Uranus,
  Neptune,
  Ceres,
  Pluto,
  Charon,
  Makemake,
  Eris,
  Dysnomia,
  Haumea,
  Phobos,
  Deimos,
  Io,
  Europa,
  Ganymede,
  Callisto,
  Enceladus,
  Dione,
};
