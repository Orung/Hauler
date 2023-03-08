// const User = require("../model/Users");

// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const handleLogin = async (req, res) => {
//   const { user, pwd } = req.body;
//   if (!user || !pwd)
//     return res
//       .status(400)
//       .json({ message: "Username and password are required." });

//   const foundUser = await User.findOne({ username: user }).exec();
//   if (!foundUser) return res.sendStatus(401); //Unauthorized

//   //evaluate password
//   const match = await bcrypt.compare(pwd, foundUser.password);
//   if (match) {
//     const roles = Object.values(foundUser.roles);

//     //create jwt
//     const accessToken = jwt.sign(
//       {
//         UserInfo: {
//           username: foundUser.username,
//           roles: roles,
//         },
//       },
//       process.env.ACCESS_TOKEN_SECRET,
//       { expiresIn: "30s" }
//     );
//     const refreshToken = jwt.sign(
//       { username: foundUser.username },
//       process.env.REFRESH_TOKEN_SECRET,
//       { expiresIn: "1d" }
//     );

//     // saving refresh token with current users
//     foundUser.refreshToken = refreshToken;
//     const result = await foundUser.save();
//     console.log(result);
    
//     res.cookie("jwt", refreshToken, {
//       httpOnly: true,
//       sameSite: "None",
//       maxAge: 24 * 60 * 60 * 1000,
//     });
//     res.json({ accessToken });
//     // res.json({ 'success' : `User ${user} is logged in!`})
//   } else {
//     res.sendStatus(401);
//   }
// };

// module.exports = { handleLogin };



const User = require("../model/Users");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { email, pwd } = req.body;
  if (!email || !pwd)
    return res
      .status(400)
      .json({ message: "Email and password are required." });

  const foundUser = await User.findOne({ email: email }).exec();
  if (!foundUser) return res.sendStatus(401); //Unauthorized

  //evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles);

    //create jwt
    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: foundUser.email,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    const refreshToken = jwt.sign(
      { email: foundUser.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // saving refresh token with current users
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result);
    
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
    // res.json({ 'success' : `User ${user} is logged in!`})
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
