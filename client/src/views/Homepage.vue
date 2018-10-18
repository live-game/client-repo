<template>
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
                    <div class="form-group">
                        <button class="form-control">Join Room 1</button>
                    </div>
                    <div class="form-group">
                        <button class="form-control">Join Room 2</button>
                    </div>
                    <div class="form-group">
                        <button class="form-control">Join Room 2</button>
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
                    <input type="text" class="form-control" placeholder="Room name">
                </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- end modal -->
    </div>
    
</template>



<script>



export default {
    name: 'Homepage'
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
