angular.module('starter.controllers')

    .controller('PhrasebookCtrl', function ($scope, $state, PhrasebookService) {
        var vm = this
        if (!vm.phrasebook) {
            vm.phrasebook = PhrasebookService.getPhrasebook()
        }

        vm.clickOnPhrase = function (phrase) {
            $state.go('app.phrase', { phraseId: phrase })
        }
    });