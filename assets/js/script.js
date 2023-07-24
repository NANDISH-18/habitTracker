console.log('JS file loaded');

let weeksContainer = document.querySelectorAll(".weekly__container");

function showWeeklyData() {
    for(letsSingleClass of weeksContainer){
        letsSingleClass.style.display = "flex";
    }

}

function showDailyData(){
    for(letsSingleClass of weeksContainer){
        letsSingleClass.style.display = "none";
    }
}

function hideFlash() {
    document.getElementById('flash-msg').style.display = 'none'
}