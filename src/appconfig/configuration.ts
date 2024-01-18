export default () => ({
    server: {
      port: parseInt(process.env.PORT as string, 10) || 3333,
      contextPath: process.env.CONTEXT_PATH,
      corsDomain: process.env.CORS_DOMAIN?.split(','),
    },
    ecc: {
        subSource: process.env.ECC_SUB_SOURCE,
        customer: process.env.ECC_CUSTOMER,
        service: process.env.ECC_SERVICE,
        alertKey: process.env.ECC_ALERT_KEY,
        alertGroup: process.env.ECC_ALERT_GROUP,
        level: process.env.ECC_LEVEL,
        remoteHost: process.env.ECC_REMOTE_HOST,
        remotePort: parseInt(process.env.ECC_REMOTE_PORT as string, 10),
        remotePath: process.env.ECC_REMOTE_PATH,
        remoteSsl: process.env.ECC_REMOTE_SSL?.toLowerCase() === 'true',
    },
});