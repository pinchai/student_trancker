
<!-- BEGIN GLOBAL MANDATORY SCRIPTS -->
<script src="{{ asset('assets/js/libs/jquery-3.1.1.min.js') }}"></script>
<script src="{{ asset('bootstrap/js/popper.min.js') }}"></script>
{{--<script src="{{ asset('bootstrap/js/bootstrap.min.js') }}"></script>--}}
<script src="{{ asset('plugins/perfect-scrollbar/perfect-scrollbar.min.js') }}"></script>
<script src="{{ asset('assets/js/app.js') }}"></script>
<!-- END GLOBAL MANDATORY SCRIPTS -->
<!-- BEGIN PAGE LEVELs PLUGINS/CUSTOM SCRIPTS -->

{{--<script src="{{ asset('js/app.js')}} "></script>--}}
<script src="{{ asset('js/main/app.js') }}"></script>

{{-- PWA --}}
<script src="{{ asset('/sw.js') }}"></script>
<script type="text/javascript">
    if (!navigator.serviceWorker.controller) {
        navigator.serviceWorker.register("/sw.js").then(function (reg) {
            console.log("Service worker has been registered for scope: " + reg.scope);
        });
    }
</script>
</html>
