import * as THREE from 'three';

export const celestialData = {
  Sun: {
    name: 'Matahari',
    type: 'Bintang',
    description:
      'Bintang di pusat Tata Surya kita — sebuah bola plasma raksasa berusia sekitar 4,5 miliar tahun yang menyusun hampir 99,86% dari seluruh massa tata surya. Gravitasinya yang luar biasa mengikat semua planet, bulan, dan benda langit lainnya agar tetap mengorbit. Energi yang dipancarkan Matahari menjadi sumber utama cahaya dan panas bagi kehidupan di Bumi.',
    orbit: null,
    atmosphere:
      'Matahari tidak memiliki permukaan padat — seluruhnya adalah plasma bercahaya. Lapisan terluarnya terdiri dari fotosfer yang terlihat sebagai "permukaan" Matahari (sekitar 5.800 K), diikuti oleh kromosfer di atasnya yang berwarna kemerahan, dan terakhir korona — atmosfer terluar yang suhunya justru melonjak ekstrem hingga 1–3 juta K. Alasan mengapa korona jauh lebih panas dari lapisan di bawahnya masih menjadi misteri yang belum terpecahkan. Dari sinilah angin surya — aliran partikel bermuatan — terus mengalir ke seluruh penjuru tata surya.',
    layers: [
      {
        name: 'Inti',
        composition:
          'Tempat berlangsungnya reaksi fusi nuklir: hidrogen diubah menjadi helium dan melepaskan energi yang luar biasa besar. Suhu di sini mencapai sekitar 15,7 juta K dengan kepadatan sekitar 150 g/cm³ — jauh lebih padat daripada timbal. Hampir seluruh energi Matahari dihasilkan di inti terdalam ini.',
      },
      {
        name: 'Zona Radiatif',
        composition:
          'Energi dari inti bergerak keluar dalam bentuk foton, namun perjalanannya sangat lambat karena foton terus-menerus diserap dan dipancarkan ulang oleh partikel plasma yang rapat. Sebuah foton bisa memerlukan waktu ratusan ribu tahun — bahkan hingga satu juta tahun — hanya untuk melintas zona ini. Suhu di zona ini turun dari sekitar 7 juta K di bagian dalam hingga 2 juta K di bagian atas.',
      },
      {
        name: 'Zona Konvektif',
        composition:
          'Di sini plasma tidak lagi cukup panas dan rapat untuk mentransfer energi lewat radiasi, sehingga energi dibawa ke permukaan oleh arus konveksi: plasma panas naik, mendingin di dekat permukaan, lalu tenggelam kembali — mirip air mendidih di panci. Pola ini memunculkan granula-granula yang terlihat di permukaan Matahari.',
      },
      {
        name: 'Fotosfer',
        composition:
          'Lapisan "permukaan" yang kita lihat dari Bumi, setebal sekitar 500 km. Suhunya berkisar antara 6.500 K di bagian bawah hingga sekitar 4.000 K di bagian atas — menjadikannya lapisan paling dingin di antara lapisan interior Matahari. Di sinilah bintik matahari (sunspot) terbentuk akibat gangguan medan magnet lokal yang menghambat arus konveksi.',
      },
      {
        name: 'Kromosfer',
        composition:
          'Lapisan di atas fotosfer yang tampak berwarna kemerahan — warna ini berasal dari emisi cahaya hidrogen. Tebal sekitar 2.000 km. Di lapisan ini terjadi anomali yang menarik: suhu justru naik seiring ketinggian, dari sekitar 4.000 K di bagian bawah hingga sekitar 20.000 K di bagian atas.',
      },
      {
        name: 'Korona',
        composition:
          'Atmosfer terluar Matahari yang terdiri dari plasma sangat tipis namun sangat panas — suhunya mencapai 1 hingga 3 juta K, jauh melebihi lapisan di bawahnya. Korona bisa diamati saat gerhana matahari total sebagai halo cahaya putih yang melingkari tepi Matahari. Dari korona inilah angin surya terbentuk dan mengalir ke seluruh tata surya.',
      },
    ],
  },

  Mercury: {
    name: 'Merkurius',
    type: 'Planet Terestrial',
    description:
      'Planet terkecil sekaligus yang paling dekat dengan Matahari. Tidak memiliki satelit alami. Rotasinya yang sangat lambat — satu hari Merkurius setara dengan 58,7 hari Bumi — mengakibatkan perbedaan suhu yang ekstrem antara sisi yang menghadap Matahari (~430°C) dan sisi yang gelap (~-180°C). Meski begitu, ada bukti bahwa es air tersimpan di kawah-kawah kutub yang tidak pernah terpapar sinar matahari.',
    orbit: {
      semiMajorAxis: '0,39 SA',
      period: '88 hari Bumi',
      eccentricity: '0,21',
      inclination: '7,0°',
    },
    atmosphere:
      'Hampir tidak memiliki atmosfer. Yang ada hanyalah eksosfer yang sangat tipis — lapisan atom-atom longgar yang terdiri dari oksigen, natrium, hidrogen, helium, dan kalium. Atom-atom ini terus-menerus tersapu oleh angin surya dan digantikan oleh tumbukan meteor atau pelepasan gas dari permukaan. Tekanannya mendekati ruang hampa, sehingga tidak ada cuaca, tidak ada angin, dan langitnya selalu hitam pekat.',
    layers: [
      {
        name: 'Kerak',
        composition:
          'Lapisan berbatu padat yang tersusun dari batuan silikat dan ditutupi oleh debu halus (regolit) akibat miliaran tahun tumbukan meteorit. Kerak Merkurius tergolong tipis di antara planet-planet terestrial.',
      },
      {
        name: 'Mantel',
        composition:
          'Sangat tipis dibandingkan planet terestrial lainnya. Tersusun dari batuan silikat seperti olivin dan piroksen. Tipisnya mantel ini berkaitan langsung dengan dominasi inti yang sangat besar.',
      },
      {
        name: 'Inti',
        composition:
          'Inti Merkurius adalah yang paling besar secara proporsional di antara semua planet — mengisi sekitar 60–85% diameter planet. Kaya akan besi dan nikel, dengan inti dalam yang padat dan inti luar yang cair. Inti cair inilah yang menghasilkan medan magnet Merkurius, meski lemah dibandingkan Bumi.',
      },
    ],
  },

  Venus: {
    name: 'Venus',
    type: 'Planet Terestrial',
    description:
      'Planet kedua dari Matahari yang sering disebut "kembaran Bumi" karena ukurannya yang hampir sama. Namun di balik kemiripan fisik itu, Venus adalah dunia yang sangat keras: efek rumah kaca yang tak terkendali menjadikannya planet terpanas di Tata Surya, bahkan mengalahkan Merkurius yang lebih dekat ke Matahari. Venus juga berputar sangat lambat dan dalam arah terbalik — artinya di Venus, Matahari terbit dari barat.',
    orbit: {
      semiMajorAxis: '0,72 SA',
      period: '225 hari Bumi',
      eccentricity: '0,007',
      inclination: '3,4°',
    },
    atmosphere:
      'Atmosfernya sangat tebal dan berat, tersusun terutama dari karbon dioksida (~96,5%) dan nitrogen (~3,5%). Tekanan di permukaannya mencapai sekitar 92 kali tekanan atmosfer Bumi — setara dengan tekanan di kedalaman hampir 1 km di bawah laut. Awan-awan tebalnya bukan air, melainkan tetesan asam sulfat yang menutupi seluruh planet. Suhu permukaannya mencapai sekitar 465°C secara merata siang dan malam.',
    layers: [
      {
        name: 'Kerak',
        composition:
          'Sebagian besar tersusun dari batuan basalt vulkanik. Venus memiliki aktivitas vulkanik yang sangat tinggi — jauh melampaui planet lain di Tata Surya. Ada bukti bahwa beberapa gunung berapinya mungkin masih aktif hingga kini.',
      },
      {
        name: 'Mantel',
        composition:
          'Terdiri dari batuan silikat padat, diperkirakan mirip dengan mantel Bumi primitif. Aliran panas dari mantel mendorong aktivitas vulkanik yang terus memperbarui permukaan Venus.',
      },
      {
        name: 'Inti',
        composition:
          'Tersusun dari besi dan nikel, kemungkinan setidaknya sebagian dalam keadaan cair. Namun Venus tidak memiliki medan magnet global yang berarti — kemungkinan karena rotasinya yang sangat lambat tidak menghasilkan efek dinamo yang cukup untuk membangkitkan medan magnet.',
      },
    ],
  },

  Earth: {
    name: 'Bumi',
    type: 'Planet Terestrial',
    description:
      'Satu-satunya planet yang diketahui menopang kehidupan. Planet ketiga dari Matahari ini berada tepat di zona layak huni tata surya — zona di mana suhu memungkinkan air tetap berada dalam bentuk cair di permukaan. Kombinasi atmosfer yang stabil, medan magnet pelindung, dan lempeng tektonik yang aktif menjadikan Bumi planet yang unik di seluruh tata surya yang kita kenal.',
    orbit: {
      semiMajorAxis: '1,00 SA',
      period: '365,25 hari',
      eccentricity: '0,017',
      inclination: '0°',
    },
    atmosphere:
      'Atmosfer Bumi tersusun dari nitrogen (~78%), oksigen (~21%), argon (~1%), dan sejumlah kecil karbon dioksida serta gas-gas lainnya. Lapisan ozon di stratosfer melindungi permukaan dari radiasi ultraviolet berbahaya. Atmosfer juga berperan sebagai selimut termal yang menjaga suhu permukaan tetap stabil, mengatur siklus air, dan mempertahankan tekanan udara yang ideal untuk kehidupan.',
    layers: [
      {
        name: 'Kerak',
        composition:
          'Lapisan terluar yang tipis namun beragam: kerak benua tersusun dari batuan granit yang lebih ringan (kaya silikon dan aluminium), sementara kerak samudra tersusun dari basalt yang lebih padat. Ketebalannya berkisar antara 5 km di dasar samudra hingga 70 km di bawah pegunungan.',
      },
      {
        name: 'Mantel',
        composition:
          'Lapisan tebel berbatu yang menyusun sekitar 84% volume Bumi. Tersusun dari batuan silikat padat (terutama peridotit) yang bergerak sangat lambat dalam arus konveksi. Pergerakan inilah yang menggerakkan lempeng-lempeng tektonik Bumi, menyebabkan gempa bumi dan letusan gunung berapi.',
      },
      {
        name: 'Inti luar',
        composition:
          'Lapisan cair yang tersusun terutama dari besi dan nikel dengan suhu sekitar 4.000–5.000 K. Pusaran arus dalam lapisan konduktif ini bertindak sebagai dinamo raksasa yang membangkitkan medan magnet Bumi — perisai yang melindungi kita dari angin surya dan radiasi kosmik.',
      },
      {
        name: 'Inti dalam',
        composition:
          'Bola besi padat berdiameter sekitar 1.220 km yang terkungkung oleh tekanan jutaan atmosfer. Meski suhunya sangat tinggi (sekitar 5.400 K), tekanan ekstrem mencegahnya meleleh. Inti dalam terus tumbuh perlahan seiring Bumi yang mendingin secara bertahap sepanjang miliaran tahun.',
      },
    ],
  },

  Moon: {
    name: 'Bulan',
    type: 'Satelit Alami',
    description:
      'Satu-satunya satelit alami Bumi. Pengaruh gravitasinya menggerakkan pasang surut di lautan kita, dan kemiringan sumbu Bumi pun sebagian distabilkan oleh kehadirannya. Karena terkunci secara gravitasi (tidal locking), wajah Bulan yang selalu menghadap Bumi selalu sama — sisi jauhnya baru bisa diamati setelah era eksplorasi luar angkasa.',
    orbit: {
      semiMajorAxis: '~384.400 km dari Bumi',
      period: '27,3 hari Bumi',
      eccentricity: '0,055',
      inclination: '5,1° terhadap ekliptika',
    },
    atmosphere:
      'Hampir tidak memiliki atmosfer. Yang ada hanyalah eksosfer yang sangat tipis — total massanya hanya sekitar 10 metrik ton — yang mengandung helium, neon, argon, dan sejumlah kecil gas lain yang berasal dari angin surya dan peluruhan radioaktif. Tanpa atmosfer yang berarti, tidak ada suara, tidak ada cuaca, dan jejak kaki astronaut Apollo yang tertinggal di permukaannya diperkirakan akan bertahan jutaan tahun tanpa terganggu.',
    layers: [
      {
        name: 'Kerak',
        composition:
          'Tersusun dari batuan silikat yang ditutupi lapisan debu dan puing halus hasil tumbukan meteorit selama miliaran tahun (regolith). Dataran tinggi kuno (terrane) yang lebih terang bercampur dengan dataran basaltik gelap yang disebut maria — bekas luka dari letusan vulkanik purba. Kerak di sisi jauh Bulan lebih tebal dari sisi yang menghadap Bumi.',
      },
      {
        name: 'Mantel',
        composition:
          'Tersusun dari batuan silikat berat seperti olivin dan piroksen. Aktivitas seismik Bulan (gempa bulan) dahulu pernah terdeteksi oleh seismometer yang ditinggalkan astronaut Apollo, namun kini hampir tidak ada aktivitas yang berarti.',
      },
      {
        name: 'Inti',
        composition:
          'Inti Bulan relatif kecil dibandingkan ukuran keseluruhannya — terdiri dari inti dalam yang padat (kemungkinan besi) dan inti luar yang cair. Medan magnet Bulan praktis tidak ada saat ini; para ilmuwan percaya bahwa Bulan dulunya memiliki medan magnet aktif, namun inti cairnya terlalu kecil dan sudah sebagian besar membeku sehingga efek dinamonya padam.',
      },
    ],
  },

  Mars: {
    name: 'Mars',
    type: 'Planet Terestrial',
    description:
      'Dijuluki Planet Merah karena warna berkarat di permukaannya — hasil oksidasi (pengkaratan) mineral besi di batuan dan debu yang tersebar di seluruh permukaannya. Mars menyimpan bukti bahwa miliaran tahun lalu planet ini pernah memiliki sungai, danau, bahkan mungkin lautan. Kini ia menjadi dunia dingin dan kering dengan atmosfer yang sangat tipis, namun masih memiliki dua kutub es dan badai debu yang terkadang menutupi seluruh planet.',
    orbit: {
      semiMajorAxis: '1,52 SA',
      period: '687 hari Bumi',
      eccentricity: '0,09',
      inclination: '1,9°',
    },
    atmosphere:
      'Atmosfer Mars sangat tipis — tekanannya hanya sekitar 1% dari tekanan atmosfer Bumi di permukaan laut. Tersusun terutama dari karbon dioksida (~95%), nitrogen (~2,8%), dan argon (~2%). Atmosfer yang tipis ini tidak mampu menahan panas dengan baik, sehingga suhu di Mars bervariasi sangat ekstrem: dari sekitar -125°C di kutub saat musim dingin hingga 20°C di khatulistiwa saat siang hari musim panas. Badai debu musiman bisa berlangsung berbulan-bulan dan menutupi hampir seluruh permukaan planet.',
    layers: [
      {
        name: 'Kerak',
        composition:
          'Tersusun dari batuan basalt yang kaya besi oksida (karat besi) yang memberi warna merah khas Mars. Kerak Mars lebih tebal dari kerak Bumi — rata-rata sekitar 24–72 km. Di bawah dataran Tharsis yang luas terdapat beberapa gunung berapi terbesar di tata surya, termasuk Olympus Mons yang tingginya hampir tiga kali lipat Gunung Everest.',
      },
      {
        name: 'Mantel',
        composition:
          'Tersusun dari batuan silikat seperti olivin dan piroksen, mirip dengan mantel Bumi namun sudah lebih dingin dan kurang aktif. Mars tidak memiliki lempeng tektonik seperti Bumi. Aktivitas vulkaniknya terpusat di satu titik dalam waktu sangat lama, itulah mengapa gunung berapinya bisa tumbuh jauh lebih besar dari gunung berapi Bumi.',
      },
      {
        name: 'Inti',
        composition:
          'Inti Mars tersusun dari besi, nikel, dan kemungkinan sulfur dalam jumlah signifikan — yang menjadikannya lebih ringan dari inti Bumi. Data dari misi InSight NASA mengungkapkan bahwa inti Mars lebih besar dari perkiraan sebelumnya, dengan jari-jari sekitar 1.830 km. Mars tidak memiliki medan magnet global aktif saat ini — kemungkinan karena inti cair yang menggerakkan dinamo magnetnya sudah sebagian besar membeku sekitar 4 miliar tahun lalu.',
      },
    ],
  },

  Jupiter: {
    name: 'Yupiter',
    type: 'Raksasa Gas',
    description:
      'Planet terbesar di Tata Surya — massanya lebih dari dua kali lipat gabungan semua planet lainnya. Berdiameter sekitar 11 kali Bumi, namun berputar sangat cepat: satu hari di Yupiter hanya sekitar 10 jam. Yupiter diselimuti sabuk-sabuk awan berwarna kuning dan oranye yang berputar dalam pita-pita atmosfer yang berlapis. Di khatulistiwanya terdapat Bintik Merah Besar — badai raksasa yang sudah berlangsung setidaknya 350 tahun dan lebarnya setara dengan planet Bumi.',
    orbit: {
      semiMajorAxis: '5,2 SA',
      period: '~12 tahun',
      eccentricity: '0,05',
      inclination: '1,3°',
    },
    atmosphere:
      'Atmosfer Yupiter terutama tersusun dari hidrogen (~90%) dan helium (~10%), dengan jejak amonia, metana, dan uap air yang membentuk awan berlapis. Tidak ada permukaan padat — semakin dalam, gas secara perlahan beralih menjadi cairan tanpa batas yang jelas. Yupiter juga memiliki petir yang jauh lebih kuat dari petir di Bumi, terutama di sekitar kutubnya.',
    layers: [
      {
        name: 'Atmosfer Atas',
        composition:
          'Lapisan awan yang berlapis-lapis: amonia membeku membentuk awan putih di lapisan atas, diikuti amonium hidrosulfida di bawahnya, dan kemungkinan awan air di lapisan paling bawah yang bisa kita amati. Pita-pita berwarna di Yupiter adalah zona dan sabuk atmosfer yang bergerak dalam arah berlawanan dengan kecepatan angin mencapai 600 km/jam.',
      },
      {
        name: 'Hidrogen Cair Molekuler',
        composition:
          'Semakin dalam ke Yupiter, tekanan meningkat hingga gas hidrogen berubah fase menjadi cairan tanpa melewati batas yang jelas. Lapisan hidrogen cair ini sangat tebal dan merupakan sebagian besar volume planet.',
      },
      {
        name: 'Hidrogen Logam',
        composition:
          'Pada kedalaman yang lebih besar, tekanan mencapai sekitar 1,4 juta kali atmosfer Bumi, cukup untuk mengubah hidrogen cair menjadi hidrogen logam — kondisi di mana elektron-elektron bergerak bebas seperti dalam logam konduktor. Arus yang mengalir di lapisan ini menghasilkan medan magnet Yupiter yang paling kuat di antara semua planet Tata Surya.',
      },
      {
        name: 'Inti',
        composition:
          'Diperkirakan terdiri dari campuran batuan, logam, dan senyawa hidrogen yang terpadatkan oleh tekanan luar biasa. Berdasarkan data dari misi Juno, inti Yupiter kemungkinan bersifat "difus" — bukan bola padat yang jelas, melainkan gradien komposisi yang menyebar cukup jauh ke dalam lapisan gas di atasnya. Massanya diperkirakan setara dengan 10–40 kali massa Bumi.',
      },
    ],
  },

  Saturn: {
    name: 'Saturnus',
    type: 'Raksasa Gas',
    description:
      'Planet keenam dari Matahari, paling dikenal karena sistem cincinnya yang spektakuler — terbentuk dari miliaran pecahan es dan debu silikat yang mengorbit dalam piringan tipis yang lebar. Meski ukurannya besar, Saturnus adalah satu-satunya planet di Tata Surya yang massa jenisnya lebih rendah dari air: jika ada lautan raksasa yang cukup besar, Saturnus akan mengapung. Di kutub utaranya terdapat pola angin berbentuk heksagonal yang stabil — satu dari fenomena paling aneh yang pernah diamati di atmosfer planet manapun.',
    orbit: {
      semiMajorAxis: '9,5 SA',
      period: '~29 tahun',
      eccentricity: '0,06',
      inclination: '2,5°',
    },
    atmosphere:
      'Mirip Yupiter dalam komposisi dasarnya: hidrogen (~96%) dan helium (~3%), dengan jejak amonia dan metana. Sabuk-sabuk atmosfernya lebih pucat dan kalem dibandingkan Yupiter. Kecepatan anginnya bisa mencapai 1.800 km/jam di khatulistiwa — jauh melampaui badai terkuat di Bumi. Pola heksagonal di kutub utara Saturnus memiliki lebar sekitar 30.000 km dan sudah berlangsung selama puluhan tahun pengamatan.',
    layers: [
      {
        name: 'Atmosfer Berawan',
        composition:
          'Awan-awan amonia yang lebih tipis dan lebih pucat dari Yupiter, menyelimuti planet dalam pita-pita warna pastel. Di bawahnya terdapat lapisan awan amonium hidrosulfida dan kemungkinan awan air, namun tekanan dan suhu yang ekstrem membuatnya sulit diamati secara langsung.',
      },
      {
        name: 'Hidrogen Cair Molekuler',
        composition:
          'Lapisan tebal hidrogen yang beralih dari gas ke cairan seiring peningkatan tekanan. Transisi ini terjadi pada kedalaman yang lebih besar dari Yupiter karena massa Saturnus yang lebih kecil menghasilkan tekanan yang lebih rendah.',
      },
      {
        name: 'Hidrogen Logam',
        composition:
          'Pada tekanan yang cukup tinggi, hidrogen cair berubah menjadi kondisi metalik yang mengalirkan listrik. Lapisan ini menghasilkan medan magnet Saturnus — lebih lemah dari Yupiter, namun tetap jauh lebih kuat dari medan magnet Bumi. Uniknya, medan magnet Saturnus hampir sempurna simetris dengan sumbu rotasinya — suatu anomali yang masih dipelajari para ilmuwan.',
      },
      {
        name: 'Inti',
        composition:
          'Inti padat yang tersusun dari batuan silikat dan logam, diperkirakan bermassa sekitar 15–25 kali massa Bumi. Seperti Yupiter, data dari misi Cassini mengisyaratkan bahwa inti Saturnus mungkin bersifat difus — dengan komposisi yang berbaur secara bertahap ke lapisan gas di atasnya.',
      },
    ],
  },

  Uranus: {
    name: 'Uranus',
    type: 'Raksasa Es',
    description:
      'Planet ketujuh dari Matahari, tampil dalam warna biru-hijau toska yang khas akibat metana di atmosfernya yang menyerap cahaya merah. Hal paling mencolok dari Uranus adalah kemiringan sumbunya yang ekstrem — sekitar 98° terhadap bidang orbitnya, artinya Uranus hampir "berbaring miring" saat mengorbit Matahari. Kemiringan ini kemungkinan disebabkan oleh tabrakan dengan benda seukuran Bumi di masa awal tata surya. Akibatnya, kutub-kutubnya bergantian menghadap Matahari selama puluhan tahun.',
    orbit: {
      semiMajorAxis: '19,2 SA',
      period: '~84 tahun',
      eccentricity: '0,05',
      inclination: '0,8°',
    },
    atmosphere:
      'Tersusun terutama dari hidrogen (~83%), helium (~15%), dan metana (~2%). Metana inilah yang menyerap cahaya merah dan memantulkan cahaya biru-hijau, memberi Uranus warnanya yang khas. Dibandingkan Neptunus yang mirip ukurannya, atmosfer Uranus terlihat lebih tenang dan seragam — namun Uranus juga merupakan planet terdingin di Tata Surya dengan suhu minimum sekitar -224°C.',
    layers: [
      {
        name: 'Atmosfer',
        composition:
          'Campuran hidrogen, helium, dan metana yang membentuk kabut biru kehijauan yang hampir seragam. Di bawah lapisan kabut tipis ini terdapat awan-awan yang tersusun dari metana beku, amonia, dan air di lapisan yang lebih dalam dan lebih panas.',
      },
      {
        name: 'Mantel Es dan Air Panas',
        composition:
          'Berbeda dari namanya, "es" di sini bukan berarti beku — ini adalah campuran air, amonia, dan metana dalam kondisi cair bertekanan sangat tinggi yang berperilaku seperti cairan kental. Lapisan ini menyusun sebagian besar volume Uranus. Para ilmuwan menduga bahwa di lapisan ini mungkin terjadi hujan berlian, di mana tekanan dan suhu yang ekstrem mengkristalkan karbon menjadi berlian padat yang tenggelam ke inti.',
      },
      {
        name: 'Inti',
        composition:
          'Inti berbatu yang relatif kecil, tersusun dari batuan silikat dan kemungkinan logam, dengan massa sekitar 0,5–3,7 kali massa Bumi. Tidak seperti Yupiter dan Saturnus, tekanan di dalam Uranus tidak cukup tinggi untuk membentuk lapisan hidrogen logam, sehingga medan magnetnya dihasilkan oleh lapisan "es" cair yang bergolak di atasnya — itulah mengapa medan magnet Uranus sangat miring dan tidak beraturan.',
      },
    ],
  },

  Neptune: {
    name: 'Neptunus',
    type: 'Raksasa Es',
    description:
      'Planet kedelapan dan terjauh dari Matahari. Kembarannya Uranus dalam hal ukuran dan komposisi, namun jauh lebih aktif secara atmosferik. Neptunus memiliki angin tercepat di Tata Surya — bisa mencapai lebih dari 2.100 km/jam. Meski menerima cahaya Matahari yang sangat sedikit, Neptunus memiliki sumber panas internal yang membuatnya memancarkan lebih banyak energi daripada yang diterimanya dari Matahari. Planet ini memiliki 16 bulan yang diketahui, yang terbesar — Triton — mengorbit dalam arah berlawanan dan kemungkinan adalah objek yang tertangkap dari Sabuk Kuiper.',
    orbit: {
      semiMajorAxis: '30,1 SA',
      period: '~165 tahun',
      eccentricity: '0,009',
      inclination: '1,8°',
    },
    atmosphere:
      'Tersusun dari hidrogen (~80%), helium (~19%), dan metana (~1%) yang memberi Neptunus warna biru tua yang dalam — sedikit lebih pekat dari Uranus meski komposisinya serupa. Badai-badai raksasa muncul dan menghilang di atmosfernya, termasuk "Bintik Gelap Besar" yang diamati Voyager 2 pada 1989 namun sudah tidak terlihat ketika Hubble kembali mengamatinya beberapa tahun kemudian. Angin soniknya adalah yang paling kencang di tata surya.',
    layers: [
      {
        name: 'Atmosfer',
        composition:
          'Campuran hidrogen, helium, dan metana yang membentuk warna biru gelap khas Neptunus. Awan-awan metana beku bergerak dengan kecepatan angin supersonic dalam pola badai yang terus berubah. Tidak seperti Uranus yang tampak tenang, atmosfer Neptunus sangat dinamis meski berada lebih jauh dari Matahari.',
      },
      {
        name: 'Mantel Es Bertekanan Tinggi',
        composition:
          'Campuran air, amonia, dan metana dalam kondisi bertekanan dan bersuhu sangat tinggi — bukan beku, melainkan cair kental yang bergolak. Lapisan ini menyusun sebagian besar massa Neptunus. Arus-arus bergolak di lapisan ini menghasilkan medan magnet Neptunus yang kuat namun sangat miring — sekitar 47° dari sumbu rotasi planet, jauh berbeda dari medan magnet Bumi yang relatif sejajar.',
      },
      {
        name: 'Inti',
        composition:
          'Inti berbatu dan logam yang tersusun dari batuan silikat dan besi, dengan massa diperkirakan sekitar 1–3 kali massa Bumi. Sumber panas internal Neptunus yang menghasilkan lebih banyak energi daripada yang diterimanya dari Matahari kemungkinan berasal dari panas sisa pembentukan planet dan kompresi gravitasi yang masih berlangsung.',
      },
    ],
  },
};

