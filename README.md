# TwoRooms-Client

DISCLAIMER: This project will in no way, shape, or form be monitized. It is for private use only.

Better README will be done eventually

This needs a docker container running the api server and database. Instructions at https://github.com/lakecjl/tworooms-backend

-General Gameplay Rules-

# Setup
Players are evenly, randomly, and secretly divided into two teams, a Red team and a Blue team. Within each team, players are randomly and secretly given a role (currently there are two implemented on each team, plus an extra in case of an odd number of players)
Players are then randomly assigned to one of two rooms, with each room having a random amount of each team in it. Players should NOT know who is on which team and who has what role.

# Roles and Goals of each Role

## RED TEAM
  -Bomber: Your goal is to lie, coerce, and manipulate your way into being in the same room as the President at the end of the third round.
  -Red Team Member: Your goal is to have the Bomber and the President in the same room at the end of the third round

## BLUE TEAM
  -President: Your goal is to stay away from the Bomber! If you are in a different room from the bomber at the end of the third round, your team wins!
  -Blue Team Member: Your goal is to keep the bomber away from the President

## UNAFFILIATED ROLES
  -Gambler: This role should only be assigned if there are an odd number of players. Your goal is to figure out who will win. You are not assigned to either team, but you may try to tip the scales in favor of one if you wish. At the end of the third round, pick the team that you think won. If you're right, you win!
