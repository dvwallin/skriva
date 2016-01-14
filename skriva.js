$( document ).ready(function() {
    reset();
    init();
});

function init() {
    if ( $.session.get('lastWord') == "undefined" ) {
        var word = generateWord();
    } else {
        do {
            var word = generateWord();
        }
        while ( word == $.session.get('lastWord') )
    }
    $.session.set('lastWord', word);
    $('#myword').text( word.toUpperCase() );
}

function reset() {
    $('#braGjort').addClass('hidden');
    $('input[type=text]').val('');
    $('#myinput').empty();
    $('#myword').empty();
    $('#result').empty();
    $('#inputArea').removeClass('hidden');
    $('body').removeClass('allGreen');
    $('#myinput').focus();
}

function generateWord() {
    var words = new Array("katt", "hund", "apa", "fågel", "hamster", "marsvin", "uggla", "råtta", "mus", "snigel", "piggsvin", "lurifax", "tiger", "lejon", "leopard", "björn");
    randno = words[Math.floor( Math.random() * words.length )];
    return randno;
}

$('#myinput').on("input", function() {
    var myWord = $('#myword').text().toUpperCase();
    var myInput = this.value.toUpperCase();
    var reg = new RegExp("/^"+myInput+"/i");
    var pos = myInput.length - 1;
    var len = myInput.length;
    var letterInWord = myWord.substring(0, len);
    var letterInInput = myInput.substring(0, len);
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', 'yay.wav');
    if ( letterInInput != "" ) {
        if ( letterInInput === letterInWord ) {
            $('#result').text(letterInInput);
        }
    }
    if ( len == 0 || letterInInput == "" ) {
        $('#result').empty();
    }
    if ( myInput.length === myWord.length && myInput === myWord) {
        $('#inputArea').addClass('hidden');
        $('#braGjort').removeClass('hidden');
        $('#braGjortWord').text(myWord);
        $('body').addClass('allGreen');
        audioElement.play();
        $.wait(3000).then(function() {
            console.log($.session.get('stars'));
            reset();
            init();   
        });
    }
});

$.wait = function(ms) {
    var defer = $.Deferred();
    setTimeout(function() { defer.resolve(); }, ms);
    return defer;
};
