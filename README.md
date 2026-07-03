# Gitar Akort Cihazı

Mikrofonla çalınan gitar telini gerçek zamanlı dinleyip hedef notaya göre pes/tiz durumunu gösteren, tarayıcıda çalışan bir web uygulaması. Sunucu yok, veritabanı yok — tamamen `index.html` dosyasını çift tıklayıp açarak çalışır.

## Durum: Çalışıyor, tüm ana adımlar tamam

Bu proje adım adım şu sırayla inşa edildi (her adım kendi başına test edildi):

1. Mikrofon izni + ses seviyesi göstergesi
2. Autocorrelation ile sesten frekans (Hz) bulma
3. Hz'i nota adına çevirme (A4=440Hz referanslı formül)
4. Hedef tel seçilip ona olan uzaklığı (cent) gösteren akort göstergesi
5. Görsel tasarım: `Asset/` klasöründeki tasarım teslim paketinden (design handoff) uyarlanan koyu/amber tema — gitar kafası (headstock) illüstrasyonu, 6 tel için tıklanabilir düğümler, dairesel cent göstergesi, durum balonu
6. Frekans okumasındaki ani sıçramaları azaltmak için üstel yumuşatma + "outlier" (aykırı değer) reddi
7. Son birkaç saniyenin cent geçmişini gösteren küçük çizgi grafik (canvas) — anlık iğneye ek olarak eğilimi (yaklaşıyor mu, uzaklaşıyor mu) görmek için
8. Sağ üstte 10 dilli dil seçici (bayrak + kendi dilinde isim): Türkçe, English, Español, Français, Deutsch, Italiano, Português, Русский, 中文, العربية. Tüm arayüz metinleri `script.js` içindeki `TRANSLATIONS` objesinden geliyor, `t("anahtar")` ile okunuyor. Not: dört yön (RTL) desteği eklenmedi, Arapça metin doğru görünür ama sayfa düzeni her zaman soldan sağa kalıyor (bilinçli kapsam kısıtlaması).
9. Yatay (iki panelli) düzen: solda bilgi/kontroller, sağda büyük gitar kafası illüstrasyonu. Dar pencerelerde otomatik dikey düzene dönüyor (bkz. `style.css` içindeki `@media (max-width: 560px)`).
10. Sağ üstte 6 renkli tema seçici (kehribar, turkuaz, mavi, mor, pembe, gümüş) — `style.css`'in başındaki CSS değişkenleri (`--accent`, `--bg-1/2`, `--card-1/2`, `--border`) `:root[data-theme="..."]` ile üzerine yazılıyor. Seçim `localStorage`'da (`gitar-akort-theme`) hatırlanıyor. Gitar kafasının ahşap rengi ve akort durum renkleri (yeşil/sarı/kırmızı) kasıtlı olarak temadan bağımsız/sabit tutuldu.
11. Kartın altına, iki paneli de kapsayan tam genişlikte bir "Buy me a coffee" destek linki eklendi (`buymeacoffee.com/Armin1142`). İnce bir üst ayraç çizgisiyle ayrılmış, soluk bir tonda duruyor ki mikrofon butonuyla dikkat çekme rekabetine girmesin; üzerine gelince tema rengine (`--accent`) dönüyor.

## Dosyalar

- `index.html` — sayfa yapısı, SVG gitar kafası illüstrasyonu
- `style.css` — koyu/amber tema, tüm görsel stiller
- `script.js` — mikrofon erişimi, perde algılama, akort mantığı, arayüz güncellemeleri
- `Asset/` — tasarım referansı (design handoff), README ve `.dc.html` prototip içerir. Doğrudan çalıştırılmaz, sadece renk/layout/mantık referansı olarak kullanıldı.

## Nasıl çalışır (kısaca)

