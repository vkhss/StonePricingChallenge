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
    "sellerSeniority": "JR", //seller seniority (more examples below!)
    "customerSegment": "FOOD", //customer business segment (more examples below!)
    "uf": "SP", //state in which the client is located! (more examples below!)
    "sellerPrice": 150 //Value informed by the seller!
}
~~~
| sellerSeniority (Type String) | customerSegment (Type String) | uf (Type String) | tpv(Type Number) | sellerPrice (Type Number) |
|-------------------------------|-------------------------------|------------------|------------------|---------------------------|
| jr                            | food                          | SP               | 1000000          | 200                       |
| pl                            | health                        | MG               | 500000           | 150                       |
| sr                            | it                            | AM               | 10000            | 100                       |
|                               | sales                         | PB               | 5000             | 80                        |

#### response params:
```
StatusCode => 200 msg:"O Valor da venda está de ACORDO com o sugerido pela Pedregulho! Entre R$ X e R$ Y"
StatusCode => 400 msg:"O Valor da venda está ACIMA do preço sugerido pela Pedregulho! Tente algo entre R$ X e R$ Y"
StatusCode => 400 msg:"O Valor da venda está ABAIXO do preço sugerido pela Pedregulho! Tente algo entre R$ X e R$ Y"

```











