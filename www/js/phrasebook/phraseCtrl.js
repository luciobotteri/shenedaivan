angular.module('starter.controllers')

    .controller('PhraseCtrl', function ($scope, $stateParams, PhrasebookService) {
        var vm = this;
        vm.frase = PhrasebookService.getPhrase($stateParams.phraseSh)
    });