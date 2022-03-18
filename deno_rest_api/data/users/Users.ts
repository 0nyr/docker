//import { User } from './User.ts';
import { User } from './User.ts';

export enum DataRequestStatus {
    Success,
    Duplicate,
    NotFound,
    Failure
}

export class Users {

    protected users: Array<User> = [];

    constructor(...gUsers: User[]) {
        this.addUserArray(gUsers);
    }

    public addUser(gUser: User): DataRequestStatus {
        if(this.isNotAlreadyRegistered(gUser)) {
            // insertion in database
            try {
                this.users.push(gUser);
            } catch(error) {
                return DataRequestStatus.Failure;
            }
            return DataRequestStatus.Success;
            
        } else {
            return DataRequestStatus.Duplicate;
        }
    }

    public addUsers(...gUsers: User[]): void {
        this.addUserArray(gUsers);
    }

    public addUserArray(gUsers: User[]): void {
        if(gUsers && gUsers.length <= 0) {
            return;
        }
        for(var user of gUsers) {
            this.addUser(user);
        }
    }

    public getById(gId: number): User | undefined {
        const found = this.users.find(
            (everyUser: User) => (everyUser.getId() === gId
        ));

        if(found == undefined) {
            return undefined;
        } else {
            return found;
        }
    }

    public getUsers(): Array<User> {
        return this.users;
    }

    public modifyUser(gUserToModify: User): DataRequestStatus {
        let indexOfUser = this.getIndexOfUser(gUserToModify.getId());

        if(indexOfUser == undefined) {
            return DataRequestStatus.NotFound;
        }

        try {
            this.users[indexOfUser].mail = gUserToModify.mail;
            this.users[indexOfUser].pseudo = gUserToModify.pseudo;
            this.users[indexOfUser].age = gUserToModify.age;
        } catch(error) {
            return DataRequestStatus.Failure;
        }
        return DataRequestStatus.Success;
    }

    public deleteUser(gId: number): DataRequestStatus {
        let indexOfUser = this.getIndexOfUser(gId);

        if(indexOfUser == undefined) {
            return DataRequestStatus.NotFound;
        }

        try {
            this.users.splice(indexOfUser, 1);
        } catch(error) {
            return DataRequestStatus.Failure;
        }
        return DataRequestStatus.Success;
    }

    public toString() {
        let str: string = "[";
	    for(let i = 0; i < this.users.length; i++) {
            str += this.users[i].toString();
            if(i < this.users.length -1) {
                str += ","
            }
        }
        str += "}";
        return str;
    }

    protected getIndexOfUser(gId: number): number | undefined {
        let indexOfUser = undefined;
        for(let i = 0; i < this.users.length; i++) {
            if(this.users[i].getId() === gId) {
                indexOfUser = i;
                break;
            }
        }
        return indexOfUser;
    }

    protected isNotAlreadyRegistered(gUser: User): boolean {
        if(this.users && this.users.length <= 0) 
            return true; // empty case
        
        // database query
        const found = this.users.find(
            (everyUser: User) => (everyUser.getId() === gUser.getId()
        ));

        if(found == undefined) {
            return true;
        } else {
            return false;
        }
    }

}