let cardEl = null;
let scene = null;
let camera = null;
let renderer = null;
let planetMesh = null;
let animationId = null;
let currentView = 'planet'; // 'planet' or 'layers'
let currentPlanetName = null;
let layersMesh = null;

function ensureCard() {
  if (cardEl) return cardEl;
  cardEl = document.createElement('div');
  cardEl.id = 'infocard';
  cardEl.setAttribute('aria-hidden', 'true');
  cardEl.innerHTML = `
    <button type="button" id="infocard-close" aria-label="Tutup infocard">&times;</button>
    <div class="infocard-header">
      <h2 id="infocard-title"></h2>
      <p id="infocard-type" class="infocard-type"></p>
      <p id="infocard-desc" class="infocard-desc"></p>
    </div>
    <div class="infocard-scroll-wrap">
      <div class="infocard-visual-container">
        <canvas id="infocard-canvas"></canvas>
        <!-- Layers toggle disabled for now
        <div class="infocard-view-toggle">
          <button class="toggle-btn active" data-view="planet">Planet</button>
          <button class="toggle-btn" data-view="layers">Layers</button>
        </div>
        -->
      </div>
      <div id="infocard-orbit" class="infocard-section"></div>
      <div id="infocard-atmosphere" class="infocard-section"></div>
      <div id="infocard-layers" class="infocard-section"></div>
    </div>
  `;
  document.body.appendChild(cardEl);

  const closeBtn = cardEl.querySelector('#infocard-close');
  closeBtn.addEventListener('click', hide);

  // Toggle buttons
  const toggleBtns = cardEl.querySelectorAll('.toggle-btn');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.getAttribute('data-view');
      switchView(view);
    });
  });

  return cardEl;
}

