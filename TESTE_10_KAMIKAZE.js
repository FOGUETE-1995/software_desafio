const DIRECTIONS = ['north', 'east', 'south', 'west'];


//NORTH -> PRA CIMA
//EAST -> DIREITA
//SOUTH -> PRA BAIXO
//wEST -> ESQUERDA

function isVisible (originalPosition, finalPosition, direction){
  switch (direction) {
    case DIRECTIONS[0]: //CIMA
      return originalPosition[1] === finalPosition[1] && originalPosition[0] > finalPosition[0];
    case DIRECTIONS[1]: //DIREITA
      return originalPosition[0] === finalPosition[0] && originalPosition[1] < finalPosition[1];
    case DIRECTIONS[2]: //BAIXO
      return originalPosition[1] === finalPosition[1] && originalPosition[0] < finalPosition[0];
    case DIRECTIONS[3]: //ESQUERDA
      return originalPosition[0] === finalPosition[0] && originalPosition[1] > finalPosition[1];
    default:
      break;
  }
};

function canKill (currentPlayerState, enemiesStates) {
  return enemiesStates.some(enemyObject => {
    return enemyObject.isAlive &&
      isVisible(currentPlayerState.position, enemyObject.position, currentPlayerState.direction);
  });
};

function canDie (atualPlayerState, inimigosStates) {          //verifica se pode morrer
  let resultado=0;                                            //resultado da funcao
  for(let i=0; i<inimigosStates.length; i++){                 //percorre o estado de cada inimigo
    
    if(inimigosStates[i].isAlive === true && inimigosStates[i].ammo > 0){ //verifica se o inimigo tem munição e está vivo
      
      if(inimigosStates[i].position[0]===atualPlayerState[0]){
        if(inimigosStates[i].position[1] > atualPlayerState[1]){
          if(inimigosStates[i].direction === 'west'){
            resultado = 1;
          }else if(resultado > 0 && resultado < 5){
            resultado = resultado+0;
          }else{
            resultado = 5;
          }
        }else if(inimigosStates[i].position[1] < atualPlayerState[1]){
          if(inimigosStates[i].direction === 'east'){
            resultado = 2;
          }else if(resultado > 0 && resultado < 5){
            resultado = resultado+0;
          }else{
            resultado = 6;
          }
        }
      }else if(inimigosStates[i].position[1]===atualPlayerState[1]){
        if(inimigosStates[i].position[0] > atualPlayerState[0]){
          if(inimigosStates[i].direction === 'north'){
            resultado = 3;
          }else if(resultado > 0 && resultado < 5){
            resultado = resultado+0;
          }else{
            resultado = 7;
          }
        }else if(inimigosStates[i].position[0] < atualPlayerState[0]){
          if(inimigosStates[i].direction === 'south'){
            resultado = 4;
          }else if(resultado > 0 && resultado < 5){
            resultado = resultado+0;
          }else{
            resultado = 8;
          }
        }
      }
    }    
  //caso contrário qualquer outra situação, vc estará a salvo!!! :) 
  }
  return resultado; //retorna se vc pode morrer ou não
};

