# Savings-Tracking-Application
An application that allows users to create an account and add individual items they are saving for. Along with the progress they have toward that item. Built using Java Spring-boot with Java 21 and Maven for backend and React and Tailwind CSS for the frontend. Using Spring Session and Redis for session management and Docker to store sessions. 

# How To Setup
To run the following program you will first need to setup a MongoDB cluster which can be done for free. Open the Java program in your favourite IDE, IntelliJ works best. Go to your datbase and go to overview then application development and select Java then get connection string. Paste that string with your email and password to your database into the application.properties file where it says spring.data.mongodb.uri=. The final step to get the backend going is to then run a Docker engine then in the IntelliJ terminal run this command: docker run --name local-redis -p 6379:6379 -d redis. Make sure there are no errors before moving on to setting up the frontend buy running the program. To run the frontend of this program just drop the folder SavingsTrackingApp into VS code. Make sure you have Node.js installed. Then run npm install in the terminal, this will install all the necessary packages. Then just run npm run dev and navigate to the provided localhost URL on a browser with the login or register path at the end.

# Dependencies
spring-boot-starter-data-mongodb,
spring-boot-starter-data-redis,
spring-session-data-redis,
spring-boot-starter-validation,
spring-security-crypto,
lombok,
spring-boot-devtools,
spring-boot-starter-web

# Finished Product 

<img width="960" alt="image" src="https://github.com/colnat/Savings-Tracking-Application/assets/6693297/44fd2b45-d5ac-4d42-9e05-721bdc667f5d">
<img width="960" alt="image" src="https://github.com/colnat/Savings-Tracking-Application/assets/6693297/be7cd6a5-7b61-4e7a-8e0f-5ac694341854">
<img width="960" alt="image" src="https://github.com/colnat/Savings-Tracking-Application/assets/6693297/ddb46f3e-6609-49d7-ad5c-9f7c0f16669d">
<img width="960" alt="image" src="https://github.com/colnat/Savings-Tracking-Application/assets/6693297/f9a5f465-30d5-4bff-8609-b9ab01bd2bfa">


