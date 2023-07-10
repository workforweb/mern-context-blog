import 'dotenv/config';

const config = {
  mongoose: {
    url: `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_LOCAL_PORT}/${process.env.MONGO_INITDB_DATABASE}?authSource=admin`,
    options: {
      useNewUrlParser: true,
    },
  },
};

export default config;
