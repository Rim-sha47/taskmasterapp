const jwt = require("jsonwebtoken");
const supabase = require("../config/supabase");


const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const { data: user } = await supabase
      .from("users")
      .select("id,name,email")
      .eq("id", decoded.id)
      .single();

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Token invalid",
    });
  }
};

module.exports = protect;
