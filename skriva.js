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
	var audioElement = document.createElement('audio');
	audioElement.setAttribute('src', 'sounds/' + word + '.mp3');
	audioElement.play();

	var newWord = "";

	for (var x = 0; x < word.length; x++)
	{
	    var c = word.charAt(x);
		newWord = newWord + "<span id='cc-"+x+"'>"+ c.toLowerCase() +"</span>";
	}

    $('#myword').html( newWord );
    $('#cc-0').addClass("circle");
    $('#mywordimg').html('<img src="imgs/'+word+'.jpg" />');
}

function reset() {
    $('div#success--box').addClass('hidden');
    $('input[type=text]').val('');
    $('#myinput').empty();
    $('#myword').empty();
    $('#result').empty();
    $('#inputArea').removeClass('hidden');
    $('body').removeClass('allGreen');
    $('#myinput').focus();
}

function generateWord() {
    var words = new Array("apa", "elefant", "fågel", "hund", "katt", "lejon", "råtta", "snigel", "spindel", "tiger", "uggla", "penna", "ko", "sol", "måne", "dator", "bil", "buss", "äpple", "snögubbe");
    randno = words[Math.floor( Math.random() * words.length )];
    return randno;
}
function resetCircle(word) {
    for (var x = 0; x < word.length; x++ )
    {
        $('#cc-' + x).removeClass("circle");
    }
}
// Yes!
$('#myinput').on("input", function() {
    var myWord = $('#myword').text().toLowerCase();
    var myInput = this.value.toLowerCase();
    var reg = new RegExp("/^"+myInput+"/i");
    var pos = myInput.length - 1;
    var len = myInput.length;
    var nextID = '#cc-' + myInput.length;
    resetCircle(myWord);
    $(nextID).addClass("circle");
    var letterInWord = myWord.substring(0, len);
    var letterInInput = myInput.substring(0, len);
    var audioElement = document.createElement('audio');
    if ( letterInInput != "" ) {
        if ( letterInInput === letterInWord ) {
			var lastChar = letterInWord.substr(letterInWord.length - 1);
			audioElement.setAttribute('src', 'chars/' + lastChar.toLowerCase() + '.mp3');
			audioElement.play();
            $('#result').text(letterInInput);
        } else {
	       $('body').addClass("bigNoNoBG");
		   $('#cc-' + pos).addClass("bigNoNoChar");
			setTimeout(function() {
		       $('body').removeClass("bigNoNoBG");
			   $('#cc-' + pos).removeClass("bigNoNoChar");
		   }, 650);
		   $('#myinput').val($('#result').text());
		}
    }
    if ( len == 0 || letterInInput == "" ) {
        $('#result').empty();
    }
    if ( myInput.length === myWord.length && myInput === myWord) {
		setTimeout(
			function()
			{
                $('#inputArea').addClass('hidden');
                $('div#success--box').removeClass('hidden');
                $('h1#success--box--word').text(myWord);
                $('div#success--box--img').html('<img src="imgs/'+myWord.toLowerCase()+'.jpg" />');
                $('body').addClass('allGreen');
                audioElement.setAttribute('src', 'sounds/'+myWord.toLowerCase()+'.mp3');
                audioElement.play();
                $.wait(1000).then(function() {
                    audioElement.setAttribute('src', 'yay.wav');
                    audioElement.play();
                    $.wait(3000).then(function() {
                        console.log($.session.get('stars'));
                        reset();
                        init();
                    });
                });
			}, 850);
    }
});

$.wait = function(ms) {
    var defer = $.Deferred();
    setTimeout(function() { defer.resolve(); }, ms);
    return defer;
};
