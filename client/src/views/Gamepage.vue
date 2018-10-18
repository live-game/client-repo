<template>
    <div>
      <div class="row">
        <div class="col-1"></div>
        <div class="col-5 text-left">
          <h2>{{ me.name }}</h2>
          <h4>{{ me.score }}</h4>
        </div>
        <div class="col-5 text-right">
          <h2>{{ enemy.name }}</h2>
          <h4>{{ enemy.score }}</h4>
        </div>
        <div class="col-1"></div>
      </div>
      <div class=""></div>
    </div>
</template>

<script>
import db from '../../googlekey.js'

export default {
  name: 'room',
  data () {
    return {
      roomId: '',
      playerNum: '',
      enemyNum: '',
      questions: [],
      me: {},
      enemy: {},
    }
  },
  methods: {
    setUp () {
      db.ref(`rooms/${this.roomId}/`).once('value', (snapshot) => {
        let questionsRaw = snapshot.val().questions
        let questions = []
        for (let i = 1; i <= 2; i++) {
          let answers = []
          let correctAnswer = questionsRaw[`answer${i}`].true
          let correctAnswerIndex = Math.ceil(Math.random() * 4)

          for (let j = 1; j <= 3; j++ ) {
            answers.push(questionsRaw[`answer${i}`].false[j])
          }

          answers.splice(correctIndex, 0, correctAnswer)

          questions.push({
            question: questionsRaw[`question${i}`],
            // answers:  
          })
        }
        this.questions = questions
      })
      db.ref(`rooms/${this.roomId}/`).on('value', (snapshot) => {
        this.me = snapshot.val().players[`player${this.playerNum}`]
        this.enemy = snapshot.val().players[`player${this.enemyNum}`]
      })
      // db.ref(`rooms/${this.roomId}/winner`).on('value', function (snapshot) {
      //   if (snapshot.val() === this.$store.state.playerId) {
      //     self.isNotFinished = false
      //     self.status = 'You Win!'
      //   } else if (snapshot.val().length !== 0) {
      //     self.isNotFinished = false
      //     self.status = 'You Lose!'
      //   }
      // })
    }
  },
  created() {
    this.roomId = this.$route.params.id
    this.playerNum = this.$route.params.player
    if (this.$route.params.player === '1') {
      this.enemyNum = '2'
    } else {
      this.enemyNum = '1'
    }
    this.setUp()
  }
}
</script>

<style>

</style>
