(function(){
"use strict";
"use strict";




    var app = angular.module('viewCustom', ['angularLoad','customActions']);

/** Show development environment **/ 

app.component('prmSearchBarAfter', {
    bindings: { },
    template: '<div class="hello-world"><span>Development Environment</span></div>'
});

/** End show development environment **/


	
/** Browzine Logo **/

  app.component('prmAtozSearchBarAfter', {
    bindings: {
      parentCtrl: '<'
    },
    template: '<div tabindex="-1" role="search" layout="row" class="layout-row"><div id="browzinelogo"> <a href="http://browzine.com.proxy.library.vanderbilt.edu/libraries/519/subjects" class="md-primoExplore-theme" ><img src="https://apps.library.vanderbilt.edu/images/browzinetop.png" width="141px" height="50px" target="_new"></a></div></div>'
  });
  

/** End Browzine Logo **/





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
	bindings: {parentCtrl: '<'},
	controller: 'FormServiceController',
	template: "<custom-action name=\"text_me\"\n                            label=\"Text Me\"\n                            index=0\n                            icon=\"ic_smartphone_24px\"\n                            icon-set=\"hardware\"\n                            link=\"https://library2018.library.vanderbilt.edu/forms/textme.php?call={{$ctrl.callNumber}}&location={{$ctrl.localCode}}&title={pnx.display.title}\" />"
    });


/** End Custom SMS **/

  


/** basic form **/
/**
app.component('prmRequestServicesAfter',{
	**/
	app.component('prmLocationItemAfter',{
    bindings: {parentCtrl: '<'},
    controller: 'FormServiceController',
	template: '<span class="formbutton"> testing --- {{$ctrl.user}} --- {{$ctrl.userGroup}} \
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

	
	app.controller('FormServiceController', [function () {
    var vm = this;
    vm.url = document.location || '';
    var pnx = vm.parentCtrl.item.pnx || false;
    vm.callNumber = vm.parentCtrl.item.delivery.bestlocation.callNumber ;
    vm.localName = vm.parentCtrl.item.delivery.bestlocation.mainLocation;
	vm.localCode = vm.parentCtrl.item.delivery.bestlocation.libraryCode;
    vm.format = pnx.display.type[0] || '';
    vm.title = pnx.display.title[0] || '';
    vm.url = document.location || '';
	/** let rootScope = $scope.$root;
	var uSMS=rootScope.$$childHead.$ctrl.userSessionManagerService;
	var jwtData = uSMS.jwtUtilService.getDecodedToken();
	 console.log(jwtData);
	var userGroup=parseInt(jwtData.userGroup);
	var user=jwtData.user;
	**/
	//var check = whitelistGroups.indexOf(userGroup);
			
    vm.$onInit = function () {
  		}
    
}]);

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


/** End Altmetrics **/
	
	
/** Start Browzine **/


/** Start Browzine **/
  window.browzine = {
    api: "https://public-api.thirdiron.com/public/v1/libraries/519",
    apiKey: "a38db48a-1772-44f3-b8e3-df9f826cf881",
    primoJournalBrowZineWebLinkText: "View Journal Contents",
    primoArticleBrowZineWebLinkText: "View Issue Contents",
  };
 
  browzine.script = document.createElement("script");
  browzine.script.src = "https://s3.amazonaws.com/browzine-adapters/primo/browzine-primo-adapter.js";
  document.head.appendChild(browzine.script);
 
  app.controller('prmSearchResultAvailabilityLineAfterController', function($scope) {
    window.browzine.primo.searchResult($scope);
  });
 
  app.component('prmSearchResultAvailabilityLineAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmSearchResultAvailabilityLineAfterController'
  });


/** End Browzine **/
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
 

 (function() {

	var lc = document.createElement('script'); lc.type = 'text/javascript'; lc.async = 'true';
    lc.src =  'https://v2.libanswers.com/load_chat.php?hash=c58be3a8ecd194602bebd50fcfe6d49b';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(lc, s);
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


	
	/** Close function from line 1 **/
})();