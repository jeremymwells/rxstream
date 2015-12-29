
var angular = require('angular');
var rx = require('./services/rx.service');
var io = require('./services/io.service');
var baseCtrl = require('./routes/baseCtrl');
var streamViewCtrl = require('./routes/stream/viewCtrl');
var streamsService = require('./services/streams.service');
var streamOutput = require('./directives/streamOutput.directive');

angular.module('angularRxStreams', [require('angular-ui-bootstrap'), require('angular-ui-router')])

 .config(function($stateProvider, $urlRouterProvider) {
 
    $urlRouterProvider.otherwise("/stream/all");

    $stateProvider
      .state('stream', {
        abstract:true,
        templateUrl: '/routes/layout.html',
        controller: 'baseCtrl',
        controllerAs: 'baseCtrl'        
      })
      .state('stream.view', {
        url: '/stream/:streamId',
        templateUrl: '/routes/stream/view.html',
        controller: 'streamViewCtrl',
        controllerAs: 'streamCtrl'
      })
      ;


  })

 .controller('baseCtrl', baseCtrl)
 .controller('streamViewCtrl', streamViewCtrl)
 .service('rx', rx)
 .service('io', io)
 .service('streams', streamsService)
 .directive('streamOutput', streamOutput)
  ;







