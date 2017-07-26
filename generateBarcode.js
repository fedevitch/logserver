var path = require('path');
var barcode = require('barcode');
var code128 = barcode('code128', {
    data: "7989687679869097887876987796879689786",
    width: 600,
    height: 100,
});

var outfile = path.join(__dirname, 'barcodes', 'generatedBarcode.png')
code128.saveImage(outfile, function (err) {
    if (err) throw err;

    console.log('File has been written!');
});

code128.getBase64(function (err, imgsrc) {
    if (err) throw err;

    console.log("base64");
    console.log(imgsrc);
});
