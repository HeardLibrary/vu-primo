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

    app.component('prmActionListAfter', {
      template: '<custom-action name=\"text_me\"\n                            label=\"Text Me\"\n                            index=0\n                            icon=\"ic_smartphone_24px\"\n                            icon-set=\"hardware\"\n                            link=\"https://apps.library.vanderbilt.edu/services/text.php?title={pnx.control.sourcerecordid} -- {pnx.delivery.bestlocation.callNumber}\" />'
    });

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
	

app.component('prmBriefResultAfter',{
    bindings: {parentCtrl: '<'},
    controller: 'ServiceDetailsAfterController',
	template: '<form ng-if="$ctrl.url" id="primo-text" method="post" action="https://apps.library.vanderbilt.edu/services/sms/sms.php" target="_blank">\
    <input type="hidden" name="lang" value="en_US">\
    <input type="submit" id="textme" value="Text Me">\
    <input type="hidden" value="{{$ctrl.title}}" name="title">\
    <input type="hidden" value="{{$ctrl.localName}}" name="location">\
    <input type="hidden" value="{{$ctrl.callNumber}}" name="call"></form>'});

	
	
	
	/** End custom development **/



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