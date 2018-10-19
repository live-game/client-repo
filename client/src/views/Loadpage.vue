<template>
    <div class="loader loader--style8" title="7">
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            width="96px" height="120px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve">
            <rect x="0" y="10" width="4" height="10" fill="#333" opacity="0.2">
                <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite" />
                <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
                <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
            </rect>
            <rect x="8" y="10" width="4" height="10" fill="#333"  opacity="0.2">
                <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
                <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
                <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
            </rect>
            <rect x="16" y="10" width="4" height="10" fill="#333"  opacity="0.2">
                <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
                <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
                <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
            </rect>
        </svg>
        <p></p>
        <p>Waiting for second player</p>
    </div>
</template>

<script>
import db from '../../googlekey.js'
import { mapState } from 'vuex'

export default {
    name: 'Loadpage',
    data(){
        return{
        }
    },
    methods:{
     
    },
    created() {
        console.log(this.$store.state.roomId)
        let self=this
        db.ref(`rooms/${this.$store.state.roomId}/players`).on('value', function(snapshot) {         
            let players= snapshot.val()         
            if(Object.keys(players).length >1){
                console.log('masuk player 2')
                self.$router.push(`/rooms/${self.$store.state.roomId}/${self.$store.state.playerNum}`)
            }
        })       
    }
}
</script>


<style scoped>
body {
  padding: 1em;
  text-align: center;
  font-family: "Gill sans", sans-serif;
  width: 80%;
  margin: 0 auto;
}
svg {
    margin-top: 10%;
}
p {
    color: aliceblue;
}
h1 {
  margin: 1em 0;
  border-bottom: 1px dashed;
  padding-bottom: 1em;
  font-weight: lighter;
}
p {
  font-style: italic;
}
.loader {
  margin: 0 0 2em;
  height: 100px;
  width: 80%;
  text-align: center;
  padding: 1em;
  margin: 0 auto 1em;
  display: inline-block;
  vertical-align: top;
}
svg path,
svg rect {
  fill: rgb(0, 153, 255);
}

</style>


