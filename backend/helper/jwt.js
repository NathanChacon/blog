 const jwt = require('jsonwebtoken')

 const verifyJwt = (req,res,next) => {
     console.log(req.headers)
    var token = req.headers['authorization'];
    var token = token.split(" ")[1]

    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.userId;
      next();
    });
}

module.exports = verifyJwt