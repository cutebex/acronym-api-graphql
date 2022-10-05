import { CreateDataDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import acronymModel from '@models/acronym.model';
import { Acronym } from '@interfaces/acronym.interface';

class AcronymService {
  public acronym = acronymModel;

  public async findDataByFilter(from: number, limit: number, search: string): Promise<Acronym[]> {
    if (from < 0 || limit < 0) {
      throw new HttpException(409, 'Params invalid');
    }
    if (search === 'undefined') {
      search = '';
    }
    const findAcronym: Acronym[] = await this.acronym
      .find({ acronym: { $regex: search } }, { _id: 0, acronym: 1, definition: 1 })
      .skip(from)
      .limit(limit);
    if (!findAcronym) throw new HttpException(409, "Acronym doesn't exist");

    return findAcronym;
  }

  public async createData(data: CreateDataDto): Promise<Acronym> {
    const findAcronym: Acronym = await this.acronym.findOne({ acronym: data.acronym });
    if (findAcronym) throw new HttpException(409, `This acronym ${data.acronym} already exists`);

    const createData: Acronym = await this.acronym.create({ ...data });

    return createData;
  }

  public async updateData(acronym: string, definition: string): Promise<any> {
    if (acronym) {
      const findData: Acronym = await this.acronym.findOne({ acronym: acronym });
      if (findData && findData.acronym != acronym) throw new HttpException(409, `This acronym ${acronym} already exists`);
    }

    const updateDataByAcronym: any = await this.acronym.update({ acronym: acronym }, { definition: definition });
    if (!updateDataByAcronym) throw new HttpException(409, "Acronym doesn't exist");

    return updateDataByAcronym;
  }

  public async deleteData(acronym: string): Promise<Acronym[]> {
    const deleteDataByAcronym: Acronym[] = await this.acronym.remove({ acronym: acronym });
    if (!deleteDataByAcronym) throw new HttpException(409, "Acronym doesn't exist");

    return deleteDataByAcronym;
  }
}

export default AcronymService;