function moveSafe (valor, currentPlayer, inimigo, tabuleiro) {
  /*GABARITO
  1 -> INIMIGO Á DIREITA MIRADO EM VC
  2 -> INIMIGO Á ESQUERDA MIRADO EM VC
  3 -> INIMIGO ABAIXO MIRADO EM VC
  4 -> INIMIGO ACIMA MIRADO EM VC
  5 -> INIMIGO APENAS Á DIREITA
  6 -> INIMIGO APENAS Á ESQUERDA
  7 -> INIMIGO APENAS ABAIXO
  8 -> INIMIGO APENAS ACIMA
  */
  let move = [0,0,0,0]; //variavel que armazena possiveis direçao para movimentaçao
  let hipotese = [0,0]; //possivel movimento

  hipotese = [(currentPlayer.position[0]+1),(currentPlayer.position[1])];
  if(hipotese[0] <= tabuleiro-1){
    if(canDie(hipotese,inimigo) > 0 &&  canDie(hipotese,inimigo) < 5){
      move[0]=1; //pode ir pra cima
    }else{
      move[2]=1; //pode ir pra baixo
    }
  }else {
    move[0]=1; //robo está na borda e só dá pra recuar
  }
      
  hipotese = [(currentPlayer.position[0]-1),(currentPlayer.position[1])]; 
  if(hipotese[0] >= 0){
    if(canDie(hipotese,inimigo) > 0 &&  canDie(hipotese,inimigo) < 5){
      move[2]=1; //pode ir pra baixo
    }else{
      move[0]=1; //pode ir pra cima
    }
  }else {
    move[2]=1; //robo está na borda e só dá pra avançar
  }

  hipotese = [(currentPlayer.position[0]),(currentPlayer.position[1]+1)]; 
  if(hipotese[1] <= tabuleiro-1){
    if(canDie(hipotese,inimigo) > 0 &&  canDie(hipotese,inimigo) < 5){
      move[3]=1; //pode ir pra esquerda
    }else{
      move[1]=1; //pode ir pra direita
    }
  }else {
    move[3]=1; //robo está na borda e só dá ir pra esquerda
  }

  hipotese = [(currentPlayer.position[0]),(currentPlayer.position[1]-1)]; 
  if(hipotese[1] >= 0){
    if(canDie(hipotese,inimigo) > 0 &&  canDie(hipotese,inimigo) < 5){
      move[1]=1; //pode ir pra direita
    }else{
      move[3]=1; //pode ir pra esquerda
    }
  }else {
    move[1]=1; //robo está na borda e só dá pra ir pra direita
  }

  if(valor === 1 || valor === 2 || valor === 5 || valor === 6){ 
      if(move[0] === 1 && currentPlayer.direction === 'north'){
        return 'move';
      }else if(move[2]===1 && currentPlayer.direction === 'south'){
        return 'move';
      } else if(move[0] === 1){
        return 'north';
      } else if(move[2] === 1){
        return 'south';
      }else{
        return currentPlayer.direction;
      }
  }else if(valor === 3 || valor === 4 || valor === 7 || valor === 8){
      if(move[1] === 1 && currentPlayer.direction === 'east'){
        return 'move';
      }else if(move[3]===1 && currentPlayer.direction === 'west'){
        return 'move';
      } else if(move[1] === 1){
        return 'east';
      } else if(move[3] === 1){
        return 'west';
      }else{
        return currentPlayer.direction;
      }
  }
}; //feito

