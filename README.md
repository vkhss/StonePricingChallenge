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

## Objective 1 (Negociação)

### POST - /simulation

This API has the purpose of simulating or receiving as customer information and defining
if the asking price is higher than the minimum amount (monthly) that a Lucky Stone
can be sold

#### body params:

~~~javascript
{
    "cpnj": "00.000.000/0001-00", //customer cnpj
    "tpv": 1000, // volume sold in reais (TPV)
    "productId": "1", // id of product (more examples below!)
    "sellerSeniority": "JR", //seller seniority (more examples below!)
    "customerSegment": "FOOD", //customer business segment (more examples below!)
    "uf": "SP", //state in which the client is located! (more examples below!)
    "sellerPrice": 150 //Value informed by the seller!
}
~~~

| sellerSeniority (Type String) | productId          | customerSegment (Type String) | uf (Type String) | tpv(Type Number) | sellerPrice (Type Number) |
|-------------------------------|--------------------|-------------------------------|------------------|------------------|---------------------------|
| jr                            | 1 (Pedra da Sorte) | food                          | SP               | 1000000          | 200                       |
| pl                            | 2 (Pedra Roxa)     | health                        | MG               | 500000           | 150                       |
| sr                            | 3 (Pedra Fofa)     | it                            | AM               | 10000            | 100                       |
|                               |                    | sales                         | PB               | 5000             | 80                        |

Note: In the case of inserting product 3 (Pedra Fofa), the value indicated by the amount of use of the product in the month and together with the monthly value

#### response params:
```
StatusCode => 200 msg:"O Valor da venda está de ACORDO com o sugerido pela Pedregulho! Entre R$ X e R$ Y"
StatusCode => 400 msg:"O Valor da venda está ACIMA do preço sugerido pela Pedregulho! Tente algo entre R$ X e R$ Y"
StatusCode => 400 msg:"O Valor da venda está ABAIXO do preço sugerido pela Pedregulho! Tente algo entre R$ X e R$ Y"

```











