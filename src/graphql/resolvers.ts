import { isEmpty } from '@/utils/util';
import { HttpException } from '@exceptions/HttpException';
import { Acronym, AcronymGroup } from '@interfaces/acronym.interface';
import acronymModel from '@models/acronym.model';

const resolvers = {
  findDataByFilter: async ({ from, limit, search }: any): Promise<Acronym[]> => {
    if (from < 0 || limit < 0) {
      throw new HttpException(409, 'Params invalid');
    }
    const findAcronym: Acronym[] = await acronymModel
      .find({ acronym: { $regex: search } }, { _id: 0, acronym: 1, definition: 1 })
      .skip(from)
      .limit(limit);
    if (!findAcronym) throw new HttpException(409, "Acronym doesn't exist");

    return findAcronym;
  },

  createAcronym: async ({ acronym, definition }: any) => {
    if (isEmpty(acronym) || isEmpty(definition)) throw new HttpException(400, 'AcronymData is empty');

    const findAcronym: Acronym = await acronymModel.findOne({ acronym: acronym });
    if (!isEmpty(findAcronym)) throw new HttpException(409, `This WTF:${acronym} already exists`);
    await acronymModel.create({
      acronym: acronym,
      definition: definition,
    });

    return true;
  },

  updateAcronym: async ({ acronym, definition }: any) => {
    if (acronym) {
      const findData: Acronym = await acronymModel.findOne({ acronym: acronym });
      if (findData && findData.acronym != acronym) throw new HttpException(409, `This acronym ${acronym} already exists`);
    }

    const updateDataByAcronym: any = await acronymModel.update({ acronym: acronym }, { definition: definition });
    if (!updateDataByAcronym) throw new HttpException(409, "Acronym doesn't exist");

    return true;
  },

  deleteAcronym: async ({ acronym }: any) => {
    const findAcronym: Acronym = await acronymModel.findOne({ acronym: acronym });
    if (isEmpty(findAcronym)) throw new HttpException(409, "Acronym doesn't exist");

    await acronymModel.deleteOne({ acronym: acronym });
    return true;
  },
};

export default resolvers;
