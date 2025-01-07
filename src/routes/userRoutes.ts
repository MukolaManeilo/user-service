import {Router} from 'express';
import {deleteUser, getUser, updateUser} from "../controllers/userController";

const router = Router();


router.get('/:id', getUser);
router.put('/', updateUser);
router.delete('/', deleteUser);


export default router;
