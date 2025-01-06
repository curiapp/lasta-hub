export interface Pac {
    devCode: string; // required field with minimum 5 characters
    pac: Pac[]; // user can have one or more addresses
}

export interface Pac {
    name: string;  // required field
    Organisation: string;
    lastName:string;
    email:string;
    cellphone:string;
    workNumber:string;
    occupation:string;
}