(function () {
    "use strict";
    "use strict";

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    }
     : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    var app = angular.module('viewCustom', ['angularLoad', 'customActions', 'googleAnalytics']);

    /** Start JWT work **/

    app.controller('prmSearchBarAfterController', ['$location', function ($location) {
                var userSessionManagerService = this.parentCtrl.$scope.$root.$$childHead.$ctrl.userSessionManagerService;
                var result = userSessionManagerService.jwtUtilService.jwtHelper.decodeToken(userSessionManagerService.getJwt());
                console.log(result);
            }
        ]);

    /** End JWT work **/

    /** Show development environment **/

    /**
    app.component('prmSearchBarAfter', {
    bindings: {},
    template: '<div class="hello-world"><span>Development Environment</span></div>'
    }});
     **/

    /** End show development environment **/

    /** Browzine Logo **/

    app.component('prmAtozSearchBarAfter', {
        bindings: {
            parentCtrl: '<'
        },
        template: '<div tabindex="-1" role="search" layout="row" class="layout-row"><div id="browzinelogo"> <a href="http://browzine.com.proxy.library.vanderbilt.edu/libraries/519/subjects" class="md-primoExplore-theme" ><img src="https://apps.library.vanderbilt.edu/images/browzinetop.png" width="141px" height="50px" target="_new"></a></div></div>'
    });

    /** End Browzine Logo **/

    app.value('analyticsOptions', {
        enabled: true,
        siteId: 'UA-333143-41',
        defaultTitle: 'Library Catalog Search'
    });

    /** Working with the image **/

    app.component('prmLogoAfter', {
        bindings: {
            parentCtrl: '<'
        },
        template: '<a href="https://www.library.vanderbilt.edu" class="md-primoExplore-theme" ><div class="product-logo-local"  id="banner" aria-label="Library home page">  </div></a>'
    });

    /** End image work **/

    /** Start Custom SMS **/

    /**  SMS form **/

    app.component('prmActionListAfter', {
        bindings: {
            parentCtrl: '<'
        },
        controller: 'FormServiceController',
        template: "<custom-action name=\"text_me\"\n                            label=\"Text Me\"\n                            index=0\n                            icon=\"ic_smartphone_24px\"\n                            icon-set=\"hardware\"\n                            link=\"https://library2018.library.vanderbilt.edu/forms/textme.php?call={{$ctrl.callNumber}}&location={{$ctrl.localCode}}&title={pnx.display.title}\" />"
    });

    /** End Custom SMS **/

    /** Local Source record **/
    app.component('prmServiceDetailsAfter', {
        bindings: {
            parentCtrl: '<'
        },
        controller: 'FormServiceController',
        template: '<hr/><span> <a href=\"https://apps.library.vanderbilt.edu/services/source/rec.php?akey={{$ctrl.recordid}}" target=_new> View Source Record </a></span>'
    });
    /** End Local Source record **/

    /** basic form **/
    /**
    app.component('prmRequestServicesAfter',{
     **/

    /**
    app.component('prmLocationItemAfter',{
    bindings: {parentCtrl: '<'},
    controller: 'FormServiceController',
    template: ' <span class="formbutton"> \
    <form ng-if="$ctrl.localCode === \'ANNEX\'"  method="post" action="https://www.library.vanderbilt.edu/forms/custannex.php" target="_blank"> \
    <input type="hidden" name="lang" value="en_US">\
    <input type="hidden" value="{{$ctrl.title}}" name="title">\
    <input type="hidden" value="{{$ctrl.localName}}" name="location">\
    <input type="hidden" value="{{$ctrl.callNumber}}" name="call"> \
    <input type="submit" name="submit" class="formbutton" value="Request from Annex"> </form> \
    <form ng-if="$ctrl.localCode === \'SPEC-COLL\'"  method="post" action="https://www.library.vanderbilt.edu/forms/archives.php" target="_blank"> \
    <input type="hidden" name="lang" value="en_US">\
    <input type="hidden" value="{{$ctrl.title}}" name="title">\
    <input type="hidden" value="{{$ctrl.localName}}" name="location">\
    <input type="hidden" value="{{$ctrl.callNumber}}" name="call"> \
    <input type="submit" name="submit"  class="formbutton" value="Request for Use in the Reading Room"> </form> \
    <form ng-if="$ctrl.localCode === \'21NORTH\'"  method="post" action="https://www.library.vanderbilt.edu/forms/archives.php" target="_blank"> \
    <input type="hidden" name="lang" value="en_US">\
    <input type="hidden" value="{{$ctrl.title}}" name="title">\
    <input type="hidden" value="{{$ctrl.localName}}" name="location">\
    <input type="hidden" value="{{$ctrl.callNumber}}" name="call"> \
    <input type="submit" name="submit" class="formbutton" value="Request for Use in the Reading Room"> </form> </span> \
    '});
     **/

    app.controller('FormServiceController', [function () {
                var vm = this;
                vm.url = document.location || '';
                var pnx = vm.parentCtrl.item.pnx || false;
				if ((vm.parentCtrl.item.delivery !== null) && (vm.parentCtrl != 'undefined')) {
				if (vm.parentCtrl.item.delivery.bestlocation !== null) {
			//	if ((typeof vm.parentCtrl.item.delivery.bestlocation.callNumber != 'undefined') && (vm.parentCtrl.item.delivery.bestlocation.callNumber !== null)) {
                
				if (vm.parentCtrl.item.delivery.bestlocation.callNumber !== null) {
				vm.callNumber = vm.parentCtrl.item.delivery.bestlocation.callNumber;
				}
                vm.localName = vm.parentCtrl.item.delivery.bestlocation.mainLocation;
                vm.localCode = vm.parentCtrl.item.delivery.bestlocation.libraryCode;
                vm.format = pnx.display.type[0] || '';
			}						}	
                /** if(vm.format === 'article'){
                vm.source = pnx.display.ispartof[0]+' by '+pnx.addata.au[0];
                } else {
                vm.source = 'Published by '+pnx.addata.pub[0]+' and authored by '+pnx.addata.au[0]+' in '+pnx.addata.date[0];
                }
                 **/
                vm.title = pnx.display.title[0] || '';
                vm.url = document.location || '';
                vm.recordid = pnx.control.recordid;

                vm.$onInit = function () {};
            }
        ]);

    /** End basic Form **/

    /** Start Orbis **/

    /**Start custom actions **/

    'use strict';

    angular.module('customActions', []);

    /* eslint-disable max-len */
    angular.module('customActions').component('customAction', {
        bindings: {
            name: '@',
            label: '@',
            icon: '@',
            iconSet: '@',
            link: '@',
            index: '<'
        },
        require: {
            prmActionCtrl: '^prmActionList'
        },
        controller: ['customActions', function (customActions) {
                var _this = this;

                this.$onInit = function () {
                    _this.action = {
                        name: _this.name,
                        label: _this.label,
                        index: _this.index,
                        icon: {
                            icon: _this.icon,
                            iconSet: _this.iconSet,
                            type: 'svg'
                        },
                        onToggle: customActions.processLinkTemplate(_this.link, _this.prmActionCtrl.item)
                    };
                    customActions.addAction(_this.action, _this.prmActionCtrl);
                };
                this.$onDestroy = function () {
                    return customActions.removeAction(_this.action, _this.prmActionCtrl);
                };
            }
        ]
    });

    /* eslint-disable max-len */

    angular.module('customActions').factory('customActions', function () {
        return {
            /**
             * Adds an action to the actions menu, including its icon.
             * @param  {object} action  action object
             * @param  {object} ctrl    instance of prmActionCtrl
             */
            // TODO coerce action.index to be <= requiredActionsList.length
            addAction: function addAction(action, ctrl) {
                if (!this.actionExists(action, ctrl)) {
                    this.addActionIcon(action, ctrl);
                    ctrl.actionListService.requiredActionsList.splice(action.index, 0, action.name);
                    ctrl.actionListService.actionsToIndex[action.name] = action.index;
                    ctrl.actionListService.onToggle[action.name] = action.onToggle;
                    ctrl.actionListService.actionsToDisplay.unshift(action.name);
                }
            },
            /**
             * Removes an action from the actions menu, including its icon.
             * @param  {object} action  action object
             * @param  {object} ctrl    instance of prmActionCtrl
             */
            removeAction: function removeAction(action, ctrl) {
                if (this.actionExists(action, ctrl)) {
                    this.removeActionIcon(action, ctrl);
                    delete ctrl.actionListService.actionsToIndex[action.name];
                    delete ctrl.actionListService.onToggle[action.name];
                    var i = ctrl.actionListService.actionsToDisplay.indexOf(action.name);
                    ctrl.actionListService.actionsToDisplay.splice(i, 1);
                    i = ctrl.actionListService.requiredActionsList.indexOf(action.name);
                    ctrl.actionListService.requiredActionsList.splice(i, 1);
                }
            },
            /**
             * Registers an action's icon.
             * Called internally by addAction().
             * @param  {object} action  action object
             * @param  {object} ctrl    instance of prmActionCtrl
             */
            addActionIcon: function addActionIcon(action, ctrl) {
                ctrl.actionLabelNamesMap[action.name] = action.label;
                ctrl.actionIconNamesMap[action.name] = action.name;
                ctrl.actionIcons[action.name] = action.icon;
            },
            /**
             * Deregisters an action's icon.
             * Called internally by removeAction().
             * @param  {object} action  action object
             * @param  {object} ctrl    instance of prmActionCtrl
             */
            removeActionIcon: function removeActionIcon(action, ctrl) {
                delete ctrl.actionLabelNamesMap[action.name];
                delete ctrl.actionIconNamesMap[action.name];
                delete ctrl.actionIcons[action.name];
            },
            /**
             * Check if an action exists.
             * Returns true if action is part of actionsToIndex.
             * @param  {object} action  action object
             * @param  {object} ctrl    instance of prmActionCtrl
             * @return {bool}
             */
            actionExists: function actionExists(action, ctrl) {
                return ctrl.actionListService.actionsToIndex.hasOwnProperty(action.name);
            },
            /**
             * Process a link into a function to call when the action is clicked.
             * The function will open the processed link in a new tab.
             * Will replace {pnx.xxx.xxx} expressions with properties from the item.
             * @param  {string}    link    the original link string from the html
             * @param  {object}    item    the item object obtained from the controller
             * @return {function}          function to call when the action is clicked
             */
            processLinkTemplate: function processLinkTemplate(link, item) {
                var processedLink = link;
                var pnxProperties = link.match(/\{(pnx\..*?)\}/g) || [];
                pnxProperties.forEach(function (property) {
                    var value = property.replace(/[{}]/g, '').split('.').reduce(function (o, i) {
                            try {
                                var h = /(.*)(\[\d\])/.exec(i);
                                if (h instanceof Array) {
                                    return o[h[1]][h[2].replace(/[^\d]/g, '')];
                                }
                                return o[i];
                            } catch (e) {
                                return '';
                            }
                        }, item);
                    processedLink = processedLink.replace(property, value);
                });

                return function () {
                    return window.open(processedLink, '_blank');
                };
            }
        };
    });

    /** End custom actions **/

    /** End Orbis **/

    /** Start Altmetrics **/
    /** Altmetrics **/
    app.controller('FullViewAfterController', ['angularLoad', '$http', '$scope', '$element', '$timeout', '$window', function (angularLoad, $http, $scope, $element, $timeout, $window) {
                var vm = this;
                this.$http = $http;
                this.$element = $element;
                this.$scope = $scope;
                this.$window = $window;

                vm.$onInit = function () //wait for all the bindings to be initialised
                {

                    vm.parentElement = this.$element.parent()[0]; //the prm-full-view container

                    try {
                        vm.doi = vm.parentCtrl.item.pnx.addata.doi[0] || '';
                    } catch (e) {
                        return;
                    }

                    if (vm.doi) {
                        //If we've got a doi to work with check whether altmetrics has data for it.
                        //If so, make our div visible and create a new Altmetrics service
                        $timeout(function () {
                            $http.get('https://api.altmetric.com/v1/doi/' + vm.doi).then(function () {
                                try {
                                    //Get the altmetrics widget
                                    angularLoad.loadScript('https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js?' + Date.now()).then(function () {});
                                    //Create our new Primo service
                                    var altmetricsSection = {
                                        scrollId: "altmetrics",
                                        serviceName: "altmetrics",
                                        title: "brief.results.tabs.Altmetrics"
                                    };
                                    vm.parentCtrl.services.splice(vm.parentCtrl.services.length, 0, altmetricsSection);
                                } catch (e) {
                                    console.log(e);
                                }
                            }).catch(function (e) {
                                return;
                            });
                        }, 3000);
                    }

                    //move the altmetrics widget into the new Altmetrics service section
                    var unbindWatcher = this.$scope.$watch(function () {
                            return vm.parentElement.querySelector('h4[translate="brief.results.tabs.Altmetrics"]');
                        }, function (newVal, oldVal) {
                            if (newVal) {
                                //Get the section body associated with the value we're watching
                                var altContainer = newVal.parentElement.parentElement.parentElement.parentElement.children[1];
                                var almt1 = vm.parentElement.children[1].children[0];
                                if (altContainer && altContainer.appendChild && altm1) {
                                    altContainer.appendChild(altm1);
                                }
                                unbindWatcher();
                            }
                        });
                }; // end of $onInit


                //You'd also need to look at removing the various css/js scripts loaded by this.
                //refer to: https://github.com/Det-Kongelige-Bibliotek/primo-explore-rex
                vm.$onDestroy = function () {
                    if (this.$window._altmetric) {
                        delete this.$window._altmetric;
                    }

                    if (this.$window._altmetric_embed_init) {
                        delete this.$window._altmetric_embed_init;
                    }

                    if (this.$window.AltmetricTemplates) {
                        delete this.$window.AltmetricTemplates;
                    }
                };
            }
        ]);

    app.component('prmFullViewAfter', {
        bindings: {
            parentCtrl: '<'
        },
        controller: 'FullViewAfterController',
        template: '<div id="altm1" ng-if="$ctrl.doi" class="altmetric-embed" data-hide-no-mentions="true"  data-link-target="new" data-badge-type="medium-donut" data-badge-details="right" data-doi="{{$ctrl.doi}}"></div>'
    });
    /** Altmetrics **/

    /** End Altmetrics **/

    /** Start Google Analytics **/

    angular.module('googleAnalytics', []);
    angular.module('googleAnalytics').run(function ($rootScope, $interval, analyticsOptions) {
        if (analyticsOptions.hasOwnProperty("enabled") && analyticsOptions.enabled) {
            if (analyticsOptions.hasOwnProperty("siteId") && analyticsOptions.siteId != '') {
                if (typeof ga === 'undefined') {
                    (function (i, s, o, g, r, a, m) {
                        i['GoogleAnalyticsObject'] = r;
                        i[r] = i[r] || function () {
                            (i[r].q = i[r].q || []).push(arguments)
                        },
                        i[r].l = 1 * new Date();
                        a = s.createElement(o),
                        m = s.getElementsByTagName(o)[0];
                        a.async = 1;
                        a.src = g;
                        m.parentNode.insertBefore(a, m)
                    })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

                    ga('create', analyticsOptions.siteId, {
                        'alwaysSendReferrer': true
                    });
                    ga('set', 'anonymizeIp', true);
                }
            }
            $rootScope.$on('$locationChangeSuccess', function (event, toState, fromState) {
                if (analyticsOptions.hasOwnProperty("defaultTitle")) {
                    var documentTitle = analyticsOptions.defaultTitle;
                    var interval = $interval(function () {
                            if (document.title !== '')
                                documentTitle = document.title;
                            if (window.location.pathname.indexOf('openurl') !== -1 || window.location.pathname.indexOf('fulldisplay') !== -1)
                                if (angular.element(document.querySelector('prm-full-view-service-container .item-title>a')).length === 0)
                                    return;
                                else
                                    documentTitle = angular.element(document.querySelector('prm-full-view-service-container .item-title>a')).text();

                            if (typeof ga !== 'undefined') {
                                if (fromState != toState)
                                    ga('set', 'referrer', fromState);
                                ga('set', 'location', toState);
                                ga('set', 'title', documentTitle);
                                ga('send', 'pageview');
                            }
                            $interval.cancel(interval);
                        }, 0);
                }
            });
        }
    });
    angular.module('googleAnalytics').value('analyticsOptions', {
        enabled: true,
        siteId: '',
        defaultTitle: ''
    });

    /** End Google Analytics **/

    /** Start Browzine **/
    window.browzine = {
        api: "https://public-api.thirdiron.com/public/v1/libraries/519",
        apiKey: "a38db48a-1772-44f3-b8e3-df9f826cf881",
        primoJournalBrowZineWebLinkText: "Browse Journal Contents",
        primoArticleBrowZineWebLinkText: "Browse Issue Contents"
    };

    browzine.script = document.createElement("script");
    browzine.script.src = "https://s3.amazonaws.com/browzine-adapters/primo/browzine-primo-adapter.js";
    document.head.appendChild(browzine.script);

    app.controller('prmSearchResultAvailabilityLineAfterController', function ($scope) {
        window.browzine.primo.searchResult($scope);
    });

    app.component('prmSearchResultAvailabilityLineAfter', {
        bindings: {
            parentCtrl: '<'
        },
        controller: 'prmSearchResultAvailabilityLineAfterController'
    });

    /** End Browzine **/

    /** Start Libchat (based Laura Guy's solution) **/

    /**
    angular
    .module('chat', ['angularLoad'])
    .component('addChat', {
    controller: ['angularLoad', function (angularLoad) {
    this.$onInit = function () {
    angularLoad.loadScript('https://v2.libanswers.com/load_chat.php?hash=c58be3a8ecd194602bebd50fcfe6d49b')
    }
    }]
    })
     **/

    (function () {

        var lc = document.createElement('script');
        lc.type = 'text/javascript';
        lc.async = 'true';
        lc.src = 'https://v2.libanswers.com/load_chat.php?hash=c58be3a8ecd194602bebd50fcfe6d49b';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(lc, s);
    })();

    /** Ask a librarian only **/
    /**

    (function() {

    var lc = document.createElement('script'); lc.type = 'text/javascript'; lc.async = 'true';
    lc.src =  'https://api2.libanswers.com/1.0/widgets/8299';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(lc, s);
    })();
     **/
    /** End ask a librarian only**/

    /** End Libchat **/

    /** Start Problem Link **/

    app.component('prmAlmaViewitAfter', {
        bindings: {
            parentCtrl: '<'
        },
        controller: 'prmAlmaViewitAfterController',
        templateUrl: '/discovery/custom/01VAN_INST-vandev/html/homepage/report_broken_link.html'
    });
    app.controller('prmAlmaViewitAfterController', [function () {
                var vm = this;
                vm.tcc_dialog_content = "<form id='tcc_bad_link_form' method='post'>";
                try {
                    /* add all data except abstract to the form in hidden fields */
                    vm.tcc_info = vm.parentCtrl.item.pnx.addata;
                    for (var property_name in vm.tcc_info) {
                        if (property_name != 'abstract') {
                            vm.tcc_dialog_content += "<input type='hidden' id='" + property_name + "' name='" + property_name + "' value='" + vm.tcc_info[property_name] + "'>";
                        }
                    }
                    /* put the article title, the book title, or the journal title in the dialog (whichever comes first) */
                    if (undefined != vm.parentCtrl.item.pnx.addata.atitle) {
                        vm.tcc_dialog_content += "<div class='tcc-dialog-title'><div style='color:green;font-weight:bold;'>" + vm.parentCtrl.item.pnx.addata.atitle + "</div></div>";
                    } else if (undefined != vm.parentCtrl.item.pnx.addata.btitle) {
                        vm.tcc_dialog_content += "<div class='tcc-dialog-title'><div style='color:green;font-weight:bold;'>" + vm.parentCtrl.item.pnx.addata.btitle + "</div></div>";
                    } else if (undefined != vm.parentCtrl.item.pnx.addata.jtitle) {
                        vm.tcc_dialog_content += "<div class='tcc-dialog-title'><div style='color:green;font-weight:bold;'>" + vm.parentCtrl.item.pnx.addata.jtitle + "</div></div>";
                    }
                    /* put the author data in the dialog (full name or last name/first name) */
                    if (undefined != vm.parentCtrl.item.pnx.addata.au) {
                        vm.tcc_dialog_content += "<div class='tcc-dialog-au'>by " + vm.parentCtrl.item.pnx.addata.au + "</div>";
                    } else {
                        if (undefined != vm.parentCtrl.item.pnx.addata.aulast) {
                            vm.tcc_dialog_content += "<div class='tcc-dialog-aulast'>by " + vm.parentCtrl.item.pnx.addata.aulast + "</div>";
                            if (undefined != vm.parentCtrl.item.pnx.addata.aufirst) {
                                vm.tcc_dialog_content += "<div class='tcc-dialog-aufirst'>" + vm.parentCtrl.item.pnx.addata.aufirst + "</div>";
                            }
                        }
                    }
                    /* put the journal title in the dialog */
                    if (undefined != vm.parentCtrl.item.pnx.addata.jtitle) {
                        vm.tcc_dialog_content += "<div class='tcc-dialog-jtitle' style='font-weight:bold;'>" + vm.parentCtrl.item.pnx.addata.jtitle + "</div>";
                    }
                    /* put the issn in the dialog */
                    if (undefined != vm.parentCtrl.item.pnx.addata.eissn) {
                        vm.tcc_dialog_content += "<div class='tcc-dialog-eissn'>ISSN: " + vm.parentCtrl.item.pnx.addata.eissn + "</div>";
                    } else if (undefined != vm.parentCtrl.item.pnx.addata.issn) {
                        vm.tcc_dialog_content += "<div class='tcc-dialog-issn'>ISSN: " + vm.parentCtrl.item.pnx.addata.issn + "</div>";
                    }
                    /* put the volume in the dialog */
                    if (undefined != vm.parentCtrl.item.pnx.addata.volume) {
                        vm.tcc_dialog_content += "<div class='tcc-dialog-volume'>Vol: " + vm.parentCtrl.item.pnx.addata.volume + "</div>";
                    }
                    /* put the issue in the dialog */
                    if (undefined != vm.parentCtrl.item.pnx.addata.issue) {
                        vm.tcc_dialog_content += "<div class='tcc-dialog-issue'>Issue: " + vm.parentCtrl.item.pnx.addata.issue + "</div>";
                    }
                    /* put the pages in the dialog */
                    if (undefined != vm.parentCtrl.item.pnx.addata.pages) {
                        vm.tcc_dialog_content += "<div class='tcc-dialog-pages'>Pages: " + vm.parentCtrl.item.pnx.addata.pages + "</div>";
                    } else if (undefined != vm.parentCtrl.item.pnx.addata.spage) {
                        vm.tcc_dialog_content += "<div class='tcc-dialog-pages'>Pages: " + vm.parentCtrl.item.pnx.addata.spage;
                        if (undefined != vm.parentCtrl.item.pnx.addata.epage) {
                            vm.tcc_dialog_content += "- " + vm.parentCtrl.item.pnx.addata.epage;
                        }
                        vm.tcc_dialog_content += "</div>";
                    }
                    /* put additional questions in the dialog */
                    vm.tcc_dialog_content += "<div style='border:1px solid #CECECE;padding:8px;'><div><strong>Which of following best describes the problem with this article?</strong></div><div class='tcc-dialog-problem'><select name='badlink_report_option_id' id='badlink_report_option_id' class='' size='1'><option value=''>-- select one --</option><option value='1' >The PDF is blank/missing pages</option><option value='2' >I received a 404/page not found error</option><option value='3' >The website prompted me to pay to access the article</option><option value='4' >The link went to another website other than the selected article</option><option value='5' >Full text for the article was not available, only the abstract or citation</option><option value='6' >Something else went wrong, explain in the comments below</option></select></div></div>";
                    vm.tcc_dialog_content += "<div style='border:1px solid #CECECE;padding:8px;'><div><strong>If we locate this item, at what <span style='font-style:italic;color:blue;'>email address</span> may we contact you? (Optional)</strong><label for='cc_email'><input type='checkbox' id='cc_email' name='cc_email' value='1'><span style='font-weight:.8em;'>(Cc report here)</span></label></div><div class='tcc-dialog-email'><input type='text' id='badlink_report_email' name='badlink_report_email' value='' style='width:98%;border:1px solid #ECECEC;'></div></div>";
                    vm.tcc_dialog_content += "<div style='border:1px solid #CECECE;padding:8px;'><div><strong>Comments (Optional)</strong></div><div class='tcc-dialog-comment'><textarea id='badlink_report_comments' name='badlink_report_comments' style='width:98%;'></textarea></div></div>";
                    /* this information is used to build the permalink on our local server */
                    /* there is a permalink available, but I had trouble getting it to transfer to the server without being malfomed */
                    vm.tcc_dialog_content += "<input type='hidden' id='vid' name='vid' value='" + vm.parentCtrl.fullViewService.configurationUtil.searchFieldsService._searchParams.vid + "'>";
                    vm.tcc_dialog_content += "<input type='hidden' id='tab' name='tab' value='" + vm.parentCtrl.fullViewService.configurationUtil.searchFieldsService._searchParams.tab + "'>";
                    vm.tcc_dialog_content += "<input type='hidden' id='docid' name='docid' value='" + vm.parentCtrl.item.pnx.control.recordid + "'>";
                    vm.tcc_dialog_content += "<input type='hidden' id='context' name='context' value='" + vm.parentCtrl.item.context + "'>";
                    vm.tcc_dialog_content += "<input type='hidden' id='search_scope' name='search_scope' value='" + vm.parentCtrl.fullViewService.configurationUtil.searchFieldsService._searchParams.search_scope + "'>";
                    vm.tcc_dialog_content += "<input type='hidden' id='lang' name='lang' value='en'></form>";
                    /* create and open the dialog */
                    document.getElementsByClassName("tingle-modal-box__content")[0].innerHTML = vm.tcc_dialog_content;
                } catch (err) {
                    console.log(err);
                }
                vm.getText = getText;
                function getText() {
                    return "Report a broken link";
                }
            }
        ]);

    /** End Problem Link **/

    /** Close function from line 1 **/
})();

