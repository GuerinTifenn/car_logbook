const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
   try {
    const token = req.cookies.token;
       if (!token) {
        throw new Error('No token found in cookies');
    }
       const decodedToken = jwt.verify(token, 'RANDOM_SECRET_TOKEN');
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       };
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};
