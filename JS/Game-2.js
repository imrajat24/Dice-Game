/*eslint-env browser*/


    var scores, roundScore, activePlayer, Game, previousScore1,previousScore2;

    initGame();



    //Working of RollDice button!!

    document.querySelector('.btn-roll').addEventListener('click', function()  
    { 

    //Button should work only if GAME variable is true!!

    if (Game)
    {      
      
    //Generate a random number.

    var dice1 = Math.floor(Math.random()*6)+1;
    var dice2 = Math.floor(Math.random()*6)+1;    
        

    //Printing the results. 

    var diceDom1 = document.querySelector('.dice-1');
    var diceDom2 = document.querySelector('.dice-2');   
    diceDom1.style.display = 'block';
    diceDom2.style.display = 'block';    
    diceDom1.src = 'CSS/dice-' + dice1 + '.png';      
    diceDom2.src = 'CSS/dice-' + dice2 + '.png';   
        
    //Updating the roundScores if the rolled number is not 1.    

    if(dice1 !== 1 && dice2 !== 1)
    {
      //Add the numbers.
      roundScore += dice1 + dice2;
      document.getElementById('current-' + activePlayer).textContent = roundScore;   
    }    
    else 
    {


      //Changing of next player!!   

       nextPlayer();
        
    }   
          
        
    //Changing players if two consecutive six comes !!    
        
    if (previousScore1 === 6 && dice1 === 6 && previousScore2 === 6 && dice2 ===6) 
    
    {
        scores[activePlayer] = 0;
        document.getElementById("score-" + activePlayer).textContent = '0';
        nextPlayer();
        
    }   
           
    // Setting up the previous score.!!
        
        previousScore1 = dice1;
        previousScore2 = dice2;
        
    }});




 


    //Working of Hold button!!

      document.querySelector('.btn-hold').addEventListener('click', function() 
    {

    //Button should work only if GAME variable is true!!

    if(Game)
     {      

    //Setting Display to none.!!
      document.querySelector('.dice-1').style.display = 'none';
      document.querySelector('.dice-2').style.display = 'none';

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

          document.querySelector('.dice-1').style.display = 'none';
          document.querySelector('.dice-2').style.display = 'none';

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