/***************************************************/

/* Tingle JavaScript plugin */

!function (t, o) {
    "function" == typeof define && define.amd ? define(o) : "object" == typeof exports ? module.exports = o() : t.tingle = o()
}


/** OK  ABOVE **/


(this, function () {
	
    function t(t) {
        var o = {
            onClose: null,
            onOpen: null,
            beforeOpen: null,
            beforeClose: null,
            stickyFooter: !1,
            footer: !1,
            cssClass: [],
            closeLabel: "Close",
            closeMethods: ["overlay", "button", "escape"]
        };
        this.opts = r({}, o, t),
        this.init()
    }
	
	
	
    function o() {
        this.modalBoxFooter && (this.modalBoxFooter.style.width = this.modalBox.clientWidth + "px", this.modalBoxFooter.style.left = this.modalBox.offsetLeft + "px")
    }
	
	
    function e() {
        this.modal = document.createElement("div"),
        this.modal.classList.add("tingle-modal"),
        0 !== this.opts.closeMethods.length && -1 !== this.opts.closeMethods.indexOf("overlay") || this.modal.classList.add("tingle-modal--noOverlayClose"),
        this.modal.style.display = "none",
        this.opts.cssClass.forEach(function (t) {
            "string" == typeof t && this.modal.classList.add(t)
        }, this),
        -1 !== this.opts.closeMethods.indexOf("button") && (this.modalCloseBtn = document.createElement("button"), this.modalCloseBtn.classList.add("tingle-modal__close"), this.modalCloseBtnIcon = document.createElement("span"), this.modalCloseBtnIcon.classList.add("tingle-modal__closeIcon"), this.modalCloseBtnIcon.innerHTML = "×", this.modalCloseBtnLabel = document.createElement("span"), this.modalCloseBtnLabel.classList.add("tingle-modal__closeLabel"), this.modalCloseBtnLabel.innerHTML = this.opts.closeLabel, this.modalCloseBtn.appendChild(this.modalCloseBtnIcon), this.modalCloseBtn.appendChild(this.modalCloseBtnLabel)),
        this.modalBox = document.createElement("div"),
        this.modalBox.classList.add("tingle-modal-box"),
        this.modalBoxContent = document.createElement("div"),
        this.modalBoxContent.classList.add("tingle-modal-box__content"),
        this.modalBox.appendChild(this.modalBoxContent),
        -1 !== this.opts.closeMethods.indexOf("button") && this.modal.appendChild(this.modalCloseBtn),
        this.modal.appendChild(this.modalBox)
    }
	
	
	
    function s() {
        this.modalBoxFooter = document.createElement("div"),
        this.modalBoxFooter.classList.add("tingle-modal-box__footer"),
        this.modalBox.appendChild(this.modalBoxFooter)
    }
    function i() {
        this._events = {
            clickCloseBtn: this.close.bind(this),
            clickOverlay: l.bind(this),
            resize: this.checkOverflow.bind(this),
            keyboardNav: n.bind(this)
        },
        -1 !== this.opts.closeMethods.indexOf("button") && this.modalCloseBtn.addEventListener("click", this._events.clickCloseBtn),
        this.modal.addEventListener("mousedown", this._events.clickOverlay),
        window.addEventListener("resize", this._events.resize),
        document.addEventListener("keydown", this._events.keyboardNav)
    }



    function n(t) {
        // escape key
        if (this.opts.closeMethods.indexOf('escape') !== -1 && t.which === 27 && this.isOpen()) {
            this.close()
        }
    }

    function l(t) {
        // if click is outside the modal
        if (this.opts.closeMethods.indexOf('overlay') !== -1 && !d(t.target, 'tingle-modal') &&
        t.clientX < this.modal.clientWidth) {
            this.close()
        }
    }




    t.prototype.checkOverflow = function() {
        // only if the modal is currently shown
        if (this.modal.classList.contains('tingle-modal--visible')) {
            if (this.isOverflow()) {
                this.modal.classList.add('tingle-modal--overflow')
            } else {
                this.modal.classList.remove('tingle-modal--overflow')
            }

            // tODO: remove offset
            // _offset.call(this);
            if (!this.isOverflow() && this.opts.stickyFooter) {
                this.setStickyFooter(false)
            } else if (this.isOverflow() && this.opts.stickyFooter) {
                _recalculateFooterPosition.call(this)
                this.setStickyFooter(true)
            }
        }
    }

/*******************************/	


        /* create a tingle modal dialog */
        var tcc_modal = new tingle.modal({
                footer: true,
                stickyFooter: false,
                closeMethods: ['overlay', 'button', 'escape'],
                closeLabel: "Close",
                cssClass: ['custom-class-1', 'custom-class-2'],
                onOpen: function () {
                    //console.log('modal open');
                },
                onClose: function () {
                    //console.log('modal closed');
                },
                beforeClose: function () {
                    return true; // close the modal
                }
            });
			
			
		
			
			
        tcc_modal.addFooterBtn('Send Report', 'tingle-btn tingle-btn--primary', function () {
            var form_data = new FormData(document.getElementById("tcc_bad_link_form"));
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    alert(this.responseText);
                    return true;
                }
            };
            xhttp.open("POST", "https://apps.library.vanderbilt.edu/path_to_code/", true);
            //xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhttp.send(form_data);
            tcc_modal.close();

        });
		
		
		
		
});





