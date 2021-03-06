(function(){
"use strict";
'use strict';

var app = angular.module('viewCustom', ['angularLoad','customActions','googleAnalytics']); 
 
//Auto generated code by primo app store DO NOT DELETE!!! -START-
/*
    hookName is a place holder with should hold the hook name not including "prm" at the beginning and in upper camel case
    e.g: for hook prmSearchBarAfter (in html prm-search-bar-after) it should be given "SearchBarAfter"
 */
app.controller('SearchResultAvailabilityLineAfterController', [function () {
  var vm = this;
}]);

app.component('prmSearchResultAvailabilityLineAfter', {
  bindings: { parentCtrl: '<' },
  controller: 'SearchResultAvailabilityLineAfterController',
  template: '\n    <primo-studio-browzine parent-ctrl="$ctrl.parentCtrl"></primo-studio-browzine><hathi-trust-availability-studio parent-ctrl="$ctrl.parentCtrl" ignore-copyright="true" entity-id="https://sso-login-uat.vanderbilt.edu"></hathi-trust-availability-studio>\n'

});

//Auto generated code by primo app store DO NOT DELETE!!! -END-

//Auto generated code by primo app store DO NOT DELETE!!! -START-
/*
    hookName is a place holder with should hold the hook name not including "prm" at the beginning and in upper camel case
    e.g: for hook prmSearchBarAfter (in html prm-search-bar-after) it should be given "SearchBarAfter"
 */
 /**  commented out until bug is corrected
 
app.controller('ServiceLinksAfterController', [function () {
  var vm = this;
}]);

app.component('prmServiceLinksAfter', {
  bindings: { parentCtrl: '<' },
  controller: 'ServiceLinksAfterController',
  template: '\n    <report-bug-primo-studio parent-ctrl="$ctrl.parentCtrl"></report-bug-primo-studio>\n'

});
**/
//Auto generated code by primo app store DO NOT DELETE!!! -END-

// HathiTrust Auto generated code by primo app store DO NOT DELETE!!! -START-

/** Hathitrust **/
angular
  .module('hathiTrustAvailability', [])
  .constant(
    'hathiTrustBaseUrl',
    'https://catalog.hathitrust.org/api/volumes/brief/json/'
  )
  .config([
    '$sceDelegateProvider',
    'hathiTrustBaseUrl',
    function ($sceDelegateProvider, hathiTrustBaseUrl) {
      var urlWhitelist = $sceDelegateProvider.resourceUrlWhitelist();
      urlWhitelist.push(hathiTrustBaseUrl + '**');
      $sceDelegateProvider.resourceUrlWhitelist(urlWhitelist);
    },
  ])
  .factory('hathiTrust', [
    '$http',
    '$q',
    'hathiTrustBaseUrl',
    function ($http, $q, hathiTrustBaseUrl) {
      var svc = {};

      var lookup = function (ids) {
        if (ids.length) {
          var hathiTrustLookupUrl = hathiTrustBaseUrl + ids.join('|');
          return $http
            .jsonp(hathiTrustLookupUrl, {
              cache: true,
              jsonpCallbackParam: 'callback',
            })
            .then(function (resp) {
              return resp.data;
            });
        } else {
          return $q.resolve(null);
        }
      };

      // find a HT record URL for a given list of identifiers (regardless of copyright status)
      svc.findRecord = function (ids) {
        return lookup(ids)
          .then(function (bibData) {
            for (var i = 0; i < ids.length; i++) {
              var recordId = Object.keys(bibData[ids[i]].records)[0];
              if (recordId) {
                return $q.resolve(bibData[ids[i]].records[recordId].recordURL);
              }
            }
            return $q.resolve(null);
          })
          .catch(function (e) {
            console.error(e);
          });
      };

      // find a public-domain HT record URL for a given list of identifiers
      svc.findFullViewRecord = function (ids) {
        var handleResponse = function (bibData) {
          var fullTextUrl = null;
          for (var i = 0; !fullTextUrl && i < ids.length; i++) {
            var result = bibData[ids[i]];
            for (var j = 0; j < result.items.length; j++) {
              var item = result.items[j];
              if (item.usRightsString.toLowerCase() === 'full view') {
                fullTextUrl = result.records[item.fromRecord].recordURL;
                break;
              }
            }
          }
          return $q.resolve(fullTextUrl);
        };
        return lookup(ids)
          .then(handleResponse)
          .catch(function (e) {
            console.error(e);
          });
      };

      return svc;
    },
  ])
  .controller('hathiTrustAvailabilityStudioController', [
    'hathiTrust',
    function (hathiTrust) {
      var self = this;

      self.$onInit = function () {
        if (!self.msg) self.msg = 'Full Text Available at HathiTrust - physical copy temporarily not requestable';

        // prevent appearance/request iff 'hide-online'
        if (self.hideOnline && isOnline()) {
          return;
        }

        // prevent appearance/request iff 'hide-if-journal'
        if (self.hideIfJournal && isJournal()) {
          return;
        }

        // look for full text at HathiTrust
        updateHathiTrustAvailability();
      };

      var isJournal = function () {
        var format =
          self.prmSearchResultAvailabilityLine.result.pnx.addata.format[0];
        return !(format.toLowerCase().indexOf('journal') == -1); // format.includes("Journal")
      };

      var isOnline = function () {
        var delivery =
          self.prmSearchResultAvailabilityLine.result.delivery || [];
        if (!delivery.GetIt1)
          return delivery.deliveryCategory.indexOf('Alma-E') !== -1;
        return self.prmSearchResultAvailabilityLine.result.delivery.GetIt1.some(
          function (g) {
            return g.links.some(function (l) {
              return l.isLinktoOnline;
            });
          }
        );
      };

      var formatLink = function (link) {
        return self.entityId ? link + '?signon=swle:' + self.entityId : link;
      };

      var isOclcNum = function (value) {
        return value.match(/^(\(ocolc\))?\d+$/i);
      };

      var updateHathiTrustAvailability = function () {
        var hathiTrustIds = (
          self.prmSearchResultAvailabilityLine.result.pnx.addata.oclcid || []
        )
          .filter(isOclcNum)
          .map(function (id) {
            return 'oclc:' + id.toLowerCase().replace('(ocolc)', '');
          });
        hathiTrust[self.ignoreCopyright ? 'findRecord' : 'findFullViewRecord'](
          hathiTrustIds
        ).then(function (res) {
          if (res) self.fullTextLink = formatLink(res);
        });
      };
    },
  ])
  .component('hathiTrustAvailabilityStudio', {
    require: {
      prmSearchResultAvailabilityLine: '^prmSearchResultAvailabilityLine',
    },
    bindings: {
      entityId: '@',
      ignoreCopyright: '<',
      hideIfJournal: '<',
      hideOnline: '<',
      msg: '@?',
    },
    controller: 'hathiTrustAvailabilityStudioController',
    template:
      '<span ng-if="$ctrl.fullTextLink" class="umnHathiTrustLink">\
                <md-icon alt="HathiTrust Logo">\
                  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 16 16" enable-background="new 0 0 16 16" xml:space="preserve">  <image id="image0" width="16" height="16" x="0" y="0"\
                  xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJN\
                  AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACNFBMVEXuegXvegTsewTveArw\
                  eQjuegftegfweQXsegXweQbtegnsegvxeQbvegbuegbvegbveQbtegfuegbvegXveQbvegbsfAzt\
                  plfnsmfpq1/wplPuegXvqFrrq1znr2Ptok/sewvueQfuegbtegbrgRfxyJPlsXDmlTznnk/rn03q\
                  pVnomkjnlkDnsGnvwobsfhPveQXteQrutHDqpF3qnUnpjS/prmDweQXsewjvrWHsjy7pnkvqqGDv\
                  t3PregvqhB3uuXjusmzpp13qlz3pfxTskC3uegjsjyvogBfpmkHpqF/us2rttXLrgRjrgBjttXDo\
                  gx/vtGznjzPtfhHqjCfuewfrjCnwfxLpjC7wtnDogBvssmjpfhLtegjtnEjrtnTmjC/utGrsew7s\
                  o0zpghnohB/roUrrfRHtsmnlkTbrvH3tnEXtegXvegTveQfqhyHvuXjrrGTpewrsrmXqfRHogRjt\
                  q2Dqewvqql/wu3vqhyDueQnwegXuegfweQPtegntnUvnt3fvxI7tfhTrfA/vzJvmtXLunEbtegrw\
                  egTregzskjbsxI/ouoPsqFzniyrz2K3vyZnokDLpewvtnkv30J/w17XsvYXjgBbohR7nplnso1L0\
                  1Kf40Z/um0LvegXngBnsy5juyJXvsGftrGTnhB/opVHoew7qhB7rzJnnmErkkz3splbqlT3smT3t\
                  tXPqqV7pjzHvunjrfQ7vewPsfA7uoU3uqlruoEzsfQ/vegf///9WgM4fAAAAFHRSTlOLi4uLi4uL\
                  i4uLi4uLi4tRUVFRUYI6/KEAAAABYktHRLvUtndMAAAAB3RJTUUH4AkNDgYNB5/9vwAAAQpJREFU\
                  GNNjYGBkYmZhZWNn5ODk4ubh5WMQERUTl5CUEpWWkZWTV1BUYlBWUVVT19BUUtbS1tHV0zdgMDQy\
                  NjE1MzRXsrC0sraxtWOwd3B0cnZxlXZz9/D08vbxZfDzDwgMCg4JdQsLj4iMio5hiI2LT0hMSk5J\
                  TUvPyMzKzmHIzcsvKCwqLiktK6+orKquYZCuratvaGxqbmlta+8QNRBl6JQ26Oru6e3rnzBx0uQ8\
                  aVGGvJopU6dNn1E8c9bsOXPniYoySM+PXbBw0eIlS5fl1C+PFRFlEBUVXbFy1eo1a9fliQDZYIHY\
                  9fEbNm7avEUUJiC6ddv2HTt3mSuBBfhBQEBQSEgYzOIHAHtfTe/vX0uvAAAAJXRFWHRkYXRlOmNy\
                  ZWF0ZQAyMDE2LTA5LTEzVDE0OjA2OjEzLTA1OjAwNMgVqAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAx\
                  Ni0wOS0xM1QxNDowNjoxMy0wNTowMEWVrRQAAAAASUVORK5CYII=" />\
                  </svg> \
                </md-icon>\
                <a target="_blank" ng-href="{{$ctrl.fullTextLink}}">\
                {{ ::$ctrl.msg }}\
                  <prm-icon external-link="" icon-type="svg" svg-icon-set="primo-ui" icon-definition="open-in-new"></prm-icon>\
                </a>\
              </span>',
  });


app.requires.push('hathiTrustAvailability');

//Auto generated code by primo app store DO NOT DELETE!!! -END-
//Auto generated code by primo app store DO NOT DELETE!!! -START-
app.constant('primoStudioBrowzineStudioConfig', [{ "journalCoverImagesEnabled": true, "journalBrowZineWebLinkTextEnabled": true, "journalBrowZineWebLinkText": "View Journal Contents", "articleBrowZineWebLinkTextEnabled": true, "articleBrowZineWebLinkText": "View Issue Contents", "articlePDFDownloadLinkEnabled": true, "articlePDFDownloadLinkText": "Download PDF", "articleLinkEnabled": true, "articleLinkText": "Read Article", "printRecordsIntegrationEnabled": true, "articlePDFDownloadViaUnpaywallEnabled": true, "articlePDFDownloadViaUnpaywallText": "Download PDF (via Unpaywall)", "articleLinkViaUnpaywallEnabled": true, "articleLinkViaUnpaywallText": "Read Article (via Unpaywall)", "articleAcceptedManuscriptPDFViaUnpaywallEnabled": true, "articleAcceptedManuscriptPDFViaUnpaywallText": "Download PDF (Accepted Manuscript via Unpaywall)", "articleAcceptedManuscriptArticleLinkViaUnpaywallEnabled": true, "articleAcceptedManuscriptArticleLinkViaUnpaywallText": "Read Article (Accepted Manuscript via Unpaywall)", "libraryId": "519", "apiKey": "a38db48a-1772-44f3-b8e3-df9f826cf881" }]);
//Auto generated code by primo app store DO NOT DELETE!!! -END-
//Auto generated code by primo app store DO NOT DELETE!!! -START-
PrimoStudioBrowzineController.$inject = ["$scope", "primoStudioBrowzineStudioConfig"];

function isBrowzineLoaded() {
  var validation = false;
  var scripts = document.head.querySelectorAll("script");

  if (scripts) {
    Array.prototype.forEach.call(scripts, function (script) {
      if (script.src.indexOf("browzine-primo-adapter") > -1) {
        validation = true;
      }
    });
  }

  return validation;
};

function PrimoStudioBrowzineController($scope, studioConfig) {
  if (!isBrowzineLoaded()) {
    if (studioConfig[0]) {
      if (!studioConfig[0].libraryId) {
        console.log("Missing required Primo Studio BrowZine addon field: libraryId");
      }

      if (!studioConfig[0].apiKey) {
        console.log("Missing required Primo Studio BrowZine addon field: apiKey");
      }
    } else {
      console.log("Missing Primo Studio BrowZine addon configuration: studioConfig");
    }

    window.browzine = {
      libraryId: studioConfig[0].libraryId,
      apiKey: studioConfig[0].apiKey,

      journalCoverImagesEnabled: studioConfig[0].journalCoverImagesEnabled,

      journalBrowZineWebLinkTextEnabled: studioConfig[0].journalBrowZineWebLinkTextEnabled,
      journalBrowZineWebLinkText: studioConfig[0].journalBrowZineWebLinkText,

      articleBrowZineWebLinkTextEnabled: studioConfig[0].articleBrowZineWebLinkTextEnabled,
      articleBrowZineWebLinkText: studioConfig[0].articleBrowZineWebLinkText,

      articlePDFDownloadLinkEnabled: studioConfig[0].articlePDFDownloadLinkEnabled,
      articlePDFDownloadLinkText: studioConfig[0].articlePDFDownloadLinkText,

      articleLinkEnabled: studioConfig[0].articleLinkEnabled,
      articleLinkText: studioConfig[0].articleLinkText,

      printRecordsIntegrationEnabled: studioConfig[0].printRecordsIntegrationEnabled,

      unpaywallEmailAddressKey: studioConfig[0].unpaywallEmailAddressKey,

      articlePDFDownloadViaUnpaywallEnabled: studioConfig[0].articlePDFDownloadViaUnpaywallEnabled,
      articlePDFDownloadViaUnpaywallText: studioConfig[0].articlePDFDownloadViaUnpaywallText,

      articleLinkViaUnpaywallEnabled: studioConfig[0].articleLinkViaUnpaywallEnabled,
      articleLinkViaUnpaywallText: studioConfig[0].articleLinkViaUnpaywallText,

      articleAcceptedManuscriptPDFViaUnpaywallEnabled: studioConfig[0].articleAcceptedManuscriptPDFViaUnpaywallEnabled,
      articleAcceptedManuscriptPDFViaUnpaywallText: studioConfig[0].articleAcceptedManuscriptPDFViaUnpaywallText,

      articleAcceptedManuscriptArticleLinkViaUnpaywallEnabled: studioConfig[0].articleAcceptedManuscriptArticleLinkViaUnpaywallEnabled,
      articleAcceptedManuscriptArticleLinkViaUnpaywallText: studioConfig[0].articleAcceptedManuscriptArticleLinkViaUnpaywallText
    };

    window.browzine.script = document.createElement("script");
    window.browzine.script.src = "https://s3.amazonaws.com/browzine-adapters/primo/browzine-primo-adapter.js";
    window.document.head.appendChild(window.browzine.script);
  }

  (function poll() {
    if (isBrowzineLoaded() && window.browzine.primo) {
      window.browzine.primo.searchResult($scope);
    } else {
      requestAnimationFrame(poll);
    }
  })();
};

var PrimoStudioBrowzineComponent = {
  selector: "primoStudioBrowzine",
  controller: PrimoStudioBrowzineController,
  bindings: { parentCtrl: "<" }
};

var PrimoStudioBrowzineModule = angular.module("primoStudioBrowzine", []).component(PrimoStudioBrowzineComponent.selector, PrimoStudioBrowzineComponent).name;

app.requires.push(PrimoStudioBrowzineModule);

//Auto generated code by primo app store DO NOT DELETE!!! -END-
//Auto generated code by primo app store DO NOT DELETE!!! -START-
app.constant('reportBugPrimoStudioStudioConfig', [{ "text": "report a bug", "linkBase": "report a bug link" }]);
//Auto generated code by primo app store DO NOT DELETE!!! -END-
//Auto generated code by primo app store DO NOT DELETE!!! -START-
app.controller('reportBugPrimoStudioController', ['reportBugPrimoStudioStudioConfig', function (configParams) {

  //set the context
  var vm = this;

  //binds the function to the scope so it's requestable in the component.
  vm.getRecordID = getRecordID;
  vm.linkText = getLinkText();
  vm.linkBase = getLinkBase();

  function getLinkText() {
    return configParams[0].text;
  }

  function getLinkBase() {
    return configParams[0].linkBase;
  }
  //define the function that retrieves the record ID
  function getRecordID() {
    return vm.parentCtrl.item.pnx.control.recordid[0];
  }
}]);

app.component('reportBugPrimoStudio', {
  bindings: { parentCtrl: '<' },
  controller: 'reportBugPrimoStudioController',
  template: '<span class="md-subhead"><a href="{{ $ctrl.linkBase }}{{ $ctrl.getRecordID() }}" target="_blank">{{ $ctrl.linkText }}</a></span>'

});

//Auto generated code by primo app store DO NOT DELETE!!! -END-


//Start VU Local

  app.component('prmAtozSearchBarAfter', {
    bindings: {
      parentCtrl: '<'
    },
    template: '<div tabindex="-1" role="search" layout="row" class="layout-row"><div id="browzinelogo"> <a href="http://browzine.com.proxy.library.vanderbilt.edu/libraries/519/subjects" class="md-primoExplore-theme" ><img src="https://apps.library.vanderbilt.edu/images/browzinetop.png" width="141px" height="50px" target="_new"></a></div></div>'
  });

  app.component('prmLogoAfter', {
    bindings: {
      parentCtrl: '<'
    },
    template: '<a href="https://www.library.vanderbilt.edu" class="md-primoExplore-theme" ><div class="product-logo-local"  id="banner" aria-label="Library home page">  </div></a>'
  });
  



  
app.controller('RecordCollectionPathsAfterController', [function () {
  var vm = this;
}]);


app.component('prmRecordCollectionPathsAfter', {
  bindings: { parentCtrl: '<' },
  controller: 'RecordCollectionPathsAfterController',
  template: '\n    <add-marc-view-primo-studio parent-ctrl="$ctrl.parentCtrl"></add-marc-view-primo-studio>\n'

});

//Add Marc View Start
app.constant('addMarcViewPrimoStudioStudioConfig', [{ "text": "View Source Record", "linkBase": "https://apps.library.vanderbilt.edu/services/source/rec.php?akey=" }]);



app.controller('addMarcViewPrimoStudioController', ['addMarcViewPrimoStudioStudioConfig', function (configParams) {
    
     //set the context
     var vm = this;
    
     //binds the function to the scope so it's requestable in the component.
     vm.getRecordID = getRecordID;
     vm.linkText = getLinkText();
     vm.linkBase = getLinkBase();

     function getLinkText(){
         return configParams[0].text;
     }

     function getLinkBase(){
         return configParams[0].linkBase;
     }
     //define the function that retrieves the record ID
     function getRecordID() {
         return vm.parentCtrl.item.pnx.control.recordid[0];
     }

 }]);

app.component('addMarcViewPrimoStudio', {
     bindings: {parentCtrl: '<'},
     controller: 'addMarcViewPrimoStudioController',
     template: `<span class="md-subhead"><hr/><a href="{{ $ctrl.linkBase }}{{ $ctrl.getRecordID() }}" target="_blank">{{ $ctrl.linkText }}</a></span>`

 });

//Add Marc View End 
 
 // Libchat start
 (function() {

  var lc = document.createElement('script'); lc.type = 'text/javascript'; lc.async = 'true';

  lc.src = 'https://v2.libanswers.com/load_chat.php?hash=08328d78c3032c0ae5d5aa973c4b046c';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(lc, s);
    })();
// Libchat end


/** Start Google Analytics **/

angular.module('googleAnalytics', []);
angular.module('googleAnalytics').run(function ($rootScope, $interval, analyticsOptions) {
  if(analyticsOptions.hasOwnProperty("enabled") && analyticsOptions.enabled) {
    if(analyticsOptions.hasOwnProperty("siteId") && analyticsOptions.siteId != '') {
      if(typeof ga === 'undefined') {
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

        ga('create', analyticsOptions.siteId, {'alwaysSendReferrer': true});
        ga('set', 'anonymizeIp', true);
      }
    }
    $rootScope.$on('$locationChangeSuccess', function (event, toState, fromState) {
      if(analyticsOptions.hasOwnProperty("defaultTitle")) {
        var documentTitle = analyticsOptions.defaultTitle;
        var interval = $interval(function () {
          if(document.title !== '') documentTitle = document.title;
          if (window.location.pathname.indexOf('openurl') !== -1 || window.location.pathname.indexOf('fulldisplay') !== -1)
            if (angular.element(document.querySelector('prm-full-view-service-container .item-title>a')).length === 0) return;
            else documentTitle = angular.element(document.querySelector('prm-full-view-service-container .item-title>a')).text();
          
          if(typeof ga !== 'undefined') {
            if(fromState != toState) ga('set', 'referrer', fromState);
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
  siteId: 'UA-333143-41',
  defaultTitle: 'Vanderbilt University Library Catalog'
});

/** End Google Analytics **/

/** Start custom actions **/


app.component('prmActionListAfter', {
  bindings: {parentCtrl: '<'},
  controller: 'vuCustomActionsPrimoController',
  template: `<custom-action name="text_me"
                            label="Text Me"
                            index=0
                            icon="ic_smartphone_24px"
                            icon-set="hardware"
                            link="https://www.library.vanderbilt.edu/forms/textme.php?call={{$ctrl.getCall()}}&location={{$ctrl.getLibrary()}}&title={{$ctrl.getTitle()}}" />`
/**            <custom-action  name="report_bug"
                            label="Report Bug"
                            index=7
                            icon="ic_bug_report_24px"
                            icon-set="action"
                            link="https://www.library.vanderbilt.edu/report_problem?record_id={pnx.search.recordid[0]}" />`
**/

});


app.controller('vuCustomActionsPrimoController', [function () {
    
     //set the context
     var vm = this;
    
     //binds the function to the scope so it's requestable in the component.
     vm.getRecordID = getRecordID;
   vm.getTitle = getTitle;
   vm.getCall = getCall;
   vm.getLibrary = getLibrary

     //define the function that retrieves the record ID
     function getRecordID() {
         return vm.parentCtrl.item.pnx.control.recordid[0];
     } 
   function getLibrary() {
     return vm.parentCtrl.item.delivery.bestlocation.mainLocation;
   } 
   function getTitle() {
    return vm.parentCtrl.item.pnx.display.title[0]; 
   }
   function getCall() {
    return vm.parentCtrl.item.delivery.bestlocation.callNumber;
   }    
}]);

  
/** Start Orbis adapted code **/
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
      this.addActionIcon(action, ctrl);
      if (!this.actionExists(action, ctrl)) {
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
     * Tbe pnx fields are requested but does not always work for VE recommend
   * defining in the customActionsPrimoController.
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


/** End Orbis adapted code **/

/** End Custom actions **/
  

  
//End VU Local





})();   // End Angular