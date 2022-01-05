
const RandomString = () => {
    return new Promise((resolve, reject) => {
        //define a variable consisting alphabets in small and capital letter
	    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
            
        //specify the length for the new string
        var lenString = 10;
        var randomstring = '';

            //loop to select a new character in each iteration
        for (var i=0; i<lenString; i++) {
            var rnum = Math.floor(Math.random() * characters.length);
            randomstring += characters.substring(rnum, rnum+1);
        }
        resolve(randomstring)
    })
}

module.exports.RandomString = RandomString