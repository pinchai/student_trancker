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
                    <div class="card mb-3">
                        <div class="card-body">
                            <center>
                                {{ $item->name }} | {{ $item->latin_name }} | {{ $item->gender }}
                                <br>
                                <span>🟢 មករៀន{{ $item->total_present }}ដង</span>
                                <br>
                                <strong>❌ ឈប់{{ $item->total_absent }}ដង</strong>
                                <br>
                                {{ $item->total_score }}ពិន្ទុ
                            </center>
                        </div>
                        <div class="card-footer">
                            <center
                                    data-toggle="collapse"
                                    href="#collapseExample{{ $item->id }}"
                                    aria-expanded="false"
                                    aria-controls="collapseExample"
                            >
                                <a>See more...</a>
                            </center>
                            <div class="collapse" id="collapseExample{{ $item->id }}">
                                <div class="card card-body">
                                    <div class="row">
                                        <div class="col-12">
                                            <center>
                                                <h4>Present Details ✅</h4>
                                            </center>
                                            <div class="table-responsive">
                                                <table class="table table-sm table-bordered">
                                                    <thead>
                                                    <tr>
                                                        <th>No.</th>
                                                        <th>Date</th>
                                                        <th>Remark</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    @foreach($item->attendance as $att)
                                                        <tr class="{{ $att->checked == 1 ? '' : 'bg-danger' }}">
                                                            <th>{{ $loop->iteration }}</th>
                                                            <th>
                                                                {{ \Carbon\Carbon::parse($att->classing_date)->format('D d-m-Y')}}
                                                            </th>
                                                            <th>
                                                                {{ $att->checked == 1 ? 'មករៀន' : 'មិនខ្ចីមករៀន' }}
                                                            </th>
                                                        </tr>
                                                    @endforeach
                                                    </tbody>
                                                </table>
                                            </div>
                                            <hr>
                                            <center>
                                                <h4>Score Details 🥬</h4>
                                            </center>
                                            <div class="table-responsive">
                                                <table class="table table-sm table-bordered">
                                                    <thead>
                                                    <tr>
                                                        <th>No.</th>
                                                        <th>Type</th>
                                                        <th>Score</th>
                                                        <th>Remark</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <?php $sum_score = 0 ?>
                                                    @foreach($item->score as $sc)
                                                        <tr class="{{ $sc->score > 0 ? '' : 'bg-gray' }}">
                                                            <th>{{ $loop->iteration }}</th>
                                                            <th>{{ $sc->score_type }}</th>
                                                            <th>{{ $sc->score }}</th>
                                                            <th>{{ $sc->remark }}</th>
                                                        </tr>
                                                        <?php $sum_score+=$sc->score ?>
                                                    @endforeach
                                                    <tr class="bg-gradient-dark">
                                                        <td colspan="4">
                                                            <center>
                                                                <span class="text-danger">
                                                                     Total Score: {{ $sum_score }}
                                                                </span>
                                                            </center>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
