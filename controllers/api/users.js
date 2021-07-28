const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
  create,
  login,
  checkToken,
  createNoPic,
  getAllNames
};

function checkToken(req, res) {
  // req.user will always be there IF a valid token was sent
  // in the fetch request
  console.log(req.user);
  res.json(req.exp);
}

async function createNoPic(req, res) {
  try {
    const user = await User.create(req.body);
    const token = createJWT(user);
    // Yes, we can send back a simple string
    res.json(token);
  } catch (err) {
    // Client will check for non-200 status code
    // 400 = Bad Request
    res.status(400).json(err);
  }
}



async function create(req, res) {
  try {
    const url = await User.savePhoto(req)
    const newObj = {...req.body}
    const user = await User.create({...newObj, profilePic: url});
    const token = createJWT(user);
    res.json(token);
  } catch(err) {
    res.status(400).json(err);
    console.log(err);
  }
}



async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    res.json(createJWT(user));
  } catch {
    res.status(400).json('Bad Credentials');
  }
}

async function getAllNames(req, res) {
  const userNames = await User.find({}).select("name")
  res.json(userNames);
}

/*--- Helper Functions ---*/

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}