function getRota (objetivo, partida, rivais,grid) {          //objetivo: é a coordenada (x,y) do objetivo a ser alcançado
  let hipotese = [0,0]; //possivel movimento
  let move = [0,0,0,0];

  hipotese = [(partida.position[0]+1),(partida.position[1])];
  if(hipotese[0] <= grid-1){
    if(canDie(hipotese,rivais) >=1 && canDie(hipotese,rivais) <=4){
      move[2] = 0;
    }else{
      move[2]=1; //pode ir pra baixo
    }
  }
      
  hipotese = [(partida.position[0]-1),(partida.position[1])]; 
  if(hipotese[0] >= 0){
    if(canDie(hipotese,rivais) >=1 && canDie(hipotese,rivais) <=4){
      move[0]=0; //pode ir pra baixo
    }else{
      move[0]=1; //pode ir pra cima
    }
  }

  hipotese = [(partida.position[0]),(partida.position[1]+1)]; 
  if(hipotese[1] <= grid-1){
    if(canDie(hipotese,rivais) >=1 && canDie(hipotese,rivais) <=4){
      move[1]=0; //pode ir pra esquerda
    }else{
      move[1]=1; //pode ir pra direita
    }
  }

  hipotese = [(partida.position[0]),(partida.position[1]-1)]; 
  if(hipotese[1] >= 0){
    if(canDie(hipotese,rivais) >=1 && canDie(hipotese,rivais) <=4){
      move[3]=0; //pode ir pra direita
    }else{
      move[3]=1; //pode ir pra esquerda
    }
  }

  if(objetivo[0] === partida.position[0] || objetivo[1] === partida.position[1]){
    if(objetivo[1] < partida.position[1]){
      if(move[3] === 1 && partida.direction === 'west'){
        return 'move';
      }else if (move[3] === 1){
        return 'west';
      }else if (move[2] === 1 && partida.direction === 'south'){
        return 'move';
      }else if (move[0] === 1 && partida.direction === 'north'){
        return 'move';
      }else if (move[0] === 1){
        return 'north';
      }else if (move[2] === 1){
        return 'south';
      }else if (move[1] === 1 && partida.direction === 'east'){
        return 'move';
      }else if (move[1] === 1){
        return 'east';
      }
    }else if(objetivo[1] > partida.position[1]){
      if(move[1] === 1 && partida.direction === 'east'){
        return 'move';
      }else if (move[1] === 1){
        return 'east';
      }else if (move[2] === 1  && partida.direction === 'south'){
        return 'move';
      }else if (move[0] === 1 && partida.direction === 'north'){
        return 'move';
      }else if (move[0] === 1){
        return 'north';
      }else if (move[2] === 1){
        return 'south';
      }else if (move[1] === 1 && partida.direction === 'west'){
        return 'move';
      }else if (move[1] === 1){
        return 'west';
      }
    }else if(objetivo[0] < partida.position[0]){
      if(move[0] === 1 && partida.direction === 'north'){
        return 'move';
      }else if (move[0] === 1){
        return 'north';
      }else if (move[3] === 1 && partida.direction === 'west'){
        return 'move';
      }else if (move[1] === 1 && partida.direction === 'east'){
        return 'move';
      }else if (move[1] === 1){
        return 'east';
      }else if (move[3] === 1){
        return 'west';
      }else if (move[2] === 1 && partida.direction === 'south'){
        return 'move';
      }else if (move[2] === 1){
        return 'south';
      }
    }else if(objetivo[0] > partida.position[0]){
      if(move[2] === 1 && partida.direction === 'south'){
        return 'move';
      }else if (move[2] === 1){
        return 'south';
      }else if (move[3] === 1 && partida.direction === 'west'){
        return 'move';
      }else if (move[1] === 1  && partida.direction === 'east'){
        return 'move';
      }else if (move[1] === 1){
        return 'east';
      }else if (move[3] === 1){
        return 'west';
      }else if (move[0] === 1 && partida.direction === 'north'){
        return 'move';
      }else if (move[0] === 1){
        return 'north';
      }
    }
  }
    
  if(objetivo[0] < partida.position[0] && objetivo[1] < partida.position[1]){
    if(move[0] === 1 && partida.direction === 'north'){
      return 'move';
    }else if (move[3] === 1 && partida.direction === 'west'){
      return 'move';
    }else if (move[0] === 1){
      return 'north';
    }else if (move[3] === 1){
      return 'west';
    }
  }

  if(objetivo[0] < partida.position[0] && objetivo[1] > partida.position[1]){
    if(move[0] === 1 && partida.direction === 'north'){
      return 'move';
    }else if (move[1] === 1 && partida.direction === 'east'){
      return 'move';
    }else if (move[0] === 1){
      return 'north';
    }else if (move[1] === 1){
      return 'east';
    }
  }

  if(objetivo[0] > partida.position[0] && objetivo[1] > partida.position[1]){
    if(move[2] === 1 && partida.direction === 'south'){
      return 'move';
    }else if (move[1] === 1 && partida.direction === 'east'){
      return 'move';
    }else if (move[2] === 1){
      return 'south';
    }else if (move[1] === 1){
      return 'east';
    }
  }

  if(objetivo[0] > partida.position[0] && objetivo[1] < partida.position[1]){
    if(move[2] === 1 && partida.direction === 'south'){
      return 'move';
    }else if (move[3] === 1 && partida.direction === 'west'){
      return 'move';
    }else if (move[2] === 1){
      return 'south';
    }else if (move[3] === 1){
      return 'west';
    }
  }
  
};

