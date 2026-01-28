# 03 - Attack Phase

Fase ini mendokumentasikan cara berpikir attacker terhadap smart contract dalam konteks web3 yang terdesentralisasi.

Fokus utama pada fase ini BUKAN melakukan hcking atau eksploitasi teknis, melainkan memahami bagaimana sebuah smart contract dapat gagal akibat asumsi yang keliru, desain insentif yang lemah, atau model kepercayaan yang tidak sesuai dengan prinsip desentralisasi.

## Ruang Lingkup
- Tidak ada admin abuse
- Tidak ada privileged access
- Tidak ada eksploit Solidity klasik
- Attacker diasumsikan sebagai user atau smart contract biasa
- Semua serangan mematuhi prinsip web3 (permissionless & trustless)

## Tujuan
Tujuan fase ini adalah membangun *attacker mindset*:
mampu melihat smart contract dari sudut pandang pihak rasional yang berusaha memaksimalkan keuntungan atau dampak tanpa melanggar aturan yang ditetapkan kontrak.

Fase ini menjadi jembatan antara:
- kontrak yang "aman secara kode"
- dengan kontrak yang "aman secara desain dan insentif"

hasil dari fase ini akan digunakan sebagai dasar untuk fase berikutnya: **04 - Remediation**.