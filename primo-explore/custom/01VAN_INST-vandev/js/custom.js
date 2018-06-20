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


/** Custom SMS **/

	




/** End Custom SMS **/

	
/** Start Grinnel **/
/* add SMS button */
    app.component('prmActionListAfter', {
		bindings: { parentCtrl: '<' },
		controller: 'smsController',
		template: `
			<li class="md-nav-item layout-column" role="option" aria-selected="true" layout="column" tabindex="-1" id="text_me">
			
				<button class="md-icon-button custom-button md-button md-primoExplore-theme md-ink-ripple text-call-number-button" type="button" aria-label="Send call number for item via text" title="Text call number"  ng-if="$ctrl.parentCtrl.item.delivery.bestlocation.callNumber" ng-click="$ctrl.showDialog(ev);">
					<md-icon class="md-primoExplore-theme" aria-hidden="true">
						<svg width="100%" height="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" focusable="false">
							<path d="M15.89,2H9.11A2.12,2.12,0,0,0,7,4.11V19.89A2.12,2.12,0,0,0,9.11,22h6.78A2.12,2.12,0,0,0,18,19.89V4.11A2.12,2.12,0,0,0,15.89,2ZM14,19.22a.78.78,0,0,1-.78.78H11.78a.78.78,0,0,1-.78-.78v-.44a.78.78,0,0,1,.78-.78h1.44a.78.78,0,0,1,.78.78ZM16,16H9V4h7Z"></path>
						</svg>
					</md-icon>
					<prm-icon-after parent-ctrl="$ctrl"></prm-icon-after></prm-icon><span class="button-text" translate="fulldisplay.command.Text Me">
Text Me</span>
		</div>
</span>
<div class="md-ripple-container" style="">
</div>
</button>
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


/** End Grinnnel **/	
	
	
	
	
	
	
/** Start Altmetrics **/



/** End Altmetrics **/
	
	



	
	/** Close function from line 1 **/
})();