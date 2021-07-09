const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const {
  S3Client,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");
const BASE_URL = process.env.S3_BASE_URL;
const BUCKET = process.env.S3_BUCKET;
const REGION = process.env.REGION;

const SALT_ROUNDS = 6;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    trim: true,
    minLength: 3,
    required: true
  },
  profilePic: {type: String, default: 'https://i.imgur.com/ILgOcKo.png'},
}, {
  timestamps: true,
  toJSON: {
    transform: function (doc, ret) {
      delete ret.password;
      return ret;
    }
  }
});

userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  // password has changed - salt and hash it
  bcrypt.hash(user.password, SALT_ROUNDS, function (err, hash) {
    if (err) return next(err);
    // Update the password property with the hash
    user.password = hash;
    return next();
  });
});

userSchema.statics.savePhoto = async function (req) {
  const hex = uuid.v4().slice(uuid.v4().length - 6);
  const fileExtension = req.file.mimetype.match(/[/](.*)/)[1].replace('', '.');
  const uploadParams = {
    Bucket: process.env.S3_BUCKET,
    Key: hex + fileExtension,
    Body: req.file.buffer
  }
  const s3 = new S3Client({ region: REGION });
  const run = async () => {
    try {
      const data = await s3.send(new PutObjectCommand(uploadParams));
    } catch (err) {
    }
  };
  run();
  const url = `${BASE_URL}${BUCKET}/${uploadParams.Key}`;
  return url
}

module.exports = mongoose.model('User', userSchema);