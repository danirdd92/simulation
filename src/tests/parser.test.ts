import { describe, expect, test } from 'vitest';
import { parseXml } from '../utils/index';
import { xml } from '../data/xml';

describe('test xml parser', () => {
  test('should return correct key value pairs', () => {
    const output = parseXml(xml);

    if (output instanceof Map) {
      expect(output.get('note')).toEqual(3);
      expect(output.get('to')).toEqual(3);
      expect(output.get('from')).toEqual(1);
    } else {
      expect(output['note']).toEqual(3);
      expect(output['to']).toEqual(3);
      expect(output['from']).toEqual(1);
    }
  });
});