function switchView(view) {
  if (view === currentView) return;

  currentView = view;
  const toggleBtns = cardEl.querySelectorAll('.toggle-btn');

  toggleBtns.forEach(btn => {
    if (btn.getAttribute('data-view') === view) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  if (view === 'layers') {
    // Hide planet, show layers
    if (planetMesh) planetMesh.visible = false;
    if (!layersMesh && currentPlanetName) {
      layersMesh = createLayersMesh(currentPlanetName);
      if (layersMesh) scene.add(layersMesh);
    } else if (layersMesh) {
      layersMesh.visible = true;
    }
  } else {
    // Show planet, hide layers
    if (planetMesh) planetMesh.visible = true;
    if (layersMesh) layersMesh.visible = false;
  }
}

function createLayersMesh(planetName) {
  const data = celestialData[planetName];
  if (!data || !data.layers || data.layers.length === 0) return null;

  const layersGroup = new THREE.Group();
  const numLayers = data.layers.length;

  // Color palette for layers
  const colors = [
    0xff6b6b, // Core - red
    0xffa500, // Mantle - orange
    0xffff00, // Outer layer - yellow
    0x4ecdc4, // Atmosphere - cyan
    0x95e1d3, // Upper atmosphere - light cyan
    0xc7ecee  // Outermost - very light cyan
  ];

  // Create hemisphere cross-section
  for (let i = 0; i < numLayers; i++) {
    const radius = 1 - (i / numLayers) * 0.9; // From 1.0 (core) to 0.1 (outer)
    const color = colors[numLayers - 1 - i] || 0x888888;

    const geometry = new THREE.SphereGeometry(radius, 32, 32, 0, Math.PI); // Hemisphere
    const material = new THREE.MeshStandardMaterial({
      color: color,
      side: THREE.DoubleSide,
      metalness: 0.2,
      roughness: 0.7,
      transparent: false
    });

    const hemisphere = new THREE.Mesh(geometry, material);
    hemisphere.rotation.y = -Math.PI / 2; // Orient to show cross-section
    layersGroup.add(hemisphere);
  }

  return layersGroup;
}

function setupRenderer() {
  if (renderer) return; // Already set up

  const canvas = cardEl.querySelector('#infocard-canvas');
  const container = cardEl.querySelector('.infocard-visual-container');

  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x050508);

  // Camera
  camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight, // Match container aspect
    0.1,
    1000
  );
  camera.position.set(0, 0, 8);

  // Renderer
  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true  // Enable alpha for transparent materials
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.sortObjects = true;  // Ensure transparent objects render correctly


  // Lighting - brighter setup for better planet visibility
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Increased from 0.3
  scene.add(ambientLight);

  const mainLight = new THREE.PointLight(0xffffff, 2.0, 100); // Increased from 1.5
  mainLight.position.set(5, 3, 5);
  scene.add(mainLight);

  const fillLight = new THREE.PointLight(0x88ccff, 1.0, 100); // Increased from 0.5
  fillLight.position.set(-5, -3, -5);
  scene.add(fillLight);

  // Add rim light for better definition
  const rimLight = new THREE.PointLight(0xffffff, 1.5, 100);
  rimLight.position.set(0, 5, -5);
  scene.add(rimLight);
}

