// assertions
import { assertEquals } from 'https://deno.land/std@0.77.0/testing/asserts.ts';
import { Colors } from '../params/deps.ts';

import { dummyUsers } from '../data/pseudo_db.ts';

// hello function
Deno.test('data/dummyUsers tests', () => {
    console.log("output ▼");
    if(dummyUsers == undefined) {
        console.log(Colors.rgb24(
            `dummyUser = ${dummyUsers}`, 0xD17315
        ));
    } else {
        for(var user of dummyUsers.getUsers()) { // WARN : for (. of .) != for(. in .)
            console.log(Colors.blue(user.toString()));
        }
    }

});

/*
Deno.test('lib/sum integer tests', () => {

  assertEquals( sum(1, 2, 3), 6 );
  assertEquals( sum(1, 2, 3, 4, 5, 6), 21 );

}); */