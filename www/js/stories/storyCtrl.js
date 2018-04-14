angular.module('starter.controllers')

    .controller('StoryCtrl', function ($scope, $stateParams, StoryService) {
        var vm = this;
        vm.storia = StoryService.getStory($stateParams.storyTitle)
    });