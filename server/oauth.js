const axios = require('axios');
const User = require('./db/models/User');
const router = require('express').Router();
module.exports = router;

const scopes = ['https://www.googleapis.com/auth/userinfo.email'];
const GOOGLE_AUTH_URI=`https://accounts.google.com/o/oauth2/auth?approval_prompt=force&scope=${scopes.join(' ')}&client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_CALLBACK_URI}&response_type=code&access_type=offline`

//Redirects user to google's oauth consent form
router.get('/googleOauth', (req, res) => res.redirect(GOOGLE_AUTH_URI));

//Callback route for Google Oauth
router.get('/cb', async (req, res, next) => {
  try{
    const config = {
      client_id: process.env.GOOGLE_CLIENT_ID,
      grant_type: 'authorization_code',
      code: req.query.code,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_CALLBACK_URI
    };
    let response = await axios.post('https://oauth2.googleapis.com/token', config);
    response = await axios.get(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${response.data.access_token}`)
    const email = response.data.email;
    
    let user = await User.findOne({where: {email: email}})
    if(!user){
      user = await User.create({ username: email, email: email })
    }
    res.send(`
    <html>
      <head></head>
      <body>
        <script>
          window.localStorage.setItem('token', '${await user.generateToken()}');
          window.location = '/';
        </script>
      </body>
    </html>
    `);
  }
  catch(error){
    next(error);
  }
});
