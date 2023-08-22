const Brand = require('./Model')
const brand = require('./Model')
const { connect } = require('mongoose')
require('dotenv').config()


const getAllBrands = async (req, res) => {


    try {
        await connect(process.env.MONGO_URL)
        const allBrands = await brand.find()
        res.json({
            category: allBrands
        })
    }



    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const getBrandByID = async (req, res) => {

    const { _id } = req.query

    try {
        await connect(process.env.MONGO_URL)
        const brand = await Brand.findOne({ _id })
        res.json({ brand })
    }



    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const createBrand = async (req, res) => {
    const { BrandName, BrandImage } = req.body

    if (!BrandName || !BrandImage) {
        res.status(403).json({
            message: "Missing Required Field"
        })
    }

    else {
        try {
            await connect(process.env.MONGO_URL)
            const checkExisting = await Brand.exists({ BrandName })
            if (checkExisting) {
                res.status(400).json({
                    message: "Brand Already Exist"
                })
            }

            else {
                await Brand.create({ BrandName, BrandImage })
                const allBrands = await brand.find()



                res.json({
                    message: "DB Connected",
                    brand: allBrands
                })
            }


        }
        catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    }
}

const updateBrand = async (req, res) => {
    const { _id, BrandName, BrandImage } = req.body

    const filter = { _id };
    const update = { BrandName, BrandImage };

    try {
        await connect(process.env.MONGO_URL)

        await Brand.findOneAndUpdate(filter, update, {
            new: true
        });
        const brand = await Brand.find()

        res.json({
            message: "Successfully Updated",
            brand
        })


    } catch (error) {
        res.status(400).json({
            message: error.message
        })

    }
}

const deleteBrand = async (req, res) => {

    const { BrandName } = req.body

    try {
        await connect(process.env.MONGO_URL)
        await Brand.deleteOne({ BrandName })
        const brand = await Brand.find()

        res.status(200).json({
            message: "Deleted Successfully",
            brand
        })
    }



    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}


module.exports = { getAllBrands, getBrandByID, createBrand, updateBrand, deleteBrand }