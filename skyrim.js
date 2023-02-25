const ralof = document.getElementById("ralof");
const lokir = document.getElementById("lokir");
const ulfric = document.getElementById("ulfric");
const offscreen = document.getElementById("offscreen");


function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function initBubbles(){
    // set all to invisible
    setInvisible(ralof);
    setInvisible(offscreen);
    setInvisible(lokir);
    setInvisible(ulfric);
}



function setInvisible(htmlDOM){
    htmlDOM.innerHTML = "";
    let bubble = htmlDOM.parentNode.parentNode;
    bubble.style.opacity = 0;
}

function setVisible(htmlDOM){
    let bubble = htmlDOM.parentNode.parentNode;
    bubble.style.opacity = 1;
}

function say(htmlDOM, text){
    setVisible(htmlDOM);
    htmlDOM.innerHTML = text;
}

async function startDialogue(){
    await timeout(4000);
    say(ralof, "hey you");

    await timeout(1000);
    say(ralof, "you're finally awake");

    await timeout(1500);
    say(ralof, "you were trying to");

    await timeout(1000);
    say(ralof, "cross the border");

    await timeout(1000);
    say(ralof, "right?");

    await timeout(2000);
    say(ralof, "walked right into");

    await timeout(1000);
    say(ralof, "that imperial ambush");

    await timeout(1500);
    say(ralof, "same as us");

    await timeout(1500);
    say(ralof, "and that thief");

    await timeout(1000);
    say(ralof, "over there!");

    await timeout(1000);
    setInvisible(ralof);

    await timeout(500);
    say(lokir, "damn you");

    await timeout(1000);
    say(lokir, "stormcloaks");

    await timeout(1000);
    say(lokir, "skyrim was fine");

    await timeout(1000);
    say(lokir, "until you came along");

    await timeout(1000);
    say(lokir, "empire was nice");

    await timeout(1000);
    say(lokir, "and lazy.");

    await timeout(1500);
    say(lokir, "if they hadn't");

    await timeout(1000);
    say(lokir, "been looking for you");

    await timeout(1000);

    await timeout(1000);
    say(lokir, "I could've stolen");

    await timeout(1000);
    say(lokir, "that horse and");

    await timeout(1000);
    say(lokir, "been halfway to");

    await timeout(1000);
    say(lokir, "Hammerfell");

    await timeout(1000);
    say(offscreen, "shutup back there!")

    await timeout(250);
    say(lokir, "...");

    await timeout(750);
    setInvisible(lokir);
    setInvisible(offscreen);

    await timeout(1000);
    say(lokir, "what's wrong with");

    await timeout(1000);
    say(lokir, "him huh?");

    await timeout(500);
    setInvisible(lokir);

    await timeout(250);
    say(ralof, "watch your tongue");

    await timeout(1000);
    say(ralof, "you're speaking to");

    await timeout(1000);
    say(ralof, "ulfric stormcloak");

    await timeout(1000);
    say(ralof, "the true high king!");

    await timeout(1000);
    setInvisible(ralof);
    say(lokir, "ulfric, the jarl");

    await timeout(2000);
    say(lokir, "of Windhelm");

    await timeout(1000);
    say(lokir, "he's the leader");

    await timeout(1000);
    say(lokir, "of the rebellion");

    await timeout(2000);
    say(lokir, "but if they captured");

    await timeout(1000);
    say(lokir, "him...");

    await timeout(1000);
    say(lokir, "oh gods...");

    await timeout(1000);
    say(lokir, "where are they");

    await timeout(1000);
    say(lokir, "taking us???");

    await timeout(2000);
    setInvisible(lokir);
    say(ralof, "I don't know");

    await timeout(1000);
    say(ralof, "where we're");

    await timeout(1000);
    say(ralof, "going");

    await timeout(1000);
    say(ralof, "but sovengard");

    await timeout(1000);
    say(ralof, "awaits");

    await timeout(1000);
    setInvisible(ralof)
    say(lokir, "no");

    await timeout(500);
    say(lokir, "this cant be");

    await timeout(1000);
    say(lokir, "happening");

    await timeout(1000);
    say(lokir, "THIS ISNT");

    await timeout(1000);
    say(lokir, "HAPPENNING");

    await timeout(4000);
    setInvisible(lokir);
    say(ralof, "hey...");

    await timeout(1000);
    say(ralof, "what village");

    await timeout(1000);
    say(ralof, "are you from");

    await timeout(1000);
    say(ralof, "horse thief?");

    await timeout(2000);
    setInvisible(ralof);
    say(lokir, "why do you care?");

    await timeout(2000);
    setInvisible(lokir);
    say(ralof, "A nord's last");

    await timeout(1000);
    say(ralof, "thoughts...");

    await timeout(2000);
    say(ralof, "should be of");

    await timeout(1000);
    say(ralof, "home...");

    await timeout(3000);
    setInvisible(ralof);
    say(lokir, "Rorikstead");

    await timeout(1000);
    say(lokir, "I'm");

    await timeout(500);
    setInvisible(lokir);

    await timeout(1500);
    say(lokir, "I'm from");

    await timeout(1000);
    say(lokir, "Rorikstead");
}




initBubbles();
startDialogue();


