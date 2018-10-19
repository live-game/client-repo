<template>
  <div>
    <div v-if='loading' style="color: white">
      <h2>Loading . . .</h2>
    </div>
    <div v-else>
      <div class="row">
        <div class="col-1"></div>
        <div class="col-5 text-left">
          <h2 style="color: white">{{ me.name }}</h2>
          <h4 style="color: white">{{ me.score }} / {{ me.answeredQ }}</h4>
        </div>
        <div class="col-5 text-right">
          <h2 style="color: white">{{ enemy.name }}</h2>
          <h4 style="color: white">{{ enemy.score }} / {{ enemy.answeredQ }}</h4>
        </div>
        <div class="col-1"></div>
      </div>
      <div class="row" style="margin-top: 30px" v-if='winner === -1 && qIndex < 5'>
        <div class="col-3"></div>
        <div class="col-6">
          <h2 style="color: white">{{ questions[qIndex].question | decoder }}</h2>
          <button class='answerButton' :style='{"background-color": answerColor[index]}' v-for="(answer, index) in questions[qIndex].answers" :key='index' @click='checkAnswer(index)'>{{ answer | decoder }}</button>
        </div>
        <div class="col-3"></div>
      </div>
      <div v-else-if='winner !== -1' style="margin-top: 100px">
        <h2 v-if='winner === 0'>It's a tie!</h2>
        <h2 v-else-if='winner === Number(playerNum)'>You win!</h2>
        <h2 v-else>You lose!</h2>
      </div>
      <div v-else style="margin-top: 100px">
        <h2>Waiting for the other player . . .</h2>
      </div>
    </div>
  </div>
</template>

<script>
import db from '../../googlekey'

export default {
  name: 'room',
  data () {
    return {
      roomId: '',
      playerNum: '',
      enemyNum: '',
      questions: [],
      answerColor: ['rgb(44, 118, 255)', 'rgb(44, 118, 255)', 'rgb(44, 118, 255)', 'rgb(44, 118, 255)'],
      me: {},
      enemy: {},
      qIndex: 0,
      winner: -1,
      loading: true,
      afterClick: false
    }
  },
  methods: {
    setUp () {
      db.ref(`rooms/${this.roomId}/`).once('value', (snapshot) => {
        let questionsRaw = snapshot.val().questions
        let questions = []
        for (let i = 1; i <= 5; i++) {
          questions.push({
            question: questionsRaw[`question${i}`],
            answers: questionsRaw[`answer${i}`].slice(1)
          })
        }
        this.questions = questions
      })
      db.ref(`rooms/${this.roomId}/`).on('value', (snapshot) => {
        this.me = snapshot.val().players[`player${this.playerNum}`]
        this.enemy = snapshot.val().players[`player${this.enemyNum}`]
      })
      db.ref(`rooms/${this.roomId}/players`).on('value', (snapshot) => {
        if (snapshot.val().player1.answeredQ === 5 && snapshot.val().player2.answeredQ === 5) {
          let winner = 0
          if (snapshot.val().player1.score > snapshot.val().player2.score) {
            winner = 1
          } else if (snapshot.val().player2.score > snapshot.val().player1.score) {
            winner = 2
          }
          db.ref(`rooms/${this.roomId}/`).update({
            winner: winner
          })
          setTimeout(() => {
            this.winner = winner
          }, 1000)
        }
        if (this.afterClick) {
          this.qIndex = snapshot.val()[`player${this.playerNum}`].answeredQ - 1
          this.afterClick = false
        }
        setTimeout(() => {
          this.qIndex = snapshot.val()[`player${this.playerNum}`].answeredQ
        }, 1000)
      })
    },
    checkAnswer (index) {
      db.ref(`rooms/${this.roomId}/`).once('value', (snapshot) => {
        this.afterClick = true
        if (snapshot.val().questions[`true${this.qIndex + 1}`] === index + 1 && snapshot.val().players[`player${this.playerNum}`].answeredQ === this.qIndex) {
          db.ref(`rooms/${this.roomId}/players/player${this.playerNum}`).update({
            answeredQ: snapshot.val().players[`player${this.playerNum}`].answeredQ + 1,
            score: snapshot.val().players[`player${this.playerNum}`].score + 1
          })
        } else if (snapshot.val().players[`player${this.playerNum}`].answeredQ === this.qIndex) {
          db.ref(`rooms/${this.roomId}/players/player${this.playerNum}`).update({
            answeredQ: snapshot.val().players[`player${this.playerNum}`].answeredQ + 1
          })
        }
        let colors = []
        for (let i = 1; i <= 4; i++) {
          if (i === snapshot.val().questions[`true${this.qIndex + 1}`]) {
            colors.push('green')
          } else {
            colors.push('red')
          }
        }
        this.answerColor = colors
        setTimeout(() => {
          this.nextQ()
        }, 1000)
      })
    },
    nextQ () {
      localStorage.setItem('qIndex', this.qIndex)
      this.answerColor = ['rgb(44, 118, 255)', 'rgb(44, 118, 255)', 'rgb(44, 118, 255)', 'rgb(44, 118, 255)']
    }
  },
  filters: {
    decoder (value) {
      let decoded = value
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&Eacute;/g, 'E')
        .replace(/&ldquo;/g, '"')
        .replace(/&rsquo;/g, "'")
        .replace(/&rdquo;/g, '"')
        .replace(/&hellip;/g, ' . . . ')
      return decoded
    }
  },
  created () {
    this.roomId = this.$route.params.id
    this.playerNum = this.$route.params.player
    if (this.$route.params.player === '1') {
      this.enemyNum = '2'
    } else if (this.$route.params.player === '2') {
      this.enemyNum = '1'
    } else {
      this.$router.push('/')
    }
    this.setUp()
    setTimeout(() => {
      this.loading = false
    }, 3000)
  }
}
</script>

<style>
  .answerButton {
    color: white;
    width: 100%;
    border: none;
    padding: 20px;
    margin: 20px 0px;
  }
  .answerButton:focus {
    outline: none;
  }
</style>
