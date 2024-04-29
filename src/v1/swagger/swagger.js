import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'RapRumble API',
      version: '1.0.0',
      description: 'Documentación de la API RapRumble',
    },
  },
  apis: ['./src/v1/routes/*.js'], // Rutas de tu API que deseas documentar
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
