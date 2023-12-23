import nodemailer from "nodemailer";
import clubs from "../models/club.js"

const sendmailverify= async(email,clubname,banner_link,req)=> {
   const facebooklink=req.body.socialLinks.facebook
   const linkedinlink=req.body.socialLinks.linkedin
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
        to:email,
        subject: "Kuvents sendmail testing", //email subject 
        text: "Did it work?", 
        html:`<h1>Dear Sir/Maam</h1><p>This Mail is in accordance to your role as the HoD of ${clubname}</p><p> A event with the following details has been posted pending your approval.</p><p>EventName:${req.body.name}</p><p>description:${req.body.description}</p><p>Starting and Ending at ${req.body.startTime},${req.body.endTime}respectivly</p><p>On the Date ${req.body.date}</p><p>Venue:${req.body.location}</p> <p>Category:${req.body.category}</p><p>Tags:${req.body.tags}</p><p>Socials:${facebooklink},${linkedinlink}</p><p>With Banner</p><img src=${banner_link}><p>If the current details are acceptable please reply to this remail with a positive notice of Approved, If some things need changing please contact the representative with the KUvents Credentials</p>`,
       // html:`Dear Sir/Maam \n\t\t This Mail is in accordance to your role as the HoD of <club ko data yeta>\n\t\t A event with the following details has been posted pending your approval.\n\n\t\tEventName:${req.body.name}\n description:${req.body.description}\n Starting and Ending at ${req.body.startTime},${req.body.endTime}respectivly\n on the date ${req.body.date} \n in the venue ${req.body.location} \n with tags${req.body.tags} \n category${req.body.category} \n social links ${req.body.socialLinks}\n and banner image of${req.body.banner_link} \n \n\n If the current details are acceptable please reply to this remail with a positive notice of Approved, If some things need changing please contact the representative with the KUvents Credentials`,
    });
    console.log("Message sent: %s", info.messageId);
   



} catch(error){
    console.error("Error sending email:", error.message);
  
}
};

export default sendmailverify; 