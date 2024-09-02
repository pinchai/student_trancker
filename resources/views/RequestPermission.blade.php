<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no">
    <title>Student View | {{ $student->group }}</title>
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
                        <h3 style="text-transform: uppercase">Group {{ $student->group ?? '' }}</h3>
                    </center>
                </div>

                <div class="card-body">
                    {{--request form--}}
                    <div class="card-body">
                        <center>
                            {{ $student->name }} | {{ $student->latin_name }}
                            <br>
                            <span>🟢 មករៀន{{ $student->total_present }}ដង</span>
                            <br>
                            <strong>❌ ឈប់{{ $student->total_absent }}ដង</strong>
                            <br>
                            {{ $student->total_score }}ពិន្ទុ
                            <br>
                            <br>
                            <a
                                    href="/view?group_name={{ $student->group }}"
                            >
                                ⬅️ Back
                            </a>
                        </center>
                    </div>
                    <form method="post" action="{{ route('submit_permission') }}">
                        @csrf

                        @if ($errors->any())
                            <div class="alert alert-danger">
                                <ul>
                                    <li>Date And Reason Can not empty</li>
                                </ul>
                            </div>
                        @endif

                        @if (session('status'))
                            <div class="alert alert-success">
                                {{ session('status') }}
                            </div>
                        @endif
                        <input type="hidden" name="student_id" value="{{ $student->id }}">
                        <div class="form-group">
                            <label for="date">Date</label>
                            <input
                                    class="form-control"
                                    type="date"
                                    id="date"
                                    name="date"
                                    value="{{ date('Y-m-d') }}"
                                    required
                            >
                        </div>
                        <div class="form-group">
                            <label for="reason">មូលហេតុ</label>
                            <textarea
                                    class="form-control"
                                    id="reason"
                                    name="reason"
                                    rows="5"
                                    required
                            >{{ old('reason') }}</textarea>
                        </div>
                        <div class="form-group">
                            <label for="referent_url">Referent URl</label>
                            <input
                                    class="form-control"
                                    type="text"
                                    id="referent_url"
                                    name="referent_url"
                                    value="{{ old('referent') }}"
                            >
                        </div>
                        <input type="submit" value="Submit Permission" class="w-100" style="height: 50px">
                    </form>
                </div>

                <div class="card-footer">
                    <h3>Request Permission List</h3>
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="table-responsive">
                                <table class="table table-sm table-striped">
                                    <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Request Date</th>
                                        <th>Reason</th>
                                        <th>Status</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    @foreach($student->requestPermission as $row)
                                        <tr>
                                            <td>{{ $loop->index + 1 }}</td>
                                            <td>{{ $row->date }}</td>
                                            <td>{{ $row->reason }}</td>
                                            <td>{{ $row->status }}</td>
                                        </tr>
                                    @endforeach
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
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
