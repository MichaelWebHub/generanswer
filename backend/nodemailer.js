const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    type: 'OAuth2',
    user: 'michael.kutateladze@gmail.com',
    clientId: '2744913911-0iru1p6tgq0cudj06s5l84lq0gtk967q.apps.googleusercontent.com',
    clientSecret: '-x9w-YsvbVYQ2wZ_kDXDlBrn',
    refreshToken: '1/xoP-Z3AjejwA5FYgWMgqYNa9nTLS8aeGFsBo1x0f7MM',
    accessToken: 'ya29.Glv-BrZtqZwz1XY-m-_sHsAZ9Hr8TrV3kMQmuMc1kzzsYJPCZlPsDihDXaVrc_DRHzeH0XVTcniq05IGLKYfhcSFnVHvq7PEdtkAftjiEQ8OCUts2iUWR428du0h',
    expires: 1484314697598
  }
});

const confirmEmail = (email, token) => {
  const options = {
    from: 'Generanswer',
    to: email,
    subject: 'Generanswer email confirmation',
    html: `<p>Please, confirm your email</p> 
    <p>
      <a style="display: inline-block; padding: 12px; background: #39a379; color: white; border-radius: 5px" 
      href="http://localhost:4200/confirm-email/${token}">Confirm</a>
    </p>`
  };

  transporter.sendMail(options, (error, info) => {
    if (error) {
      console.log(error);
    }

    console.log(info);
  });
};

module.exports = {
  confirmEmail
};
