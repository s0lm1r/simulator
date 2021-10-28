const  PlayerValuesConfig = {
    health: 100,
    time: 48,
    energy: 100,
    satiety: 20,
    mood: 50,
    reaction: 0,
    strategy: 0,
    synergy: 0,

    healthModifier: 1,
    timeModifier: 1,
    energyModifier: 1,
    satietyModifier: 1,
    moodModifier: 1,
    reactionModifier: 1,
    strategyModifier: 1,
    synergyModifier: 1
};

const GameConstants = {
    startLocalTime: {
        day: 1,
        time: 0
    },
    currentButton: "",
    currentAction: ""
}

console.log("We are MadMen!!");


let mainGameContainer = window.document.querySelector(".mainGame");
mainGameContainer.innerHTML +=`
    <div class="healthPoints">
        <div class="LeftUp">
            <div class="button Energy">${PlayerValuesConfig.energy}</div>
            <div class="button Satiety">${PlayerValuesConfig.satiety}</div>
        </div>
        <div class="clock">
            <p>Day: ${GameConstants.startLocalTime.day}</p>
            <p>Time: ${GameConstants.startLocalTime.time}</p>
        </div>
        <div class="RightUp">
            <div class="button Mood">${PlayerValuesConfig.mood}</div>
            <div class="button Health">${PlayerValuesConfig.health}</div>
    </div>
    </div>
   
    <div class="skills">
        <div class="button Reaction">${PlayerValuesConfig.reaction}</div>
        <div class="button Strategy">${PlayerValuesConfig.strategy}</div>
        <div class="button Synergy">${PlayerValuesConfig.synergy}</div>
    </div>
    `;



function initButton() {
    const buttons = document.querySelectorAll(".button");
    buttons.forEach(button => {
        button.addEventListener("click", (event) => {
            let target = event.target;
            let nameButton = target.classList[1];
            invokePopUp(nameButton);
        })
    })
}

initButton();

function invokePopUp(nameButton) {

    if (["Reaction","Strategy", "Synergy"].includes(nameButton)) {
        nameButton = "Skills";

    }
    GameConstants.currentButton = nameButton;
    const popUpHolder = document.querySelector(".popUpHolder");
    popUpHolder.innerHTML += `
        <div class="popUp">${parseAction(MAIN_ACTIONS[nameButton])}</div>
  
    `;
    popUpHolder.innerHTML+= `<button class="closeButtonActionPopUp">Close</button>`;
    popUpHolder.style.display = "flex";
    const closeActionPopUp= document.querySelector(".closeButtonActionPopUp");
    closeActionPopUp.addEventListener("click", (event) => {
        popUpHolder.innerHTML = ``;
        popUpHolder.style.display = "none";
        let chosenPopUp = document.querySelector(".chosenPopUp");
        chosenPopUp.innerHTML = ``;
        chosenPopUp.style.display = "none";

    })

    addEventListenerToMainPopUp();
}

function parseAction(actions) {
    let arrayActions = Object.values(actions);


    return `${arrayActions.map(action => {
        return `
                <div class="actionRow">
                    <p class="titleAction" id=${action.id}>${action.title}</p><br>
                </div>`
    }).join("")}`
}



function addEventListenerToMainPopUp() {

    const actionRows = document.querySelectorAll(".actionRow");
    actionRows.forEach(actionRow => {
        actionRow.addEventListener('click', (event) => {
            let currRowId = event.srcElement.id;
            let currRow = event.target;

            GameConstants.currentAction = currRowId;

            showChosenActionPopUp(MAIN_ACTIONS[GameConstants.currentButton][GameConstants.currentAction])

        })
    })
}

