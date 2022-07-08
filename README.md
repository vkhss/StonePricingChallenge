# StonePricingChallenge

Challenge for Back End developer in the pricing area at Stone.

# Installation

```
$ git clone https://github.com/vkhss/StonePricingChallenge.git
$ cd StonePricingChallenge/
$ npm i
$ docker-compose up
```

# Pricing API Docs

HOST and PORT => http://localhost:4000/api/pricing/

Postman Collection => https://www.getpostman.com/collections/bcddb96ccef02f6efc17 

## POST - /simulation

This API has the purpose of simulating or receiving as customer information and defining
if the asking price is higher than the minimum amount (monthly) that a Lucky Stone
can be sold

### body params:

~~~javascript
{
    "cpnj": "16501555000157", //customer cnpj
    "tpv": 1000, // volume sold in reais (TPV)
    "productId": "1", // id of product (more examples below!)
    "campaign": "10offsp", //promotional campaign (more examples below!)
    "sellerSeniority": "JR", //seller seniority (more examples below!)
    "customerSegment": "FOOD", //customer business segment (more examples below!)
    "uf": "sp", //state in which the customer is located! (more examples below!)
    "sellerPrice": 150 //Value informed by the seller!
}
~~~

| sellerSeniority (Type String) * | productId (Type String) * | campaign (String) | customerSegment (Type String) * | uf (Type String) * | tpv(Type Number) * | sellerPrice (Type Number) * |
| ------------------------------- | ------------------------- | ----------------- | ------------------------------- | ------------------ | ------------------ | --------------------------- |
| jr                              | 1 (Pedra da Sorte)        | 10offsp           | food                            | SP                 | 1000000            | 200                         |
| pl                              | 2 (Pedra Roxa)            | 10offam           | health                          | MG                 | 500000             | 150                         |
| sr                              | 3 (Pedra Fofa)            | 10offpremium      | it                              | AM                 | 10000              | 100                         |
|                                 |                           | 10offbasic        | sales                           | PB                 | 5000               | 80                          |  |

Notes: 
- In the case of inserting product 3 (Pedra Fofa), the value indicated by the amount of use of the product in the month and together with the monthly value

- The campaign field will apply a special discount on the amount offered to the customer, but isn't a mandatory field!

### response params:
~~~javascript 

{
    "statusCode": 200,
    "msg": "O Valor da venda está de ACORDO com o sugerido pela Pedregulho! Entre R$ X e R$ Y"
}

{
    "statusCode": 400,
    "msg":"O Valor da venda está ACIMA do preço sugerido pela Pedregulho! Tente algo entre R$ X e R$ Y"
}

{
    "statusCode": 400,
    "msg":  "O Valor da venda está ABAIXO do preço sugerido pela Pedregulho! Tente algo entre R$ X e R$ Y"
}

~~~

## POST - /pnl

This api  has the purpose of write pnl records of customers on pnl's collection (MongoDb). 

### body params: 
~~~javascript
{
    "cnpj": "16501555000157",  // Customer cnpj
    "productId": "1", // Id of product (more examples below!)
    "tpv": "1000", // Volume sold in reais (TPV)
    "uf": "sp", // State in which the customer is located! (more examples below!)
    "campaign": "10offsp", // Promotional campaign (more examples below!)
    "revenues": "106",  // Total revenue received from the customer! (Same as sellerPrice!)
    "manufacturingCost": 20, // Total manufacturing costs
    "shippingCost": 12 // Total shipping costs
}
~~~

| productId (Type String) * | campaign (String) | uf (Type String) * | tpv(Type Number) * |
| ------------------------- | ----------------- | ------------------ | ------------------ |
| 1 (Pedra da Sorte)        | 10offsp           | SP                 | 1000000            |
| 2 (Pedra Roxa)            | 10offam           | MG                 | 500000             |
| 3 (Pedra Fofa)            | 10offpremium      | AM                 | 10000              |
|                           | 10offbasic        | PB                 | 5000               |

### response params:
~~~javascript

{
    "statusCode": 201,
    "msg": "PNLs criadas com sucesso!"
}

{
    "statusCode": 400,
    "msg": "Produto e CPNJ já foram cadastrados na base!"
}

~~~

Note: 
- If the "productId" is equal to 1, it will be considered as monthly and average value for a period of 10 months!
- If the "productId" is equal to 2, the value for the entire contract will be considered and the average value will be spread over 10 months!
- If the "productId" is equal to 3, the product will be produced only once and charged for each time it is used! Then the field "revenuesPerUse" will be saved with values!

## GET - /pnl

This api has the purpose of read pnl records of customers on pnl's collection (MongoDb). 

### queryString params: 

~~~javascript
{
    "cnpj" 16501555000157 // Customer Cnpj
    "productId": 1 //Id of product 
}

// exemple: /pnl?cnpj=16501555000157&productId=1
~~~




### response params: 

~~~javascript
{
    "statusCode": 200,
    "body": {
        "pnls": [
            {
                "cnpj": "16501555000157", // Customer cnpj
                "productId": "1", //  Id of product 
                "productName": "Pedra da Sorte", // Name of product 
                "campaign": "10offsp", // Promotional campaign 
                "uf": "sp", // State in which the customer is located!
                "startDate": "07-2022", // Contract Start Date
                "endDate": "05-2023", // Contract Final Date
                "tpv": 1000, // Volume sold in reais 
                "revenues": 106,// Total revenue received from the customer! 
                "revenuesPerUse": 0,  // Total revenue received from the customer by use (Ex: productId equal 3 - Pedra Fofa)! 
                "manufacturingCost": 20, // Total manufacturing costs
                "shippingCost": 12, // Total shipping costs
                "totalCost": 12, // Sum of total costs
                "taxes": 11.925, // Taxes of 11,25%
                "margin": 62.075, // profit margin 
                "marginPercentage": "58.56%" //profit margin in percentage
            }
        ]
    }
}
~~~
















