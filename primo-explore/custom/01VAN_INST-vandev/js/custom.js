(function(){
"use strict";
'use strict';

var app = angular.module('viewCustom', ['angularLoad']);

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
  template: '\n    <primo-studio-browzine parent-ctrl="$ctrl.parentCtrl"></primo-studio-browzine><hathi-trust-availability-studio parent-ctrl="$ctrl.parentCtrl"></hathi-trust-availability-studio>\n'

});

//Auto generated code by primo app store DO NOT DELETE!!! -END-

//Auto generated code by primo app store DO NOT DELETE!!! -START-
/*
    hookName is a place holder with should hold the hook name not including "prm" at the beginning and in upper camel case
    e.g: for hook prmSearchBarAfter (in html prm-search-bar-after) it should be given "SearchBarAfter"
 */
app.controller('ServiceLinksAfterController', [function () {
  var vm = this;
}]);

app.component('prmServiceLinksAfter', {
  bindings: { parentCtrl: '<' },
  controller: 'ServiceLinksAfterController',
  template: '\n    <report-bug-primo-studio parent-ctrl="$ctrl.parentCtrl"></report-bug-primo-studio>\n'

});

//Auto generated code by primo app store DO NOT DELETE!!! -END-

//Auto generated code by primo app store DO NOT DELETE!!! -START-
angular.module('hathiTrustAvailability', []).value('hathiTrustIconPath', 'custom/CENTRAL_PACKAGE/img/hathitrust.svg').constant('hathiTrustBaseUrl', "https://catalog.hathitrust.org/api/volumes/brief/json/").config(['$sceDelegateProvider', 'hathiTrustBaseUrl', function ($sceDelegateProvider, hathiTrustBaseUrl) {
  var urlWhitelist = $sceDelegateProvider.resourceUrlWhitelist();
  urlWhitelist.push(hathiTrustBaseUrl + '**');
  $sceDelegateProvider.resourceUrlWhitelist(urlWhitelist);
}]).factory('hathiTrust', ['$http', '$q', function ($http, $q) {
  var svc = {};
  var hathiTrustBaseUrl = "https://catalog.hathitrust.org/api/volumes/brief/json/";

  svc.findFullViewRecord = function (ids) {
    var deferred = $q.defer();

    var handleResponse = function handleResponse(resp) {
      var data = resp.data;
      var fullTextUrl = null;
      for (var i = 0; !fullTextUrl && i < ids.length; i++) {
        var result = data[ids[i]];
        for (var j = 0; j < result.items.length; j++) {
          var item = result.items[j];
          if (item.usRightsString.toLowerCase() === "full view") {
            fullTextUrl = result.records[item.fromRecord].recordURL;
            break;
          }
        }
      }
      deferred.resolve(fullTextUrl);
    };

    if (ids.length) {
      var hathiTrustLookupUrl = hathiTrustBaseUrl + ids.join('|');
      $http.jsonp(hathiTrustLookupUrl, { cache: true, jsonpCallbackParam: 'callback' }).then(handleResponse).catch(function (e) {
        console.log(e);
      });
    } else {
      deferred.resolve(null);
    }

    return deferred.promise;
  };

  return svc;
}]).controller('hathiTrustAvailabilityStudioController', ['hathiTrust', 'hathiTrustIconPath', function (hathiTrust, hathiTrustIconPath) {
  var self = this;
  self.hathiTrustIconPath = hathiTrustIconPath;

  self.$onInit = function () {
    setDefaults();
    if (!(isOnline() && self.hideOnline)) {
      updateHathiTrustAvailability();
    }
  };

  var setDefaults = function setDefaults() {
    if (!self.msg) self.msg = 'Full Text Available at HathiTrust';
  };

  var isOnline = function isOnline() {
    return self.prmSearchResultAvailabilityLine.result.delivery.GetIt1.some(function (g) {
      return g.links.some(function (l) {
        return l.isLinktoOnline;
      });
    });
  };

  var updateHathiTrustAvailability = function updateHathiTrustAvailability() {
    var hathiTrustIds = (self.prmSearchResultAvailabilityLine.result.pnx.addata.oclcid || []).map(function (id) {
      return "oclc:" + id;
    });
    hathiTrust.findFullViewRecord(hathiTrustIds).then(function (res) {
      self.fullTextLink = res;
    });
  };
}]).component('hathiTrustAvailabilityStudio', {
  require: {
    prmSearchResultAvailabilityLine: '^prmSearchResultAvailabilityLine'
  },
  bindings: {
    hideOnline: '<',
    msg: '@?'
  },
  controller: 'hathiTrustAvailabilityStudioController',
  template: '<span ng-if="$ctrl.fullTextLink" class="umnHathiTrustLink">\
                <md-icon md-svg-src="{{$ctrl.hathiTrustIconPath}}" alt="HathiTrust Logo"></md-icon>\
                <a target="_blank" ng-href="{{$ctrl.fullTextLink}}">\
                {{ ::$ctrl.msg }}\
                  <prm-icon external-link="" icon-type="svg" svg-icon-set="primo-ui" icon-definition="open-in-new"></prm-icon>\
                </a>\
              </span>'
});

app.requires.push('hathiTrustAvailability');

//Auto generated code by primo app store DO NOT DELETE!!! -END-
//Auto generated code by primo app store DO NOT DELETE!!! -START-
app.constant('primoStudioBrowzineStudioConfig', [{ "journalCoverImagesEnabled": true, "journalBrowZineWebLinkTextEnabled": true, "journalBrowZineWebLinkText": "View Journal Contents", "articleBrowZineWebLinkTextEnabled": true, "articleBrowZineWebLinkText": "View Issue Contents", "articlePDFDownloadLinkEnabled": true, "articlePDFDownloadLinkText": "Download PDF", "articleLinkEnabled": true, "articleLinkText": "Read Article", "printRecordsIntegrationEnabled": true, "articlePDFDownloadViaUnpaywallEnabled": true, "articlePDFDownloadViaUnpaywallText": "Download PDF (via Unpaywall)", "articleLinkViaUnpaywallEnabled": true, "articleLinkViaUnpaywallText": "Read Article (via Unpaywall)", "articleAcceptedManuscriptPDFViaUnpaywallEnabled": true, "articleAcceptedManuscriptPDFViaUnpaywallText": "Download PDF (Accepted Manuscript via Unpaywall)", "articleAcceptedManuscriptArticleLinkViaUnpaywallEnabled": true, "articleAcceptedManuscriptArticleLinkViaUnpaywallText": "Read Article (Accepted Manuscript via Unpaywall)", "libraryId": "519", "apiKey": "sff3q4fqfrqw" }]);
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
})();