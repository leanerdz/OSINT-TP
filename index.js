const ExifImage = require('exif').ExifImage;
const fs = require('fs');
const path = require('path');
let images_dir = path.join(__dirname, "trip");
let gpsDataArray = [];

function dmsToDecimal(dms, ref) {
    const [degrees, minutes, seconds] = dms;
    let dec = degrees + minutes / 60 + seconds / 3600;
    return (ref === 'S' || ref === 'W') ? -dec : dec;
}
fs.readdir(images_dir, (err, files) => {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    files.forEach((file) => {
        let filePath = path.join(images_dir, file);
        try {
            new ExifImage({ image: filePath }, function (error, exifData) {
                if (error) {
                    console.log('Error: ' + error.message);
                } else {
                    // console.log(`GPS data for ${file}:`, exifData.gps);
                    const latitude = exifData.gps.GPSLatitude && exifData.gps.GPSLatitudeRef ? dmsToDecimal(exifData.gps.GPSLatitude, exifData.gps.GPSLatitudeRef) : null;
                    const longitude = exifData.gps.GPSLongitude && exifData.gps.GPSLongitudeRef ? dmsToDecimal(exifData.gps.GPSLongitude,exifData. gps.GPSLongitudeRef) : null;
                    gpsDataArray.push({
                        file: file,
                        date: parseDate(exifData.exif.DateTimeOriginal),
                        dateModif: parseDate(exifData.image.ModifyDate),
                        device: exifData.image.Make + exifData.image.Model,
                        software: exifData.image.Software || 'none',
                        latitude: latitude,
                        longitude: longitude,
                    });
                    if (gpsDataArray.length === 15) {
                        gpsDataArray.sort((a, b) => a.date - b.date);
                        console.log(gpsDataArray);
                        writeGpsDataToJson()
                    }
                }
            });
        } catch (error) {
            console.log('Error: ' + error.message);
        }

    });

});

let writeGpsDataToJson = () => {
    const jsonData = JSON.stringify(gpsDataArray, null, 2);
    fs.writeFile('gpsData.json', jsonData, (err) => {
        if (err) {
            return console.log('Error writing to JSON file: ' + err);
        }
        console.log('GPS data has been written to gpsData.json');
    });
}

let parseDate = (dateString) => {
    const [datePart, timePart] = dateString.split(' ');
    const [year, month, day] = datePart.split(':').map(Number);
    const [hours, minutes, seconds] = timePart.split(':').map(Number);
    return new Date(year, month - 1, day, hours, minutes, seconds);
}


/*
const fs = require('fs');
const path = require('path');
const ExifImage = require('exif').ExifImage;

const imagesDir = path.join(__dirname, 'images');
const output = [];

fs.readdirSync(imagesDir).forEach((file) => {
    if (file.toLowerCase().endsWith('.jpg')) {
        try {
            new ExifImage({ image: path.join(imagesDir, file) }, function (error, exifData) {
                if (error) {
                    console.log(`Erreur avec ${file} : ${error.message}`);
                } else {
                    const gps = exifData.gps;
                    const image = exifData.image;
                    const exif = exifData.exif;

                    function dmsToDecimal(dms, ref) {
                        const [degrees, minutes, seconds] = dms;
                        let dec = degrees + minutes / 60 + seconds / 3600;
                        return (ref === 'S' || ref === 'W') ? -dec : dec;
                    }

                    const latitude = gps.GPSLatitude && gps.GPSLatitudeRef ? dmsToDecimal(gps.GPSLatitude, gps.GPSLatitudeRef) : null;
                    const longitude = gps.GPSLongitude && gps.GPSLongitudeRef ? dmsToDecimal(gps.GPSLongitude, gps.GPSLongitudeRef) : null;

                    output.push({
                        file,
                        date: exif.DateTimeOriginal || image.ModifyDate || 'unknown',
                        device: image.Make && image.Model ? `${image.Make} ${image.Model}` : 'unknown',
                        software: image.Software || 'none',
                        lat: latitude,
                        lon: longitude
                    });

                    if (output.length === fs.readdirSync(imagesDir).filter(f => f.toLowerCase().endsWith('.jpg')).length) {
                        output.sort((a, b) => new Date(a.date) - new Date(b.date));
                        fs.writeFileSync('data.json', JSON.stringify(output, null, 2));
                        console.log('Fichier json c bon !');
                    }
                }
            });
        } catch (err) {
            console.log('Erreur global : ' + err.message);
        }
    }
});*/