- **Perde algılama**: `script.js` içindeki `autoCorrelate()` fonksiyonu, ses dalgasını kendi kopyasıyla farklı kaydırmalarda karşılaştırarak (autocorrelation) baskın frekansı buluyor. Sonuç 60–500 Hz dışındaysa (gitar aralığı dışı) geçersiz sayılıyor.
- **Yumuşatma**: Ham Hz değeri her karede `smooth = smooth*0.88 + f*0.12` ile yumuşatılıyor. Mevcut değerden %8'den fazla sapan okumalar hemen kabul edilmiyor; aynı yeni değer 4 kare üst üste tekrar ederse "gerçek değişiklik" (örn. başka tele geçiş) kabul ediliyor.
- **Cent hesabı**: `cents = 1200 * log2(hz / hedefFrekans)`. Akortta sayılma eşiği ±5 cent (`TOLERANCE`), ±18 cent'e kadar "biraz pes/tiz" (`SOMEWHAT`), ötesi "çok pes/tiz".
- **Tel hedef frekansları**: E2=82.41, A2=110.00, D3=146.83, G3=196.00, B3=246.94, E4=329.63 Hz (standart akort, EADGBE).
- Sayfa, Google Fonts'tan **Space Grotesk** ve **Spline Sans Mono** yüklüyor — internet bağlantısı gerektirir (yoksa sistem fontuna düşer, uygulama yine çalışır).

## Fikir / sonraki adımlar (henüz yapılmadı)

- Akort toleransını (şu an sabit ±5 cent) kullanıcının ayarlayabileceği bir kontrol eklemek
- Farklı akort (drop D, vs.) seçenekleri
- Akor (aynı anda birden fazla tel) algılama — bu çok daha zor bir problem (çoklu frekans ayrıştırma), bilinçli olarak kapsam dışı bırakıldı

## Yayında

Proje GitHub Pages üzerinden ücretsiz yayında: **https://armin1142.github.io/guitar-tuner/**

- **Depo**: [github.com/Armin1142/guitar-tuner](https://github.com/Armin1142/guitar-tuner) — önce `gitar-akort` adıyla açıldı, sonra İngilizce Reddit'te paylaşmak için `guitar-tuner` olarak yeniden adlandırıldı. Repo yeniden adlandırılınca yayın adresi de değişti, eski link artık çalışmıyor.
- **Neden GitHub Pages**: proje sunucu/veritabanı gerektirmiyor (sadece HTML/CSS/JS), bu yüzden en basit ücretsiz barındırma seçeneği bu — dosyaları koyup "yayınla" demek yeterli. Ayrıca otomatik HTTPS sağlıyor; tarayıcılar mikrofon erişimine (`getUserMedia`) sadece güvenli (HTTPS) bağlantılarda izin verdiği için bu şart.
- **Git kurulu olmadan yayınlama**: Bu bilgisayarda git kurulu değildi. Onun yerine GitHub CLI (`gh`) ile tarayıcı üzerinden güvenli giriş yapıldı (cihaz kodu / "device flow" — şifre veya token hiç paylaşılmadı) ve dosyalar doğrudan GitHub'ın Contents API'sine (base64 olarak) yüklendi. Yani git bilmeden de bir proje GitHub'a yükleyip yayına almak mümkün.
- **Ziyaretçi sayısı**: [GoatCounter](https://www.goatcounter.com) ile eklendi (`index.html` içindeki `<script data-goatcounter="...">` satırı). Çerez kullanmıyor, kişisel veri toplamıyor — bu yüzden siteye "çerez izni" uyarısı eklemeye gerek kalmadı. İstatistikler yalnızca hesap sahibine açık bir panelden (armin1142.goatcounter.com) izleniyor.

## Öğrenme amaçlı proje notu

Bu, kullanıcının (öğrenci, kod öğreniyor) ikinci projesi — ilk proje `../yaz projelerim uygulaması/` klasöründeki görev takip uygulaması. Anlatım tarzı: "neden" öncelikli, ağır teknik detaydan kaçınarak.
