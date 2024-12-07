export interface Cdc {
    devCode: string; // required field with minimum 5 characters
    cdc: Cdc[]; // user can have one or more addresses
}

export interface Cdc {
    name: string;  // required field
    Organisation: string;
    lastName:string;
    email:string;
    cellphone:string;
    workNumber:string;
}