// import model of db
const User = require('../models/user');

// render the sign up page
module.exports.signUp = (req, res) => {
    return res.render('user_sign_up',{
        title: "Sign up | Habbit Tracker"
    })
}

// get the sign up data or create User
// module.exports.create = async function(req,res){
//     try{
//         if(req.body.password != req.body.confirm_password){
//             return res.redirect('back');
//         }
    
//         await User.findOne({email: req.body.email}, async function(err,user) {
//             if(err){
//                 console.log('error in finding user in signing up');
//                 return;
//             }
//             console.log(req.body);
//             if(!user){
//                await User.create(req.body, function(err,user) {
//                     if(err){
//                         console.log('error in creating user in signing up');
//                         return;
//                     }
//                     return res.redirect('/users/sign-in');
//                 })
//             }else{
//                 return res.redirect('back');
//             } 
//         })

//     }catch (e){
//         console.log("Error", e);
//     }   
    

// }
// we have to use async await for this
module.exports.create = async function (req, res) {
    try {
      if (req.body.password !== req.body.confirm_password) {
        return res.redirect('back');
      }
  
      const user = await User.findOne({ email: req.body.email });
  
      if (!user) {
        await User.create(req.body);
        return res.redirect('/users/sign-in');
      } else {
        return res.redirect('back');
      }
    } catch (e) {
      console.log("Error", e);
    }
  };





// rendering the sign in page
module.exports.signIn = (req, res)=>{
    return res.render('user_sign_in',{
        title: 'Sign In | Habbit Tracker'
    })
}

// sign in and create session for user
module.exports.createSession = (req,res) => {
  req.flash('success', 'Logged in successfully');
  return res.redirect('/');
}

// sign out the session
module.exports.destroySession = (req,res,done) => {
  req.logout((err) => {
    if(err){
      return done(err);
    }
  })
  return res.redirect('/users/sign-in');
}
