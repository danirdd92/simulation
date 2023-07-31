import { describe, expect, test } from 'vitest';
import { aggregateData } from '../utils/index';
import { data } from '../data/response';

describe('test data aggregation', () => {
  const start = new Date(2023, 0, 1);
  const end = new Date(2023, 2, 3);

  test('aggragate by group and day', () => {
    const { dev, management } = aggregateData(data, 'group', 'day', start, end);

    expect(dev.values.find((dt) => dt.date === '01/01/2023')?.total).toEqual(0);
    expect(dev.values.find((dt) => dt.date === '04/01/2023')?.total).toEqual(
      12
    );
    expect(dev.values.find((dt) => dt.date === '06/01/2023')?.total).toEqual(
      16
    );
    expect(dev.values.find((dt) => dt.date === '10/01/2023')?.total).toEqual(0);

    expect(
      management.values.find((dt) => dt.date === '01/01/2023')?.total
    ).toEqual(7);
    expect(
      management.values.find((dt) => dt.date === '04/01/2023')?.total
    ).toEqual(2);
    expect(
      management.values.find((dt) => dt.date === '06/01/2023')?.total
    ).toEqual(7);
    expect(
      management.values.find((dt) => dt.date === '10/01/2023')?.total
    ).toEqual(0);
  });

  test('aggragate by group and month', () => {
    const { dev, management } = aggregateData(
      data,
      'group',
      'month',
      start,
      end
    );

    expect(dev.values.find((dt) => dt.date === '01')?.total).toEqual(66);
    expect(dev.values.find((dt) => dt.date === '02')?.total).toEqual(18);
    expect(dev.values.find((dt) => dt.date === '03')?.total).toEqual(5);

    expect(management.values.find((dt) => dt.date === '01')?.total).toEqual(44);
    expect(management.values.find((dt) => dt.date === '02')?.total).toEqual(13);
    expect(management.values.find((dt) => dt.date === '03')?.total).toEqual(0);
  });

  test('aggragate by name and day', () => {
    const { barakuni, evyatar, irad } = aggregateData(
      data,
      'name',
      'day',
      start,
      end
    );

    expect(
      barakuni.values.find((dt) => dt.date === '01/01/2023')?.total
    ).toEqual(7);
    expect(
      barakuni.values.find((dt) => dt.date === '06/01/2023')?.total
    ).toEqual(15);

    expect(
      evyatar.values.find((dt) => dt.date === '01/01/2023')?.total
    ).toEqual(0);
    expect(
      evyatar.values.find((dt) => dt.date === '06/01/2023')?.total
    ).toEqual(8);

    expect(irad.values.find((dt) => dt.date === '01/01/2023')?.total).toEqual(
      0
    );
    expect(irad.values.find((dt) => dt.date === '06/01/2023')?.total).toEqual(
      0
    );
  });
  test('aggragate by name and month', () => {
    const { barakuni, evyatar, irad } = aggregateData(
      data,
      'name',
      'month',
      start,
      end
    );

    expect(barakuni.values.find((dt) => dt.date === '02')?.total).toEqual(22);

    expect(evyatar.values.find((dt) => dt.date === '01')?.total).toEqual(34);
    expect(evyatar.values.find((dt) => dt.date === '02')?.total).toEqual(9);

    expect(irad.values.find((dt) => dt.date === '01')?.total).toEqual(18.5);
    expect(irad.values.find((dt) => dt.date === '02')?.total).toEqual(0);
  });
});
