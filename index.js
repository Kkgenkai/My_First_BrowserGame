const simon_btns = {
    green: $('#green'),
    red: $('#red'),
    yellow: $('#yellow'),
    blue: $('#blue'),

    gr_snd: new Audio("./sounds/green.mp3"),
    r_snd: new Audio("./sounds/red.mp3"),
    ye_snd: new Audio("./sounds/yellow.mp3"),
    bl_snd: new Audio("./sounds/blue.mp3"),
    gov_snd: new Audio("./sounds/wrong.mp3")
};

simon_btns.green.text('1').css("color", "green");
simon_btns.red.text('2').css("color", "red");
simon_btns.yellow.text('3').css("color", "yellow");
simon_btns.blue.text('4').css("color", "blue");


function classAdder(event){
    switch(event.target.id){
        case"green":
            simon_btns.green.addClass("pressed");
            simon_btns.gr_snd.play();
            setTimeout(()=>{
                simon_btns.green.removeClass("pressed");
            }, 200);
            break;
        case"red":
            simon_btns.red.addClass("pressed");
            simon_btns.r_snd.play();
            setTimeout(()=>{
                simon_btns.red.removeClass("pressed");
            }, 200);
            break;
        case"yellow":
            simon_btns.yellow.addClass("pressed");
            simon_btns.ye_snd.play();
            setTimeout(()=>{
                simon_btns.yellow.removeClass("pressed");
            }, 200);
            break;
        case"blue":
            simon_btns.blue.addClass("pressed");
            simon_btns.bl_snd.play();
            setTimeout(()=>{
                simon_btns.blue.removeClass("pressed");
            }, 200);
            break;
    }
}

function classAdder2(num){
    switch(num){
        case 1:
            simon_btns.green.animate({opacity: 0}, 200).animate({opacity: 1}, 100);
            simon_btns.gr_snd.play();
            break;
        case 2:
            simon_btns.red.animate({opacity: 0}, 200).animate({opacity: 1}, 100);
            simon_btns.r_snd.play();
            break;
        case 3:
            simon_btns.yellow.animate({opacity: 0}, 200).animate({opacity: 1}, 100);
            simon_btns.ye_snd.play();
            break;
        case 4:
            simon_btns.blue.animate({opacity: 0}, 200).animate({opacity: 1}, 100);
            simon_btns.bl_snd.play();
            break;
    }
}

let randomNum = Math.floor(Math.random()*4) + 1;
let pattern = [];
pattern.push(randomNum);

let i = 0;

let start = ()=>{
    if(pattern.length === 0){
        let randomNum = Math.floor(Math.random()*4) + 1;
        pattern.push(randomNum);
        $('h1:first').text("Level 1");
        classAdder2(randomNum);
        $(document).off('keypress');
    }else{
        $('h1:first').text("Level 1");
        classAdder2(randomNum);
        $(document).off('keypress');
    }
}

$(document).keypress(start);

//Debugging Code => console.log(pattern[i] + " is the current Element in array: " + pattern); 
$('.container').click((event)=>{
    classAdder(event);

    if(parseInt(event.target.textContent) === pattern[i]){
        i++;
        if(i >= pattern.length){
            $('h1').text("Level " + (i+1));
            i = 0;
            setTimeout(()=>{
                let randomNum = Math.floor(Math.random()*4) + 1;
                pattern.push(randomNum);
                classAdder2(randomNum);
            }, 600);
        }
    }else{
        pattern.splice(0);
        $('h1').text("Game Over, Press Any Key to Restart");
        $("body").addClass('game-over');
        simon_btns.gov_snd.play();
        setTimeout(()=>{
            $("body").removeClass('game-over');
        }, 100);
        $(document).keypress(start);
    }
    
 //Debugging Code => console.log(pattern[i] + " is the next Element in array: " + pattern);
});
