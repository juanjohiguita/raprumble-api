import swaggerJSDoc from 'swagger-jsdoc';
import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
      title: 'My API',
      description: 'Description'
    },
    host: 'localhost:000'
  };
  

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'RapRumble API',
      version: '1.0.0',
      description: 'Documentación de la API RapRumble',
    },
  },
  host: 'localhost:5000',
  apis: ['./src/v1/routes/*.js'], // Rutas de tu API que deseas documentar
};



const outputFile = './swagger-output.json';
const routes = ['./src/v1/routes/competitions.routes.js', './src/v1/routes/users.routes.js', './src/v1/routes/index.routes.js', './src/v1/routes/rounds.routes.js', './src/v1/routes/formats.routes.js', './src/v1/routes/competitions.routes.js', './src/v1/routes/roles.routes.js', './src/v1/routes/days.routes.js', './src/v1/routes/formatsRounds.routes.js', './src/v1/routes/members.routes.js', './src/v1/routes/votes.routes.js'];


/* // Generar el archivo JSON con la documentación de la API
swaggerAutogen(outputFile, routes, doc).then(() => {
  });
*/

const swaggerSpec = swaggerJSDoc(swaggerOptions);


export default swaggerSpec;
