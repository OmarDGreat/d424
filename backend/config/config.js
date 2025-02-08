const config = {
    appName: 'Ecommerce API',
    port: process.env.PORT || 3001,
    jwtSecret: process.env.JWT_SECRET || 'defaultsecret',
    jwtExpiresIn: '30d',
    dbUri: process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce'
  };
  
  export default config;
  