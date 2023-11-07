<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no">
    <title>Maintenance Mode</title>
    <link rel="icon" type="image/x-icon" href="{{ asset('assets/img/favicon.ico') }}"/>
    <!-- Font Awesome 5.15.1 -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" integrity="sha512-+4zCK9k+qNFUR5X+cKL9EIR+ZOhtIloNl9GIKS57V1MyNsYpYcUrUeQc9vNfzsWfV28IaLL3i96P9sdNyeRssA==" crossorigin="anonymous" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
</head>

<style>
    body { text-align: center; padding: 150px; }
    h1 { font-size: 50px; }
    body { font: 20px Helvetica, sans-serif; color: #333; }
    article { display: block; text-align: left; width: 650px; margin: 0 auto; }
    a { color: #dc8100; text-decoration: none; }
    a:hover { color: #333; text-decoration: none; }

    .spin {
        /*width: 100px;*/
        /*height: 100px;*/
        /*background-color: #0CB1C4;*/
        animation-name: fade;
        animation-duration: 1500ms;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
    }

    @keyframes spinner {
        100% { transform: rotate(360deg) }
    }

    @keyframes fade {
        0%,100% { opacity: 0 }
        50% { opacity: 1 }
    }
</style>

<body>
<article>
    <div class='spin'>
        <h1><div class='material-icons' style='font-size: 200px; color: gray'>engineering_outlined</div></h1>
    </div>
    <h1>We&rsquo;ll be back soon!</h1>
    <div>
        <p>Sorry for the inconvenience but we&rsquo;re performing some maintenance at the moment. If you need to you can always
            <a href="mailto:#">contact us</a>,
            otherwise we&rsquo;ll be back online shortly!
        </p>
        <p>&mdash; The Team</p>
    </div>
</article>
</body>
</html>
