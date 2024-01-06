<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no">
    <title>Student View | {{ $group }}</title>
    <link rel="icon" type="image/x-icon" href="{{ asset('assets/img/favicon.ico') }}"/>
    <!-- BEGIN GLOBAL MANDATORY STYLES -->
    <link href="{{ asset('bootstrap/css/bootstrap.min.css') }}" rel="stylesheet" type="text/css"/>
    <link href="{{ asset('assets/css/plugins.css') }}" rel="stylesheet" type="text/css"/>
    <link href="{{ asset('assets/css/authentication/form-1.css') }}" rel="stylesheet" type="text/css"/>
    <!-- END GLOBAL MANDATORY STYLES -->
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/forms/theme-checkbox-radio.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/forms/switches.css') }}">
</head>
<body class="form">
<div class="container-fluid">
    <div class="row">
        <div class="col-12 mt-2 mb-2">
            <div class="card">
                <div class="card-header mb-3">
                    <center>
                        <h3 style="text-transform: uppercase">Group {{ $group }}</h3>
                    </center>
                </div>
                @foreach($data as $item)
                    <button class="btn btn-outline-secondary mb-3">
                        {{ $item->name }} | {{ $item->latin_name }} | {{ $item->gender }}
                        <br>
                        <span>🟢 មករៀន{{ $item->total_present }}ដង</span>
                        <br>
                        <strong>❌ ឈប់{{ $item->total_absent }}ដង</strong>
                        <br>
                        {{ $item->total_score }}ពិន្ទុ
                    </button>
                @endforeach
            </div>

        </div>
    </div>
</div>


<!-- BEGIN GLOBAL MANDATORY SCRIPTS -->
<script src="{{ asset('assets/js/libs/jquery-3.1.1.min.js') }}"></script>
<script src="{{ asset('bootstrap/js/popper.min.js') }}"></script>
<script src="{{ asset('bootstrap/js/bootstrap.min.js') }}"></script>
<script src="{{ asset('assets/js/authentication/form-1.js') }}"></script>
</body>
</html>
