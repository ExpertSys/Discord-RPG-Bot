class Game {
    constructor(player, client, channelName='bot-testing', playersOnline){
         this.client = client;
         this.channelName = channelName;
         this.currentPlayer = player;   
         this.playersOnline = [];
         this.hitpoints = 120;
         this.damage = '';
         this.chance = 3;
         this.inBattle = false;
         this.online = playersOnline;
         
        this.monster = [{
            hp: Math.floor(Math.random() * 200),
            temphp: 0,
            damage: 10
        }];
    };

    /* main menu information, players online */
    startGame(){
            for(var x = 0; x < this.currentPlayer.length; x++){
                this.playersOnline.push(this.currentPlayer[x]);
                if(this.playersOnline[x] === this.currentPlayer[x]){
                    return [`Players Online: ${this.online}\n`];
            }
         }
    }
    
    /* Battle system */
    initBattle(currPlayer){
        this.inBattle = true;
        let npcHP = this.monster[0].hp;
        let numberOfAttacks = 0;
        let totalDamage=0, totalBonusDamage=0;
        
        while( this.monster[0].hp > 0 ){
            let playerDamage = Math.floor(Math.random() * (npcHP / 4));  
            if(this.bonusAttack() === 2){
                console.log(`Bonus Attack: ${this.bonusAttack()}`);
                console.log(`Regular damage without bonus attack: ${playerDamage}`);
                playerDamage = playerDamage + 2; 
            }
            this.monster[0].hp -= playerDamage;
            this.hitpoints -= this.monster[0].damage;
            
            console.log('Monster: ' + this.monster[0].hp);
            console.log('Player: ' + this.hitpoints);
            console.log(`${currPlayer} has attacked for ${playerDamage}`);
            console.log(`NPC health: ${this.monster[0].hp}`);   
            
            if(this.hitpoints <= 0){
                return [`You lost the battle.`];
            }
            
            this.inBattle = false;
            numberOfAttacks++; 
            totalDamage += playerDamage;
            totalBonusDamage = playerDamage + this.bonusAttack();    
        }
        if(this.monster[0].hp <= 0 && this.inBattle !== true){
            let maxDamage = totalDamage + totalBonusDamage; 
            return [`${currPlayer} has attacked ${numberOfAttacks} times dealing ${totalDamage} + (${totalBonusDamage}) bonus damage for a total of ${maxDamage} damage. The monster is dead.\n
            Your Health: ${this.hitpoints}`];
        } 
        else{
            this.newGame();
            return [`You rejuvenated your hitpoints and are ready for battle. \nType !fight again to start a new battle!`];
        }
    }

    /* bonus attack damage [ 1 in 3 chance ] */
    bonusAttack(bonusDamage){
        let chance = Math.floor(Math.random() * 3);
        return chance === 2 ? bonusDamage = 2 : false;
    }

    /* displays players currently online */
    getOnline(){
        let totalPlayers = [[], []];
        for(var x = 0; x < this.currentPlayer.length; x++){
            console.log(`[ID: ${x}] ` + this.currentPlayer[x]);
            totalPlayers.push([`ID: [${x}] [${this.currentPlayer}]`]);
        }
        console.log(totalPlayers);
        return totalPlayers;
    }

    /* refresh stats */
    newGame(){
        this.monster[0].hp = Math.floor(Math.random() * 50);
        this.hitpoints = 150;
    }
}

module.exports = Game;
