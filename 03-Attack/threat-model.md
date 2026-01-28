# Threat Model
Dokumen ini mendefinisikan model ancaman (threat model) yang digunakan dalam fase attack.

Threat model ini mencerminkan kondisi dunia nyata web3, bukan sumsi ideal atau terpusat.

---

## Profil Attacker
Attacker diasumsikan sebagai:
- User biasa (Externally Owned Account / EOA)
- Smart contract tanpa privilege khusus
- Tidak memiliki akses admin
- Tidak memiliki private key orang lain

---

## Kemampuan Attacker
Attacker dianggap mampu untuk:
- Membuat alamat(address) dalam jumlah yang tak terbatas
- Mendeploy smart contract sendiri
- Membaca state blockchain secara publik
- Mengamati transaksi di mempool
- Mengatur gas fee
- Bertindak rasional secara ekonomi
- Melakukan transaksi berulang selama membayar gas

---

## Batasan Attacker
Attacker tidak dianggap mampu untuk:
- Mengambil alih admin key
- Mengubah kode smart contract
- Mengakses sistem off-chain privat
- Melanggar konsensus blockchain
- Melakukan serangan di luar aturan protokol

---

## Prinsip Penting
Semua serangan dalam fase ini:
- Tidak melanggar aturan smart contract
- Tidak membutuhkan bug solidity
- Tidak bergantung pada sentralisasi
- Sepenuhnya sah dalam ekosistem web3


Dengan threat model ini, jika sebuah kontrak gagal maka kegagalan tersebut berasal dari desain, asumsi, atau insentif - bukan dari bug teknis.