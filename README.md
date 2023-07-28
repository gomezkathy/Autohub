# CarCar

Team:

* Person 1 - Which microservice? - Colin Summers (Sales microservice)
* Person 2 - Which microservice? - Kathy Gomez (Auto services)

## Getting Started

**Make sure you have Docker and Git**

1. Fork this repository

2. Clone the forked repository onto your local computer:
git clone https://gitlab.com/Megalanuth/project-beta.git

3. Build and run the project using Docker with these commands:
```
docker volume create beta-data
docker-compose build
docker-compose up
```
- After running the commands, make sure all Docker containers are running

- These commands execute scripts to automatically handle updates between React and Windows

- View the project in the browser: http://localhost:3000/

## Design

CarCar is made up of 3 microservices which interact with one another.

- **Inventory**
- **Services**
- **Sales**

## Integration

The Service and Sales domains work together with the Inventory domain to make **CarCar** possible.

It starts with the Inventory domain, keeping records of automobiles that are available to buy. The Sales and Service microservices obtain information from the Inventory domain, using a **poller**, which talks to the Inventory domain to keep track of which vehicles are in inventory so that the service and sales team maintain up-to-date information.


## Accessing Endpoints to Send and View Data: Access Through Insomnia & Your Browser

### Manufacturers:


| Action                         | Method | URL
| ------------------------------ | ------ | ----------- |
| List manufacturers             | GET    | http://localhost:8100/api/manufacturers/
| Create a manufacturer          | POST   | http://localhost:8100/api/manufacturers/
| Get a specific manufacturer    | GET    | http://localhost:8100/api/manufacturers/id/
| Update a specific manufacturer | PUT    | http://localhost:8100/api/manufacturers/id/
| Delete a specific manufacturer | DELETE | http://localhost:8100/api/manufacturers/id/


JSON body to send data:

Create or Update a manufacturer (SEND THIS JSON BODY):
- NOTE: You cannot make two manufacturers with the same name
```
{
  "name": "Tesla"
}
```
The return value of creating, viewing, updating a single manufacturer:
```
{
	"href": "/api/manufacturers/2/",
	"id": 2,
	"name": "Tesla"
}
```
Getting a list of manufacturers return value:
```
{
  "manufacturers": [
    {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Dodge"
    }
  ]
}
```

### Vehicle Models:

| Action                          | Method | URL
| ------------------------------- | ------ | ----------- |
| List vehicle models             | GET    | http://localhost:8100/api/models/
| Create a vehicle model          | POST   | http://localhost:8100/api/models/
| Get a specific vehicle model    | GET    | http://localhost:8100/api/models/id/
| Update a specific vehicle model | PUT    | http://localhost:8100/api/models/id/
| Delete a specific vehicle model | DELETE | http://localhost:8100/api/models/id/

Create a vehicle model (SEND THIS JSON BODY):
```
{
  "name": "Tacoma",
  "picture_url": "image.yourpictureurl.com"
  "manufacturer_id": 1
}
```

Updating a vehicle model can take the name and/or picture URL:
```
{
  "name": "Tacoma",
  "picture_url": "image.yourpictureurl.com"
}
```
Return value of creating or updating a vehicle model:
- NOTE: This returns the relevant manufacturer's information as well
```
{
  "href": "/api/models/1/",
  "id": 1,
  "name": "Tacoma",
  "picture_url": "image.yourpictureurl.com",
  "manufacturer": {
    "href": "/api/manufacturers/1/",
    "id": 1,
    "name": "Toyota"
  }
}
```
Getting a List of Vehicle Models Return Value:
```
{
  "models": [
    {
      "href": "/api/models/1/",
      "id": 1,
      "name": "Tacoma",
      "picture_url": "image.yourpictureurl.com",
      "manufacturer": {
        "href": "/api/manufacturers/1/",
        "id": 1,
        "name": "Toyota"
      }
    }
  ]
}
```

### Automobiles:
- The **'vin'** at the end of the detail urls represents the VIN for the specific automobile you want to access. This is not an integer ID. This is a string value so you can use numbers and/or letters.

| Action                       | Method | URL
| ---------------------------- | ------ | ----------- |
| List automobiles             | GET    | http://localhost:8100/api/automobiles/
| Create an automobile         | POST   | http://localhost:8100/api/automobiles/
| Get a specific automobile    | GET    | http://localhost:8100/api/automobiles/vin/
| Update a specific automobile | PUT    | http://localhost:8100/api/automobiles/vin/
| Delete a specific automobile | DELETE | http://localhost:8100/api/automobiles/vin/


