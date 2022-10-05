import { Router } from 'express';
import AcronymController from '@controllers/acronym.controller';
import { CreateDataDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@middlewares/auth.middleware';

class AcronymRoute implements Routes {
  public path = '/acronym';
  public router = Router();
  public acronymController = new AcronymController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.acronymController.getDataByFilter);
    this.router.post(`${this.path}`, validationMiddleware(CreateDataDto, 'params'), this.acronymController.createData);
    this.router.put(`${this.path}/:acronym`, authMiddleware, this.acronymController.updateData);
    this.router.delete(`${this.path}/:acronym`, this.acronymController.deleteData);
  }
}

export default AcronymRoute;
