export function konversi_hari(day) {
    var myDays = ['Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum\'at', 'Sabtu']
    return myDays[day]
}

export function tanggal_sekarang() {
    var myDays = ['Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum\'at', 'Sabtu']
    var date = new Date()
    // var hari = date.getDate()
    // var bulan = date.getMonth()
    var hari = (parseInt(date.getDate()-1, 10) + 101).toString().substr(1)
    var bulan = (parseInt((date.getMonth()), 10) + 101).toString().substr(1)
    var nama_hari = myDays[date.getDay()]
    var tahun = date.getFullYear();

    return nama_hari + ', ' + hari + "/" + bulan + "/" + tahun
}

export function tanggal_sekarang_form() {
    var date = new Date()
    var hari = (parseInt(date.getDate()-1, 10) + 101).toString().substr(1)
    var bulan = (parseInt((date.getMonth()), 10) + 101).toString().substr(1)
    var tahun = date.getFullYear();

    return tahun + '-' + bulan + '-' + hari
}

