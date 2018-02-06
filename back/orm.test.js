import { constructQuery } from './orm';

describe('constructQuery', () => {
  test('constructs INSERT statement and params', () => {
    const { insert, params } = constructQuery({
      tableName: 'test_table',
      where: { col3: 'c', col4: 'd' },
      cols: ['col1', 'col2'],
      data: { col1: 'a', col2: 'b' },
    });
    expect(insert).toBe('INSERT INTO test_table (col3, col4, col1, col2) VALUES ($1, $2, $3, $4)');
    expect(params).toEqual(['c', 'd', 'a', 'b']);
  });
  test('constructs UPDATE statement', () => {
    const { update, params } = constructQuery({
      tableName: 'test_table',
      where: { col3: 'c', col4: 'd' },
      cols: ['col1', 'col2'],
      data: { col1: 'a', col2: 'b' },
    });
    expect(update).toBe('UPDATE test_table SET col1=$3, col2=$4 WHERE col3=$1 AND col4=$2');
    expect(params).toEqual(['c', 'd', 'a', 'b']);
  });
  test("ignore data fields that aren't in the columns list", () => {
    const { insert, update, params } = constructQuery({
      tableName: 'test_table',
      where: { col3: 'c', col4: 'd' },
      cols: ['col1', 'col2'],
      data: { col1: 'a', col2: 'b', col5: 'e' },
    });
    expect(insert).toBe('INSERT INTO test_table (col3, col4, col1, col2) VALUES ($1, $2, $3, $4)');
    expect(update).toBe('UPDATE test_table SET col1=$3, col2=$4 WHERE col3=$1 AND col4=$2');
    expect(params).toEqual(['c', 'd', 'a', 'b']);
  });
});
