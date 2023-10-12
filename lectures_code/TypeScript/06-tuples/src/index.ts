import {vector, norm, scalar, cross} from "./vectors"

const a : vector = [2, 3, 5];
const b : vector = [-1, 4, 6];
//let impossible : vector = [-1, 4, 6, 2];
//let error = a[3];

const c = cross(a, b);
console.log(c);
console.log(norm(c));

let s = scalar(a, c);
console.log(s);

s = scalar(b, c);
console.log(s);

s = scalar(a, b);
console.log(s);