function showChosenActionPopUp(action) {

    let chosenPopUp = document.querySelector(".chosenPopUp");
    chosenPopUp.style.display = "flex";
    chosenPopUp.innerHTML +=`
       
            <p class="sureTitle">Are you sure?</p>
            <p class="titleAction">${action.title}</p>
            <p class="descriptionAction">${action.description}</p>
            <button class="cancelAction">cancel</button>
            <button class="acceptAction">Accept</button>
     `;

    const cancelAction = document.querySelector(".cancelAction");
    cancelAction.addEventListener("click", (event) => {
        chosenPopUp.innerHTML = ``;
        chosenPopUp.style.display = "none";
        const popUpHolder = document.querySelector(".popUpHolder");
        popUpHolder.innerHTML = ``;
        popUpHolder.style.display = "none";
        GameConstants.currentButton = "";
        GameConstants.currentAction = "";

    });
    const acceptAction = document.querySelector(".acceptAction");
    acceptAction.addEventListener("click", (event) => {
        chosenPopUp.innerHTML = ``;
        chosenPopUp.style.display = "none";
        const popUpHolder = document.querySelector(".popUpHolder");
        popUpHolder.innerHTML = ``;
        popUpHolder.style.display = "none";
        GameConstants.currentButton = "";
        GameConstants.currentAction = "";
         return updatePlayerStats(action.changes);

    })
}

function updatePlayerStats(data) {
      for( let value in data) {
          PlayerValuesConfig[value] += data[value];
          if (value === "time") {
              GameConstants.startLocalTime.time += data[value];
          }


    }

    PlayerValuesConfig.health > 100 ? PlayerValuesConfig.health = 100 : PlayerValuesConfig.health;
    PlayerValuesConfig.energy > 100 ? PlayerValuesConfig.energy = 100 : PlayerValuesConfig.energy;
    PlayerValuesConfig.satiety > 100 ? PlayerValuesConfig.satiety = 100 : PlayerValuesConfig.satiety;
    PlayerValuesConfig.mood > 100 ? PlayerValuesConfig.mood = 100 : PlayerValuesConfig.mood;
    PlayerValuesConfig.reaction < 0 ? PlayerValuesConfig.reaction = 0 : PlayerValuesConfig.health;
    PlayerValuesConfig.strategy < 0 ? PlayerValuesConfig.strategy = 0 : PlayerValuesConfig.strategy;
    PlayerValuesConfig.synergy < 0 ? PlayerValuesConfig.synergy = 0 : PlayerValuesConfig.synergy;

    mainGameContainer.innerHTML =``;
    if (PlayerValuesConfig.health < 99) {
        let diedContainer = window.document.querySelector(".mainWrapper");
        diedContainer.classList.add(".died");
        diedContainer.innerHTML = ``;
        diedContainer.innerHTML +=`
        <div class="died"><p>YOU DIED.</p> <br>But honestly your lost your life a long time ago in the Computer Club</div>
        `;
        return;
    }
    mainGameContainer.innerHTML +=`
    <div class="healthPoints">
        <div class="LeftUp">
            <div class="button Energy">${PlayerValuesConfig.energy}</div>
            <div class="button Satiety">${PlayerValuesConfig.satiety}</div>
        </div>
        <div class="clock">
            <p>Day: ${GameConstants.startLocalTime.day}</p>
            <p>Time: ${GameConstants.startLocalTime.time}</p>
        </div>
        <div class="RightUp">
            <div class="button Mood">${PlayerValuesConfig.mood}</div>
            <div class="button Health">${PlayerValuesConfig.health}</div>
    </div>
    </div>

    <div class="skills">
        <div class="button Reaction">${PlayerValuesConfig.reaction}</div>
        <div class="button Strategy">${PlayerValuesConfig.strategy}</div>
        <div class="button Synergy">${PlayerValuesConfig.synergy}</div>
    </div>
    `;
    initButton();
}




// <p class="descriptionAction">${action.description}</p>






