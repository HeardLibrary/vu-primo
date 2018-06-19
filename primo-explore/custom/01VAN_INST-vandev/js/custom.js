(function(){
"use strict";
"use strict";

(function () {
  "use strict";
  'use strict';

  (function () {
    "use strict";
    'use strict';

    var app = angular.module('viewCustom', ['angularLoad', 'customActions']);

    app.component('prmSearchBarAfter', {
      bindings: {},
      template: "<div class=\"hello-world\"><span>DEVELOPMENT VIEW</span></div>"
    });

 /**   app.component('prmActionListAfter', {
      template: '<custom-action name=\"text_me\"\n                            label=\"Text Me\"\n                            index=0\n                            icon=\"ic_smartphone_24px\"\n                            icon-set=\"hardware\"\n                            link=\"https://apps.library.vanderbilt.edu/services/text.php?title={pnx.control.sourcerecordid} -- {pnx.delivery.bestlocation.callNumber}\" />'
    });
**/
    /** Start custom development **/
	
	
	// Add report custom  text me button
app.controller('ServiceDetailsAfterController', [function () {
    var vm = this;
    vm.url = document.location || '';
    var pnx = vm.parentCtrl.item.pnx || false;
    vm.callNumber = vm.parentCtrl.item.delivery.bestlocation.callNumber ;
    vm.localName = vm.parentCtrl.item.delivery.bestlocation.mainLocation;
    vm.format = pnx.display.type[0] || '';
    /** if(vm.format === 'article'){
        vm.source = pnx.display.ispartof[0]+' by '+pnx.addata.au[0];
    } else {
        vm.source = 'Published by '+pnx.addata.pub[0]+' and authored by '+pnx.addata.au[0]+' in '+pnx.addata.date[0];
    }
	**/
    vm.title = pnx.display.title[0] || '';
    vm.url = document.location || '';
    vm.$onInit = function () {
    }
}]);

/**
app.component('prmBriefResultAfter',{
    bindings: {parentCtrl: '<'},
    controller: 'ServiceDetailsAfterController',
    template: '<a href="https://apps.library.vanderbilt.edu/services/sms/sms.php?call={{$ctrl.callNumber}}&title={{$ctrl.title}}&library={{$ctrl.localName}}" target="_new">Text Call Number</a>'});
**/	
	
/**
app.component('prmLocationItemsAfter',{
    bindings: {parentCtrl: '<'},
    controller: 'ServiceDetailsAfterController',
	template: '<form ng-if="$ctrl.url" id="primo-text" method="post" action="https://apps.library.vanderbilt.edu/services/sms/sms.php" target="_blank">\
    <input type="hidden" name="lang" value="en_US">\
    <input type="submit" id="textme" value="Text Me">\
    <input type="hidden" value="{{$ctrl.title}}" name="title">\
    <input type="hidden" value="{{$ctrl.localName}}" name="location">\
    <input type="hidden" value="{{$ctrl.callNumber}}" name="call"></form>'});

**/	
	
	/**Start Grinnel **/
	
/* add SMS button */
    app.component('prmBriefResultContainerAfter', {
		bindings: { parentCtrl: '<' },
		controller: 'smsController',
		template: `
			<div id="sms_action_items">
				<button class="md-icon-button custom-button md-button md-primoExplore-theme md-ink-ripple text-call-number-button" type="button" aria-label="Send call number for item via text" title="Text call number"  ng-if="$ctrl.parentCtrl.item.delivery.bestlocation.callNumber" ng-click="$ctrl.showDialog(ev);">
					<md-icon class="md-primoExplore-theme" aria-hidden="true">
						<svg width="100%" height="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" focusable="false">
							<path d="M15.89,2H9.11A2.12,2.12,0,0,0,7,4.11V19.89A2.12,2.12,0,0,0,9.11,22h6.78A2.12,2.12,0,0,0,18,19.89V4.11A2.12,2.12,0,0,0,15.89,2ZM14,19.22a.78.78,0,0,1-.78.78H11.78a.78.78,0,0,1-.78-.78v-.44a.78.78,0,0,1,.78-.78h1.44a.78.78,0,0,1,.78.78ZM16,16H9V4h7Z"/>
						</svg>
					</md-icon>
				</button><div> <a href="https://apps.library.vanderbilt.edu/services/sms/send.php?test=test">test</a><br/></br></div>
			</div>
		`
    });
	
    app.controller('smsController', ['angularLoad', '$scope', '$mdDialog', '$sce', '$http', function(angularLoad, $scope, $mdDialog, $sce, $http) {
        this.showDialog = function(ev) {
			var author;
            if (this.parentCtrl.item.pnx.addata.au !== undefined) {
                author = this.parentCtrl.item.pnx.addata.au[0];
            } else {
                author = '';
            }
			var dialogContent = '<md-dialog-content style="padding-top: 30px; padding-left: 30px; padding-right: 30px; padding-bottom: 10px;">' +
				'<h3>' + this.parentCtrl.item.pnx.display.title[0] + '</h3>' +
				'<p>Send the title, location and call number of this item to your mobile phone.<br />' +
				'<form name="this.textForm">' +
				'<div layout="row" class="layout-row" style="padding-top:15px; padding-bottom:10px;"><div layout="row" layout-align="center" layout-fill class="layout-fill layout-align-center-stretch layout-row"><label for="phoneno">Enter your cell number:  </label> <input style=\"border-bottom: 1px solid rgba(0,0,0,.14);" type="text" name="phoneno" ng-model="this.phoneno" id="phoneno" size="10"></div></div>' +
				'<div layout="row" class="layout-row"  style="padding-top:5px; padding-bottom:5px;"><div layout="row" layout-align="center" layout-fill class="layout-fill layout-align-center-stretch layout-row"><label for="provider">Select your provider:  </label> <select name="provider" ng-model="this.provider" style=\"border-top: none; border-left: none; border-right: none; border-bottom: 1px solid rgba(0,0,0,.14);">' +
					'<option value="mms.att.net">AT&T</option>' +
					'<option value="myboostmobile.com">Boost Mobile</option>' +
					'<option value="mms.mycricket.com">Cricket</option>' +
					'<option value="mymetropcs.com">MetroPCS</option>' +
					'<option value="mypixmessages.com">Straight Talk</option>' +
					'<option value="pm.sprint.com">Sprint</option>' +
					'<option value="tmomail.net">T-Mobile</option>' +
					'<option value="mms.uscc.net">U.S. Cellular</option>' +
					'<option value="vzwpix.com">Verizon</option>' +
					'<option value="vmpix.com">Virgin Mobile</option>' +
				'</select></div></div>' +
			    '</form></p></md-dialog-content>' +
				'<md-dialog-actions>' +
				'<md-button ng-click="sendText(\'' + this.parentCtrl.item.pnx.display.title[0].replace(/'/g, "qqqqqqqq").replace(/"/g, "iiiiiiii") + '\', \'' + author.replace(/'/g, "qqqqqqqq").replace(/"/g, "iiiiiiii") + '\', \'' + this.parentCtrl.item.delivery.bestlocation.subLocation.replace(/'/g, "qqqqqqqq").replace(/"/g, "iiiiiiii") + '\', \'' + this.parentCtrl.item.delivery.bestlocation.callNumber.replace(/'/g, "qqqqqqqq").replace(/"/g, "iiiiiiii") + '\')">SEND</md-button>' +
				'<md-button ng-click="close()">CLOSE</md-button>' + /* This code gets parsed multiple times, and I couldn't get any normal method of escaping the single and double quotes to persist through all of the parsings. The PHP script that sends the text message replaces the qqqqqqqq and iiiiiiii strings with single and double quotes, respectively, before sending */
				'</md-dialog-actions>'
				;
            dialogContent = $sce.trustAsHtml(dialogContent);
            $mdDialog.show({
				template: dialogContent,
				clickOutsideToClose: true,
				escapeToClose: true,
				scope: angular.extend($scope.$new(), { 
					close: function() {$mdDialog.cancel();},
					sendText: function(title, author, location, callnumber) {
						var message = {
							method: 'POST',
							url: 'https://apps.library.vanderbilt.edu/services/sms/send.php',
							data: {
								title: title,
								author: author,
								location: location,
								callnumber: callnumber,
								phoneno: this.phoneno,
								provider: this.provider
							}
						}
					$http(message).then(function(){console.log('text sent'); $mdDialog.cancel()});
					}
				}),
			});
		}
	}]); 
	
	
	
	/** End Grinnel **/
	
	
	
	
	
	
	
	/** End custom development **/

/** Start Altmetrics **/
(function () {
    "use strict";
    'use strict';

    


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
                let altContainer = newVal.parentElement.parentElement.parentElement.parentElement.children[1];
                let almt1 = vm.parentElement.children[1].children[0];
                if (altContainer && altContainer.appendChild && altm1) {
                    altContainer.appendChild(altm1);
                }
                unbindWatcher();
            }
        });
    }; // end of $onInit
    
    
    //You'd also need to look at removing the various css/js scripts loaded by this.
    //refer to: https://github.com/Det-Kongelige-Bibliotek/primo-explore-rex
      vm.$onDestroy = function ()
  {
        if (this.$window._altmetric) {
            delete this.$window._altmetric;
        }
        
        if (this.$window._altmetric_embed_init) {
            delete this.$window._altmetric_embed_init;
        }
        
        if (this.$window.AltmetricTemplates) {
            delete this.$window.AltmetricTemplates;
        }
  }
    
}]);

app.component('prmFullViewAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'FullViewAfterController',
     template: '<div id="altm1" ng-if="$ctrl.doi" class="altmetric-embed" data-hide-no-mentions="true"  data-link-target="new" data-badge-type="medium-donut" data-badge-details="right" data-doi="{{$ctrl.doi}}"></div>'
    });
/** Altmetrics **/

})();

/** End Altmetrics **/

    /* Start customActions */
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
      }]
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

    /* End Custom Actions */
  })();
})();
})();