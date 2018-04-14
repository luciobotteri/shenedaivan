angular.module('starter.controllers')

    .controller('StoriesCtrl', function ($scope, $state, StoryService) {
        var vm = this
        if (!vm.stories) {
            vm.stories = StoryService.getStories()
        }

        vm.clickOnStory = function (story) {
            $state.go('app.story', { storyTitle: story })
        }
    });