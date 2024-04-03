<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="csrf-token" content="{{ csrf_token() }}">

  {{-- <title>❤Lara❤vue</title> --}}
  <link rel="icon" type="image/x-icon" href="{{ asset('favicon.ico') }}"/>
  <!-- Tell the browser to be responsive to screen width -->
  {{--    <meta name="viewport" content="width=1800, initial-scale=1">--}}
  {{--  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no">--}}
  <meta name="viewport" content="width=device-width, user-scalable=no">

  <!-- BEGIN GLOBAL MANDATORY STYLES -->
  <link href="https://fonts.googleapis.com/css?family=Nunito:400,600,700" rel="stylesheet">
  <link href="{{ asset('bootstrap/css/bootstrap.min.css') }}" rel="stylesheet" type="text/css"/>
  <link href="{{ asset('assets/css/plugins.css') }}" rel="stylesheet" type="text/css"/>
  <!-- END GLOBAL MANDATORY STYLES -->

  <!-- BEGIN PAGE LEVEL PLUGINS/CUSTOM STYLES -->
  <link href="{{ asset('plugins/apex/apexcharts.css') }}" rel="stylesheet" type="text/css">
  <link href="{{ asset('assets/css/dashboard/dash_2.css') }}" rel="stylesheet" type="text/css"/>
  <!-- END PAGE LEVEL PLUGINS/CUSTOM STYLES -->


  <!-- Font Awesome 5.15.1 -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
        integrity="sha512-+4zCK9k+qNFUR5X+cKL9EIR+ZOhtIloNl9GIKS57V1MyNsYpYcUrUeQc9vNfzsWfV28IaLL3i96P9sdNyeRssA=="
        crossorigin="anonymous"/>
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
  {{--Jqerry--}}
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  {{--Loading Overlay--}}
  <script
    src="https://cdn.jsdelivr.net/npm/gasparesganga-jquery-loading-overlay@2.1.7/dist/loadingoverlay.min.js"></script>
  {{--sweetalert2--}}
  <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>

  {{--font--}}
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Kantumruy:wght@300;400&display=swap" rel="stylesheet">
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="{{asset('assets/css/custom.css')}}">
  <link rel="stylesheet" href="{{asset('assets/css/formulate.css')}}">
  <link rel="stylesheet" href="{{asset('css/app.css')}}">

  <!-- PWA  -->
  <meta name="theme-color" content="#6777ef"/>
  <link rel="apple-touch-icon" href="{{ asset('logo.png') }}">
  <link rel="manifest" href="{{ asset('/manifest.json') }}">

  <!--heic2any converter-->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/heic2any/0.0.4/heic2any.min.js"
          integrity="sha512-VjmsArkf8Vv2yyvbXCyVxp+R3n4N2WyS1GEQ+YQxa7Hu0tx836WpY4nW9/T1W5JBmvuIsxkVH/DlHgp7NEMjDw=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
  ></script>
</head>
<style>
  body {
    font-family: 'Open Sans', 'Kantumruy';
    touch-action: manipulation !important;
    scroll-behavior: smooth;
  }

  ::-moz-selection { /* Code for Firefox */
    color: firebrick;
    background: lightgrey;
    border: 1px solid yellow;
  }

  ::selection {
    color: firebrick;
    background: lightgrey;
    border: 1px solid yellow;
  }

  .b-table-sticky-header > .table.b-table > thead > tr > th {
    position: sticky !important;
  }


  /* width */
  ::-webkit-scrollbar {
    width: 8px;
    border-radius: 5px;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    background: #f1f1f1;
  }
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: gray;
    box-shadow: inset 0 0 5px grey;
  }
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #0b650b;
  }

  .img_loading {
    border-radius: 10%;
  }
</style>
