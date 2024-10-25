const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-Transport");

// Transport

const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: process.env.API_SENDGRID,
    },
  })
);

const sendEmailController = (req, res) => {
  try {
    const { name, email, msg } = req.body;

    // Validation

    if (!name || !email || !msg) {
      return res.status(500).send({
        success: false,
        message: "Please Provide all Fields",
      });
    }

    // Email Matter
    transporter.sendMail({
      to: "rohitrohit10.rj@gmail.com",
      from: "rohitrohit10.rj@gmail.com",
      subject: "Regarding Mern Portfolio App",
      html: `
      <h5>Detail Information</h5>
      <ul>
      <li>
      <p>Name : ${name}</p>
      <p>Email : ${email}</p>
      <p>Massage : ${msg}</p>
      </li>
      <ul/>
      `,
    });

    return res.status(200).send({
      success: true,
      message: "Your Message Send Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Send Email API Error",
      error,
    });
  }
};

module.exports = { sendEmailController };
