import * as mysql from 'mysql';
import chirpCrud from './queries/chirpCrud';
import users from './queries/users';
import findTags from './queries/tags';
import config from '../config';

const connection = mysql.createConnection(config.mysql);

export const Query = <T=any>(query: string, values?: Array<any>) => {
  return new Promise<T>((resolve, reject) => {
    connection.query(query, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

export default {
  chirpCrud,
  users,
  findTags
}
