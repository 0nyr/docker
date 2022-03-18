import { hashString } from '../../libs/general_functions.ts';

export interface UserInfo {
    pseudo?: string;
    mail?: string;
    age?: number;
}

export class User implements UserInfo {

    /* [Expected Data]
    NB : id is a key, formed from the hash of mail, which is also a key
    NB : no duplicate are allowed */
    protected id: number; // is a key, created at account creation
    public age?: number;
    public pseudo: string; // not unique, can change
    public mail: string; // is unique, can change

    constructor(gPseudo: string, gMail: string, gAge?: number) {
        this.age = gAge;
        this.pseudo = gPseudo;
        this.mail = gMail;
        this.id = this.generateId();
    }

    public toString(): string {
        let str = `{
            "id": ${this.id},
            "pseudo": ${this.pseudo},
            "mail": ${this.mail},
            "age": ${this.age}
        }`;
        
        // remove carriage returns from the string
        str = str.replace(/[\n\r]+/g, ' ').replace(/\s{2,}/g,' ');
        // remove white spaces
        str = str.replace(/ /g,'');
        return str;
    }

    public getId(): number {
        return this.id;
    }

    protected setId(gId: number): void {
        this.id = gId;
    }

    private generateId(): number {
        let str: string = this.mail;
        return Number(hashString(str));
    }
    
}

export class UserGivenId extends User {
    // A User object whose Id is explicitely specified

    constructor(
        gId: number, gPseudo: string, gMail: string, gAge?: number
    ) {
        super(gPseudo, gMail, gAge);
        this.setId(gId);
    }
}