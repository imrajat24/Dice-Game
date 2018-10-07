/*eslint-env browser*/
/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- If two consecutive six comes of a player then he looses all his score including the global score.
- The first player to reach 100 points on GLOBAL score wins the game

*/

    var scores, roundScore, activePlayer, Game, previousScore;

    initGame();



    //Working of RollDice button!!

    document.querySelector('.btn-roll').addEventListener('click', function()  
    { 

    //Button should work only if GAME variable is true!!

    if (Game)
    {      
      
    //Generate a random number.

    var dice = Math.floor(Math.random()*6)+1; 
        

    //Printing the results. 

    var diceDom = document.querySelector('.dice');
    diceDom.style.display = 'block';                                                 
    diceDom.src = 'CSS/dice-' + dice + '.png';      
        
        
    //Updating the roundScores if the rolled number is not 1.    

    if(dice !== 1)
    {
      //Add the numbers.
      roundScore += dice;
      document.getElementById('current-' + activePlayer).textContent = roundScore;   
    }    
    else 
    {


      //Changing of next player!!   

       nextPlayer();
        
    }   
          
        
    //Changing players if two consecutive six comes !!    
        
    if (previousScore === 6 && dice === 6) 
    
    {
        scores[activePlayer] = 0;
        document.getElementById("score-" + activePlayer).textContent = '0';
        nextPlayer();
        
    }   
           
    // Setting up the previous score.!!
        
        previousScore = dice;
        
    }});




 


    //Working of Hold button!!

      document.querySelector('.btn-hold').addEventListener('click', function() 
    {

    //Button should work only if GAME variable is true!!

    if(Game)
     {      

    //Setting Display to none.!!
      document.querySelector('.dice').style.display = 'none';


    //Updating the round scores to global score!!

       scores[activePlayer] += roundScore; 
       document.getElementById('score-' + activePlayer).textContent=scores[activePlayer];

    //Checking if the player had won the game ???

      if(scores[activePlayer] >= 100)
      {
          
    //Setting value of GAME variable to false.!!      

        Game = false;  


    // Adding Winner and Looser message.!!

        if(activePlayer === 0)
        {

            document.getElementById('name-' + activePlayer).textContent = 'Winner!!';
            document.getElementById('name-1').textContent = 'Looser!!';

        }
        else
        {

           document.getElementById('name-' + activePlayer).textContent = 'Winner!!';
           document.getElementById('name-0').textContent = 'Looser!!'; 

        }  

      //Setting Display to none.!!

          document.querySelector('.dice').style.display = 'none';

     //Removal of ACTIVE class and addition of WINNER class!!
          document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
          document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');

      }  

      else
      {

     //Changing of player!!

          nextPlayer();

      }            

    }

    });








    //Function for CHANGING PLAYER!!(For the implementation of DRY(Don't Repeat Yourself) PRINCIPLE!!)

     function nextPlayer()
    {

      //Active player change!!
      //If the active player is first at that time then it will change to 2nd and vice versa.      
      if(activePlayer === 0)
      {
      //Firstly  round score becomes 0 and then the active player changes.!!
         roundScore = 0;   
         document.getElementById('current-' + activePlayer).textContent = roundScore;
         activePlayer = 1;
      }   
    else
     {  
         roundScore = 0;   
         document.getElementById('current-' + activePlayer).textContent = roundScore;   
         activePlayer= 0;
     }
        document.querySelector('.player-0-panel').classList.toggle('active'); 
        document.querySelector('.player-1-panel').classList.toggle('active'); 

    }





    //Button for New Game.!!

        document.querySelector('.btn-new').addEventListener('click' , initGame);





       function initGame()
        {

          scores = [0,0];
          roundScore = 0;
          activePlayer = 0;
          Game = true; 


        //Setting dice to none initially.!!

          document.querySelector('.dice').style.display = 'none';


        //Making initial scores zero!!

          document.getElementById('score-0').textContent = 0;
          document.getElementById('score-1').textContent = 0;
          document.getElementById('current-0').textContent = 0;
          document.getElementById('current-1').textContent = 0;
          document.getElementById('name-0').textContent = 'Player 1' ;
          document.getElementById('name-1').textContent = 'Player 2';    

        //Making the changes for the New Game button.!!

          document.querySelector('.player-0-panel').classList.remove('winner');
          document.querySelector('.player-1-panel').classList.remove('winner');    
          document.querySelector('.player-0-panel').classList.remove('active');      
          document.querySelector('.player-1-panel').classList.remove('active');
          document.querySelector('.player-0-panel').classList.add('active');    

        }