Create an automobile (SEND THIS JSON BODY):
- NOTE: You cannot make two automobiles with the same vin
```
{
  "color": "red",
  "year": 2012,
  "vin": "1C3CC5FB2AN120174",
  "model_id": 1
}
```
Return Value of Creating an Automobile:
NOTE: The sold tag defaults to false upon creation
```
{
	"href": "/api/automobiles/1C3CC5FB2AN120174/",
	"id": 1,
	"color": "red",
	"year": 2012,
	"vin": "1C3CC5FB2AN120174",
	"model": {
		"href": "/api/models/1/",
		"id": 1,
		"name": "R8",
		"picture_url": "image.yourpictureurl.com",
		"manufacturer": {
			"href": "/api/manufacturers/1/",
			"id": 1,
			"name": "Audi"
		}
	},
    "sold": false
}
```
To get the details of a specific automobile, you can query by its VIN:
example url: http://localhost:8100/api/automobiles/1C3CC5FB2AN120174/
NOTE: The details for an automobile include its model and manufacturer.
Return Value:
```
{
  "href": "/api/automobiles/1C3CC5FB2AN120174/",
  "id": 1,
  "color": "green",
  "year": 2011,
  "vin": "1C3CC5FB2AN120174",
  "model": {
    "href": "/api/models/1/",
    "id": 1,
    "name": "Tacoma",
    "picture_url": "image.yourpictureurl.com",
    "manufacturer": {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Toyota"
    }
  },
  "sold": false
}
```
You can update the color, year, and sold status of an automobile (SEND THIS JSON BODY):
```
{
  "color": "red",
  "year": 2012,
  "sold": true
}
```
Getting a list of automobiles returns a dictionary with the key "autos" set to a list of automobile information.:
```
{
  "autos": [
    {
      "href": "/api/automobiles/1C3CC5FB2AN120174/",
      "id": 1,
      "color": "yellow",
      "year": 2013,
      "vin": "1C3CC5FB2AN120174",
      "model": {
        "href": "/api/models/1/",
        "id": 1,
        "name": "Tacoma",
        "picture_url": "image.yourpictureurl.com",
        "manufacturer": {
          "href": "/api/manufacturers/1/",
          "id": 1,
          "name": "Toyota"
        }
      },
      "sold": false
    }
  ]
}
```

## Sales microservice

On the backend, the sales microservice has 4 models: AutomobileVO, Customer, SalesPerson, and Sale. The Sale model interacts with the other three models, getting its data from the other three.

The AutomobileVO is a value object that gets data about the automobiles in the inventory using a poller. The sales poller automotically polls the inventory microservice for data, so the sales microservice is constantly getting updated data.

The reason for integration between these two microservices is that when recording a new sale, you'll need to choose which car is being sold and that info is stored within the inventory microservice.


## Accessing Endpoints to Send and View Data - Access through Insomnia:

### Customers:


| Action                     | Method | URL
| -------------------------- | ------ | ----------- |
| List customers             | GET    | http://localhost:8090/api/customers/
| Create a customer          | POST   | http://localhost:8090/api/customers/
| Delete a specific customer | DELETE | http://localhost:8090/api/customers/id/

To create a Customer (SEND THIS JSON BODY):
```
{
	"first_name": "Josh",
	"last_name": "Elder",
	"address": "1212 Ocean Street",
	"phone_number": 9804357878
}
```
Return Value of Creating a Customer:
```
{
	"id: "1",
	"first_name": "Josh",
	"last_name": "Elder",
	"address": "1212 Ocean Street",
	"phone_number": 9804357878
}
```
Return value of Listing all Customers:
```
{
	"customers": [
		{
			"id": 1,
			"first_name": "Agent",
			"last_name": "Smith",
			"address": "Matrix",
			"phone_number": "555-5555"
		},
		{
			"id": 3,
			"first_name": "Josh",
			"last_name": "Elder",
	        "address": "1212 Ocean Street",
	        "phone_number": 9804357878
		}
	]
}
```
### Salespeople:
| Action | Method | URL
| -------------------- | ------ | ----------- |
| List salespeople     | GET    | http://localhost:8090/api/salespeople/
| Create a salesperson | POST   | http://localhost:8090/api/salespeople/
| Delete a salesperson | DELETE | http://localhost:8090/api/salespeople/id/


To create a salesperson (SEND THIS JSON BODY):
```
{
	"first_name": "Josh",
	"last_name": "Vasquez",
	"employee_number": 1
}
```
Return Value of creating a salesperson:
```
{
	"id": 1,
	"first_name": "Josh",
	"last_name": "Vasquez",
	"employee_number": 1
}
```
List all salespeople Return Value:
```
{
	"salespeople": [
		{
			"id": 1,
			"first_name": "Mister",
			"last_name": "Anderson",
			"employee_id": 10
		},
		{
			"id": 3,
			"first_name": "Josh",
			"last_name": "Vasquez",
			"employee_id": 1
		}
	]
}
```
### Salesrecords:

