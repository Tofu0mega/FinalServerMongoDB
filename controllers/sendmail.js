import nodemailer from "nodemailer";

const sendmail= async(email,otp)=> {

    let transporter= nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "kuventsnoreply@gmail.com",
          pass: "vbbq vkjn xsgl kxyi",
        },
    });
try{
    let info= await  transporter.sendMail({
        from: '"KUvents" <kuventsnoreply@gmail.com>', //sender's address
        to: email, //list of receivers can be included(separated by commas)
        subject: "OTP Generated", //email subject 
        text: "Did it work?", 
        html: '<b>Dear user,</b><br>The OTP for your account is: ' + otp.toString(),
    });
    console.log("Message sent: %s", info.messageId);



} catch(error){
    console.error("Error sending email:", error.message);
  
}
};

export default sendmail; 



// import nodemailer from "nodemailer";

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'KUventsNoReply@gmail.com',
//     pass: '@V3ry3@$yP@$$w0rd'
//   }
// });

// var mailOptions = {
//   from: 'KUventsNoReply@gmail.com',
//   to: 'shreelasapkota@gmail.com',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });


/*
import nodemailer from "nodemailer";

const sendmail= async(req, res)=> {

    let transporter= nodemailer.createTransport({
        host: "smtp.forwardemail.net",
        port: 465,
        secure: true,
        auth: {
          
          user: "KUventsNoReply@gmail.com",
          pass: "@11!n@D@y$W0rk",
        },
    });

    let info= await  transporter.sendMail({
        from: '"KUvents" <KUventsNoReply@gmail.com>', //sender's address
        to: "shreelasapkota@gmail.com", //list of receivers can be included(separated by commas)
        subject: "Kuvents sendmail testing", //email subject 
        text: "Did it work?", 
        html: "<b>It did!</b>",
    });
    console.log("Message sent: %s", info.messageId);


    res.json(info);
};

export default sendmail; */