function procurarAmmo (atualPosition, rivais, grid, tabuleiro) {
  let rota = [0,0];       //variável que vai receber a coordenada da  AMMO mais perto
  let ammoAtual = [0,0];  //variável de controle
  let j = 0;              //variável de controle
  let menorRota = 0;      //variável para comparação
  
  for(let i=0; i < tabuleiro.length; i++){ //percorre todas as posições das AMMO no tabuleiro
    ammoAtual = tabuleiro[i];
    j = Math.abs((atualPosition.position[0]-ammoAtual[0])) + Math.abs((atualPosition.position[1]-ammoAtual[1]));
    if(i === 0){
      menorRota = j;
      rota = ammoAtual;
    }else if (j < menorRota){ //comparação	pra saber qual é menor
      menorRota = j; //atualiza com o menor valor
      rota = ammoAtual; //atualiza com as coordenadas mais perto 
    }
  } 

  let hipotese = [0,0]; //possivel movimento
  let move = [0,0,0,0];
  let partida = atualPosition;
  let objetivo = rota;
  

  hipotese = [(partida.position[0]+1),(partida.position[1])];
  if(hipotese[0] <= grid-1){
    if(canDie(hipotese,rivais) > 0){
      move[2] = 0;
    }else{
      move[2]=1; //pode ir pra baixo
    }
  }
      
  hipotese = [(partida.position[0]-1),(partida.position[1])]; 
  if(hipotese[0] >= 0){
    if(canDie(hipotese,rivais) > 0){
      move[0]=0; //pode ir pra baixo
    }else{
      move[0]=1; //pode ir pra cima
    }
  }

  hipotese = [(partida.position[0]),(partida.position[1]+1)]; 
  if(hipotese[1] <= grid-1){
    if(canDie(hipotese,rivais) > 0){
      move[1]=0; //pode ir pra esquerda
    }else{
      move[1]=1; //pode ir pra direita
    }
  }

  hipotese = [(partida.position[0]),(partida.position[1]-1)]; 
  if(hipotese[1] >= 0){
    if(canDie(hipotese,rivais) > 0){
      move[3]=0; //pode ir pra direita
    }else{
      move[3]=1; //pode ir pra esquerda
    }
  }

  if(objetivo[0] === partida.position[0] || objetivo[1] === partida.position[1]){
    if(objetivo[1] < partida.position[1]){
      if(move[3] === 1 && partida.direction === 'west'){
        return 'move';
      }else if (move[3] === 1){
        return 'west';
      }else if (move[2] === 1 && partida.direction === 'south'){
        return 'move';
      }else if (move[0] === 1 && partida.direction === 'north'){
        return 'move';
      }else if (move[0] === 1){
        return 'north';
      }else if (move[2] === 1){
        return 'south';
      }else if (move[1] === 1 && partida.direction === 'east'){
        return 'move';
      }else if (move[1] === 1){
        return 'east';
      }
    }else if(objetivo[1] > partida.position[1]){
      if(move[1] === 1 && partida.direction === 'east'){
        return 'move';
      }else if (move[1] === 1){
        return 'east';
      }else if (move[2] === 1  && partida.direction === 'south'){
        return 'move';
      }else if (move[0] === 1 && partida.direction === 'north'){
        return 'move';
      }else if (move[0] === 1){
        return 'north';
      }else if (move[2] === 1){
        return 'south';
      }else if (move[1] === 1 && partida.direction === 'west'){
        return 'move';
      }else if (move[1] === 1){
        return 'west';
      }
    }else if(objetivo[0] < partida.position[0]){
      if(move[0] === 1 && partida.direction === 'north'){
        return 'move';
      }else if (move[0] === 1){
        return 'north';
      }else if (move[3] === 1 && partida.direction === 'west'){
        return 'move';
      }else if (move[1] === 1 && partida.direction === 'east'){
        return 'move';
      }else if (move[1] === 1){
        return 'east';
      }else if (move[3] === 1){
        return 'west';
      }else if (move[2] === 1 && partida.direction === 'south'){
        return 'move';
      }else if (move[2] === 1){
        return 'south';
      }
    }else if(objetivo[0] > partida.position[0]){
      if(move[2] === 1 && partida.direction === 'south'){
        return 'move';
      }else if (move[2] === 1){
        return 'south';
      }else if (move[3] === 1 && partida.direction === 'west'){
        return 'move';
      }else if (move[1] === 1  && partida.direction === 'east'){
        return 'move';
      }else if (move[1] === 1){
        return 'east';
      }else if (move[3] === 1){
        return 'west';
      }else if (move[0] === 1 && partida.direction === 'north'){
        return 'move';
      }else if (move[0] === 1){
        return 'north';
      }
    }
  }
    
  if(objetivo[0] < partida.position[0] && objetivo[1] < partida.position[1]){
    if(move[0] === 1 && partida.direction === 'north'){
      return 'move';
    }else if (move[3] === 1 && partida.direction === 'west'){
      return 'move';
    }else if (move[0] === 1){
      return 'north';
    }else if (move[3] === 1){
      return 'west';
    }
  }

  if(objetivo[0] < partida.position[0] && objetivo[1] > partida.position[1]){
    if(move[0] === 1 && partida.direction === 'north'){
      return 'move';
    }else if (move[1] === 1 && partida.direction === 'east'){
      return 'move';
    }else if (move[0] === 1){
      return 'north';
    }else if (move[1] === 1){
      return 'east';
    }
  }

  if(objetivo[0] > partida.position[0] && objetivo[1] > partida.position[1]){
    if(move[2] === 1 && partida.direction === 'south'){
      return 'move';
    }else if (move[1] === 1 && partida.direction === 'east'){
      return 'move';
    }else if (move[2] === 1){
      return 'south';
    }else if (move[1] === 1){
      return 'east';
    }
  }

  if(objetivo[0] > partida.position[0] && objetivo[1] < partida.position[1]){
    if(move[2] === 1 && partida.direction === 'south'){
      return 'move';
    }else if (move[3] === 1 && partida.direction === 'west'){
      return 'move';
    }else if (move[2] === 1){
      return 'south';
    }else if (move[3] === 1){
      return 'west';
    }
  }

};

