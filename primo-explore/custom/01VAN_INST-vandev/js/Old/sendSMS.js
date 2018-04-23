var app = angular.module('viewCustom', ['customActions'])
 
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
      'T-Mobile': 'tmomail.net',
      'Verizon': 'vtext.com',
    },
})