import jwt from 'jsonwebtoken';

export function verifyToken(req, res, next) {

  try {
    
    if (
      req.url?.includes("auth") ||
      req.url?.includes("user") ||
      req.url?.includes("otp")
    ) {
        console.log("IfBhitrako")
      return next();
    }
    const authHeader = req?.headers?.authorization;
    const token = authHeader?.split(" ")[1];

    if (token == null) {
        return res.status(400).json({ message: "Couldn't find token" });
    }
    
    const user = jwt.verify(String(token), String(process.env.JWT_TOKEN));
    console.log(user)
    req.user = user;
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
