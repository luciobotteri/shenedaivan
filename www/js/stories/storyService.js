angular.module('starter.services')

    .service('StoryService', function ($firebaseObject) {
        var vm = this
        var _stories = []
        init()

        function init() {
            var ref = new Firebase("https://shenedaiv.firebaseio.com");
            var StoriesRef = ref.child("stories");
            var StoriesObj = $firebaseObject(StoriesRef);

            // to take an action after the data loads, use the $loaded() promise
            StoriesObj.$loaded().then(function () {
                console.log("loaded record:", StoriesObj.$id, StoriesObj.someOtherKeyInData);

                // To iterate the key/value pairs of the object, use angular.forEach()
                angular.forEach(StoriesObj, function (value, key) {
                    // console.log(key, value);
                    console.log("Story added")
                    _addStory(value)
                });
            });

            // _saveStories(StoriesObj);

            // To make the data available in the DOM, assign it to $scope
            // $scope.data = StoriesObj;

            // // For three-way data bindings, bind it to the scope instead
            // StoriesObj.$bindTo($scope, "data");
        }

        /**
         * Aggiunge una parola al dizionario
         */
        function _addStory(newStory) {
            _stories.push(newStory)
        }

        /**
         * Riceve il titolo della storia e restituisce l'oggetto
         * se la storia non esiste restituisce null
         */
        function _getStory(title) {
            for (let story of _stories) {
                if (story.title == title) return story
            }
            return null
        }

        /**
         * Restituisce il dizionario
         */
        function _getStories() {
            return _stories
        }

        function _saveStories(data) {
            if (!data) {
                console.error('No data');
                return;
            }
            var filename = 'SHStories.json';

            if (typeof data === 'object') {
                data = JSON.stringify(data, undefined, 2);
            }

            var blob = new Blob([data], { type: 'text/json' });

            // FOR IE:
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(blob, filename);
            }
            else {
                var e = document.createEvent('MouseEvents'),
                    a = document.createElement('a');

                a.download = filename;
                a.href = window.URL.createObjectURL(blob);
                a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
                e.initEvent('click', true, false, window,
                    0, 0, 0, 0, 0, false, false, false, false, 0, null);
                a.dispatchEvent(e);
            }
        }

        // expose public functions
        return {
            getStory: _getStory,
            getStories: _getStories,
            addStory: _addStory
        }
    })