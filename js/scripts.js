let lvl = window.location.search
lvl.replace('?', '')

// acrescentando os níveis
let mosquitoTime = 1500
if (lvl === '?normal') {
    mosquitoTime = 1500
} else if (lvl === '?dificil') {
    mosquitoTime = 1000
} else if (lvl === '?muitodificil') {
    mosquitoTime = 750
}

const Mosquitos = {
    // definição das características dos mosquitos
    randomizeSize() {
        let type = Math.floor(Math.random() * 3)
        
        switch(type) {
            case 0:
                return 'mosquito1'

            case 1:
                return 'mosquito2'

            case 2: 
                return 'mosquito3'
        }
    }, 

    sideEyes() {
        let type = Math.floor(Math.random() * 2)
    
        switch(type) {
            case 0:
                return 'ladoA'
    
            case 1:
                return 'ladoB'
        }
    }
}

const Environment = {
    // definição do ambiente do jogo
    h: innerHeight,
    width: innerWidth,
    lifes: 1,
    time: 15,

    delayer() {  // cronometro 
        let timer = setInterval(function() {
            Environment.time -= 1

            if (Environment.time < 0) {
                clearInterval(timer)
                clearInterval(createMosquito)
                location.href = "win.html"
            } else {
                document.getElementById('timer').innerHTML = Environment.time
            }
        }, 1000)
    },

    ajustarPalco() { 
        console.log(this.width, this.h) 
        return this.width, this.h  // retorna as dimensões do browser
    }, 
    
    cleaner() { 
        // limpa os mosquitos caso já exista um na tela 
        if (document.getElementById('mosquito')) {
            document.getElementById('mosquito').remove()
            // limpa as vidas caso o mosquito não seja morto antes do tempo acabar
                if (this.lifes > 3) {
                   location.href = "game-over.html"
                } else {
                    document.getElementById('v' + this.lifes).src = "../assets/coracao_vazio.png"
                    this.lifes++
                } 
        }
    },

    randomizePosition() { 

        this.cleaner()
        // transforma os valores em posições aleatórias no browser
        // o posicionamento sempre será 95px menor que o limite máximo do vp
        let positionX = Math.floor(Math.random() * this.width) - 100 
        let positionY = Math.floor(Math.random() * this.h) - 100
        // evitando posições negativas 
        positionX = positionX < 0 ? 0 : positionX
        positionY = positionY < 0 ? 0 : positionY

        // incluindo a imagem da mosca no body
        let fly = document.createElement('img'); 
        fly.src = 'assets/mosca.png'
        fly.className = Mosquitos.randomizeSize() + ' ' + Mosquitos.sideEyes() // o tipo do mosquito e lado para qual está virado
        // juntando as posições aleatórias com a mosca, fazendo com que os attr css se alterem smp q a pag é att
        fly.style.left = positionX + 'px'
        fly.style.top = positionY + 'px'
        fly.style.position = 'absolute'
        // fly.style.position = 'fixed'  // quando a mosca se mexe, a imagem dela não quebra o layout
        document.body.appendChild(fly)
        fly.id = 'mosquito'
        
        Game.kill()
    },
}

const Game = {
    kill() {
        let toRemove = document.getElementById('mosquito')
        toRemove.onclick = function() {
            document.getElementById('mosquito').remove()  // não usar cleaner() aqui
        }
    },
}

document.getElementById('timer').innerHTML = Environment.time  // faz com que o cronometro comece o valor de time.

let createMosquito = setInterval(function() {  // executa o callback a cada determinada quantidade de ms
    Environment.randomizePosition() // chamada de randomizePosition para os mosquitos aparecerem na tela
}, mosquitoTime)

Environment.delayer()
Environment.ajustarPalco()






