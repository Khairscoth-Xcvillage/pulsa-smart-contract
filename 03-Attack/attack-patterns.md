# Attack Patterns (web3 -Native)

Dokumen ini berisi kumpulan pola serangan (attack patterns) yang umum terjadi dalam sistem web3 terdesentralisasi.

Semua pola dibawah ini:
- Tidak membutuhkan eksploit kode
- Tidak membutuhkan akses admin
- Terjadi karena sifat permissionless blockchain


---
## 1. SYBIL ATTACK
**Deskripsi**
Satu entitas mengontrol banyak address untuk mendapatkan pengaruh lebih besar.

**Kenapa Bisa Terjadi**
Blockchain tidak memiliki identitas native.
Address murah dan mudah dibuat.

**Dampak**
voting dibajak, whitelist habis, dan statistik dimanipulasi.


---
## 2. CONTACT-BASED SYBIL
**Deskripsi**
Sybil attack menggunakan smart contract untuk membuat banyak address sekaligus.

**Kenapa Bisa Terjadi**
Smart Contract adalah partisipan sah di web3.

**Dampak**
Skala serangan meningkat drastis dengan biaya rendah.


---
## 3. SLOT HIJACKING (QUOTA ABUSE)
**Deskripsi**
Attacker menghabiskan seluruh slot pasrtisipasi lebih awal.

**Kenapa Bisa Terjadi**
Model first-come-first-serve tanpa perlindungn ekonomi.

**Dampak**
User asli tidak bisa ikut.


---
## 4. LOW-COST SPAM
**Deskripsi**
Spam fungsi publik karen biaya lebih kecil dari dampaknya

**Kenapa Bisa Terjadi**
Tidak ada rate limit atau biaya partisipasi.

**Dampak**
State rusak, sistem tidak usable.


---
## 5. REWARD FARMING (TANPA BUG)
**Deskripsi**
Mengambil reward berulang kali karena insentif salah.

**Kenapa Bisa Terjadi**
reward lebih besar dari biaya gas.

**Dampak**
Dana sistem terkuras secara sah


---
## 6. GAS SUBSIDY ABUSE
**Deskripsi**
Menjadikan refund atau subsisdi gas sebagai sumber profit.

**Kenapa Bisa Terjadi**
Perhitungan ekonomi tidak mempertimbangkan abuse.

**Dampak**
Kerugian sistem tanpa pelanggaran aturan.


---
## 7. LAST-MOVER ADVANTAGE
**Deskripsi**
Menunggu hingga momen paling menguntungkan sebelum bertindak.

**Kenapa Bisa Terjadi**
State blockchain transparan dan deterministik.

**Dampak**
Ketidakadilan bagi user awal.


---
## 8. GRIEFING ATTACK
**Deskripsi**
Menimbulkan kerugian bagi sistem dengan biaya kecil.

**Kenapa Bisa Terjadi**
Tidak semua attacker mencari profit.

**Dampak**
Sistem rusak walau attacker rugi sedikit.


---
## 9. FRONT-RUNNING
**Deskripsi**
Mendahului transaksi user lain lewat mempool.

**Kenapa Bisa terjadi**
Mempool bersifat publik.

**Dampak**
User kalah cepat, hasil dimanipulasi.


---
## 10. SANWICH ATTACK (NON-AMM)
**Deskripsi**
Masuk sebelum dan sesudah transaksi target.

**Kenapa Bisa Terjadi**
Tidak ada proteksi urutan transaksi.

**Dampak**
Outcome user dirusak.


---
## 11. PUBLIC ACTION ABUSE
**Deskripsi**
Fungsi publik dipakai bot lebih efisien dari user manusia.

**Kenapa Bisa terjadi**
Tidak ada perbedaan antara bot dan manusia.

**Dampak**
User normal kalah kompetisi


---
## 12. STATE RESEN ABUSE
**Deskripsi**
State penting bisa direset oleh siapu pun.

**Kenapa Bisa terjadi**
Tidak ada pembatasan fungsi reset.

**Dampak**
Progress sistem selalu gagal.


---
## 13. REPLAY LOGIC ABUSE (OFF-CHAIN)
**Deskripsi**
Event diproses ulang oleh sistem off-chain

**Kenapa Bisa Terjadi**
Tidak ada nonce atau idempotency.

**Dampak**
Double counting, billing salah.


---
## 14. TIMESTAMP MANIPULATION
**Deskripsi**
Validator menggeser timestamp dalam batas toleransi.

**Kenapa Bisa Terjadi**
Timestamp bukan jam absolut.

**Dampak**
Bypass batas waktu.


---
## 15. MEV EXTRACTION
**Deskripsi**
Mengambil nilai dari pengurutan transaksi.

**Kenapa Bisa Terjadi**
Block builder bebas menyusun transaksi.

**Dampak**
Value berpindah ke searcher.


---
## 16. DAO VOTE CAPTURE
**Deskripsi**
Menguasai voting tanpa bug.

**Kenapa Bisa Terjadi**
Token dapat dipinjam sementara.

**Dampak**
Governance dibajak.


---
## 17. GOVERNANCE GRIEFING
**Deskripsi**
Menghambat keputusan tanpa mencuri apapun.

**Kenapa Bisa Terjadi**
Tidak ada cost proposal atau vote.

**Dampak**
DAO lumpuh


---
## 18. LIQUIDITY DRAIN (INCENTIVE FAILURE)
**Deskripsi**
Exit massal akibat insentif buruk.

**Kenapa Bisa Terjadi**
Reward tidak berkelanjutan.

**Damoak**
Sistem runtuh tanpa eksploit.
