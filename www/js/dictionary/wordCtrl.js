angular.module('starter.controllers')

    .controller('WordCtrl', function ($scope, $stateParams, DictionaryService) {
        var vm = this;
        vm.parola = DictionaryService.getWord($stateParams.wordSh)
    });