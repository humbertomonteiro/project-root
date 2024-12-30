const jwt = require("jsonwebtoken");
const isAuthenticated = (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({
      message: "Usuário não autenticado.",
    });
  }

  let logged = false;

  try {
    jwt.verify(token, process.env.APP_KEY);

    logged = true;
  } catch (error) {
    logged = false;
  }

  if (logged === false) {
    return res.status(403).send("Usuário não autorizado.");
  }

  next();
};

module.exports = isAuthenticated;
