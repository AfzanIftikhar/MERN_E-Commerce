function generateotp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function generateOtpHtml(otp) {
  return `<html>
<head></head>
<body style="text-align:center; font-family:Arial, sans-serif;">

    <h1>Your OTP is ${otp}</h1>
    <p>Please enter this code to verify your email</p>

</body>
</html>`;
}



export {
    generateOtpHtml,
    generateotp
}