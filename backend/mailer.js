const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "developpeurwebmobile5@gmail.com",
        pass: "vrir btqq friz lwvn",
    },
});

module.exports = transporter;