const MAIN_ACTIONS = {

        "Satiety": {
            "EatOatmeal": {
                id: "EatOatmeal",
                "title": "Eat Oatmeal",
                "description": "This is the most tasteless food on the planet, nothing worse has happened to you in your entire life. You ate oatmeal",
                "changes": {
                    "time": 1,
                    "satiety": 50,
                    "mood": -1,
                }
            },
            "EatApple": {
                id: "EatApple",
                "title": "Eat Apple",
                "description": "With words from the meme 'Hey, apple!' you eat poor fruit. Not so bad! You ate apple",
                "changes": {
                    "health": 1,
                    "time": 1,
                    "satiety": 10,
                }
            },
            "EatSalat": {
                id: "EatSalat",
                "title": "Eat Salat",
                "description": "Mom always made you eat all the vegetables. You hate vegetables, but you love your mom. You ate salat",
                "changes": {
                    "health": 3,
                    "time": 1,
                    "satiety": 40,
                }
            },
            "EatSoup": {
                id: "EatSoup",
                "title": "Eat Soup",
                "description": "Soup is a infernal cauldron for vegetables. Live with this thought now. You ate soup",
                "changes": {
                    "health": 2,
                    "time": 1,
                    "satiety": 30,
                }
            },
            "EatSandwich": {
                id: "EatSandwich",
                "title": "Eat Sandwich",
                "description": "They say that a sandwich always falls butter down. It's time to find out if this is the case? You ate sandwich",
                "changes": {
                    "time": 1,
                    "energy": 100,
                    "satiety": 20,
                    "mood": 1,
                }
            },
            "EatPizza": {
                id: "EatPizza",
                "title": "Eat Pizza",
                "description": "Pizza! Oh Lord, there is nothing better in this world! You ate pizza",
                "changes": {
                    "health": -2,
                    "time": 1,
                    "satiety": 60,
                    "mood": 10,
                }
            },
            "EatDoritos": {
                id: "EatDoritos",
                "title": "Eat Doritos",
                "description": "Covered in fat and crumbs, well-fed and happy! It is unhealthy, but who cares? You ate Doritos",
                "changes": {
                    "health": -5,
                    "time": 1,
                    "satiety": 30,
                    "mood": 25,
                }
            },
            "EatDriedPizzaSides": {
                id: "EatDriedPizzaSides",
                "title": "Eat dried pizza sides",
                "description": "How long are they here? Maybe a day, maybe an eternity. It looks like you have no other choice. You ate dried pizza sides",
                "changes": {
                    "health": -3,
                    "time": 1,
                    "satiety": 40,
                    "mood": 20,
                }
            },
            "EatCrumbs": {
                id: "EatCrumbs",
                "title": "Eat crumbs from the keyboard",
                "description": "Yes, you seem to be in despair. But as Mr.T said: Life's tough, but I'm tougher! You ate crumbs from the keyboard",
                "changes": {
                    "time": 1,
                    "satiety": 10,
                    "mood": -5,
                }
            },
            "EatCatFood": {
                id: "EatCatFood",
                "title": "Eat cat food",
                "description": "MEOW! You ate cat food",
                "changes": {
                    "time": 1,
                    "satiety": 30,
                    "mood": -20,
                }
            }
        },

      "Energy": {
            "takeANap": {
                id: "takeANap",
                "title": "Take a nap",
                "description": "Wake me up when september ends! You take a nap",
                "changes": {
                    "health": 1,
                    "time": 2,
                    "energy": 10,
                }
            },
            "goSleep": {
                id: "goSleep",
                "title": "Go to sleep",
                "description": "Sleep, eat, play games all day, repeat! You go to sleep",
                "changes": {
                    "health": 5,
                    "time": 14,
                    "energy": 90,
                }
            },
            "drinkHolyWater": {
                id: "drinkHolyWater",
                "title": "Drink holy water",
                "description": "You feel the divine light shining on you! You drink holy water",
                "changes": {
                    "health": 5,
                    "time": 1,
                    "energy": 10,
                    "satiety": 5,
                    "mood": 10,
                }
            },
            "drinkTea": {
                id: "drinkTea",
                "title": "Drink tea",
                "description": "Oh, are you from England? Yeah, sure, me too! You drink tea",
                "changes": {
                    "time": 1,
                    "energy": 5,
                }
            },
            "drinkCoffee": {
                id: "drinkCoffee",
                "title": "Drink coffe",
                "description": "Finally, something that really gives energy! Do stupid things faster! You drink coffee",
                "changes": {
                    "time": 1,
                    "energy": 5,
                }
            },
            "drinkRedBull": {
                id: "drinkRedBull",
                "title": "Drink red bull",
                "description": "Red Bull gives wings. Be careful, Icarus! You drink Red Bull",
                "changes": {
                    "health": -5,
                    "time": 1,
                    "energy": 15,
                    "mood": 5,
                }
            },
            "drinkFewRedBulls": {
                id: "drinkFewRedBulls",
                "title": "Drink few red bull",
                "description": "And by FEW I mean everything within a radius of 30 km! You drink all the Red Bulls",
                "changes": {
                    "health": -10,
                    "time": 2,
                    "energy": 30,
                    "mood": 5,
                }
            },
            "PowerNature": {
                id: "PowerNature",
                "title": "Power of nature",
                "description": "You ask for strength from mother earth. And since no one has spoken to her for a long time, she gladly shares her strength with you.",
                "changes": {
                    "time": 1,
                    "energy": 5,
                }
            },
            "ConnectCollider": {
                id: "ConnectCollider",
                "title": "Connect to android collider",
                "description": "Pretty crazy idea, considering that it accelerates particles, and doesn't generate energy. But it will suit you anyway.",
                "changes": {
                    "time": 4,
                    "energy": 20,
                }
            },
            "BlackHole": {id: "BlackHole",

                "title": "Take the energy of the black hole in space",
                "description": "And put it in the Dota game! Ultimate!",
                "changes": {
                    "health": -80,
                    "time": 1,
                    "energy": 100,
                }
            }
        },

     "Mood": {
            "watchAnime": {
                id: "watchAnime",
                "title": "Watch anime",
                "description": "Omae wa mou shindeiru, s-senpai! You watch anime",
                "changes": {
                    "time": 2,
                    "mood": 10,
                }
            },
            "watchNetflix": {
                id: "watchNetflix",
                "title": "Watch Netflix",
                "description": "Netflix - see what's next! And then next. And next. And save me somebody! You watch Netflix all day",
                "changes": {
                    "time": 4,
                    "mood": 25,
                }
            },
            "walkWithFriends": {
                id: "walkWithFriends",
                "title": "Hang with Friends",
                "description": "You are a cyber athlete, you have no friends. Imaginary don't count! You hang with somebody for a while",
                "changes": {
                    "time": 4,
                    "mood": 30,
                }
            },
            "doSomeHobby": {
                id: "doSomeHobby",
                "title": "You have some hobby?",
                "description": "For many, many tedious and grueling hours, you ... glue a model airplane! What a party!",
                "changes": {
                    "time": 2,
                    "mood": 15,
                }
            },
            "drinkJuice": {
                id: "drinkJuice",
                "title": "Drink juice",
                "description": "Juice is the blood of fruits. Live with this thought now. You drink juice",
                "changes": {
                    "health": 3,
                    "time": 1,
                    "satiety": 5,
                    "mood": 5,
                }
            },
            "drinkTapWater": {
                id: "drinkTapWater",
                "title": "Drink tap water",
                "description": "I don’t know why you did it. It doesn't do anything. You drink tap water",
                "changes": {
                    "health": 1,
                    "time": 1,
                    "energy": 3,
                    "satiety": 1,
                }
            },
            "drinkBeer": {
                id: "drinkBeer",
                "title": "Drink beer",
                "description": "Oh, wow, here's where to start esport career! Now you don't even want to play anymore. Let's just chill, man. You drink beer",
                "changes": {
                    "health": -1,
                    "time": 1,
                    "energy": -5,
                    "satiety": 5,
                    "mood": 25,
                    "reaction": -0.5,
                    "strategy": -0.5,
                    "synergy": -0.5,
                }
            },
            "drinkVodka": {
                id: "drinkVodka",
                "title": "Drink vodka",
                "description": "Matryoshka, balalaika! Wait, where is my bear? You drink vodka",
                "changes": {
                    "health": -2,
                    "time": 1,
                    "energy": -15,
                    "mood": 30,
                    "reaction": -0.5,
                    "strategy": -0.5,
                    "synergy": -0.5,
                }
            },
            "drinkRedBullVodka": {
                id: "drinkRedBullVodka",
                "title": "Red Bull with vodka",
                "description": "Seriously? At this time of day? Are you planning on playing games at all? Jesus! You drink red bull with vodka",
                "changes": {
                    "health": -5,
                    "time": 1,
                    "energy": 10,
                "mood": 50,
                "reaction": -0.5,
                "strategy": -0.5,
                "synergy": -0.5,
            }
        },
            "drinkBrakeFluid": {
                id: "drinkBrakeFluid",
            "title": "Drink brake fluid",
            "description": "Nobody knows what will happen if you drink this. Imagine that you are Alice in Wonderland! You drink brake fluid",
            "changes": {
                "health": -20,
                "time": 1,
                "energy": 10,
                "mood": 60,
                "reaction": -1,
                "strategy": -1,
                "synergy": -1,
            }
        }
        },

       "Health": {
            "DoSomeExercise": {
                id: "DoSomeExercise",
                "title": "Do Some Exercise",
                "description": "Girls love athletic guys. Girls? Have you ever heard of them, cyber athlete?",
                "changes": {
                    "health": 5,
                    "time": 1,
                }
            },
            "takeSomeMedicine": {
                id: "takeSomeMedicine",
                "title": "Take some medicine",
                "description": "Snatch a couple of pills from your older brother. Thank me later.",
                "changes": {
                    "health": 7,
                    "time": 1,
                }
            },
            "goSeeDoctor": {
                id: "goSeeDoctor",
                "title": "Go see a doctor",
                "description": "But be careful: if the doctor is overly sarcastic, has a cane, and seems to have used something - you'd better go home!",
                "changes": {
                    "health": 12,
                    "time": 3,
                }
            },
            "DeepBreath": {
                id: "DeepBreath",
                "title": "Deep Breath",
                "description": "Breath... Everything will gona be okey... Just breath...",
                "changes": {
                    "health": 2,
                    "time": 1,
                }
            },
            "CallMama": {
                id: "CallMama",
                "title": "Call Mama",
                "description": "She will blow where it hurts, and everything will pass! You will see, this is the most powerful treatment in your arsenal.",
                "changes": {
                    "health": 2,
                    "time": 1,
                }
            },
            "JustEndure": {
                id: "JustEndure",
                "title": "Just endure",
                "description": "The universe is amazed at your resilience and obstinacy! You restore some health as a sign of respect!",
                "changes": {
                    "health": 2,
                    "time": 1,
                }
            },
            "HealthPotion": {
                id: "JustEndure",
                "title": "Health Potion",
                "description": "All games have it, so it should be in this one too! Drink it!",
                "changes": {
                    "health": 10,
                    "time": 1,
                    "energy": -10,
                }
            },
            "ManaPotion": {
                id: "ManaPotion",
                "title": "Mana Potion",
                "description": "I don’t know why it’s here, it won’t help with your health. But it won't hurt either! Drink it!",
                "changes": {
                    "health": 5,
                    "time": 1,
                    "energy": -5,
                }
            },
            "StimpakFallout": {
                id: "StimpakFallout",
                "title": "Stimpak from Fallout",
                "description": "War... War is never change. But this thing will bring you back to life even in the nuclear desert",
                "changes": {
                    "health": 15,
                    "time": 1,
                    "energy": -15,
                }
            },
            "Pray": {
                id: "Pray",
                "title": "Pray",
                "description": "If nothing else remains. Pray. Maybe Lord is the only one who can improve your skillz",
                "changes": {
                    "health": 2,
                    "time": 1,
                    "mood": 1,
                }
            },
           "GotoWindow": {
               id: "GotoWindow",
               "title": "Go to Window",
               "description": "If even Pray doen`t help really nothing else remains. Maybe in another World I`ll be happier",
               "changes": {
                   "health": -100,
                   "time": Infinity,
                   "mood": 100,
               }
           }
        },

        "Skills": {
            "playDota": {
                id: "playDota",
                "title": "Play Dota",
                "description": "Oh, boy! You hook almost like Dendi! This year International is yours. Definitely.",
                "changes": {
                    "health": -0.5,
                    "time": 2,
                    "reaction": 0.5,
                    "strategy": 0.5,
                    "synergy": 2,
                }
            },
            "playCSgo": {
                id: "playCSgo",
                "title": "Play CS go",
                "description": "It's simple: we kill the Simple!",
                "changes": {
                    "health": -0.5,
                    "time": 2,
                    "reaction": 2,
                    "synergy": 1,
                }
            },
            "playFortnite": {
                id: "playFortnite",
                "title": "Play Fortnite",
                "description": "Ninja is a noob! I once killed him with a bow! I swear!",
                "changes": {
                    "health": -0.5,
                    "time": 2,
                    "reaction": 2,
                    "synergy": 1,
                }
            },
            "playOverWatch": {
                id: "playOverWatch",
                "title": "Play OverWatch",
                    "description": "You seem familiar. Ain’t I killed you before?",
                    "changes": {
                    "health": -0.5,
                    "time": 2,
                        "reaction": 1.5,
                        "strategy": 0.5,
                        "synergy": 1,
                }
            },
            "playPubg": {
                id: "playPubg",
                "title": "Play Pubg",
                    "description": "Find a pan, boy. Just. Find. A pan.",
                    "changes": {
                    "health": -0.5,
                    "time": 2,
                        "reaction": 2,
                        "strategy": 1,
                }
            },
            "playSC2": {
                id: "playSC2",
                "title": "Play StarCraft 2",
                    "description": "The Protos are so OP! So let's play for them. Hope this guy is not from Korea.",
                    "changes": {
                    "health": -0.5,
                    "time": 2,
                        "reaction": 0.5,
                        "strategy": 2.5,
                }
            },
            "playHeartStone": {
                id: "playHeartStone",
                "title": "Play HeartStone",
                    "description": "It's just a card game, what can be difficult here? Right? RIGHT?",
                    "changes": {
                    "health": -0.5,
                    "time": 2,
                        "strategy": 2,
                }
            },
            "playFifa": {
                id: "playFifa",
                "title": "Play Fifa",
                    "description": "Yes, yes, I know. This stupid game just doesn't want you to score! Maybe you better just play career mode only?",
                    "changes": {
                    "health": -0.5,
                    "time": 2,
                        "reaction": 1,
                        "strategy": 1,
                }
            },
            "playMK": {
                id: "playMK",
                "title": "Play Mortal Combat",
                    "description": "Wait, don't hit! Let me try something!",
                    "changes": {
                    "health": -0.5,
                    "time": 2,
                        "reaction": 2,
                        "strategy": 0.5,
                }
            },
            "playSkyrim": {
                id: "playSkyrim",
                "title": "Play Skyrim",
                    "description": "Dovahkiin, do you even know that this is a single player game? It is contraindicated for esportsmens",
                    "changes": {
                    "health": -0.5,
                    "time": 2,
                        "synergy": 1,
                }
            },
            "playAmongUs": {
                id: "playAmongUs",
                "title": "Play Among Us",
                    "description": "You are Impostor! Discuss!",
                    "changes": {
                    "health": -0.5,
                    "time": 2,
                        "strategy": 1,
                        "synergy": 3,
                }
            },
            "playHeroes": {
                id: "playHeroes",
                "title": "Play the best game in history! Almighty Heroes of Might and Magic III",
                    "description": "Astrologers proclaim the week of the old school games. Your procrastination doubles!",
                    "changes": {
                    "health": -0.5,
                    "time": 2,
                        "strategy": 1.5,
                }
            },
            "playSonic": {
                id: "playSonic",
                "title": "Play Sonic the hedgehog",
                    "description": "Make yourself comfortable, kids. Now I will tell you a story about the true lord of the rings (at 16 bit)",
                    "changes": {
                    "health": -0.5,
                    "time": 2,
                        "reaction": 2,
                }
            },
            "playMario": {
                id: "playMario",
                "title": "Play Mario",
                    "description": "Sorry Mario, but your princess is in another castle! She's always in another castle.",
                    "changes": {
                    "health": -0.5,
                    "time": 2,
                        "reaction": 2,
                }
            },
            "playTetris": {
                id: "playTetris",
                "title": "Play Tetris",
                    "description": "Just blow the dust off this and put it back",
                    "changes": {
                    "health": -0.5,
                    "time": 2,
                        "reaction": 1,
                        "strategy": 1,
                }
            },
            "playDead": {
                id: "playDead",
                "title": "Play Dead",
                    "description": "Just lie on the floor all day and think about what you're doing with your life.",
                    "changes": {
                    "time": 1,
                }
            }
        }
    };


