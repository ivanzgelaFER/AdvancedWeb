function shuffle(data : string) : string;
function shuffle<T>(data : T[]) : T[];

function shuffle<T>(data : string | T[]) : string | T[]  {
    const arr = [...data];
        
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    
    return typeof data === "string" ?  arr.join('') :  arr as T[];
}

const word = "ABCDEFghijkl";
const numbers = [1, 2, 3, 4, 5, 6];

const shuffledWord = shuffle(word);
const shuffledNumbers = shuffle(numbers);

console.log(shuffledWord);
console.log(shuffledNumbers);





