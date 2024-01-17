export default () => ({
    server: {
      port: parseInt(process.env.PORT as string, 10) || 3333,
      contextPath: process.env.CONTEXT_PATH,
      corsDomain: process.env.CORS_DOMAIN?.split(','),
    },
});