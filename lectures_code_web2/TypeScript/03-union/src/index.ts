function shuffle(data : string) : string;
function shuffle(data : any[]) : any[];

function shuffle(data : string | any[]) : string | any[]  {
    const arr = [...data];
        
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    
    return typeof(data) === "string" ?  arr.join('') :  arr;
}

const word = "ABCDEFghijkl";
const numbers = [1, 2, 3, 4, 5, 6];

const shuffledWord = shuffle(word);
const shuffledNumbers = shuffle(numbers);

console.log(shuffledWord);
console.log(shuffledNumbers);





