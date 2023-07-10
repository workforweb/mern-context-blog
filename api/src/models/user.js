import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    email: {
      desc: "The user's email address.",
      type: String,
      required: [true, 'Your email address is required'],
      unique: true,
    },
    username: {
      desc: "The user's username.",
      type: String,
      required: [true, 'Your username is required'],
    },
    password: {
      desc: "The user's password.",
      type: String,
      required: [true, 'Your password is required'],
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next(null);

    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePasswords = async function (userPassword, next) {
  try {
    return await bcrypt.compare(userPassword, this.password);
  } catch (error) {
    next(error);
  }
};

// Duplicate the ID field.
userSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.password;
    delete ret.createdAt;
    return ret;
  },
});

const User = mongoose.model('User', userSchema);

export default User;
