
const User = require('../models/user');
const Habit  = require('../models/habit');

// get next seven date of week
function getOneWeekDate(){
    let arr = [];
    for(let i =0;i<7;i++){
        const d = new Date();
        d.setDate(d.getDate() + i);
        let mm = d.getMonth() + 1;
        if(mm < 10) mm = '0' + mm;
        let dd = d.getDate();
        if(dd < 10) dd='0' + dd;
        const yyyy = d.getFullYear();
        arr.push(dd + '/' + mm + '/' + yyyy);
    }
    return arr;
}

module.exports.home = async (req,res) => {
    try {
        // If user is logged in
        if(req.user) {
            let habits = await Habit.find({userRef: req.user._id}) //find habits assosiated to user
            
            // Render home page with logged in user and assosiated habits
            return res.render("home",{
                 title: "Habit tracker app",
                 habits : habits,
                 user: req.user,
                 weeklyDate: await getOneWeekDate()
            })
        }else{
            // If user is logged in
            // redirect to sign in page
            return res.redirect('/users/sign-in');

        }
    } catch (error) {
        console.log(error);
    }
}
// const users = await User.find({})
        
    // return res.render("home",{
    //     title: "Habit tracker app",
    //     user: users
    // })