function clonePlanetMesh(original) {
  // Collect original materials in traversal order
  const originalMaterials = [];
  original.traverse((child) => {
    if (child.isMesh && child.material) {
      originalMaterials.push(child.material);
    }
  });

  // Clone the entire group
  const cloned = original.clone(true);

  // Restore materials in same traversal order
  let index = 0;
  cloned.traverse((child) => {
    if (child.isMesh && index < originalMaterials.length) {
      const origMat = originalMaterials[index];

      // Handle Earth's custom shader material specifically to adjust its sun position
      if (origMat.isShaderMaterial && origMat.uniforms && origMat.uniforms.sunPosition) {
        child.material = origMat.clone();
        // Clone uniforms object to avoid referencing the main scene's uniforms
        child.material.uniforms = Object.assign({}, origMat.uniforms);
        // Point the sun position to the infocard's main light
        child.material.uniforms.sunPosition = { value: new THREE.Vector3(5, 3, 5) };
      } else {
        child.material = origMat;
      }

      index++;
    }
  });

  return cloned;
}

// Shared helper — dispose a mesh and all its children's geometry/materials
function disposeMesh(mesh) {
  mesh.traverse((child) => {
    if (child.geometry) child.geometry.dispose();
    if (child.material) {
      if (Array.isArray(child.material)) {
        child.material.forEach((m) => m.dispose());
      } else {
        child.material.dispose();
      }
    }
  });
}

