import { Users } from './users/Users.ts';
import { User } from './users/User.ts';

let dummyUsers: Users = new Users(
    new User("Deconan", "deconan@gmail.com"),
    new User("Mosquito", "darkmoustique@insa-lyon.fr", 41),
    new User("Patat", "patat.patat@gmail.com", 34),
    new User("Japhy", "japhy@orange.fr", 30),
    new User("Muza", "killer44@gmail.com"),
    new User("Walutin", "walala@orange.fr", 41),
    new User("Falutin", "falala@orange.fr", 41),
    new User("Xalutin", "xalala@orange.fr", 41),
);
export { dummyUsers };


