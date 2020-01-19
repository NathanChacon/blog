 const jwt = require('jsonwebtoken')

 const verifyJwt = (req,res,next) => {

    var token = req.headers['authorization'];

    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    var token = token.split(" ")[1]
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.userId;
      next();
    });
}

module.exports = verifyJwt