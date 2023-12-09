/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
    .prompt([
        {
            name: "URL",
            message: "Type in the URL: ",
        },
    ])
    .then((answer) => {
        const url = answer.URL;

        // generate QR image from URL
        const qr_png = qr.image(url, { type: "png" });
        // save image in server
        qr_png.pipe(fs.createWriteStream("./QR_images/QR.png"));

        // write URL
        fs.writeFile("./data_URL/dataURL.txt", url, (err) => {
            if (err) throw err;
            console.log("Success: The file have been saved!");
        });
    });
