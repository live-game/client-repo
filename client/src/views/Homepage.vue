<template>
    <!-- eslint disable -->
    <div class="container">
        <div class="row">
            <!-- left section -->
            <div class="col-lg-3 pinky">
                <div class="list-group">
                    <div class="form-group">
                        <button class="form-control" data-toggle="modal" data-target="#exampleModal">Add Room</button>
                    </div>
                </div>
                <hr>            
                    <div class="form-group" v-for="(room, index) in roomlist" :key="index">
                        <button @click=joinRoom(room.roomid) class="form-control">{{ 'Join' + ' ' + room.room }} </button>
                    </div>                   
                <hr>
            </div>
            <!-- left section end -->

            <!-- supposed to be right section -->
            <div class="col-lg-9">
                <div class="row">
                </div>
            </div>
            <!-- right section end -->
        </div>

        <!-- modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Type your room name below</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                <div class="modal-body">
                    <input type="text" v-model="roomName" class="form-control" placeholder="Room name">
                </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button @click="addRoom" type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- end modal -->
    </div>
    
</template>

<script>
/* eslint-disable */
import db from '../../googlekey.js'
import axios from 'axios'
import { mapState } from 'vuex'
export default {
    name: 'Homepage',
    data(){
        return{
            roomlist:[],
            countPlayer:0,
            nameplayer1: 'player1',
            nameplayer2: 'player2',
            roomName: '',
            currentRoom:''
        }
    },
    methods:{
        // doDisconnet(){
        //     db.ref('rooms/').onDisconnect().remove(function(err) {
        //     console.log('disconnet');
        //     })
        // },
        addRoom(){
            let self = this;
            axios({
                url: 'https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple'
            })
            .then(data => {
                let results = data.data.results
                let questions = {}
                for (let i = 1; i <= results.length; i++) {
                    let wrong = results[i-1].incorrect_answers
                    let correct = results[i-1].correct_answer
                    let correctIndex = Math.ceil(Math.random() * 4) - 1
                    let answers = []

                    for (let j = 0; j < 3; j++) {
                        answers.push(wrong[j])
                    }

                    answers.splice(correctIndex, 0, correct)
                    questions[`question${i}`] = results[i-1].question
                    questions[`answer${i}`] = {
                        1: answers[0],
                        2: answers[1],
                        3: answers[2],
                        4: answers[3]
                    }
                    questions[`true${i}`] = correctIndex + 1
                }
                self.currentRoom=db.ref('rooms/').push({
                    players: { 
                        player1 : { 
                            answeredQ: 0,
                            name:  self.nameplayer1,
                            score : 0   
                        },
                    },
                    room: self.roomName,
                    questions: questions
                }, function (err) {
                    if (err)
                        console.log(err)
                    else {                    
                        self.$router.push('/loading')
                        $('#closebtn').click()
                    }
                }).getKey();
                //$('#exampleModal').modal('hide')
                this.$store.dispatch('updatePlayerNum',1)
                this.$store.dispatch('updateRoomId',self.currentRoom)
                self.$router.push('/loading')
            })
        },
        joinRoom(roomid){
            let self=this
            db.ref(`rooms/${roomid}/players/player2`).set({
                answeredQ: 0,
                name: self.nameplayer2,  
                score : 0
            });
            this.$store.dispatch('updatePlayerNum',2)
            this.$store.dispatch('updateRoomId',roomid)
            self.$router.push(`/rooms/${roomid}/${self.$store.state.playerNum}`)
        }
    },
    created() {
        let self=this
        db.ref('rooms/').on('value', function(snapshot) {
            console.log('--dari homepage',snapshot.val())
            self.roomlist.length=0
            snapshot.forEach(element => {
                let {room}=element.val()
                let obj = {}
                obj.room=room
                obj.roomid = element.key
                obj.detail = element.val()
                self.roomlist.push(obj)               
            });
        })
        
    }
}

</script>

<style>
/*!
* Start Bootstrap - 3 Col Portfolio (https://startbootstrap.com/template-overviews/3-col-portfolio)
* Copyright 2013-2018 Start Bootstrap
* Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap-3-col-portfolio/blob/master/LICENSE)
*/

body {
    padding-top: 54px;
}

@media (min-width: 992px) {
    body {
    padding-top: 56px;
    }
}

.portfolio-item {
    margin-bottom: 30px;
}

.pagination {
    margin-bottom: 30px;
}

.pinky {
    background-color: pink !important;

}

.bluey {
    background-color: rgb(0, 238, 255) !important;
}
</style>
