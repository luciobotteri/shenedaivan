angular.module('starter.services')

    .service('DictionaryService', function ($firebaseObject) {
        var vm = this
        var _dictionary = []
        init()

        function init() {
            var ref = new Firebase("https://shenedaiv.firebaseio.com");
            var DictionaryRef = ref.child("falivion");
            var DictionaryObj = $firebaseObject(DictionaryRef);

            // to take an action after the data loads, use the $loaded() promise
            DictionaryObj.$loaded().then(function () {
                console.log("loaded record:", DictionaryObj.$id, DictionaryObj.someOtherKeyInData);

                // To iterate the key/value pairs of the object, use angular.forEach()
                angular.forEach(DictionaryObj, function (value, key) {
                    // console.log(key, value);
                    console.log("word added")
                    _addWord(value)
                });
            });

            // _saveDictionary(DictionaryObj);

            // To make the data available in the DOM, assign it to $scope
            // $scope.data = DictionaryObj;

            // // For three-way data bindings, bind it to the scope instead
            // DictionaryObj.$bindTo($scope, "data");
        }

        /**
         * Aggiunge una parola al dizionario
         */
        function _addWord(newWord) {
            _dictionary.push(newWord)
        }

        /**
         * Riceve la parola in shenedaivan e restituisce l'intero oggetto parola
         * se la parola non esiste restituisce null
         */
        function _getWord(sh) {
            for (let word of _dictionary) {
                if (word.sh == sh) return word
            }
            return null
        }

        /**
         * Restituisce il dizionario
         */
        function _getDictionary() {
            return _dictionary
        }

        function _saveDictionary(data) {

            if (!data) {
                console.error('No data');
                return;
            }
            var filename = 'SHDictionary.json';

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
            getWord: _getWord,
            getDictionary: _getDictionary,
            addWord: _addWord
        }
    })