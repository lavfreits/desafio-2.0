import express from "express";
import authRoutes from "./src/routes/authRoutes.js";
import categoryRoutes from "./src/routes/categoryRoutes.js";
import courseRoutes from "./src/routes/coursesRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";



const routes = (app) => {
  app.use(express.json(), userRoutes, categoryRoutes, courseRoutes,
    authRoutes
    // (req, res) => res.status(404).json({ message: "Route not found" })
  );

  const PORT = 3000;

  app.listen(PORT, () => {
    console.log("servidor escutando");
  });
};

export default routes;