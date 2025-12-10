import { Router } from "express"
import { getAll, getById, search, create, update, remove } from "../controllers/product.controller"
import { createProductValidation, getProductByIdValidation, validate } from "../middleware/product.validation"

const router = Router()

router.get('/', getAll)
router.get('/:id', validate(getProductByIdValidation), getById)
router.get('/search', search)
router.post('/', validate(createProductValidation), create)
router.put('/:id', update)
router.delete('/:id', remove)

export default router