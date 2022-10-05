import { NextFunction, Request, Response } from 'express';
import { CreateDataDto } from '@dtos/users.dto';
// import { Acronym } from '@/interfaces/acronym.interface';
import acronymService from '@services/acronym.service';

class AcronymController {
  public acronymService = new acronymService();

  public getDataByFilter = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const from = Number(req.query.from);
      const limit = Number(req.query.limit);
      const search = String(req.query.search);
      const findOneUserData: any = await this.acronymService.findDataByFilter(from, limit, search);

      res.status(200).json({ data: findOneUserData, message: 'find' });
    } catch (error) {
      next(error);
    }
  };

  public createData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateDataDto = req.body;
      console.log('create ', userData);
      const createUserData: any = await this.acronymService.createData(userData);
      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const acronym: string = req.params.acronym;
      const definition: string = req.body.definition;
      const updateUserData: any[] = await this.acronymService.updateData(acronym, definition);

      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const acronym: string = req.params.acronym;
      console.log(req.params);
      const deleteUserData: any[] = await this.acronymService.deleteData(acronym);
      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default AcronymController;
