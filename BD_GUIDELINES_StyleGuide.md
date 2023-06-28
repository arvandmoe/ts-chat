# GUIDELINES / Style Guide #

## TypeScript Style Guide and Project Structure 



### Variable and Function

Use **camelCase** for variable and function names.

> Bad example
```typescript
var FooVar;
function BarFunc() { }
```

> Good example
```typescript
var fooVar;
function barFunc() { }
```



### Class

Use **PascalCase** for class names.

> Bad example
```typescript
class foo { }
```

> Good example
```typescript
class Foo { }
```



Use **camelCase** for class members and methods.

> Bad example
```typescript
class Foo {
	Bar: number;
	Baz() { }
}
```

> Good example
```typescript
class Foo {
	bar: number;
	baz() { }
}
```




### Interface

Use **PascalCase** for names and **camelCase** for members.

Do not prefix with `I`

> Bad example
```typescript
interface IFoo {
}
```

> Good example
```typescript
interface Foo {
}
```




### Type

Use **PascalCase** for names and **camelCase** for members.




### Namespace

Use **PascalCase** for names.

> Bad example
```typescript
namespace foo {
}
```

> Good example
```typescript
namespace Foo {
}
```




### Enum

Use **PascalCase** for enum names.

> Bad example
```typescript
enum color {
}
```

> Good example
```typescript
enum Color {
}
```



Use **PascalCase** for enum members.

> Bad example
```typescript
enum Color {
	RED
}
```

> Good example
```typescript
enum Color {
	Red
}
```



### Null vs. Undefined

Try **not to** use either for explicit unavailability.

> Bad example
```typescript
let foo = { x: 123, y: undefined };
```

> Good example
```typescript
let foo: { x: number, y?: number } = { x:123 };
```



Use `undefined` in general and consider returning an object like `{valid:boolean, value?:Foo}` instead.

> Bad example
```typescript
return null;
```

> Good example
```typescript
return undefined;
```



Use `null` where it is conventional or a part of the API.

> Bad example
```typescript
nodeBackCallback(undefined)
```

> Good example
```typescript
nodeBackCallback(null)
```



Use **truthy** check for objects being `null` or `undefined`.

> Bad example
```typescript
if (error === null)
```

> Good example
```typescript
if (error)
```



Use `== null` or `!= null` instead of `===` or `!==` to check for `null` or `undefined` on primitives. Since it works for both `null` or `undefined` but not other false values like `‘’`, `0` or `false`.

> Bad example
```typescript
if (error !== null) // does not rule out undefined
```

> Good example
```typescript
if (error != null) // rules out both null and undefined
```



### Formatting

The TypeScript compiler ships with a functional formatting language service. Whatever output it gives by default is good enough to reduce the cognitive overload on the team. Just make sure that your IDE is configured to automatically apply the formatter on save.

For styling, using the **.eslintrc.json** file included with this project is recommended.



### Quotes

Try double quotes `“` except while escaping.

When you cannot use double quotes, try using single quotes `‘` and then back ticks.



### Spaces

Use **4** spaces instead of tabs.



### Semicolons

Make sure to use semicolons.



### Array

Annotate arrays as `foos: Foo[]` instead of `foos: Array<Foo>`.



### Filename

Name files with `kebab-case`. e.g. `accordion.tsx`, `my-control.tsx`, and `users-service.entity.ts`.

One or more `.` can be used to separate the name of the class or type from the logical type of the entity or the action or the responsibility of it when there are multiple files of the same name in a directory. 
For example `user.service.ts`, `user.repository.ts`, and `user.dto.ts`.

**Do not** use the `.` for separating the name of the type, consider selecting a better name instead.

> Bad example
```
user.enum.ts
user.interface.ts
user.class.ts
```

> typescript Good example
```
user-action.ts
user.base.ts
user.entity.ts
```

Keep a separate directory for **interfaces**, **models**, **entities**, and **dtos** classes or interfaces since these types tend to be many in number. However, keep the **controller**, **service**, **repository**, and other functional types that are single per each module or logical feature of the software in the root of the directory.



Consider using the full names of functionality or the action that a module represents.
> Bad example
```javascript
auth, etc. 
```

> Good example
```javascript
authentication, authorization, etc.
```



```
./src
	/features
		/authentication
			/dtos
				/authentication-register.dto.ts
				/authentication-login.dto.ts
			/entities
				/authentication-log.entity.ts
			/interface
				/authentication-request.base.ts
			/authentication.controller.ts
			/authentication.service.ts
			/authentication.module.ts
		/user
			/dtos
			.
			.
			.
	/common
		/utilities
			/string-helper.ts
		/interceptors
			/response-wrapper.interceptor.ts
```



For hybrid projects that provide multiple protocols and contexts, consider prefixing the directory name of parts that are not shared between the contexts, such as interceptors, features, and filters.



```
./src
	/websocket-features
		/chat
			/dtos
			.
			.
			.
	/common
		/utilities
			/string-helper.ts
		/websocket-interceptors
			/response-wrapper.interceptor.ts
```



### type vs interface

Use `type` when you **might** need a union or intersection.

```typescript
type Foo = number | { someProperty: number }
```

Use `interface` when you want `extends` or `implements`.

```typescript
interface Foo {
	foo: string;
}

interface FooBar extends Foo {
	bar: string;
}

class X implements FooBar {
	foo: string;
	bar: string;
}
```


​	
### Asynchronous Operations

Stay away from using `Promise` directly throughout the code. Instead, consider using `async/await` syntax and let the compiler take care of generating a compatible code if not supported. Using `Promise` is only justifiable if it is necessary, like in the fire and forget cases or when there is a need to define a new asynchronous function from parts of the code that does not inherently provide such functionality.




### Typing

**Always** use strongly typed variables and methods. Use generic for cases in which more flexibility is required. **Never** expose a public property, variable, or method, with type, return value, or parameter of type `any`.

If you cannot make a variable typed, or if the value is coming from a third party library, do not use `any` type, instead use `unknown` type and try to find the real type of the variable at runtime.

Stay away from type assertion. Try defining additional interfaces and cast to those after checking for the type of the variable.

> Bad example
```typescript
const req = <any>context.getRequest();
return req.user as UserEntity;
```

> Good example
```typescript
export interface RequestBase {
	user?: UserEntity;
}
const req: unknown = context.getRequest();
if (typeof req === “object”) {
	return (req as RequestBase).user;
}
return undefined;
```