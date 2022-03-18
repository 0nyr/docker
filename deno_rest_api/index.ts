// run : deno run --allow-net --allow-env ./index.ts
// tests : deno test
import { Application, Router, Colors } from './params/deps.ts';
import { HOST, PORT } from './params/env.ts';
import { dummyUsers } from './data/pseudo_db.ts';
import { User, UserGivenId } from "./data/users/User.ts";
import { DataRequestStatus } from './data/users/Users.ts';

const router = new Router();
const app = new Application();

// [API]
router.get("/", (context) => {
		context.response.body = "Welcome to Oak example with Deno!";
});

router.get("/users", (context) => {
	console.log(Colors.gray(context.params.toString()));
	context.response.body = { users: dummyUsers.getUsers() };
});

router.get("/users/:id", (context) => {
	if(!context.params || !context.params.id ||
		isNaN(parseInt(context.params.id))
	) {
		context.response.status = 400;
		context.response.body = { error: "Id must be number" };
		return;
	}

	// get specific user
	const result = dummyUsers.getById(Number(context.params.id));
	if(result == undefined) {
		context.response.status = 404;
		context.response.body = { 
			error: `User ${context.params.id} not found` 
		};
		return;
	}
	context.response.body = result;
});

router.post("/users", async (context) => {
	if(!context.request.hasBody) {
	  	context.response.status = 400;
		context.response.body = { error: "Request body cannot be empty" };
		return;  
	}
	// type error ? : https://github.com/oakserver/oak/issues/239#issuecomment-690105934
	const result = context.request.body();
	const { value } = context.request.body({ type: 'json' });
	const { pseudo, mail, age } = await value;

	if(!pseudo || !mail) {
		context.response.status = 400;
		context.response.body = { 
				error: "Request body error, wrong params" 
		};
		return;
	}

	// register a new user
	let newUser: User; 
	const ageNumber = Number(age);
	if(ageNumber == undefined) {
		newUser = new User(pseudo, mail);
	} else {
		newUser = new User(pseudo, mail, age);
	}
	const registrationStatus: DataRequestStatus = dummyUsers
	.addUser(newUser);
	switch(registrationStatus) {
		case DataRequestStatus.Duplicate: {
			context.response.status = 400;
			context.response.body = 
			{ error: 
				"User already registered, duplication not allowed" 
			};
			break;
		}
		case DataRequestStatus.Failure: {
			context.response.status = 400;
			context.response.body = 
			{ error: "Error: The User could not be registered" };
		}
		case DataRequestStatus.Success: {
			context.response.status = 201;
			context.response.body = { success: newUser };
		}
	}
});

router.put("/users/:id", async (context) => {
	const gId = Number(context.params.id); //NaN, 0, undefined, null = false

	// because we are inside async function, the code acts as sync here
	if(!context.params || !gId || !context.request.hasBody) {
		context.response.status = 400;
		context.response.body = { error: "Invalid request" };
		return;
	}

	// get the selected user
	const selectedUser = dummyUsers.getById(gId);
	if(selectedUser == undefined) {
		context.response.status = 404;
		context.response.body = { 
			error: `User ${gId} not found` 
		};
		return;
	}

	// get the infos from the request
	const result = context.request.body();
	const { value } = context.request.body({ type: 'json' });
	const { id, pseudo, mail, age } = await value;
	if(gId != id) {
		context.response.status = 400;
		context.response.body = { 
			error: 
			`User id from body (${id}) and params (${gId}) do not match` 
		};
		return
	}

	// modify the user in the db
	const userModified = new UserGivenId(
		id, pseudo, mail, age
	);
	const modificationStatus = dummyUsers.modifyUser(userModified);
	switch(modificationStatus) {
		case DataRequestStatus.NotFound: {
			context.response.status = 404;
			context.response.body = { 
				error: `User ${gId} not found (2nd check)` 
			};
			break;
		}
		case DataRequestStatus.Failure: {
			context.response.status = 400;
			context.response.body = 
			{ error: "Error: The User could not be modified" };
		}
		case DataRequestStatus.Success: {
			context.response.status = 200;
			context.response.body = { success: userModified };
		}
	}
});


router.delete("/users/:id", (context) => {
	const gId = Number(context.params.id);

	if (!context.params || !gId) {
		context.response.status = 400;
	  	context.response.body = { error: "Id must be number" };
		return;
	}
	
	// delete used with given id
	const deletionStatus = dummyUsers.deleteUser(gId);
	switch(deletionStatus) {
		case DataRequestStatus.NotFound: {
			context.response.status = 404;
			context.response.body = { 
				error: `User ${gId} not found` 
			};
			break;
		}
		case DataRequestStatus.Failure: {
			context.response.status = 400;
			context.response.body = 
			{ error: "Error: The User could not be deleted" };
		}
		case DataRequestStatus.Success: {
			context.response.status = 204;
			context.response.body = { success: 
				`User ${gId} has been deleted` 
			};
		}
	}
});

app.use(router.routes());
app.use(router.allowedMethods());

console.log(Colors.green(
	`### Listening on http://${HOST}:${PORT}`));
await app.listen(`${HOST}:${PORT}`);
// anything after wont run (due to never ending await) ...