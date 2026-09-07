import * as Phaser from "phaser";
import { getDefaultStore } from "jotai";
import { Howl } from "howler";
import {
    playerScoreAtom,
    computerScoreAtom,
    gameOverAtom,
    winnerAtom,
    difficultAtom,
} from "../atoms/gameAtoms";

const store = getDefaultStore();

const somRaquete = new Howl({
    src: ["/sounds/hit.mp3"],
    volume: 0.5,
});

const somParede = new Howl({
    src: ["/sounds/wall.mp3"],
    volume: 0.4,
});

const somPonto = new Howl({
    src: ["/sounds/score.mp3"],
    volume: 0.6,
});

const somVitoria = new Howl({
    src: ["/sounds/win.mp3"],
    volume: 0.8,
});


export class PongScene extends Phaser.Scene {
    
    constructor(){
        super("PongScene");
    }

    create(){
        
        // Fundo 
        this.cameras.main.setBackgroundColor("#111");

        // Linha central
        this.add.rectangle(
            400,
            300,
            4,
            600,
            0xffffff
        );

        // =============================
        // Raquete do jogador
        // =============================
        this.player = this.add.rectangle(
            50,
            300,
            20,
            120,
            0xffffff
        );

        // Adiciona física
        this.physics.add.existing(this.player);

        // Raquete não será empurrada pela bola
        this.player.body.setImmovable(true);

        // Impede que a raquete de sair da tela
        this.player.body.setCollideWorldBounds(true);

        // ===============================
        // Raquete do computador
        // ===============================
        this.computer = this.add.rectangle(
            750,
            300,
            20,
            120,
            0xffffff
        );

    
        // Adiciona física
        this.physics.add.existing(this.computer);

        // Não será empurrada pela bola
        this.computer.body.setImmovable(true);

        this.computer.body.setCollideWorldBounds(true);

        // ==============================
        // Bola
        // ==============================
        this.ball = this.add.circle(
            400,
            300,
            12,
            0xffffff
        );

        // Adiciona física
        this.physics.add.existing(this.ball);

        // Corpo físico circular
        this.ball.body.setCircle(12);

        // Colisão com as paredes
        this.ball.body.setCollideWorldBounds(true);

        // Rebote
        this.ball.body.setBounce(1, 1);


        // ============================
        // Limites do mundo
        // ============================
        this.physics.world.setBounds(
            0,
            0,
            800,
            600,
            false,
            false,
            true,
            true
        );

        // =============================
        // Velocidade da bola
        // =============================
        this.velocidadeBola = 250;
        this.velocidadeMaxima = 550;
        this.ball.body.setVelocity(
            250,
            180
        );
        

        // ======================
        // Colisões com raquetes
        // ======================
        this.physics.add.collider(
            this.ball,
            this.player,
            () => {
                this.rebaterNaRaquete(
                    this.player,
                    1
                );
                somRaquete.play();
            }
        );

        this.physics.add.collider(
            this.ball,
            this.computer,
            () => {
                this.rebaterNaRaquete(
                    this.computer,
                    -1
                );
                somRaquete.play();
            }
        );

        
        // ====================
        // Teclado
        // ====================

        // Teclas W e S
        this.teclas = 
        this.input.keyboard.addKeys({
        
            cima: Phaser.Input.Keyboard.KeyCodes.W,
            baixo: Phaser.Input.Keyboard.KeyCodes.S,

        });

        // Setas no teclado
        this.cursores = 
        this.input.keyboard.createCursorKeys();



        this.unsubscribeGameOver = 
        store.sub(
            gameOverAtom,
            () => {
                const gameOver = 
                store.get(gameOverAtom);

                if (!gameOver){
                    this.physics.resume();

                    this.player.setPosition(
                        50,
                        300
                    );

                    this.computer.setPosition(
                        750,
                        300
                    );

                    this.resetarBola(
                        Phaser.Math.Between(
                            0,
                            1
                        ) === 0
                        ? -1
                        : 1
                    );
                }
            }

        );
        
        
        this.events.once(
            Phaser.Scenes.Events.SHUTDOWN,
            () => {
                if (
                    this.unsubscribeGameOver
                ){
                    this.unsubscribeGameOver();
                }
            }
        );

        this.ultimaVelocidadeY = this.ball.body.velocity.y;
    }

