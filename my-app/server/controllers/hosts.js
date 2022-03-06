import mongoose from 'mongoose';
import Host from '../models/host.js';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
dotenv.config();

const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

export const contact = async (req,res) => {
  const {Name,City,PhoneNumber,Email} = req.body.data;
  console.log(req.body.data);
  const mail = {
    from: Email,
    to: process.env.GMAIL_RECEIVER,
    subject: "Host form Submission",
    html: `<p>Name: ${Name}</p>
           <p>City: ${City}</p>
           <p>PhoneNumber: ${PhoneNumber}</p>
           <p>Email: ${Email}</p>`,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      console.log({error});
      res.json({ status: "Error" });
    } else {
      const user_mail = {
        from: process.env.GMAIL_USER,
        to: Email,
        subject: "Host form Submission",
        html: `Hey ${Name}<br>
        <br>
        Thanks for being a host`,
      };
      contactEmail.sendMail(user_mail, (error) => {
        if (error) {
          console.log({error});
        }});
        console.log({user_mail});
      res.json({ status: "Message Sent" });
    }
  });

  const host = await Host.findOne({Email: Email});
  if(!host){
      const newHost = new Host({Name: Name, Email: Email, City: City, PhoneNumber: PhoneNumber});
      await newHost.save();
      console.log(newHost); 
  }else{
  console.log({host});
  
  const updatedPerson = await Host.findOneAndUpdate({ Email: Email,City: City,PhoneNumber: PhoneNumber, Name: Name});
      console.log(updatedPerson);

}
}