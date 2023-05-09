/**
* @swagger
* components:
*   schemas:
*       User:
*           type: object
*           required:
*              - name
*              - email
*              - pass
*           properties:
*               name:
*                   type: string
*                   description: username of the user
*               email:
*                   type: string
*                   description: The user email
*               pass:
*                   type: string
*                   description: The user password
*               role:
*                   type: string
*                   description: Role of a user 
*               approved:
*                   type: boolean
*                   description: If a user is approved by the admin to become a photographer or not
*               camera:
*                   type: string
*                   description: Camera used by the photographer
*               expertise:
*                   type: string
*                   description: Photographer expert in types of shots 
*               address:
*                   type: string
*                   description: Location where a user wants to do PhotoShoot 
*               samplePics:
*                   type: [string]
*                   description: If user wants to become a photographer then he needs to give sample pics for approval
*/
/**
* @swagger
* components:
*   schemas:
*       Booking:
*           type: object
*           properties:
*               photographer:
*                   type: string
*                   description: Photographer Id that user has booked
*               client:
*                   type: string
*                   description: Client id that has booked a photographer
*               start_time:
*                   type: string
*                   format: date
*                   description: starting time of the photoshoot
*               end_time:
*                   type: string
*                   format: date
*                   description: ending time of the photoshoot
*               status:
*                   type: string
*                   description: If booking is accepted rejected or is still pending after booking to a photgrapher
*/
/**
* @swagger
* components:
*   schemas:
*       Notification:
*           type: object
*           properties:
*               from:
*                   type: mongoose.Schema.Types.ObjectId
*                   description: user who wants to send message
*               to:
*                   type: mongoose.Schema.Types.ObjectId
*                   description: user who will recieve message
*               booking:
*                   type: mongoose.Schema.Types.ObjectId
*                   description: booking of who has booked an photographer
*               message:
*                   type: string
*                   description: message you want to send
*               created_at:
*                   type: string
*                   format: date
*                   description: timing of the notification created
*/
/**
* @swagger
* components:
*   schemas:
*       Meeting:
*           type: object
*           properties:
*               photographer:
*                   type: string
*                   description: user with role photographer
*               meetings:
*                   type: Array
*                   description: Contains meeting for each users
*/
/**
* @swagger
* components:
*   schemas:
*       Image:
*           type: object
*           properties:
*               name:
*                   type: string
*                   description: user's name
*               image:
*                   type: string
*                   data: Buffer
*                   description: Sample images of photographer
*/
/**
* @swagger
* /user/:
*   get:
*       summary: To get details of all the registered user in Database
*       tags: [Users]
*       requestBody:
*           required: false
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/User'
*       responses:
*           200:
*               description: All user Data Successfully fetched
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/User'
*           500:
*               description: Some server error
*/
/**
* @swagger
* /user/register:
*   post:
*       summary: To register a user in the database
*       tags: [Users]
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/User'
*       responses:
*           200:
*               description: User registered successfully
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/User'
*           500:
*               description: Some server error
*/
/**
* @swagger
* /user/login:
*   post:
*       summary: To login to application and accessing its features
*       tags: [Users]
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/User'
*       responses:
*           200:
*               description: User logged in successfully
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/User'
*           500:
*               description: Some server error
*/
/**
* @swagger
* /user/apply:
*   post:
*       summary: A client can apply to become a photographer of this application
*       tags: [Users]
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/User'
*       responses:
*           200:
*               description: Application Submitted Successfully
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/User'
*           500:
*               description: Some server error
*/
/**
* @swagger
* /user/pending:
*   get:
*       summary: All pending requests of users who have applied for becoming a photographer
*       tags: [Users]
*       requestBody:
*           required: false
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/User'
*       responses:
*           200:
*               description: Application Submitted Successfully
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/User'
*           500:
*               description: Some server error
*/
/**
* @swagger
* /user/apply:
*   post:
*       summary: A client can apply to become a photographer of this application
*       tags: [Users]
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/User'
*       responses:
*           200:
*               description: Application Submitted Successfully
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/User'
*           500:
*               description: Some server error
*/
/**
* @swagger
* /user/applications/:email:
*   put:
*       summary: Admin can accept or reject users who have applied for photographer
*       tags: [Users]
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/User'
*       responses:
*           200:
*               description: Application Updated Successfully
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/User'
*           500:
*               description: Some server error
*/
/**
* @swagger
* /user/logout:
*   get:
*       summary: A user can logout from the application
*       tags: [Users]
*       requestBody:
*           required: false
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/User'
*       responses:
*           200:
*               description: logged out Successfully
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/User'
*           500:
*               description: Some server error
*/
/**
* @swagger
* /user/upload:
*   post:
*       summary: To upload images to the database
*       tags: [Users]
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/User'
*       responses:
*           200:
*               description: Images uploaded successfully
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/User'
*           500:
*               description: Some server error
*/
/**
* @swagger
* /user/submit_photographer_details:
*   patch:
*       summary: To register a photographer detail in the database
*       tags: [Users]
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/User'
*       responses:
*           200:
*               description: photographer data updated successfully
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/User'
*           500:
*               description: Some server error
*/
/**
* @swagger
* /user/images:
*   get:
*       summary: To get all the images from the database
*       tags: [Users]
*       requestBody:
*           required: false
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/User'
*       responses:
*           200:
*               description: images fetched successfully
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/User'
*           500:
*               description: Some server error
*/
/**
* @swagger
* /book/:
*   get:
*       summary: All bookings done by the client
*       tags: [Bookings]
*       requestBody:
*           required: false
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/Booking'
*       responses:
*           200:
*               description: All bookings fetched Successfully
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/Booking'
*           500:
*               description: Some server error
*/
/**
* @swagger
* /book/book:
*   post:
*       summary: A client can book a meeting with approved photographers
*       tags: [Bookings]
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/Booking'
*       responses:
*           200:
*               description: Request for meeting submited Successfully
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/Booking'
*           500:
*               description: Some server error
*/
/**
* @swagger
* /book/requests:
*   get:
*       summary: Get all bookings for logged in photographer
*       tags: [Bookings]
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/Booking'
*       responses:
*           200:
*               description: Requests for meeting fetched Successfully
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/Booking'
*           500:
*               description: Some server error
*/
/**
* @swagger
* /book/requests/:status:
*   get:
*       summary: Get the status of requests sent by the clients
*       tags: [Bookings]
*       requestBody:
*           required: false
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/Booking'
*       responses:
*           200:
*               description: Requests for meeting fetched Successfully
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/Booking'
*           500:
*               description: Some server error
*/
/**
* @swagger
* /book/requests/:bookingid:
*   post:
*       summary: A photographer can accept or reject the bookings 
*       tags: [Bookings]
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/Booking'
*       responses:
*           200:
*               description: Booking request updated successfully
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/Booking'
*           500:
*               description: Some server error
*/
/**
* @swagger
* /:bookingid/notifications:
*   post:
*       summary: A photographer can send notification to update user about his bookings
*       tags: [Notifications]
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/Notification'
*       responses:
*           200:
*               description: Notification sent Successfully
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/Notification'
*           500:
*               description: Some server error
*/
/**
* @swagger
* /notifications:
*   get:
*       summary: A client can recieve all notifications sent by photographer
*       tags: [Notifications]
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/Notification'
*       responses:
*           200:
*               description: Notification fetched Successfully
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/Notification'
*           500:
*               description: Some server error
*/
/**
* @swagger
* /auth/google:
*   get:
*       summary: Send request to google to login
*       tags: [OAuth]
*       requestBody:
*           required: false
*           content:
*               application/json:
*       responses:
*           200:
*               description: Data fetched Successfully
*               content:
*                   application/json:
*           500:
*               description: Some server error
*/
/**
* @swagger
* /auth/google/callback:
*   get:
*       summary: Callback data fetching from google
*       tags: [OAuth]
*       requestBody:
*           required: false
*           content:
*               application/json:
*       responses:
*           200:
*               description: Data fetched Successfully
*               content:
*                   application/json:
*           500:
*               description: Some server error
*/
/**
* @swagger
* /auth/google/failure:
*   get:
*       summary: If Oauth failed then redirecting user to given route
*       tags: [OAuth]
*       requestBody:
*           required: false
*           content:
*               application/json:
*       responses:
*           200:
*               description: redirected to google for help
*               content:
*                   application/json:
*           500:
*               description: Some server error
*/
/**
* @swagger
* /auth/github:
*   get:
*       summary: Send request to github to login
*       tags: [OAuth]
*       requestBody:
*           required: false
*           content:
*               application/json:
*       responses:
*           200:
*               description: Data fetched Successfully
*               content:
*                   application/json:
*           500:
*               description: Some server error
*/
/**
* @swagger
* /auth/github/callback:
*   get:
*       summary: Callback data fetching from github
*       tags: [OAuth]
*       requestBody:
*           required: false
*           content:
*               application/json:
*       responses:
*           200:
*               description: Data fetched Successfully
*               content:
*                   application/json:
*           500:
*               description: Some server error
*/
/**
* @swagger
* /auth/github/failure:
*   get:
*       summary: If Oauth failed then redirecting user to given route
*       tags: [OAuth]
*       requestBody:
*           required: false
*           content:
*               application/json:
*       responses:
*           200:
*               description: redirected to github for help
*               content:
*                   application/json:
*           500:
*               description: Some server error
*/
