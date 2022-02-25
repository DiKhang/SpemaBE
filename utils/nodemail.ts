/** @format */

import nodemailer from "nodemailer";

var transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "nguyenduykhuongtqtpy@gmail.com",
		pass: "iizdcwwlvdcoztun",
	},
});

const sendCode = async (to: string, code: string) => {
	var result = true;
	var mailOptions = {
		from: "nguyenduykhuongtqtpy@gmail.com",
		to: to,
		subject: "Verify code to active account !",
		text: `Your code : ${code}`,
	};

	await transporter.sendMail(mailOptions).catch((e: any) => {
		console.log(e.message);
		result = false;
	});
	return result;
};

export { sendCode };
