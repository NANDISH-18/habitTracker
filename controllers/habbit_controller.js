const Habit = require('../models/habit');
const User = require('../models/user');

// date to string function
function getTodayDate(){
    let currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    let today = day + "/" + month + "/" + year;
    return today
} 

// Create habit controller
module.exports.createHabit = async (req,res) => {
    req.flash('success','well ~ A new Habit');
    try {
        let habit
        let user
        try {
            // find logged in user
            user = await User.findById(req.user._id).populate();
            // if habit exists find it
            habit = await Habit.findOne({content: req.body.habit, userRef: req.user._id}).populate();
            
        } catch (error) {
            console.log(error);
        }
        // if habit exist
        if(habit){
            // dont create it
            console.log("already exits");

        }else{
            // If habit not exist
            let habits = await Habit.create({
                content: req.body.habit,
                userRef: req.user._id,
                dates: {date: await getTodayDate(), complete: 'none'}
            })
            // add new habit to user habits array
            habits.save();
        }
        return res.redirect('/');
    } catch (error) {
        console.log(error);
    }
}
// Add/Remove favourites
module.exports.favouriteHabit= (req,res) => {
    req.flash('success', 'Favourite habit');
    let id = req.query.id;
    let userId = req.user._id;
    Habit.findOne({
        _id: {
            $in: [
                id
            ]
        },
        userRef: userId
    }).then(habit => {
        habit.favourite = habit.favourite ? false : true;
        habit.save()
            .then(habit => {
                return res.redirect('back')
            })
            .catch(err => console.log(err));
    })
    .catch(err => {
        console.log("Error in finding favourites",err);
        return;
    })
}



// Deleting a habit
module.exports.destroyHabit = async (req,res)=>{
    req.flash('success','Deleted habit Successfully');
    let id = req.query.id;
    let userId = req.user._id;
    const habit = await Habit.deleteMany({
        _id:{
            $in: [
                id
            ]
        },
        userRef: userId
    })
    if(habit){
        return res.redirect('back');
    }else{
        console.log('error in deleting habit');
    }
}

// update status of habit completion
module.exports.habitStatusUpdate =async (req,res) => {
    try {
        req.flash('success', 'updated habit successfully!');
        var d = req.query.date;
        var id = req.query.id;
    
        // Use await with findById and exec to get the habit asynchronously
        const habit = await Habit.findById(id).exec();
    
        if (!habit) {
          console.log("Habit not found!");
          return res.redirect('back');
        }
    
        let dates = habit.dates;
        let found = false;
    
        dates.find((item, index) => {
          if (item.date === d) {
            if (item.complete === 'yes') {
              item.complete = 'no';
            } else if (item.complete === 'no') {
              item.complete = 'none';
            } else if (item.complete === 'none') {
              item.complete = 'yes';
            }
            found = true;
          }
        });
    
        if (!found) {
          dates.push({ date: d, complete: 'yes' });
        }
    
        habit.dates = dates;
    
        // Use await with save to update the habit asynchronously
        await habit.save();
    
        res.redirect('back');
      } catch (err) {
        console.error("Error updating status:", err);
        // Handle the error appropriately
        // e.g., res.status(500).send("Error updating status");
      }
}

