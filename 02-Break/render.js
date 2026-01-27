function renderTemuan() {
    const container = document.getElementById("temuan");

    temuan.forEach(item => {
        const div = document.createElement("div");
        div.className = `kartu ${item.tingkatKeparahan.toLowerCase()}`;

        div.innerHTML = `
        <h3>${item.id}. ${item.judul}</h3>
        <p><b>Keparahan:</b> ${item.tingkatKeparahan}</p>
        <p><b>Kategori:</b> ${item.kategori}</p>
        <p><b>Deskripsi:</b> ${item.deskripsi}</p>
        <p><b>Dampak:</b> ${item.dampak}</p>
        <p><b>Kode:</b> ${item.contohKode}</p>
        <p><b>Rekomendasi:</b> ${item.rekomendasi}</p>
        `;
    container.appendChild(div);
    });
}
renderTemuan();