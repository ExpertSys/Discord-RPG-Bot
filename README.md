# Discord-RPG-Bot
Small Discord RPG with the aid of the Discord API. 

Command List
--
- !join -> join the server
- !fight -> starts a battle between you and a randomly generated npc
- !leave -> leaves the server
- !newgame -> refreshes both yours and the monsters health
- !save -> Saves your game so you lose no data on your progressed character
- !online -> Checks the currently connected players on the server

Features
--
- You are able to battle
- You can save your progress without the need of a REAL database
- Join the server and leave the server

Patch Notes [3/22/2019]
--
- Added unique fight system for each player
- Created a save system that can be accessed once a player joins back
- Added player health and account id
- Players can create a unique account ID that can be linked to their account after saving
- Added !online command so players can see who is currently online

Setup through the Discord API in order to pull information about the people in my server. For reference I have 60 people inside.

Bugs that I came across and fixed:
- Store plays and data in array to allow for
instances of the game to be ran
- Added counter for how many players are online
- Create system to determine whether someone is
in battle
- Created a check to see if a player whose joined
the server was already online
- Prevent duplicate players from joining the
server
- Fixed the problem where when 1 player leaves, 
it forces all players to leave the server
- Fixed problem where 1 person attacking would make
everyone on the server attack as well.
- Created a bonus damage system that is only
triggered 1/3rd of the time. If it hits, they gain a
fixed damage of +2 on the attack
damage on the attack
- Created a basic attack system for monster so that
the player could take damage
- Added check for when player dies
- Added new command !fight in order to respawn
npc HP or !newgame
- Changed main menu from displaying user stats
to displaying players online
- Display Unique ID for each player that joins
and leaves
- Problem where every time someone attacked, the newest
person to join takes all the damage
- Fixed problem where newest player would overwrite all
the previous players accounts once they attack
