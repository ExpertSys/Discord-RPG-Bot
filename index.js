/* Discord API Information */
const Discord = require('discord.js');
const token = '';
const Game = require('./game.js');
const client = new Discord.Client();

let playersName = []; // tracks each player that joins
let playersSaveFile = [];
let currPlayers = 0; //tracker for total players online
let INIT_GAME; //Initilizes our game engine
let userJoined = false; 
let inBattle = false; 
let session_id;
let currentUser;

/* User joins the server */
client.on('message', (msg) => {
    if(msg.content === '!join'){
        
        // Prevents multiple instances of the same person from joining
        for(var x = 0; x < playersName.length; x++){
            if(playersName[x].playerName===msg.author.username){
                return playersName[x].playerName;
            }
         }

        function checkData(){
        // Checks the object that stores players data so they can retrieve their saved progress    
        for(var s = 0; s < playersSaveFile.length; s++){
            if(playersSaveFile[s].playerName===msg.author.username){
                for(var y = 0; y < playersName.length; y++){
                /* If the name in the save file object matches the name of the current user online, retrieve 
                that specific persons saved progress */
                if(playersName[y].playerName===playersSaveFile[s].playerName){
                msg.channel.send('This player has a saved file!');
                /* Grab the index from the saved file and set it to the index of the current players object
                This is where you load all the players progress(such as health,damage,id,etc) */
                playersName[y].index=playersSaveFile[s].index;
                msg.channel.send('Saved file has been loaded.');
                } else{
                   }
                }
              }
           }       
        }     
    
        function init(){
            INIT_GAME = new Game(playersName, client, 'bot-testing', currPlayers);
            let myRet = INIT_GAME.startGame();
            const embed = new Discord.RichEmbed()
            .setTitle("Welcome To Era Online")
            .setColor(0xFF0000)
            .addField(`${msg.author.username} has Joined`, myRet);
            msg.channel.send(embed);
            msg.channel.send(`${msg.author} has joined the game.`);
            return;
        }

        // Increasing the players online count when someone joins
        currPlayers++;
        userJoined = true;

        // Creates a new object to store information about the player who joined
        playersName.push({
            "playerName": msg.author.username,
            "index": 99,
            "health": 150,
            "inBattle": false
        });  

        checkData();  
        init();
    }

    /* User types the fight command */
    if(userJoined == true){
        if(msg.content === '!fight'){
            for(var d = 0; d < playersName.length; d++){
                session_id = playersName[d];
            } 

            console.log("You attacked monster.");
            currentUser = msg.author.username;
            let grabCurrPlayer = currentUser;
            let playerStats = session_id;
            msg.channel.send(`${INIT_GAME.initBattle(grabCurrPlayer, playerStats)}`);
        }

        else if(msg.content === '!leave'){
            let tempLeave = msg.author.username;

            for(var x = 0; x < playersName.length; x++){
                if(playersName[x].playerName === tempLeave){
                    playersName.splice(x, 1);
                    currPlayers--;
                }
            }
            msg.channel.send([`${tempLeave} has left the server.`]);
            // userJoined = false;
        }

        /* Rejuvanates players and monster hitpoints */
        else if(msg.content === '!newgame'){
            msg.channel.send(INIT_GAME.newGame(session_id));
        }

        /* Simply checks the bonus damage. command for developer*/
        else if(msg.content === '!bonus'){
            msg.channel.send(INIT_GAME.bonusAttack());
        }

        /* checks whose currently online. command for developer*/
        else if(msg.content === '!online'){
            msg.channel.send(INIT_GAME.getOnline());
            console.log(playersName);
        }

        if(msg.content === '!test'){
            msg.channel.send(msg.author);
           
            console.log(msg.author);
        }
    }

    if(msg.content === '!save'){
        let playID = msg.author.username;
        let index = playersName.findIndex(x => x["playerName"] === playID);
        let tempID;

        for(var x = 0; x < playersName.length; x++){
            if(playersName[x].playerName === playID){
                playersName[x].index = index;
                tempID = index;
            }
        }
        msg.channel.send(`You now have the account id: ${tempID}`);

        playersSaveFile.push({
            "playerName": playID,
            "index": tempID,
            "health": 150
        });
    }
});

client.on('ready', () => {
    console.log('Bot is now connected');
});

client.login(token);
