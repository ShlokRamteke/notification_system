import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Notification System API",
      version: "1.0.0",
    },
  },
  apis: ["./services/auth/routes.js", "./services/notification/routes1.js"],
};

const specs = swaggerJSDoc(options);

export default (app) => {
  app.use("/api-docs/", swaggerUi.serve, swaggerUi.setup(specs));
};
