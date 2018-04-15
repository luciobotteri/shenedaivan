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
            newWord.grammarStrings = []
            if (!newWord.grammarTypes) {
                newWord.grammarTypes = []
            }
            newWord.grammarTypes.forEach(function (grammarType) {
                switch (grammarType) {
                    case 0:
                        newWord.grammarStrings.push('Sostantivo')
                        break
                    case 1:
                        newWord.grammarStrings.push('Avverbio')
                        break
                    case 2:
                        newWord.grammarStrings.push('Aggettivo')
                        break
                    case 3:
                        newWord.grammarStrings.push('Verbo')
                        break
                    case 4:
                        newWord.grammarStrings.push('Preposizione')
                        break
                    case 5:
                        newWord.grammarStrings.push('Articolo')
                        break
                    case 6:
                        newWord.grammarStrings.push('Pronome')
                        break
                    case 7:
                        newWord.grammarStrings.push('Numerale')
                        break
                    case 8:
                        newWord.grammarStrings.push('Congiunzione')
                        break
                    case 9:
                        newWord.grammarStrings.push('Esclamazione')
                        break
                    case 10:
                        newWord.grammarStrings.push('Geografia')
                        break
                    case 11:
                        newWord.grammarStrings.push('Nome')
                        break
                    case 13:
                        newWord.grammarStrings.push('Parolaccia')
                        break
                    default:
                        newWord.grammarStrings.push('Altro')
                        break
                }
            })
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