# Velular E-Commerce

> A Full-stack web application built using the MERN stack and light redux.

This is the [E-Commerce web application which is currently being hosted on Heroku](https://velular.herokuapp.com)

![velular](https://user-images.githubusercontent.com/56160528/131346459-adb76083-4b99-48f3-b32f-c5f8d39336d7.png)

## Features Implemented

- Full featured shopping cart
- Product reviews and ratings
- Product pagination
- Product search feature
- User profile
- Order history
- Admin product page
- Admin user management
- Admin order management
- Checkout (Shipping, payment method, etc)
- PayPal / credit card integration

## Usage

#### Env Variables

Create a nodemon.json file in the root and add the following

```
{
    "env": {
        "NODE_ENV": "development",
        "PORT": 8080,
        "MONGO_ATLAS_PW": "MONGO_ATLAS_PW",
        "JWT_KEY": "JWT_KEY",
        "PAYPAL_CLIENT_ID": "PAYPAL_CLIENT_ID"
    }
}
```

### Installing Dependencies

Open the CLI and add the following

```
npm install
cd client
npm install
```

### Run

```
# Run server only
npm start

# Run client only
cd client
npm start

# Run client and server
npm run dev

```

### Build and Deploy

```
# Create frontend prod build
cd frontend
npm run build
```

_Sample User Logins_

admin@example.com (admin)
password

customer@example.com (customer)
password

artist@example.com (artist)
password

## Development

This project was created using an agile approach namely Scrum where the program was implemented in sprints.

The design process included using wireframe sketching as a visual guide that represents the skeletal framework of the web application. In addition, wireframes were created using **Figma** before implementation as guide to creating the user interface. The final user interface may differ from these designs due to feedback from users and customers. Here are a few wireframes for some of the screens:

![login_prototype](https://user-images.githubusercontent.com/56160528/131346778-1c7f6d8c-c369-456b-99a2-76cb1d6c97a7.PNG)

![Product_Details_Prototype](https://user-images.githubusercontent.com/56160528/131346895-718b72d8-4361-489c-933b-2c469ab25d0e.PNG)

![Shopping_Cart_Prototype](https://user-images.githubusercontent.com/56160528/131346971-5f21d90c-c5c8-434f-a3ac-0cbb55b6ac73.PNG)

![Order_Screen_Prototype](https://user-images.githubusercontent.com/56160528/131346997-ef38881b-027d-4c82-8014-7555f5da7cfc.PNG)

![Order_History_Prototype](https://user-images.githubusercontent.com/56160528/131347229-307d3694-19fa-4a38-bc3b-3682ae841e06.PNG)

![Edit_Profile_Prototype](https://user-images.githubusercontent.com/56160528/131346832-895208e2-4f57-4992-af0d-ba87c59f8915.PNG)
