const router = require('express').Router()
const { models: {User }} = require('../db')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = {username: req.body.username, password: req.body.password}
    res.send({ token: await User.authenticate(user)}); 
  } catch (err) {
    next(err)
  }
})

router.put('/changePassword', async (req, res, next) => {
  try{
    let user = {username: req.body.username, password: req.body.password}
    const token = await User.authenticate(user);
    user = await User.findByToken(token);
    await user.changePassword(req.body.newPassword);
    res.status(200).send(user);
  }
  catch(error){
    next(error);
  }

})


router.post('/signup', async (req, res, next) => {
  try {
    if(req.body.password === ''){
      res.status(401).send('User must have password');
      return;
    }
    const user = await User.create(req.body)
    res.send({token: await user.generateToken()})
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.get('/me', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization))
  } catch (ex) {
    next(ex)
  }
})
