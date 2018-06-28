(function(){
"use strict";
"use strict";




    var app = angular.module('viewCustom', ['angularLoad']);

/** Show development environment **/ 

app.component('prmSearchBarAfter', {
    bindings: { },
    template: '<div class="hello-world"><span>Development Environment</span></div>'
});

/** End show development environment **/




  


/** basic form **/
app.component('prmRequestServicesAfter',{
    bindings: {parentCtrl: '<'},
    controller: 'FormServiceController',
	template: '<form ng-if="$ctrl.callNumber" id="primo-text" method="post" action="https://library2018.library.vanderbilt.edu/forms/textme.php" target="_blank">\
    <input type="hidden" name="lang" value="en_US">\
    <input type="submit" id="textme" value="Text Me">\
    <input type="hidden" value="{{$ctrl.title}}" name="title">\
    <input type="hidden" value="{{$ctrl.localName}}" name="location">\
    <input type="hidden" value="{{$ctrl.callNumber}}" name="call"></form> <br/> \
	<form ng-if="$ctrl.localCode === \'ANNEX\'"  method="post" action="https://www.library.vanderbilt.edu/forms/custannex.php" target="_blank"> \
	<input type="hidden" name="lang" value="en_US">\
    <input type="hidden" value="{{$ctrl.title}}" name="title">\
    <input type="hidden" value="{{$ctrl.localName}}" name="location">\
    <input type="hidden" value="{{$ctrl.callNumber}}" name="call"> \
	<input type="submit" name="submit" value="Annex-form"> </form> \
	<form ng-if="$ctrl.localCode === \'SPEC-COLL\'"  method="post" action="https://www.library.vanderbilt.edu/forms/archives.php" target="_blank"> \
	<input type="hidden" name="lang" value="en_US">\
    <input type="hidden" value="{{$ctrl.title}}" name="title">\
    <input type="hidden" value="{{$ctrl.localName}}" name="location">\
    <input type="hidden" value="{{$ctrl.callNumber}}" name="call"> \
	<input type="submit" name="submit" value="Special Collections"> </form> \
	<form ng-if="$ctrl.localCode === \'21NORTH\'"  method="post" action="https://www.library.vanderbilt.edu/forms/archives.php" target="_blank"> \
	<input type="hidden" name="lang" value="en_US">\
    <input type="hidden" value="{{$ctrl.title}}" name="title">\
    <input type="hidden" value="{{$ctrl.localName}}" name="location">\
    <input type="hidden" value="{{$ctrl.callNumber}}" name="call"> \
	<input type="submit" name="submit" value="Special Collections"> </form> \
	'});

	
	app.controller('FormServiceController', [function () {
    var vm = this;
    vm.url = document.location || '';
    var pnx = vm.parentCtrl.item.pnx || false;
    vm.callNumber = vm.parentCtrl.item.delivery.bestlocation.callNumber ;
    vm.localName = vm.parentCtrl.item.delivery.bestlocation.mainLocation;
	vm.localCode = vm.parentCtrl.item.delivery.bestlocation.libraryCode;
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

/** End basic Form **/


var app = angular.module("myApp", []);
app.directive("w3TestDirective", function() {
    return {
        template : "<h1>Made by a directive!</h1>"
    };
});
/** End Custom SMS **/

	
/** Start Grinnel **/


/** End Grinnnel **/	
	
	
	
	
	
	
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


	
	/** Close function from line 1 **/
})();