WORD_LENGTH_TO_WORD = {
    1: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
    2: ["ON", "UP", "DO", "GO", "YO", "HI"],
    3: ["THE", "OFF"],
    4: [],
    5: [],
    6: ["CENTER"],
    7: ["RECURSE"]
}

COLOR_PALETTE = ['#4F37A6', '#035AA6', '#03A678', '#F2AE2E', '#F23D3D'];

getRandomColor = function() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

getColor = function(seed) {
    return COLOR_PALETTE[seed % COLOR_PALETTE.length];
}

getRandomWord = function(size) {
    var words = WORD_LENGTH_TO_WORD[size];
    return words[Math.floor(Math.random() * words.length)];
}

// Helper function used for testing
printWords = function(letters) {
    // Get displayed letters
    var displayed_letters = letters.filter(
        letter => letter.getDisplay() && letter.text !== undefined);
    if (displayed_letters.length === 0) {
        return;
    }

    // Sort to be in left to right order horizontally
    displayed_letters.sort(function(a, b) {
        return a.position.x - b.position.x;
    });

    for (let i = 0; i < displayed_letters.length; i++) {
        console.log(displayed_letters[i].text, displayed_letters[i].color);
    }
}

assignWords = function(letters) {
    // Get displayed letters
    var displayed_letters = letters.filter(
        letter => letter.getDisplay() && letter.text !== undefined);
    if (displayed_letters.length === 0) {
        return;
    }

    groupless_letters = displayed_letters;

    // Sort to be in left to right order horizontally
    groupless_letters.sort(function(a, b) {
        return a.position.x - b.position.x;
    });

    // Assign groups to groupless letters
    var word_length = groupless_letters.length;
    while (groupless_letters.length > 0 && word_length > 0) {
        if (WORD_LENGTH_TO_WORD[word_length] === undefined ||
            WORD_LENGTH_TO_WORD[word_length].length === 0 ||
            groupless_letters.length < word_length) {
            word_length--;
            continue;
        } else {
            word = getRandomWord(word_length);
            word_color = getColor(word.split('')
                .reduce((acc, c) => acc + c.charCodeAt(0), 0));
            for (let i = 0; i < word_length; i++) {
                groupless_letter = groupless_letters[i];
                groupless_letter.text = word[i];
                groupless_letter.color = word_color;
            }
            groupless_letters.splice(0, word_length)
            word_length = groupless_letters.length
        }
    }
}