function renderPlanet(originalPlanet) {
  if (!renderer) setupRenderer();

  // Clear previous planet
  if (planetMesh) {
    scene.remove(planetMesh);
    disposeMesh(planetMesh);
  }

  // Clone and add new planet
  planetMesh = clonePlanetMesh(originalPlanet);
  planetMesh.position.set(0, 0, 0);

  scene.add(planetMesh);

  // Adjust camera distance based on planet size
  const box = new THREE.Box3().setFromObject(planetMesh);
  const size = box.getSize(new THREE.Vector3()).length();
  const distance = size * 2.5;
  camera.position.set(0, 0, distance);
  camera.lookAt(0, 0, 0);

  // Start animation
  startAnimation();
}

function startAnimation() {
  if (animationId) cancelAnimationFrame(animationId);

  function animate() {
    if (!renderer || !scene || !camera) return;

    // Rotate planet
    if (planetMesh) {
      planetMesh.rotation.y += 0.005;
    }

    renderer.render(scene, camera);
    animationId = requestAnimationFrame(animate);
  }

  animate();
}

function stopAnimation() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
}

function cleanupRenderer() {
  stopAnimation();

  if (planetMesh) {
    scene.remove(planetMesh);
    disposeMesh(planetMesh);
    planetMesh = null;
  }

  if (renderer) {
    renderer.dispose();
    renderer = null;
  }

  scene = null;
  camera = null;
}

