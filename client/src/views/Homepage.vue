<template>

    <div class="container-fluid">

            <video autoplay muted loop id="myVideo">
                <source type="video/mp4" src="../assets/videoplayback copy.mp4">
                Your browser does not support HTML5 video.
            </video>
            <!-- <bgsound src="../assets/Futuristic background music -  within this digital maze.mp3" loop="infinite"></bgsound> -->
            <!-- <audio controls autoplay loop>
                <source src="../assets/Futuristic background music -  within this digital maze.mp3" type="audio/ogg">
                <embed src="../assets/Futuristic background music -  within this digital maze.mp3" autostart="true" loop="true" hidden="true"> 
            </audio> -->
            <div class="row">
            <div class="col-4  mx-auto d-block align-self-center" style="width: 18rem;">
                <img class="my-img" src="../assets/New Project (1).png">
            </div>
            </div>
            <div class="row">
            <div class="card shadow mx-auto d-block align-self-center" style="width: 18rem;">
                <div class="card-body">
                    <a href="#" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-backdrop="false">Add Room</a>
                    <!-- <h5 class="card-title">Card title</h5> -->
                    <p></p>
                    <hr>
                    <p>Rooms:</p>
                    <div v-for="(room, index) in roomlist" :key="index">
                        <a @click=joinRoom(room.roomid) class="btn btn-primary" data-toggle="modal" data-target="#joinModal" data-backdrop="false" >{{ 'Join' + ' ' + room.room }}</a>
                    </div>
                </div>

            </div>
            </div>

        <!-- modal -->


        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Type your name and room name below</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div class="modal-body">
                        <input type="text" v-model="roomName" class="form-control" placeholder="Room name">
                    </div>
                    <div class="modal-header">
                        <h5 class="modal-title">Type your name below</h5>
                    </div>
                    <div class="modal-body">
                        <input type="text" v-model="nameplayer1" class="form-control" placeholder="Player name">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" id="closebtn" data-dismiss="modal">Close</button>
                        <button @click="addRoom" type="button" class="btn btn-primary">Save changes</button>
                    </div>


                </div>
            </div>
        </div>
        <!-- end modal -->

        <!-- modal join -->
        <div class="modal fade" id="joinModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Type your name below</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <input type="text" v-model="nameplayer2" class="form-control" placeholder="Player name">
                    </div>
                    <div class="modal-footer">

                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button @click="joinProcess" type="button" class="btn btn-primary">Save changes</button>

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
            nameplayer1: '',
            nameplayer2: '',
            playerName: '',
            joinIdRoom: '',
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
            self.playerName =  self.nameplayer1 || 'Player1'
            //console.log (self.playerName)
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
                            name:  self.playerName,
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
                $('#exampleModal').modal('hide')
                this.$store.dispatch('updatePlayerNum',1)
                this.$store.dispatch('updateRoomId',self.currentRoom)
                this.$store.dispatch('updatePlayerName',self.playerName)
                self.$router.push('/loading')
            })
        },
        joinRoom(roomid){           
            this.joinIdRoom=roomid 
        },
        joinProcess(){           
            let self=this
            self.playerName= self.nameplayer2 || 'Player2'
            //console.log (self.playerName)
            db.ref(`rooms/${self.joinIdRoom}/players/player2`).set({
                answeredQ: 0,
                name: self.playerName,  
                score : 0
            });
            this.$store.dispatch('updatePlayerNum',2)
            this.$store.dispatch('updateRoomId',self.joinIdRoom)
            this.$store.dispatch('updatePlayerName',self.playerName)
            self.$router.push(`/rooms/${self.joinIdRoom}/${self.$store.state.playerNum}`)
        }
    },
    created() {
        let self=this
        db.ref('rooms/').on('value', function(snapshot) {
            //console.log('--dari homepage',snapshot.val())
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
* {
    box-sizing: border-box;
}

.my-img {
    width: 100%;
}

input {
    margin-bottom: 5px;
}
.card{
    background:rgba(4, 113, 255, 0.26) !important;
    transition: transform .3s;

    color: rgb(255, 255, 255);
}
.card:hover {
    /* background:rgba(79, 176, 255, 0.356) !important; */
    transform: scale(1.15)
}
.btn-primary {
    margin-bottom: 10px;
    background-color: rgb(15, 159, 255);
    color: rgb(255, 255, 255) !important;
}

#myVideo {
    position: fixed;
    right: 0;
    bottom: 0;
    min-width: 100%; 
    min-height: 100%;
    /* opacity: 0.85; */
    
}

.content {
    position: fixed;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    color: #f1f1f1;
    width: 100%;
    padding: 20px;
    
}

#myBtn {
    width: 200px;
    font-size: 18px;
    padding: 10px;
    border: none;
    background: #000;
    color: #fff;
    cursor: pointer;
}

#myBtn:hover {
    background: #ddd;
    color: black;
}


/*!
* Start Bootstrap - 3 Col Portfolio (https://startbootstrap.com/template-overviews/3-col-portfolio)
* Copyright 2013-2018 Start Bootstrap
* Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap-3-col-portfolio/blob/master/LICENSE)
*/


body {
    padding-top: 54px;
    margin: 0;
    font-family: Arial;
    font-size: 17px;
    background: white;
    /* background: rgb(19, 30, 54); */
    /* background: linear-gradient(135deg, rgba(244,103,169,1) 0%, rgba(176,105,247,1) 100%); */
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
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

</style>
