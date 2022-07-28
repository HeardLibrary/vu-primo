(function(){
  "use strict";
  'use strict';
  
  var app = angular.module('viewCustom', ['angularLoad','customActions','googleAnalytics']); 
   
  //Auto generated code by primo app store DO NOT DELETE!!! -START-
  /*
      hookName is a place holder with should hold the hook name not including "prm" at the beginning and in upper camel case
      e.g: for hook prmSearchBarAfter (in html prm-search-bar-after) it should be given "SearchBarAfter"
   */
  app.controller('SearchResultAvailabilityLineAfterController', [function() {
    var vm = this;
  
    this.$onInit = function(){
      {}
    };
  }]);
  
  app.component('prmSearchResultAvailabilityLineAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'SearchResultAvailabilityLineAfterController',
    template: '\n    <primo-studio-browzine parent-ctrl="$ctrl.parentCtrl"></primo-studio-browzine><hathi-trust-availability-studio parent-ctrl="$ctrl.parentCtrl" ignore-copyright="false" entity-id="https://sso-login-uat.vanderbilt.edu"></hathi-trust-availability-studio>\n'
  
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
          if (!self.msg) self.msg = 'Full Text Available at HathiTrust';
  
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
  app.controller('reportBugPrimoStudioController', ['reportBugPrimoStudioStudioConfig', function(configParams) {
    //set the context
    var vm = this;
  
    this.$onInit = function(){
      {
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
      }
    };
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
    
  app.controller('RecordCollectionPathsAfterController', [function() {
    var vm = this;
  
    this.$onInit = function(){
      {}
    };
  }]);
  
  app.component('prmRecordCollectionPathsAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'RecordCollectionPathsAfterController',
    template: '\n    <add-marc-view-primo-studio parent-ctrl="$ctrl.parentCtrl"></add-marc-view-primo-studio>\n'
  
  });
  
  //Add Marc View Start
  app.constant('addMarcViewPrimoStudioStudioConfig', [{ "text": "View Source Record", "linkBase": "https://apps.library.vanderbilt.edu/services/source/rec.php?akey=" }]);
  
  
  
  app.controller('addMarcViewPrimoStudioController', ['addMarcViewPrimoStudioStudioConfig', function(configParams) {
      //set the context
      var vm = this;
  
      this.$onInit = function(){
        {
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
        }
      };
  }]);
  
  app.component('addMarcViewPrimoStudio', {
       bindings: {parentCtrl: '<'},
       controller: 'addMarcViewPrimoStudioController',
       template: '<span class="md-subhead"><hr/><a href="{{ $ctrl.linkBase }}{{ $ctrl.getRecordID() }}" target="_blank">{{ $ctrl.linkText }}</a></span>'
  
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
  
  
  app.controller('vuCustomActionsPrimoController', [function() {
    //set the context
    var vm = this;
  
    this.$onInit = function(){
      {
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
      }
    };
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
  
  /** Start error report form **/
  
  app.component('prmAlmaViewitAfter', {
     bindings: { parentCtrl: '<' },
     controller: 'prmAlmaViewitAfterController',
     templateUrl: '/discovery/custom/01VAN_INST-vanui/html/homepage/report_broken_link.html'
  });
  
  
  
  
  
  app.controller('prmAlmaViewitAfterController', [ function() {
    var vm = this;
  
    this.$onInit = function(){
      {
        vm.vul_dialog_content = "<form id='vul_bad_link_form' method='post'>";
        try {
           /* add all data except abstract to the form in hidden fields */
         /*  vm.vul_info = vm.parentCtrl.item.pnx.addata;
           for(var property_name in vm.vul_info) {
               if(property_name!='abstract') { 
                if([property_name!=undefined]) { 
                 vm.vul_dialog_content += "<input type='hidden' id='" + property_name + "' name='" + property_name + "' value='" + vm.vul_info[property_name] + "'>";
              }
            }
            */
  
            if(undefined!=vm.parentCtrl.item.pnx.addata.atitle) {
              vm.vul_dialog_content += "<div class='vul-dialog-title'><div style='color:green;font-weight:bold;'>" + vm.parentCtrl.item.pnx.addata.atitle + "</div></div>";
            }
           /* put the article title, the book title, or the journal title in the dialog (whichever comes first) */
           if(undefined!=vm.parentCtrl.item.pnx.addata.atitle) {
              vm.vul_dialog_content += "<div class='vul-dialog-title'><div style='color:green;font-weight:bold;'>" + vm.parentCtrl.item.pnx.addata.atitle + "</div></div>";
           } else if(undefined!=vm.parentCtrl.item.pnx.addata.btitle) {
              vm.vul_dialog_content += "<div class='vul-dialog-title'><div style='color:green;font-weight:bold;'>" + vm.parentCtrl.item.pnx.addata.btitle + "</div></div>";
           } else if(undefined!=vm.parentCtrl.item.pnx.addata.jtitle) {
              vm.vul_dialog_content += "<div class='vul-dialog-title'><div style='color:green;font-weight:bold;'>" + vm.parentCtrl.item.pnx.addata.jtitle + "</div></div>";
           }
           /* put the author data in the dialog (full name or last name/first name) */
           if(undefined!=vm.parentCtrl.item.pnx.addata.au) {
              vm.vul_dialog_content += "<div class='vul-dialog-au'>by " + vm.parentCtrl.item.pnx.addata.au + "</div>";
           } else {
              if(undefined!=vm.parentCtrl.item.pnx.addata.aulast) {
                 vm.vul_dialog_content += "<div class='vul-dialog-aulast'>by " + vm.parentCtrl.item.pnx.addata.aulast+"</div>";
                 if(undefined!=vm.parentCtrl.item.pnx.addata.aufirst) {
                    vm.vul_dialog_content += "<div class='vul-dialog-aufirst'>" + vm.parentCtrl.item.pnx.addata.aufirst+"</div>";
                 }
              }
           }
           /* put the journal title in the dialog */
           if(undefined!=vm.parentCtrl.item.pnx.addata.jtitle) {
              vm.vul_dialog_content += "<div class='vul-dialog-jtitle' style='font-weight:bold;'>" + vm.parentCtrl.item.pnx.addata.jtitle + "</div>";
           }
           /* put the issn in the dialog */
           if(undefined!=vm.parentCtrl.item.pnx.addata.eissn) {
              vm.vul_dialog_content += "<div class='vul-dialog-eissn'>ISSN: " + vm.parentCtrl.item.pnx.addata.eissn + "</div>";
           } else if(undefined!=vm.parentCtrl.item.pnx.addata.issn) {
              vm.vul_dialog_content += "<div class='vul-dialog-issn'>ISSN: " + vm.parentCtrl.item.pnx.addata.issn + "</div>";
           }
           /* put the volume in the dialog */
          if(undefined!=vm.parentCtrl.item.pnx.addata.volume) {
             vm.vul_dialog_content += "<div class='vul-dialog-volume'>Vol: " + vm.parentCtrl.item.pnx.addata.volume + "</div>";
          }
           /* put the issue in the dialog */
           if(undefined!=vm.parentCtrl.item.pnx.addata.issue) {
              vm.vul_dialog_content += "<div class='vul-dialog-issue'>Issue: " + vm.parentCtrl.item.pnx.addata.issue + "</div>";}
           /* put the pages in the dialog */
           if(undefined!=vm.parentCtrl.item.pnx.addata.pages) {
              vm.vul_dialog_content += "<div class='vul-dialog-pages'>Pages: " + vm.parentCtrl.item.pnx.addata.pages + "</div>";
           } else if(undefined!=vm.parentCtrl.item.pnx.addata.spage) {
              vm.vul_dialog_content += "<div class='vul-dialog-pages'>Pages: " + vm.parentCtrl.item.pnx.addata.spage;
              if(undefined!=vm.parentCtrl.item.pnx.addata.epage) {
                 vm.vul_dialog_content += "- " + vm.parentCtrl.item.pnx.addata.epage;
              }
              vm.vul_dialog_content += "</div>";
           }
           /* put additional questions in the dialog */
           vm.vul_dialog_content += "<div style='border:1px solid #CECECE;padding:8px;'><div><strong>If we locate this item, at what <span style='font-style:italic;color:blue;'>email address</span> may we contact you? </strong> </div><div><input type='text' id='badlink_report_email' name='badlink_report_email' value='' style='width:98%;border:1px solid #767676;'></div> <div><label for='cc_email'><input type='checkbox' id='cc_email' name='cc_email' value='1'><span style='font-weight:.8em;'> <strong>Send me a copy of this report </strong></span></label></div><div class='vul-dialog-email'> </div> </div>";
  
           vm.vul_dialog_content += "<div style='border:1px solid #CECECE;padding:8px;'><div><strong>Which of following best describes the problem with this article?</strong></div><div class='vul-dialog-problem'><select name='badlink_report_option_id' id='badlink_report_option_id' class='' size='1'><option value=''>-- select one --</option><option value='1' >The PDF is blank/missing pages</option><option value='2' >I received a 404/page not found error</option><option value='3' >The website prompted me to pay to access the article</option><option value='4' >The link went to another website other than the selected article</option><option value='5' >Full text for the article was not available, only the abstract or citation</option><option value='6' >Something else went wrong, explain in the comments below</option></select></div></div>";
          
           vm.vul_dialog_content += "<div style='border:1px solid #CECECE;padding:8px;'><div><strong>Comments (Optional)</strong></div><div class='vul-dialog-comment'><textarea id='badlink_report_comments' name='badlink_report_comments' style='width:98%;'></textarea></div></div>";
           /* this information is used to build the permalink on our local server */
           /* there is a permalink available, but I had trouble getting it to transfer to the server without being malfomed */
           vm.vul_dialog_content += "<input type='hidden' id='vid' name='vid' value='" + vm.parentCtrl.fullViewService.configurationUtil.searchFieldsService._searchParams.vid + "'>";
           /*
            vm.vul_dialog_content += "<input type='hidden' id='tab' name='tab' value='" + vm.parentCtrl.fullViewService.configurationUtil.searchFieldsService._searchParams.tab + "'>";
           */
           vm.vul_dialog_content += "<input type='hidden' id='docid' name='docid' value='" + vm.parentCtrl.item.pnx.control.recordid + "'>";
           /*
           vm.vul_dialog_content += "<input type='hidden' id='context' name='context' value='" + vm.parentCtrl.item.context + "'>";
           */
           vm.vul_dialog_content += "<input type='hidden' id='search_scope' name='search_scope' value='" + vm.parentCtrl.fullViewService.configurationUtil.searchFieldsService._searchParams.search_scope + "'>";
           vm.vul_dialog_content += "<input type='hidden' id='lang' name='lang' value='en'></form>";
           /* create and open the dialog */
           document.getElementsByClassName("tingle-modal-box__content")[0].innerHTML = vm.vul_dialog_content;
        } catch(err){
           console.log(err);
        }
        vm.getText = getText();
        function getText() {
           return "Report a broken link";
        }
      }
    };
  }]);
  
  
  
  
  
  
  
  
  
  
  //Close Initial function
  })();
  
  
  
  
  
  /** Start post processing local **/
  
  
  /* !
  * tingle.js
  * @author  robin_parisi
  * @version 0.15.2
  * @url
  */
  
  /* global define,module */
  (function (root, factory) {
    if (typeof define === 'function' && define.amd) {
      define(factory)
    } else if (typeof exports === 'object') {
      module.exports = factory()
    } else {
      root.tingle = factory()
    }
  }(this, function () {
    /* ----------------------------------------------------------- */
    /* == modal */
    /* ----------------------------------------------------------- */
  
    var isBusy = false
  
    function Modal (options) {
      var defaults = {
        onClose: null,
        onOpen: null,
        beforeOpen: null,
        beforeClose: null,
        stickyFooter: false,
        footer: false,
        cssClass: [],
        closeLabel: 'Close',
        closeMethods: ['overlay', 'button', 'escape']
      }
  
      // extends config
      this.opts = extend({}, defaults, options)
  
      // init modal
      this.init()
    }
  
    Modal.prototype.init = function () {
      if (this.modal) {
        return
      }
  
      _build.call(this)
      _bindEvents.call(this)
  
      // insert modal in dom
      document.body.appendChild(this.modal, document.body.firstChild)
  
      if (this.opts.footer) {
        this.addFooter()
      }
  
      return this
    }
  
    Modal.prototype._busy = function (state) {
      isBusy = state
    }
  
    Modal.prototype._isBusy = function () {
      return isBusy
    }
  
    Modal.prototype.destroy = function () {
      if (this.modal === null) {
        return
      }
  
      // restore scrolling
      if (this.isOpen()) {
        this.close(true)
      }
  
      // unbind all events
      _unbindEvents.call(this)
  
      // remove modal from dom
      this.modal.parentNode.removeChild(this.modal)
  
      this.modal = null
    }
  
    Modal.prototype.isOpen = function () {
      return !!this.modal.classList.contains('tingle-modal--visible')
    }
  
    Modal.prototype.open = function () {
      if (this._isBusy()) return
      this._busy(true)
  
      var self = this
  
      // before open callback
      if (typeof self.opts.beforeOpen === 'function') {
        self.opts.beforeOpen()
      }
  
      if (this.modal.style.removeProperty) {
        this.modal.style.removeProperty('display')
      } else {
        this.modal.style.removeAttribute('display')
      }
  
      // prevent double scroll
      this._scrollPosition = window.pageYOffset
      document.body.classList.add('tingle-enabled')
      document.body.style.top = -this._scrollPosition + 'px'
  
      // sticky footer
      this.setStickyFooter(this.opts.stickyFooter)
  
      // show modal
      this.modal.classList.add('tingle-modal--visible')
  
      // onOpen callback
      if (typeof self.opts.onOpen === 'function') {
        self.opts.onOpen.call(self)
      }
  
      self._busy(false)
  
      // check if modal is bigger than screen height
      this.checkOverflow()
  
      return this
    }
  
    Modal.prototype.close = function (force) {
      if (this._isBusy()) return
      this._busy(true)
      force = force || false
  
      //  before close
      if (typeof this.opts.beforeClose === 'function') {
        var close = this.opts.beforeClose.call(this)
        if (!close) {
          this._busy(false)
          return
        }
      }
  
      document.body.classList.remove('tingle-enabled')
      document.body.style.top = null
      window.scrollTo({
        top: this._scrollPosition,
        behavior: 'instant'
      })
  
      this.modal.classList.remove('tingle-modal--visible')
  
      // using similar setup as onOpen
      var self = this
  
      self.modal.style.display = 'none'
  
      // onClose callback
      if (typeof self.opts.onClose === 'function') {
        self.opts.onClose.call(this)
      }
  
      // release modal
      self._busy(false)
    }
  
    Modal.prototype.setContent = function (content) {
      // check type of content : String or Node
      if (typeof content === 'string') {
        this.modalBoxContent.innerHTML = content
      } else {
        this.modalBoxContent.innerHTML = ''
        this.modalBoxContent.appendChild(content)
      }
  
      if (this.isOpen()) {
        // check if modal is bigger than screen height
        this.checkOverflow()
      }
  
      return this
    }
  
    Modal.prototype.getContent = function () {
      return this.modalBoxContent
    }
  
    Modal.prototype.addFooter = function () {
      // add footer to modal
      _buildFooter.call(this)
  
      return this
    }
  
    Modal.prototype.setFooterContent = function (content) {
      // set footer content
      this.modalBoxFooter.innerHTML = content
  
      return this
    }
  
    Modal.prototype.getFooterContent = function () {
      return this.modalBoxFooter
    }
  
    Modal.prototype.setStickyFooter = function (isSticky) {
      // if the modal is smaller than the viewport height, we don't need sticky
      if (!this.isOverflow()) {
        isSticky = false
      }
  
      if (isSticky) {
        if (this.modalBox.contains(this.modalBoxFooter)) {
          this.modalBox.removeChild(this.modalBoxFooter)
          this.modal.appendChild(this.modalBoxFooter)
          this.modalBoxFooter.classList.add('tingle-modal-box__footer--sticky')
          _recalculateFooterPosition.call(this)
          this.modalBoxContent.style['padding-bottom'] = this.modalBoxFooter.clientHeight + 20 + 'px'
        }
      } else if (this.modalBoxFooter) {
        if (!this.modalBox.contains(this.modalBoxFooter)) {
          this.modal.removeChild(this.modalBoxFooter)
          this.modalBox.appendChild(this.modalBoxFooter)
          this.modalBoxFooter.style.width = 'auto'
          this.modalBoxFooter.style.left = ''
          this.modalBoxContent.style['padding-bottom'] = ''
          this.modalBoxFooter.classList.remove('tingle-modal-box__footer--sticky')
        }
      }
  
      return this
    }
  
    Modal.prototype.addFooterBtn = function (label, cssClass, callback) {
      var btn = document.createElement('button')
  
      // set label
      btn.innerHTML = label
  
      // bind callback
      btn.addEventListener('click', callback)
  
      if (typeof cssClass === 'string' && cssClass.length) {
        // add classes to btn
        cssClass.split(' ').forEach(function (item) {
          btn.classList.add(item)
        })
      }
  
      this.modalBoxFooter.appendChild(btn)
  
      return btn
    }
  
    Modal.prototype.resize = function () {
      // eslint-disable-next-line no-console
      console.warn('Resize is deprecated and will be removed in version 1.0')
    }
  
    Modal.prototype.isOverflow = function () {
      var viewportHeight = window.innerHeight
      var modalHeight = this.modalBox.clientHeight
  
      return modalHeight >= viewportHeight
    }
  
    Modal.prototype.checkOverflow = function () {
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
  
    /* ----------------------------------------------------------- */
    /* == private methods */
    /* ----------------------------------------------------------- */
  
    function closeIcon () {
      return '<svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"><path d="M.3 9.7c.2.2.4.3.7.3.3 0 .5-.1.7-.3L5 6.4l3.3 3.3c.2.2.5.3.7.3.2 0 .5-.1.7-.3.4-.4.4-1 0-1.4L6.4 5l3.3-3.3c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0L5 3.6 1.7.3C1.3-.1.7-.1.3.3c-.4.4-.4 1 0 1.4L3.6 5 .3 8.3c-.4.4-.4 1 0 1.4z" fill="#000" fill-rule="nonzero"/></svg>'
    }
  
    function _recalculateFooterPosition () {
      if (!this.modalBoxFooter) {
        return
      }
      this.modalBoxFooter.style.width = this.modalBox.clientWidth + 'px'
      this.modalBoxFooter.style.left = this.modalBox.offsetLeft + 'px'
    }
  
    function _build () {
      // wrapper
      this.modal = document.createElement('div')
      this.modal.classList.add('tingle-modal')
  
      // remove cusor if no overlay close method
      if (this.opts.closeMethods.length === 0 || this.opts.closeMethods.indexOf('overlay') === -1) {
        this.modal.classList.add('tingle-modal--noOverlayClose')
      }
  
      this.modal.style.display = 'none'
  
      // custom class
      this.opts.cssClass.forEach(function (item) {
        if (typeof item === 'string') {
          this.modal.classList.add(item)
        }
      }, this)
  
      // close btn
      if (this.opts.closeMethods.indexOf('button') !== -1) {
        this.modalCloseBtn = document.createElement('button')
        this.modalCloseBtn.type = 'button'
        this.modalCloseBtn.classList.add('tingle-modal__close')
  
        this.modalCloseBtnIcon = document.createElement('span')
        this.modalCloseBtnIcon.classList.add('tingle-modal__closeIcon')
        this.modalCloseBtnIcon.innerHTML = closeIcon()
  
        this.modalCloseBtnLabel = document.createElement('span')
        this.modalCloseBtnLabel.classList.add('tingle-modal__closeLabel')
        this.modalCloseBtnLabel.innerHTML = this.opts.closeLabel
  
        this.modalCloseBtn.appendChild(this.modalCloseBtnIcon)
        this.modalCloseBtn.appendChild(this.modalCloseBtnLabel)
      }
  
      // modal
      this.modalBox = document.createElement('div')
      this.modalBox.classList.add('tingle-modal-box')
  
      // modal box content
      this.modalBoxContent = document.createElement('div')
      this.modalBoxContent.classList.add('tingle-modal-box__content')
  
      this.modalBox.appendChild(this.modalBoxContent)
  
      if (this.opts.closeMethods.indexOf('button') !== -1) {
        this.modal.appendChild(this.modalCloseBtn)
      }
  
      this.modal.appendChild(this.modalBox)
    }
  
    function _buildFooter () {
      this.modalBoxFooter = document.createElement('div')
      this.modalBoxFooter.classList.add('tingle-modal-box__footer')
      this.modalBox.appendChild(this.modalBoxFooter)
    }
  
    function _bindEvents () {
      this._events = {
        clickCloseBtn: this.close.bind(this),
        clickOverlay: _handleClickOutside.bind(this),
        resize: this.checkOverflow.bind(this),
        keyboardNav: _handleKeyboardNav.bind(this)
      }
  
      if (this.opts.closeMethods.indexOf('button') !== -1) {
        this.modalCloseBtn.addEventListener('click', this._events.clickCloseBtn)
      }
  
      this.modal.addEventListener('mousedown', this._events.clickOverlay)
      window.addEventListener('resize', this._events.resize)
      document.addEventListener('keydown', this._events.keyboardNav)
    }
  
    function _handleKeyboardNav (event) {
      // escape key
      if (this.opts.closeMethods.indexOf('escape') !== -1 && event.which === 27 && this.isOpen()) {
        this.close()
      }
    }
  
    function _handleClickOutside (event) {
      // on macOS, click on scrollbar (hidden mode) will trigger close event so we need to bypass this behavior by detecting scrollbar mode
      var scrollbarWidth = this.modal.offsetWidth - this.modal.clientWidth
      var clickedOnScrollbar = event.clientX >= this.modal.offsetWidth - 15 // 15px is macOS scrollbar default width
      var isScrollable = this.modal.scrollHeight !== this.modal.offsetHeight
      if (navigator.platform === 'MacIntel' && scrollbarWidth === 0 && clickedOnScrollbar && isScrollable) {
        return
      }
  
      // if click is outside the modal
      if (this.opts.closeMethods.indexOf('overlay') !== -1 && !_findAncestor(event.target, 'tingle-modal') &&
          event.clientX < this.modal.clientWidth) {
        this.close()
      }
    }
  
    function _findAncestor (el, cls) {
      while ((el = el.parentElement) && !el.classList.contains(cls));
      return el
    }
  
    function _unbindEvents () {
      if (this.opts.closeMethods.indexOf('button') !== -1) {
        this.modalCloseBtn.removeEventListener('click', this._events.clickCloseBtn)
      }
      this.modal.removeEventListener('mousedown', this._events.clickOverlay)
      window.removeEventListener('resize', this._events.resize)
      document.removeEventListener('keydown', this._events.keyboardNav)
    }
  
    /* ----------------------------------------------------------- */
    /* == helpers */
    /* ----------------------------------------------------------- */
  
    function extend () {
      for (var i = 1; i < arguments.length; i++) {
        for (var key in arguments[i]) {
          if (arguments[i].hasOwnProperty(key)) {
            arguments[0][key] = arguments[i][key]
          }
        }
      }
      return arguments[0]
    }
  
    /* ----------------------------------------------------------- */
    /* == return */
    /* ----------------------------------------------------------- */
  
    return {
      modal: Modal
    }
  }))
  
  
  var vul_modal = new tingle.modal({
     footer: true,
     stickyFooter: false,
     closeMethods: ['overlay', 'button', 'escape'],
     closeLabel: "Close",
     cssClass: ['custom-class-1', 'custom-class-2'],
     onOpen: function() {
        //console.log('modal open');
     },
     onClose: function() {
        //console.log('modal closed');
     },
     beforeClose: function() {
        return true; // close the modal
     }
  });
  vul_modal.addFooterBtn('Send Report', 'tingle-btn tingle-btn--primary', function() {
     var form_data = new FormData(document.getElementById("vul_bad_link_form"));
     var xhttp = new XMLHttpRequest();
     xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           alert(this.responseText);
           return true;
        }
     };
     xhttp.open("POST", "https://apps.library.vanderbilt.edu/services/report-problem/report.php", true);
     //xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
     xhttp.send(form_data);
     vul_modal.close();
  });
  /** End post processing **/
  
  
  