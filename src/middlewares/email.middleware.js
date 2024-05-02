import nodemailer from 'nodemailer';
import EventEmitter from "events";

class CustomEvent extends EventEmitter {
    mailSent(email) {
      this.emit("mailSent", email);
    }
}

const customEvent = new CustomEvent();
  
export default (req, res, next) => {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
        user: "codingninjas2k16@gmail.com",
        pass: "slwvvlczduktvhdj",
        },
    });

    // Define email options
    const mailOptions = {
        from: "codingninjas2k16@gmail.com",
        to: req.body.email,
        subject: "Query received",
        text: "We have received your query and will get back to you soon.",
    };

    // Send email
    transporter.sendMail(mailOptions,(err)=>{
        if(err) console.log(err);
        else customEvent.mailSent(email);
    });
    next();
}

customEvent.addListener("mailSent", (email) => {
    console.log(`confirming that the email has been sent successfully to ${email}`);
});