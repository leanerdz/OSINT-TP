let data = [
    {
        "file": "6.jpg",
        "date": "2025-03-07T11:48:49.000Z",
        "dateModif": "2025-03-07T11:48:49.000Z",
        "device": "AppleiPhone 15 Pro",
        "software": "17.5.1",
        "latitude": 42.287997222222224,
        "longitude": 3.275786111111111
    },
    {
        "file": "7.JPG",
        "date": "2025-03-08T10:35:21.000Z",
        "dateModif": "2025-03-08T10:35:21.000Z",
        "device": "AppleiPhone 15 Pro",
        "software": "17.5.1",
        "latitude": 41.374969444444446,
        "longitude": 2.1696722222222222
    },
    {
        "file": "8.jpg",
        "date": "2025-03-10T12:26:44.000Z",
        "dateModif": "2025-03-10T12:26:44.000Z",
        "device": "AppleiPhone 15 Pro",
        "software": "17.5.1",
        "latitude": 40.750527777777776,
        "longitude": 0.7776527777777779
    },
    {
        "file": "9.jpg",
        "date": "2025-03-10T17:14:36.000Z",
        "dateModif": "2025-03-10T17:14:36.000Z",
        "device": "AppleiPhone 15 Pro",
        "software": "17.5.1",
        "latitude": 38.20988333333334,
        "longitude": -1.0822055555555556
    },
    {
        "file": "10.jpg",
        "date": "2025-03-11T09:45:20.000Z",
        "dateModif": "2025-03-11T09:45:20.000Z",
        "device": "AppleiPhone 15 Pro",
        "software": "17.5.1",
        "latitude": 37.89680833333333,
        "longitude": -1.4280111111111111
    },
    {
        "file": "11.jpg",
        "date": "2025-03-11T15:50:34.000Z",
        "dateModif": "2025-03-11T15:50:34.000Z",
        "device": "AppleiPhone 15 Pro",
        "software": "17.5.1",
        "latitude": 36.73054444444445,
        "longitude": -2.1450722222222223
    },
    {
        "file": "12.jpg",
        "date": "2025-03-12T08:36:27.000Z",
        "dateModif": "2025-03-12T08:36:27.000Z",
        "device": "AppleiPhone 15 Pro",
        "software": "17.5.1",
        "latitude": 37.034275,
        "longitude": -2.447805555555556
    },
    {
        "file": "13.jpg",
        "date": "2025-03-12T10:32:37.000Z",
        "dateModif": "2025-03-12T10:32:37.000Z",
        "device": "AppleiPhone 15 Pro",
        "software": "17.5.1",
        "latitude": 37.50402777777778,
        "longitude": -3.0879222222222222
    },
    {
        "file": "14.jpg",
        "date": "2025-03-12T14:31:09.000Z",
        "dateModif": "2025-03-12T14:31:09.000Z",
        "device": "AppleiPhone 15 Pro",
        "software": "17.5.1",
        "latitude": 37.305102777777776,
        "longitude": -3.1834416666666665
    },
    {
        "file": "15.jpg",
        "date": "2025-03-12T18:19:50.000Z",
        "dateModif": "2025-03-12T18:19:50.000Z",
        "device": "AppleiPhone 15 Pro",
        "software": "17.5.1",
        "latitude": 37.18111111111111,
        "longitude": -3.5926555555555555
    },
    {
        "file": "1.jpg",
        "date": "2025-03-15T10:33:38.000Z",
        "dateModif": "2025-03-15T10:33:38.000Z",
        "device": "AppleiPhone 15 Pro",
        "software": "17.5.1",
        "latitude": 35.78423333333333,
        "longitude": -5.811936111111111
    },
    {
        "file": "2.jpg",
        "date": "2025-03-16T12:14:13.000Z",
        "dateModif": "2025-03-16T12:14:13.000Z",
        "device": "AppleiPhone 15 Pro",
        "software": "17.5.1",
        "latitude": 35.784819444444445,
        "longitude": -5.812452777777778
    },
    {
        "file": "3.jpg",
        "date": "2025-03-18T10:03:46.000Z",
        "dateModif": "2025-03-18T10:03:46.000Z",
        "device": "AppleiPhone 15 Pro",
        "software": "17.5.1",
        "latitude": 41.57673333333334,
        "longitude": -6.187688888888889
    },
    {
        "file": "4.jpg",
        "date": "2025-03-18T16:20:46.000Z",
        "dateModif": "2025-03-18T16:20:46.000Z",
        "device": "AppleiPhone 15 Pro",
        "software": "17.5.1",
        "latitude": 42.200519444444446,
        "longitude": -1.5165527777777779
    },
    {
        "file": "5.jpg",
        "date": "2025-03-19T10:27:26.000Z",
        "dateModif": "2025-03-19T10:27:26.000Z",
        "device": "AppleiPhone 15 Pro",
        "software": "17.5.1",
        "latitude": 41.68355277777778,
        "longitude": -0.15499166666666667
    }
]

var map = L.map('map').setView([42.287997222222224, 3.275786111111111], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
let images_number = 0
const points = [];
data.forEach((item) => {
    images_number++
    item.number = images_number
    console.log(item);
    let modif = false
    if (item.date!=item.dateModif){
        modif = true
    }
    L.marker([item.latitude, item.longitude]).addTo(map)
        .bindPopup(`<h2>${item.number} - ${item.date}</h2><br>
                    <img class="photo" src="./trip/${item.file}" alt="photo"/><br>
                    Appareil: ${item.device}<br>
                    Logiciel: ${item.software}<br>
                    Modification : ${modif}<br>`)
        .openPopup();
    points.push([item.latitude, item.longitude]);

})
if (points.length) {
    const bounds = L.latLngBounds(points);
    map.fitBounds(bounds);
    L.polyline(points, { color: 'blue' }).addTo(map);
}
/*
fetch('../gpsData.json')
    .then(res => res.json())
    .then(data => {
        const parseDate = (rawDate) => {
            if (!rawDate || rawDate === 'unknown') return new Date(0);
            return new Date(
                rawDate.replace(/^(\d{4}):(\d{2}):(\d{2})/, '$1-$2-$3').replace(' ', 'T')
            );
        };

        data.sort((a, b) => parseDate(a.date) - parseDate(b.date));

        const map = L.map('map').setView([0, 0], 2);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
        }).addTo(map);

        const points = [];

        data.forEach((item, index) => {
            if (item.lat && item.lon) {
                const number = index + 1;

                const icon = L.divIcon({
                    className: 'custom-div-icon',
                    html: `<div style="background:#007bff;color:white;border-radius:50%;width:30px;height:30px;text-align:center;line-height:30px;">${number}</div>`,
                    iconSize: [30, 30],
                    iconAnchor: [15, 15]
                });

                const marker = L.marker([item.lat, item.lon], { icon }).addTo(map);
                marker.bindPopup(`
                    <strong>#${number} — ${item.date}</strong><br>
                    Appareil: ${item.device}<br>
                    Logiciel: ${item.software}<br>
                    <img class="photo" src="../images/${item.file}" alt="photo"/>
                `);

                points.push([item.lat, item.lon]);
            }
        });

        if (points.length) {
            const bounds = L.latLngBounds(points);
            map.fitBounds(bounds);
            L.polyline(points, { color: 'blue' }).addTo(map);
        }
    });
*/