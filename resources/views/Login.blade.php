<?php
session_start();
session_destroy();
?>
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no">
    <title>Login</title>
{{--    <link rel="icon" type="image/x-icon" href="{{ asset('assets/img/favicon.ico') }}"/>--}}
<!-- BEGIN GLOBAL MANDATORY STYLES -->
    <link href="https://fonts.googleapis.com/css?family=Nunito:400,600,700" rel="stylesheet">
    <link href="{{ asset('bootstrap/css/bootstrap.min.css') }}" rel="stylesheet" type="text/css"/>
    <link href="{{ asset('assets/css/plugins.css') }}" rel="stylesheet" type="text/css"/>
    <link href="{{ asset('assets/css/authentication/form-1.css') }}" rel="stylesheet" type="text/css"/>
    <!-- END GLOBAL MANDATORY STYLES -->
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/forms/theme-checkbox-radio.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/forms/switches.css') }}">

    <link href="https://fonts.googleapis.com/css2?family=Kantumruy:wght@300;400&display=swap" rel="stylesheet">
</head>

<style>
    body {
        font-family: 'Open Sans', 'Kantumruy';
    }

    .login, .image {
        min-height: 100vh;
    }

    .bg-image {
        /*background-image: url('https://bootstrapious.com/i/snippets/sn-page-split/bg.jpg');*/
        background-image: url('/Login-SVG.svg');
        background-size: cover;
        background-position: center center;
    }
</style>

<body class="form">
<div class="container-fluid">
    <div class="row no-gutter">
        <!-- The image half -->
        <div class="col-md-6 d-none d-md-flex bg-image" style="width: 100px"></div>

        <!-- The content half -->
        <div class="col-md-6 bg-light">
            <div class="login d-flex align-items-center py-5">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-10 col-xl-7 mx-auto">
                            <center>
                                <img
                                        src="images/branch/{{ $data->logo }}"
                                        style="width: 20%;"
                                        class="img img-fluid mb-2"
                                >
                                <h3 class=""><span class="brand-name">{{ $data->name }}</span></h3>
                            </center>
                            <form method="POST" action="{{ route('do_login') }}">
                                @csrf
                                @if(session('status'))
                                    <div class="alert alert-danger">
                                        {{session('status')}}
                                    </div>
                                @endif
                                <div class="form-group mb-3">
                                    <input
                                            name="name"
                                            autocomplete="off"
                                            id="name"
                                            type="text"
                                            placeholder="User Name"
                                            required=""
                                            autofocus=""
                                            class="form-control rounded-pill border-0 shadow-sm px-4"
                                    >
                                </div>
                                <div class="form-group mb-3">
                                    <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autocomplete="off"
                                            placeholder="Password"
                                            required=""
                                            class="form-control
                                           rounded-pill border-0 shadow-sm px-4 text-primary"
                                    >
                                </div>
                                <button
                                        type="submit"
                                        class="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                                >
                                    Log in
                                </button>
                            </form>
                        </div>
                    </div>
                </div><!-- End -->

            </div>
        </div><!-- End -->

    </div>
</div>


<!-- BEGIN GLOBAL MANDATORY SCRIPTS -->
<script src="{{ asset('assets/js/libs/jquery-3.1.1.min.js') }}"></script>
<script src="{{ asset('bootstrap/js/popper.min.js') }}"></script>
<script src="{{ asset('bootstrap/js/bootstrap.min.js') }}"></script>
<!-- END GLOBAL MANDATORY SCRIPTS -->
<script src="{{ asset('assets/js/authentication/form-1.js') }}"></script>
</body>
</html>
