$(document).ready(function () {
    var app = new Vue({
        el: '#comics',

        data: {
            characters: []
        },

        methods: {
            showCharacters: function () {
                this.$http.get("api/characters")
                    .then(response => {
                        console.log(response);
                        this.characters = response.body.characters;
                    })
                    .catch(e => {
                        console.log(e)
                    });
            },
            deleteCharacter(character) {
                console.log(`Deleting ${character}`);
                this.$http.delete('api/characters/' + character.id)
                    .then(data => {
                        this.showCharacters();
                    });
            },
            modifyCharacter(character) {
                console.log(`Modifying ${character}`);
            }

        },

        created: function () {
            this.showCharacters();
        },
    });
});