| Action            | Method | URL
| ----------------- | ------ | ----------- |
| List all sales    | GET    | http://localhost:8090/api/salesrecords/
| Create a new sale | POST   | http://localhost:8090/api/salesrecords/
| Delete a sale     | DELETE | http://localhost:8090/api/salesrecords/id/

List all Sales Return Value:
NOTE: includes the details of the salesperson, customer, and automobile
```
{
	"sales": [
		{
			"id": 4,
			"price": "19000",
			"salesperson": {
				"id": 1,
				"first_name": "Mister",
				"last_name": "Anderson",
				"employee_id": 10
			},
			"customer": {
				"id": 3,
				"first_name": "Josh",
				"last_name": "Elder",
				"address": "Galvanize",
				"phone_number": "555-5555"
			},
			"automobile": {
				"id": 6,
				"import_href": "/api/automobiles/1234567/",
				"vin": "1234567",
				"sold": false
			}
		},
		{
			"id": 6,
			"price": "53000",
			"salesperson": {
				"id": 1,
				"first_name": "Mister",
				"last_name": "Anderson",
				"employee_id": 10
			},
			"customer": {
				"id": 1,
				"first_name": "Agent",
				"last_name": "Smith",
				"address": "Matrix",
				"phone_number": "555-5555"
			},
			"automobile": {
				"id": 7,
				"import_href": "/api/automobiles/23456/",
				"vin": "23456",
				"sold": false
			}
		}
	]
}
```
Create a New Sale (SEND THIS JSON BODY):
NOTE: The automobile key must have a value matching a VIN in the inventory database
NOTE: The salesperson and customer values must be valid id's their respective tables
```
{
	"price": "53000",
	"salesperson": 1,
	"customer": 4,
	"automobile": 65432
}
```
Return Value of Creating a New Sale:
```
{
	"id": 11,
	"price": "530",
	"salesperson": {
		"id": 1,
		"first_name": "Mister",
		"last_name": "Anderson",
		"employee_id": 10
	},
	"customer": {
		"id": 4,
		"first_name": "Kathy",
		"last_name": "Gomez",
		"address": "Rm19",
		"phone_number": "222-2222"
	},
	"automobile": {
		"id": 8,
		"import_href": "/api/automobiles/65432/",
		"vin": "65432",
		"sold": false
	}
}
```
## Service microservice

The backend of the service microservice includes includes 3 models: Technnician, AutomobileVO, and Appointment. The Appoinment model interacts with the Technician model through it's foreign key and the Appointment model interacts with the AutomobileVO model through its vin. A poller was created to automatically poll for inventory microservice data to be created for the services microservice.

The reason for integration between these two microservices is that when an automobile is purchased, the vin is recorded to qualify for VIP services when creating an appointment.


## Services Microservice RESTful API calls:

### Technicians:

| Action              | Method | URL
| ------------------- | ------ | ----------- |
| List technicians    | GET    | http://localhost:8080/api/technicians/
| Technician details  | GET    | http://localhost:8080/api/technicians/<int:pk>/
| Create a technician | POST   | http://localhost:8080/api/technicians/
| Delete a technician | DELETE | http://localhost:8080/api/technicians/<int:pk>/

LIST TECHNICIANS: Following this endpoint will give you a list of all technicians that are currently employed.
Since this is a GET request, you do not need to provide any data.
```
Example:
{
	"technicians": [
		{
			"first_name": "sunny",
			"last_name": "medina",
			"employee_id": "777",
			"id": 2
		},
	]
}
```

TECHNICIAN DETAIL: This is a GET request, so no data will need to be provided. From the list of technicians currently employeed, you will see each is assigned an "id" value. This will be used in place of "<int:pk>". For example in order to view the details for the technician "sunny", the following address would be input:
http://localhost:8080/api/technicians/2/.
The output would be the following:

```
{
	"first_name": "sunny",
	"last_name": "medina",
	"employee_id": "777",
	"id": 2
}
```

CREATE A TECHNICIAN: This is a POST request. To create a technician send this JSON body:
- NOTE: The "id" field will automatically be populated for you.
```
{
	"first_name": "michael",
	"last_name": "meyers",
	"employee_id": "1243"
}
```

DELETE A TECHNICIAN: This is a DELETE request. To delete a technician, from the list of technicians, input the "id" value of the technician you wish to be deleted in place of "<int:pk>". For example in order to delete our technician "sunny" you would input: http://localhost:8080/api/technicians/2/. The output would be the following:
```
{
	"message": "technician has been deleted"
}
```
