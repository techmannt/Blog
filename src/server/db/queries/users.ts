import { Query } from '../index';

const findUsers = () => Query("SELECT blogs.*, authors.id, authors.name, CASE WHEN tags.name IS NULL THEN 'none' ELSE GROUP_CONCAT(tags.name SEPARATOR ';;') END AS tags FROM blogs JOIN authors ON authors.id = blogs.id LEFT JOIN blogtags ON blogtags.blogid = blogs.id LEFT JOIN tags ON tags.id = blogtags.tagid WHERE authors.id = 1 GROUP BY blogs.id");
const findBlogEntry = (id: string) => Query("SELECT blogs.*, authors.id, authors.name, CASE WHEN tags.name IS NULL THEN 'none' ELSE GROUP_CONCAT(tags.name SEPARATOR ';;') END AS tags FROM blogs JOIN authors ON authors.id = blogs.id LEFT JOIN blogtags ON blogtags.blogid = blogs.id LEFT JOIN tags ON tags.id = blogtags.tagid WHERE authors.id = 1 AND blogs.id = ? GROUP BY blogs.id", [ id ]);

export default {
  findUsers,
  findBlogEntry
}