function renderOrbit(container, orbit) {
  if (!orbit) {
    container.innerHTML = '';
    container.style.display = 'none';
    return;
  }
  container.style.display = 'block';
  container.innerHTML = `
    <h3 class="infocard-section-title">Orbit</h3>
    <div class="metric-grid">
      <div class="metric-card">
        <span class="metric-label">Sumbu semi-mayor</span>
        <span class="metric-value">${orbit.semiMajorAxis}</span>
      </div>
      <div class="metric-card">
        <span class="metric-label">Periode orbit</span>
        <span class="metric-value">${orbit.period}</span>
      </div>
      <div class="metric-card">
        <span class="metric-label">Eksentrisitas</span>
        <span class="metric-value">${orbit.eccentricity}</span>
      </div>
      <div class="metric-card">
        <span class="metric-label">Inklinasi</span>
        <span class="metric-value">${orbit.inclination}</span>
      </div>
    </div>
  `;
}

function renderAtmosphere(container, atmosphere) {
  if (!atmosphere) {
    container.innerHTML = '';
    container.style.display = 'none';
    return;
  }
  container.style.display = 'block';
  container.innerHTML = `
    <h3 class="infocard-section-title">Atmosfer</h3>
    <p class="infocard-atmosphere-text">${atmosphere}</p>
  `;
}

