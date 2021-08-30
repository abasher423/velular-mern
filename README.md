# Velular E-Commerce

> A Full-stack web application built using the MERN stack and light redux.

This is the [E-Commerce web application which is currently being hosted on Heroku](https://velular.herokuapp.com)

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