    getVelocidadeIA(){
        const dificuldade = 
            store.get(difficultAtom);

            if (dificuldade === "fácil"){
                return 140;
            }

            if (dificuldade === "difícil"){
                return 320;
            }
            return 220;

        }

    update(){
        const gameOver = store.get(gameOverAtom);

        if (gameOver){
            return;
        }

        // =============================
        // Jogador
        // =============================

        this.player.body.setVelocityY(0);

        // Movimento para cima
        if (
            this.teclas.cima.isDown ||
            this.cursores.up.isDown
        ){
            this.player.body.setVelocityY(-350);
        }

        // Movimento para baixo
        else if (
            this.teclas.baixo.isDown ||
            this.cursores.down.isDown
        ){
            this.player.body.setVelocityY(350);
        }

        
        // ============================
        // Computador - IA
        // ============================

        const velocidadeIA = 
        this.getVelocidadeIA();

        // Bola está acima da raquete
        if (this.ball.y < this.computer.y -10){
            this.computer.body.setVelocityY(
                -velocidadeIA
            );
        }

        // Bola está abaixo da raquete
        else if (this.ball.y > this.computer.y + 10){
            this.computer.body.setVelocityY(
                velocidadeIA
            );
        }

        // Bola está aproximadamente alinhada
        else{
            this.computer.body.setVelocityY(0);
        }

        // ============================
        // Sistema de pontos
        // ===========================

        // Bola saiu pela direita
        if (this.ball.x > 820){
            this.pontoJogador();
        }

        //Bola saiu pela esquerda
        if (this.ball.x < -20){
            this.pontoComputador();
        }
    }


    //Ponto jogador
    pontoJogador(){
        somPonto.play();
        
        const pontosAtuais = store.get(playerScoreAtom);

        const novosPontos = 
        pontosAtuais + 1;

        store.set(
            playerScoreAtom,
            novosPontos
        );

        if (novosPontos >= 5){
            somVitoria.play();

            store.set(
                winnerAtom,
                "Jogador"
            );

            store.set(
                gameOverAtom,
                true
            );

            this.pararJogo();
            return;
        }

        this.resetarBola(-1);
    }


    // Ponto computador
    pontoComputador(){
        somPonto.play();

        const pontosAtuais = 
        store.get(computerScoreAtom);

        const novosPontos = 
        pontosAtuais + 1;
    
        store.set(
            computerScoreAtom,
            novosPontos
        );

        if (novosPontos >= 5){
            somVitoria.play();

            store.set(
                winnerAtom,
                "Computador"
            );

            store.set(
                gameOverAtom,
                true
            );

            this.pararJogo();
            return;
        }

        this.resetarBola(1);
    }


    // Resetar bola
    resetarBola(direcao){
        
        this.velocidadeBola = 250;
        // volta a bola para o centro
        this.ball.body.reset(
            400,
            300
        );

        // Define uma nova direção vertical
        const velocidadeY = 
        Phaser.Math.Between(-200, 200);

        // Lança a bola novamente
        this.ball.body.setVelocity(
            this.velocidadeBola * direcao,
            velocidadeY
        );
    }


    pararJogo(){
        this.ball.body.setVelocity(
            0,
            0
        );

        this.player.body.setVelocity(0);
        this.computer.body.setVelocity(0);
        this.physics.pause();



        const velocidadeYAtual =
  this.ball.body.velocity.y;

if (
  velocidadeYAtual !== 0 &&
  this.ultimaVelocidadeY !== 0 &&
  Math.sign(velocidadeYAtual) !==
    Math.sign(this.ultimaVelocidadeY)
) {
  somParede.play();
}

this.ultimaVelocidadeY =
  velocidadeYAtual;
    }
    
    


rebaterNaRaquete(raquete, direcao) {
  const diferenca =
    this.ball.y - raquete.y;

  const metadeRaquete =
    raquete.height / 2;

  const proporcao =
    diferenca / metadeRaquete;

  const velocidadeY =
    proporcao * 350;

  this.velocidadeBola += 20;

  if (
    this.velocidadeBola >
    this.velocidadeMaxima
  ) {
    this.velocidadeBola =
      this.velocidadeMaxima;
  }

  this.ball.body.setVelocity(
    this.velocidadeBola * direcao,
    velocidadeY
  );
}

}