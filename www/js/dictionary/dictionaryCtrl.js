angular.module('starter.controllers')

    .controller('DictionaryCtrl', function ($scope, $state, DictionaryService) {
        var vm = this
        if (!vm.dictionary) {
            vm.dictionary = DictionaryService.getDictionary()
        }

        vm.clickOnWord = function (word) {
            $state.go('app.word', { wordSh: word })
        }
    });