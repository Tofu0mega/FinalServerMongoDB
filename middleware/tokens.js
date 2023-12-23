import jwt from 'jsonwebtoken';

export function verifyToken(req, res, next) {

  
  try {
    
    if (
      req.url?.includes("auth") ||
      req.url?.includes("user") 
      
    ) {
      
      return next();
    }
    const cookies = req.headers.cookie;
 
    const token = cookies.split("=")[1];
    
    
    
    if (token == null) {
        return res.status(400).json({ message: "Couldn't find token" });
    }
  
    jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        
          return res.status(400).json({ message: "Invalid Token" });
      }
    
     req.user=user
  });
    next();
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });}

};

export function refreshToken(req, res, next) {
    const cookies = req.headers.cookie;
    const prevToken = cookies.split("=")[1];
    if (!prevToken) {
        return res.status(400).json({ message: "Couldn't find token" });
    }
    jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(403).json({ message: "Authentication failed" });
        }
        res.clearCookie(`${user.id}`);
        req.cookies[`${user.id}`] = "";

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "30d",
        });
        console.log("Regenerated Token\n", token);

        res.cookie(String(user.id), token, {
            path: "/",
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
            httpOnly: true,
            sameSite: "lax",
        });

        req.id = user.id;
        next();
    });
};
