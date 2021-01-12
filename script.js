const game = {
    //ATTRIBUTES
    board: ['', '', '', '', '', '', '', '', ''],
    simbols: {
        options: ["X", "O"],
        turnIndex: 0,
        changeSimbols: function () {
            this.turnIndex = (this.turnIndex === 0 ? 1 : 0);
        }
    },
    winnerSequences: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ],
    container_element: null, // document.querySelector('.container')
    gameover: false,
    player1: 'X',
    player2: 'O',
    point_of_x: [],
    point_of_o: [],
    placarPlayer1: null,
    placarPlayer2: null,
       

    // ONE OF THE FUNCTIONS THAT ARE CALLED FRIST
    init: function (container) {
        /* Criar um atributo guardando a interface do html do jogo */
        this.container_element = container; // Armazena a interface do jogo num elemento publico do objeto para ser acessado por fora da função
    },

    
    makeplay: function (position) {
        if (this.gameover == true)
            return false

        else if (this.board[position] == '') {
            this.board[position] = this.simbols.options[this.simbols.turnIndex];
            let i = this.check_win_sequences(this.simbols.options[this.simbols.turnIndex]);
            console.log(this.point_of_x.reduce((accumulator, number) => 
                accumulator + number, 0))
            this.draw();

            if (i >= 0) {
                this.stylize_winner_sequence(this.winnerSequences[i])
                this.is_game_over()
                this.drawPlacar()
            }

            if (this.deuvelha()){
                this.is_game_over()

            }   else    {
                this.simbols.changeSimbols();
                }

        } else {
            return (false);
        }

    },

    // ONE OF THE FUNCTIONS THAT ARE CALLED FRIST
    // THIS FUNCTION IS CALLED AFTER IN makeplayer()
    draw: function () {
        /* Desenhar a interface na tela, mas com um atributo do objeto */
        let content = '';
        for (i in this.board) {
            content += '<div onclick="game.makeplay(' + i + ')">' + this.board[i] + '</div>';
            this.container_element.innerHTML = content;
        }
        

    },
    check_win_sequences: function (simbol) {
        for (i in this.winnerSequences) {
            if (this.board[this.winnerSequences[i][0]] == simbol &&
                this.board[this.winnerSequences[i][1]] == simbol &&
                this.board[this.winnerSequences[i][2]] == simbol) {
                console.log('A sequencia ganhadora foi' + i);
                if(simbol == 'X'){   this.point_of_x.push(1);}
                if(simbol == 'O'){   this.point_of_o.push(1);}
                return (i);

            }

        }
    },

    stylize_winner_sequence(winner_sequence) {
        winner_sequence.forEach((position) => {
          this
            .container_element
            .querySelector(`div:nth-child(${position + 1})`)
            .classList.add('winner');
        });
      },

    deuvelha: function () {
        return (!this.board.includes(''));
    },

    start: function () {
        console.log('start was called!');
        this.board.fill('');
        this.draw();
        this.gameover = false;
    }, 


    is_game_over: function () {
        this.gameover = true;
        setTimeout(() => {
            alert('O jogo acabou, favor inicie um novo jogo');
            this.start();
        }, 1000)
    },
    getPlacar: function(placarPlayer, players){
        this.placarPlayer1 = placarPlayer[0];
        this.placarPlayer2 = placarPlayer[1];
        this.player1 = players[0].value;
        this.player2 = players[1].value;

    },
    drawPlacar: function() {
            const placarofx =  this.point_of_x.reduce((accumulator, number) => accumulator + number, 0);
            const placarofo = this.point_of_o.reduce((accumulator, number) => accumulator + number, 0);

    this.placarPlayer1.innerHTML = `A pontuação de ${this.player1} é: ${placarofx}`;
    this.placarPlayer2.innerHTML = `A pontuação de ${this.player2} é: ${placarofo}`;;
}
}
