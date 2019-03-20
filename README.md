# Discord-RPG-Bot
Mini Discord RPG Bot with minimum features. 

Command List
--
- !join -> join the server
- !fight -> starts a battle between you and a randomly generated npc
- !leave -> leaves the server
- !newgame -> refreshes both yours and the monsters health

- You are able to battle
- Multiple players are able to battle at once
- Join the server and leave the server

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
