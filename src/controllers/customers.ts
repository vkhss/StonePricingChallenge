import { NextFunction, Request, Response } from "express";
import Customer from '../models/customers'

const getAllCustomers = (req: Request, res: Response, next: NextFunction) => {
    Customer.find()
        .exec()
        .then(results => {
            return res.status(200).json({
                customers: results,
                count: results.length
            })
        })
        .catch(error => {
            return res.status(500).json({
                message: error.message,
                error
            })
        })
}

const getCustomerByCnpj = (req: Request, res: Response, next: NextFunction) => {
    const cnpj: number = +req.params.cnpj

    Customer.findOne({ cnpj })
        .exec()
        .then(results => {
            return res.status(200).json({
                customers: results
            })
        })
        .catch(error => {
            return res.status(500).json({
                message: error.message,
                error
            })
        })

}

const insertCustomer = async (req: Request, res: Response, next: NextFunction) => {
    const { name, cnpj } = req.body
    let customerExists = false

    await Customer.findOne({ cnpj })
        .exec()
        .then(results => {
            if (results) {
                customerExists = true
            }
        }).catch(error => {
            return res.status(500).json(error);
        })

    if (customerExists) {
        return res.status(500).json({
            message: 'CNPJ já cadastrado anteriormente na Base!'
        })
    }


    const newCustomer = new Customer({
        name: name,
        cnpj: cnpj
    });

    newCustomer
        .save()
        .then(result => {
            return res.status(201).json('Cliente criado com Sucesso!');
        })
        .catch(error => {
            return res.status(500).json(error);
        });

}

export default { getAllCustomers, getCustomerByCnpj, insertCustomer }