function close (myPos,enemyPos,ammoPos){
  let rival;
  let rivalclose;
  let qtdRivalWithAmmo = 0;
  let qtdRivalAlive = 0;

  let ammo;
  let ammoclose;

  let k;

  for(let i=0; i<enemyPos.length; i++){
    if(enemyPos[i].isAlive === true){    
      
      qtdRivalAlive++;

      rival = enemyPos[i].position;
      
      if(enemyPos[i].ammo > 0){
        qtdRivalWithAmmo++;
      }

      k = Math.abs((myPos.position[0]-rival[0]))+Math.abs((myPos.position[1]-rival[1]));
      if(i===0){
        rivalclose=k;
      } else if (k<rivalclose){
        rivalclose = k;
        rival = enemyPos[i].position;
      }
    }
  }
  
  for(let i=0; i<ammoPos.ammoPosition.length; i++){
    ammo = ammoPos.ammoPosition[i];
    k = Math.abs((myPos.position[0]-ammo[0]))+Math.abs((myPos.position[1]-ammo[1]));
    if(i===0){
      ammoclose=k;
    } else if(k<ammoclose){
      ammoclose = k;
      ammo = ammoPos.ammoPosition[i];
    }
  }

  if(myPos.ammo >= 2 || qtdRivalWithAmmo <= 1 || qtdRivalAlive === 1){
    return rival;
  }else if(rivalclose <= ammoclose){
    return rival;
  } else {
    return ammo;
  }

};

const player = {
  info: { name: "KAMIKAZE", style: 7,},
  ai: (playerState, enemiesState, gameEnvironment) => {
    let die = canDie(playerState.position,enemiesState);
    let moreClose = close (playerState,enemiesState,gameEnvironment);
    let kill = canKill(playerState,enemiesState);
    
    if (playerState.ammo > 0) { 
      if(kill === true){
        return 'shoot'; 
      } else if( die > 0 && die < 5){
        return moveSafe (die,playerState,enemiesState,gameEnvironment.gridSize);
      }else{
        return getRota (moreClose,playerState,enemiesState,gameEnvironment.gridSize);  //procura o inimigo com munição ou a AMMO mais próxima
      }                                                                  
    } else if (die > 0){                                                             
        return moveSafe (die,playerState,enemiesState,gameEnvironment.gridSize);                           
    } else{                                                                      
        return procurarAmmo (playerState,enemiesState,gameEnvironment.gridSize,gameEnvironment.ammoPosition);      
    }

    //Seu código aqui
    // Lembrando que a cada turno essa função vai ser executada
    // E ela tem que retornar um movimento
    // Seja atirar (shoot), mover(move), girar(south, west, east, north)

    //ultima alteração em 15-04-2021 - V10.5
  },
};


module.exports = player;