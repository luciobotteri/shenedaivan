angular.module('starter.services')

    .service('PhrasebookService', function ($firebaseObject) {
        var vm = this
        var _phrasebook = []
        init()

        function init() {
            var ref = new Firebase("https://shenedaiv.firebaseio.com");
            var PhrasebookRef = ref.child("faukon");
            var PhrasebookObj = $firebaseObject(PhrasebookRef);

            // to take an action after the data loads, use the $loaded() promise
            PhrasebookObj.$loaded().then(function () {
                console.log("loaded record:", PhrasebookObj.$id, PhrasebookObj.someOtherKeyInData);

                // To iterate the key/value pairs of the object, use angular.forEach()
                angular.forEach(PhrasebookObj, function (value, key) {
                    // console.log(key, value);
                    console.log("phrase added")
                    _addPhrase(value)
                });
            });

            // _savePhrasebook(PhrasebookObj);

            // To make the data available in the DOM, assign it to $scope
            // $scope.data = PhrasebookObj;

            // // For three-way data bindings, bind it to the scope instead
            // PhrasebookObj.$bindTo($scope, "data");
        }

        /**
         * Aggiunge una parola al dizionario
         */
        function _addPhrase(newPhrase) {
            _phrasebook.push(newPhrase)
        }

        /**
         * Riceve la parola in shenedaivan e restituisce l'intero oggetto parola
         * se la parola non esiste restituisce null
         */
        function _getPhrase(sh) {
            for (let phrase of _phrasebook) {
                if (phrase.sh == sh) return phrase
            }
            return null
        }

        /**
         * Restituisce il dizionario
         */
        function _getPhrasebook() {
            return _phrasebook
        }

        function _savePhrasebook(data) {

            if (!data) {
                console.error('No data');
                return;
            }
            var filename = 'SHPhrasebook.json';

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
            getPhrase: _getPhrase,
            getPhrasebook: _getPhrasebook,
            addPhrase: _addPhrase
        }
    })