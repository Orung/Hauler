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
      'dfc31d6452fa8ada3a2d55a54e42d669261604e8ef8fef7ffa0619d40452044680d8e04f022a16a2e0b48b020687125b0f031195efb572ae8f918db2e47d2e8d',
      { expiresIn: "30s" }
    );
    const refreshToken = jwt.sign(
      { email: foundUser.email },
      'a46452b483d3eff3496fbeb0d2b89aaa562898b72e3b566b84253462361cd6e25164e8413dd7432fe1d3d8f4d7d0a944b2bbb8c4f3d9f43b1de324a43c68fe13',
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
