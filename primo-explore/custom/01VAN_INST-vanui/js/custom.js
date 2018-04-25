(function(){
"use strict";
'use strict';

var app = angular.module('viewCustom',['angularLoad','customActions','sendSms']);

app.component('prmLogoAfter', {
    bindings: { },
    template: `<div class="hello-world"><span>Hello World</span></div>`
});

app.component('prmActionListAfter', {template: '<sms-action />'})

app.value('smsOptions', {
    smsAction: {
      name: 'send_sms',
      label: 'Text Me',
      index: 0,
      icon: {
        icon: 'ic_smartphone_24px',
        iconSet: 'hardware',
        type: 'svg',
      },
    },
    smsCarriers: {
      'ATT': 'txt.att.net',
	  'Sprint': 'messaging.sprintpcs.com',
      'T-Mobile': 'tmomail.net',
      'Verizon': 'vtext.com',
    },
})




/* Start SMS */

angular.module('sendSms', ['ngMaterial', 'primo-explore.components', 'customActions']);



/* eslint-disable max-len */
angular.module('sendSms').component('ocaSendSms', {
  bindings: {
    item: '<',
    finishedSmsEvent: '&'
  },
  template: '\n  <div class="send-actions-content-item" layout="row">\n      <md-content layout-wrap layout-padding layout-fill>\n          <form name="smsForm" novalidate layout="column" layout-align="center center" (submit)="$ctrl.sendSms($event);">\n              <div layout="row" class="layout-full-width" layout-align="center center">\n                  <div flex="20" flex-sm="10" hide-xs></div>\n                  <div class="form-focus service-form" layout-padding flex>\n                      <div layout-margin>\n                          <div layout="column">\n                              <h4 class="md-subhead">Standard message and data rates may apply.</h4>\n                              <md-input-container class="underlined-input md-required"><label>Phone number:</label>\n                                  <input ng-model="$ctrl.phoneNumber" name="phoneNumber" type="text" required ng-pattern="::$ctrl.telRegEx">\n                                  <div ng-messages="smsForm.phoneNumber.$error">\n                                      <div ng-message="pattern, required ">phone number is invalid</div>\n                                  </div>\n                              </md-input-container>\n                              <md-input-container class="md-required"><label>Carrier:</label>\n                                <md-select ng-model="$ctrl.carrier" name="carrier" placeholder="Select a carrier" required>\n                                  <md-option ng-repeat="(carrier, address) in carriers" value="{{ address }}">\n                                    {{ carrier }}\n                                  </md-option>\n                                </md-select>\n                                <div ng-messages="smsForm.carrier.$error">\n                                    <div ng-message="required">please select a carrier</div>\n                                </div>\n                              </md-input-container>\n                              <md-input-container class="underlined-input" ng-if="$ctrl.isCaptcha">\n                                  <div vc-recaptcha key="$ctrl.getCaptchaPublicKey()" on-success="$ctrl.setResponse(response)"></div>\n                                  <span class="recaptcha-error-info" ng-show="smsForm.$submitted && (smsForm.recaptchaResponse.$invalid || smsForm.$error.recaptcha.length)">\n                                    <span translate="captcha.notselected"></span>\n                                  </span>\n                              </md-input-container>\n                          </div>\n                      </div>\n                  </div>\n                  <div flex="20" flex-sm="10" hide-xs></div>\n              </div>\n              <div layout="row">\n                  <div layout="row" layout-align="center" layout-fill>\n                      <md-button type="submit" class="button-with-icon button-large button-confirm" aria-label="Send the result by SMS">\n                          <prm-icon icon-type="svg" svg-icon-set="primo-ui" icon-definition="send"></prm-icon><span translate="email.popup.link.send"></span></md-button>\n                  </div>\n              </div>\n          </form>\n      </md-content>\n  </div>\n  <prm-send-email ng-hide="true"></prm-send-email>\n  <oca-send-sms-after parent-ctrl="$ctrl"></oca-send-sms-after>',
  controller: ['$scope', 'smsOptions', function ($scope, smsOptions) {
    var _this = this;

    this.$onInit = function () {
      $scope.$watch('$$childTail.$ctrl', function (ctrl) {
        return _this.sendEmailService = ctrl.sendEmailService;
      });
      $scope.carriers = smsOptions.smsCarriers;
      _this.carrier = _this.phoneNumber = '';
      _this.telRegEx = /^\d{3}( |-)?\d{3}( |-)?\d{4}$/;
    };
    this.validate = function () {
      return _this.telRegEx.test(_this.phoneNumber) && _this.carrier;
    };
    this.isCaptcha = function () {
      return window.appConfig['system-configuration']['Activate Captcha [Y/N]'] = 'Y';
    };
    this.getCaptchaPublicKey = function () {
      return window.appConfig['system-configuration']['Public Captcha Key'] = '6Lf0HFUUAAAAAMGJ-pJW0qUt5IwJIrA6mciurTSM';
    };
    this.setResponse = function (response) {
      return _this.gCaptchaResponse = response;
    };
    this.sendSms = function () {
      if (_this.validate()) {
        _this.sendEmailService.sendEmail([_this.phoneNumber + '@' + _this.carrier], // addresses
        '', // subject
        '', // note
        [_this.item], // items
        _this.gCaptchaResponse // captcha
        ).then(function (msg) {
          return console.log('sms successfully sent', msg);
        }).catch(function (err) {
          return console.error('sms sending failed', err);
        }).finally(function () {
          return _this.finishedSmsEvent();
        });
      }
    };
  }]
}).run(['$templateCache', 'smsOptions', function ($templateCache, smsOptions) {
  $templateCache.put('components/search/actions/actionContainer/action-container.html', '\n  <oca-send-sms ng-if="($ctrl.actionName===\'' + smsOptions.smsAction.name + '\')" finished-sms-event="$ctrl.throwCloseTabsEvent()" item="::$ctrl.item"></oca-send-sms>\n  <prm-send-email ng-if="($ctrl.actionName===\'E-mail\')" (finished-email-event)="$ctrl.throwCloseTabsEvent()" [item]="::$ctrl.item" [toggleform]="::$ctrl.toggleActionCotent" [user]="::\'\'"></prm-send-email>\n  <prm-citation ng-if="($ctrl.actionName===\'Citation\')" [item]="::$ctrl.item" [on-toggle]="::$ctrl.onToggle"></prm-citation>\n  <prm-permalink ng-if="($ctrl.actionName===\'Permalink\')" [item]="::$ctrl.item" [on-toggle]="::$ctrl.onToggle"></prm-permalink>\n  <prm-print-item ng-if="($ctrl.actionName===\'Print\')" (close-tabs-event)="$ctrl.throwCloseTabsEvent()" [item]="::$ctrl.item" [on-toggle]="::$ctrl.onToggle"></prm-print-item>\n  <prm-endnote ng-if="($ctrl.actionName===\'EndNote\')" (close-tabs-event)="$ctrl.throwCloseTabsEvent()" [item]="::$ctrl.item" [on-toggle]="::$ctrl.onToggle"></prm-endnote>\n  <prm-easybib ng-if="($ctrl.actionName===\'EasyBib\')" (close-tabs-event)="$ctrl.throwCloseTabsEvent()" [item]="::$ctrl.item" [on-toggle]="::$ctrl.onToggle"></prm-easybib>\n  <prm-refworks ng-if="($ctrl.actionName===\'RefWorks\')" (close-tabs-event)="$ctrl.throwCloseTabsEvent()" [item]="::$ctrl.item" [on-toggle]="::$ctrl.onToggle"></prm-refworks>\n  <prm-export-ris ng-if="($ctrl.actionName===\'RISPushTo\')" [item]="::$ctrl.item" [on-toggle]="::$ctrl.onToggle"></prm-export-ris>\n  <prm-action-container-after parent-ctrl="$ctrl"></prm-action-container-after>');
}]);

/* eslint-disable max-len */
angular.module('sendSms').component('smsAction', {
  require: {
    prmActionCtrl: '^prmActionList'
  },
  controller: ['customActions', 'smsOptions', function (customActions, smsOptions) {
    var _this2 = this;

    this.$onInit = function () {
      return customActions.addAction(smsOptions.smsAction, _this2.prmActionCtrl);
    };
    this.$onDestroy = function () {
      return customActions.removeAction(smsOptions.smsAction, _this2.prmActionCtrl);
    };
  }]
});

angular.module('sendSms').value('smsOptions', {
  smsAction: {
    name: 'send_sms',
    label: 'SMS',
    index: 9,
    icon: {
      icon: 'ic_smartphone_24px',
      iconSet: 'hardware',
      type: 'svg'
    }
  },
  smsCarriers: {
    'ATT': 'txt.att.net',
    'T-Mobile': 'tmomail.net',
    'Virgin': 'vmobl.com',
    'Sprint': 'messaging.sprintpcs.com',
    'Nextel': 'messaging.nextel.com',
    'Verizon': 'vtext.com',
    'Cricket': 'mms.mycricket.com',
    'Qwest': 'qwestmp.com',
    'Project Fi': 'msg.fi.google.com'
  }
});





/* End SMS */





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