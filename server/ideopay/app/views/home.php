<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>gere.me :: </title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
        <link rel="stylesheet" href="app/assets/css/bootstrap.min.css"/>
        <link rel="stylesheet" href="app/assets/css/bootstrap-responsive.min.css" />
        <link rel="stylesheet" href="app/assets/css/datepicker.css"/>

        <link rel="stylesheet" href="app/assets/css/font-awesome.min.css" />
        <link rel="stylesheet" href="app/assets/css/chosen.css" />
        <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:400,300" />
        <link rel="stylesheet" href="app/assets/css/ace.min.css" />
        <link rel="stylesheet" href="app/assets/css/ace-responsive.min.css" />
        <link rel="stylesheet" href="app/assets/css/ace-skins.min.css" />
        <!-- build:js scripts/vendor/modernizr.js -->
        <script src="app/bower_components/modernizr/modernizr.js"></script>
        <!-- endbuild -->
    </head>
    <body>

        <div class="navbar" id="navbar">
            <script type="text/javascript">
                try{ace.settings.check('navbar' , 'fixed')}catch(e){}
            </script>

            <div class="navbar-inner">
                <div class="container-fluid">
                    <a href="#" class="brand">
                        <i class="icon-dashboard"></i>
                        <small>
                            gere.me
                        </small>
                    </a><!--/.brand-->
                </div><!--/.container-fluid-->
            </div><!--/.navbar-inner-->
        </div>


        <div class="main-container container-fluid">
            <a class="menu-toggler" id="menu-toggler" href="#">
                <span class="menu-text"></span>
            </a>

            <div class="sidebar menu-min" id="sidebar">
                <script type="text/javascript">
                    try{ace.settings.check('sidebar' , 'fixed')}catch(e){}
                </script>

                <div class="sidebar-shortcuts" id="sidebar-shortcuts">
                    <div class="sidebar-shortcuts-large" id="sidebar-shortcuts-large">
                        <button class="btn btn-small btn-success">
                            <i class="icon-signal"></i>
                        </button>

                        <button class="btn btn-small btn-info">
                            <i class="icon-pencil"></i>
                        </button>

                        <button class="btn btn-small btn-warning">
                            <i class="icon-group"></i>
                        </button>

                        <button class="btn btn-small btn-danger">
                            <i class="icon-cogs"></i>
                        </button>
                    </div>

                    <div class="sidebar-shortcuts-mini" id="sidebar-shortcuts-mini">
                        <span class="btn btn-success"></span>

                        <span class="btn btn-info"></span>

                        <span class="btn btn-warning"></span>

                        <span class="btn btn-danger"></span>
                    </div>
                </div><!--#sidebar-shortcuts-->

                <ul class="nav nav-list">
                    <li>
                        <a href="#">
                            <i class="icon-eye-open"></i>
                            <span class="menu-text"> Painel </span>
                        </a>
                    </li>

                    <li>
                        <a href="#" onclick="return false;" class="dropdown-toggle">
                            <i class="icon-briefcase"></i>
                            <span class="menu-text"> Contas </span>
                        </a>

                        <ul class="submenu">
                            <li>
                                <a href="#receitas">
                                    <i class="icon-cloud-download"></i>
                                    Receitas
                                </a>
                            </li>

                            <li>
                                <a href="#despesas">
                                    <i class="icon-cloud-upload"></i>
                                    Despesas
                                </a>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <a href="#clientes">
                            <i class="icon-group"></i>
                            <span class="menu-text"> Clientes </span>
                        </a>
                    </li>

                    <li>
                        <a href="#servicos" class="dropdown-toggle">
                            <i class="icon-list"></i>
                            <span class="menu-text"> Serviços </span>
                        </a>
                    </li>
                </ul><!--/.nav-list-->

                <div class="sidebar-collapse" id="sidebar-collapse">
                    <i class="icon-double-angle-left" data-icon1="icon-double-angle-left" data-icon2="icon-double-angle-right"></i>
                </div>

                <script type="text/javascript">
                    try{ace.settings.check('sidebar' , 'collapsed')}catch(e){}
                </script>
            </div>

            <div class="main-content">

                <div class="breadcrumbs" id="breadcrumbs">
                    <script type="text/javascript">
                        try{ace.settings.check('breadcrumbs' , 'fixed')}catch(e){}
                    </script>

                    <ul class="breadcrumb">
                        <li>
                            <i class="icon-home home-icon"></i>
                            <a href="#">Home</a>

                            <span class="divider">
                                <i class="icon-angle-right arrow-icon"></i>
                            </span>
                        </li>
                    </ul><!--.breadcrumb-->
                </div>

                <div class="page-content" id="page">

                </div>




                <div class="ace-settings-container" id="ace-settings-container">
                    <div class="btn btn-app btn-mini btn-warning ace-settings-btn" id="ace-settings-btn">
                        <i class="icon-cog bigger-150"></i>
                    </div>

                    <div class="ace-settings-box" id="ace-settings-box">
                        <div>
                            <div class="pull-left">
                                <select id="skin-colorpicker" class="hide">
                                    <option data-skin="default" value="#438EB9">#438EB9</option>
                                    <option data-skin="skin-1" value="#222A2D">#222A2D</option>
                                    <option data-skin="skin-2" value="#C6487E">#C6487E</option>
                                    <option data-skin="skin-3" value="#D0D0D0">#D0D0D0</option>
                                </select>
                            </div>
                            <span>&nbsp; Choose Skin</span>
                        </div>

                        <div>
                            <input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-navbar" />
                            <label class="lbl" for="ace-settings-navbar"> Fixed Navbar</label>
                        </div>

                        <div>
                            <input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-sidebar" />
                            <label class="lbl" for="ace-settings-sidebar"> Fixed Sidebar</label>
                        </div>

                        <div>
                            <input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-breadcrumbs" />
                            <label class="lbl" for="ace-settings-breadcrumbs"> Fixed Breadcrumbs</label>
                        </div>

                        <div>
                            <input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-rtl" />
                            <label class="lbl" for="ace-settings-rtl"> Right To Left (rtl)</label>
                        </div>
                    </div>
                </div><!--/#ace-settings-container-->


            </div> <!-- main-content -->



        </div> <!-- main-container -->






        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->

        <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
        <script>
            var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']];
            (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
            g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
            s.parentNode.insertBefore(g,s)}(document,'script'));
        </script>

        <!-- build:js scripts/vendor.js -->
        <script src="app/bower_components/jquery/jquery.js"></script>
        <script src="app/bower_components/underscore/underscore.js"></script>
        <script src="app/bower_components/backbone/backbone.js"></script>
        <!-- endbuild -->

        <!-- build:js scripts/plugins.js -->
        <script src="app/bower_components/sass-bootstrap/js/bootstrap-affix.js"></script>
        <script src="app/bower_components/sass-bootstrap/js/bootstrap-alert.js"></script>
        <script src="app/bower_components/sass-bootstrap/js/bootstrap-dropdown.js"></script>
        <script src="app/bower_components/sass-bootstrap/js/bootstrap-tooltip.js"></script>
        <script src="app/bower_components/sass-bootstrap/js/bootstrap-modal.js"></script>
        <script src="app/bower_components/sass-bootstrap/js/bootstrap-transition.js"></script>
        <script src="app/bower_components/sass-bootstrap/js/bootstrap-button.js"></script>
        <script src="app/bower_components/sass-bootstrap/js/bootstrap-popover.js"></script>
        <script src="app/bower_components/sass-bootstrap/js/bootstrap-typeahead.js"></script>
        <script src="app/bower_components/sass-bootstrap/js/bootstrap-carousel.js"></script>
        <script src="app/bower_components/sass-bootstrap/js/bootstrap-scrollspy.js"></script>
        <script src="app/bower_components/sass-bootstrap/js/bootstrap-collapse.js"></script>
        <script src="app/bower_components/sass-bootstrap/js/bootstrap-tab.js"></script>
        <!-- endbuild -->

        <!-- assets from gere.me -->
        <script src="app/assets/js/ace-extra.min.js"></script>
        <script src="app/assets/js/jquery.dataTables.min.js"></script>
        <script src="app/assets/js/jquery.dataTables.bootstrap.js"></script>
        <script src="app/assets/js/jquery-ui-1.10.3.custom.min.js"></script>        
        <script src="app/assets/js/jquery.ui.touch-punch.min.js"></script>
        <script src="app/assets/js/jquery.slimscroll.min.js"></script>
        <script src="app/assets/js/jquery.easy-pie-chart.min.js"></script>
        <script src="app/assets/js/jquery.sparkline.min.js"></script>
        <script src="app/assets/js/chosen.jquery.min.js"></script>
        <script src="app/assets/js/fuelux.spinner.min.js"></script>
        <script src="app/assets/js/bootstrap-datepicker.min.js"></script>

        <script src="app/assets/js/flot/jquery.flot.min.js"></script>
        <script src="app/assets/js/flot/jquery.flot.pie.min.js"></script>
        <script src="app/assets/js/flot/jquery.flot.resize.min.js"></script>


        <!--ace scripts-->
        <script src="app/assets/js/ace-elements.min.js"></script>
        <script src="app/assets/js/ace.min.js"></script>
        <!-- end assets -->

        <!-- build:js scripts/main.js -->
        <script src="app/scripts/main.js"></script>
        <script src="app/scripts/templates.js"></script>
        <script src="app/scripts/views/painel/painel.js"></script>
        <script src="app/scripts/views/painel/recente.js"></script>
        <script src="app/scripts/views/painel/piechart.js"></script>
        <script src="app/scripts/views/painel/insercaorapida.js"></script>
        <script src="app/scripts/views/despesas/despesas.js"></script>
        <script src="app/scripts/views/clientes/clientes.js"></script>
        <script src="app/scripts/views/receitas/receitas.js"></script>
        <script src="app/scripts/views/servicos/servicos.js"></script>
        <script src="app/scripts/models/Receitas.js"></script>
        <script src="app/scripts/collections/Receitas.js"></script>
        <script src="app/scripts/routes/route.js"></script>
        
        
        <script src="app/scripts/models/Despesas.js"></script>
        <script src="app/scripts/collections/Despesas.js"></script>
        <script src="app/scripts/models/Servicos.js"></script>
        <script src="app/scripts/collections/Servicos.js"></script>
        <script src="app/scripts/models/Clientes.js"></script>
        <script src="app/scripts/collections/Clientes.js"></script>
        <!-- endbuild -->
</body>
</html>
