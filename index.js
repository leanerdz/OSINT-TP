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
