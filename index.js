/* Discord API Information */
const Discord = require('discord.js');
const token = '';
const Game = require('./game.js');
const client = new Discord.Client();

let playersName = []; // tracks each player that joins
let currPlayers = 0; //tracker for total players online
let INIT_GAME;
let userJoined = false;
let inBattle = false;

client.on('message', (msg) => {
    if(msg.content === '!join'){

        // Prevents multiple instances of the same person from joining
        for(var x = 0; x < playersName.length; x++){
            if(playersName[x]===msg.author.username){
                return playersName[x];
            }
        }

        currPlayers++;
        userJoined = true;
        playersName.push(msg.author.username);

        //My attempt at having the question im asking
        function convertToID(arr, width) {
            return arr.reduce(function (rows, key, index) {
              return (index % width == 0 ? rows.push([key])
                : rows[rows.length-1].push(key)) && rows;
            }, []);
          }

        console.log(convertToID(playersName,1)); /* Tracks players by ID in developer tools */

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

    if(userJoined == true){
        if(msg.content === '!fight' && (!inBattle)){
            let grabCurrPlayer = msg.author.username;
            msg.channel.send(`${INIT_GAME.initBattle(grabCurrPlayer)}`);
        }

        else if(msg.content === '!leave'){
            let tempLeave = msg.author.username;

            for(var y = 0; y < playersName.length; y++){
                if(playersName[y] == msg.author.username){
                    playersName[y] = [`${playersName[y]} was previously ID: ` + [y]];
                    currPlayers--;
                }
            }
            msg.channel.send([`${tempLeave} has left the server.`]);
            userJoined = false;
        }

        else if(msg.content === '!newgame'){
            msg.channel.send(INIT_GAME.newGame());
        }

        /* Simply checks the bonus damage. command for developer*/
        else if(msg.content === '!bonus'){
            msg.channel.send(INIT_GAME.bonusAttack());
        }
    }

    /* checks whose currently online. command for developer*/
    if(msg.content === '!online'){
        msg.channel.send(INIT_GAME.getOnline());
    }

});

client.on('ready', () => {
    console.log('Bot is now connected');
});

client.login(token);