function renderLayers(container, layers) {
  if (!layers || !layers.length) {
    container.innerHTML = '';
    container.style.display = 'none';
    return;
  }
  container.style.display = 'block';
  container.innerHTML = `
    <h3 class="infocard-section-title">Struktur internal & komposisi</h3>
    <div class="infocard-layers-list">
      ${layers.map((layer, i) => `
        <div class="infocard-layer" data-layer="${i}">
          <h4 class="infocard-layer-name">${layer.name}</h4>
          <p class="infocard-layer-composition">${layer.composition}</p>
        </div>
      `).join('')}
    </div>
  `;
}

/**
 * Tampilkan infocard untuk benda langit.
 * @param {string} name - Nama benda (mis. 'Earth', 'Sun'). Harus ada di celestialData.
 * @param {THREE.Object3D} planetObject - The planet mesh/group from the main scene
 */
export function show(name, planetObject) {
  const data = celestialData[name];
  if (!data) return;

  const el = ensureCard();
  currentPlanetName = name; // Store for layer generation

  el.querySelector('#infocard-title').textContent = data.name;
  el.querySelector('#infocard-type').textContent = data.type;
  el.querySelector('#infocard-desc').textContent = data.description;

  renderOrbit(el.querySelector('#infocard-orbit'), data.orbit);
  renderAtmosphere(el.querySelector('#infocard-atmosphere'), data.atmosphere);
  renderLayers(el.querySelector('#infocard-layers'), data.layers);

  // Render planet visual
  if (planetObject) {
    renderPlanet(planetObject);
  }

  // Reset to planet view
  currentView = 'planet';

  // Clean up old layers mesh if switching planets (uses disposeMesh helper)
  if (layersMesh) {
    scene.remove(layersMesh);
    disposeMesh(layersMesh);
    layersMesh = null;
  }

  el.setAttribute('aria-hidden', 'false');
  el.classList.add('infocard-visible');

  // Notify main.js to adjust camera
  window.dispatchEvent(new CustomEvent('infocard-toggled', { detail: { visible: true } }));
}

/**
 * Sembunyikan infocard.
 */
export function hide() {
  if (!cardEl) return;
  cardEl.classList.remove('infocard-visible');
  cardEl.setAttribute('aria-hidden', 'true');

  // Cleanup Three.js resources
  cleanupRenderer();

  // Notify main.js to reset camera
  window.dispatchEvent(new CustomEvent('infocard-toggled', { detail: { visible: false } }));
}
