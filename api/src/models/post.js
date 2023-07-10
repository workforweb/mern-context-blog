import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
    },
    body: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Duplicate the ID field.
postSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
postSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

postSchema.pre('save', async function (next) {
  const post = this;
  if (post.isModified('title')) {
    post.slug = await Sluggify(post.title);
  }

  next();
});

postSchema.pre('updateOne', async function (next) {
  const post = this;
  if (post.getUpdate().title !== undefined) {
    post.slug = await Sluggify(post.title);
    return next();
  } else {
    return next();
  }
});

const Post = mongoose.model('Post', postSchema);

export default Post;

async function Sluggify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
    .trim();
}
