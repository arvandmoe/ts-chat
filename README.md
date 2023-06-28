# Chat Exercise

This exercise is about implementing the client side of the Chat Service in a way that exposes the full functionalities provided by the service to users in a structured environment. 

The general specification of the Chat Service is available in the project's `README.md` file inside the `chat-service` directory.

The following points are what is expected about the final client side of the project:


### Frameworks and Tools

The project has to be written in **React**, but both hook-based and class-based components are acceptable and it is left to the developer's discretion to use which, where, and for what purpose. 

Use of **NextJS** is preferred over CRA but is not required and the developer is free to use any framework to bootstrap the web application as they see best fit for the job. However, it is worth mentioning that Server Side Rendering is by no means required for the completion of this exercise.

For state management, the use of **Redux** is required.

For styling, **SCSS** is preferred, but no hard limitation exists for the format of the styling files/sections or the use of any library or framework to improve the development experience or the maintainability of the project. (e.g. Tailwind CSS)

The source of the project should strictly be in **TypeScript**; to this end, a sample `tsconfig.json` file is provided along with this document that the developer is free to change in any way they see fit for the completion of the task.


### Additional Libraries and Utilities

The developer is free to use any third-party library or utility as long as they are well integrated into the project. This means that they should be typed either by the original author, a third party, or the developer.

Also, using libraries that do provide native PInvoke is only acceptable when the use is justified and the library is multi-platform.


### Formatting and Linting

Along with this document, a `BD_GUIDELINES_StyleGuide.md` file is provided that contains the expected formatting rules used by us.

A `.eslintrc.json` file accompanies this documentation file containing the base set of rules used by us in the development of front end, React web applications. However, the developer is free to modify this file if they feel that a modified rule is closer to the expected formatting described above.


### Deployment and Execution

It is expected of the developer of the client web application to provide a `README.md` file along with the source code of the project describing how it should be initiated, built, and executed.

A simple `Dockerfile` must be provided along with the submitted source code that can be used to build and deploy the web application to an instance of Docker.


### Design

The expected design of the project is created in Figma and is available at the following address along with comments about some specific requirements by the designer that can help the developer in the implementation process:

https://www.figma.com/file/UAOzydc4VnnEsQ2PrTDyVG/Front-End-Developer-Test

Developers are also encouraged to raise any issue or question they might have about the design provided.

### License

The provided source code of the chat service is the property of the company and can not be used for other purposes except this specific exercise. Distribution of the said source code is strictly forbidden unless a written statement is acquired from the company.

The final front-end source code is the property of the developer and they are free to use it for other purposes or share the code as they see fit.