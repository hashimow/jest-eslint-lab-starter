const { capitalizeWords, filterActiveUsers, logAction } = require('../index');

describe('Utility Functions', () => {

  describe('capitalizeWords', () => {
    test('capitalizes first letters', () => {
      expect(capitalizeWords('hello world')).toBe('Hello World');
    });

    test('handles empty string', () => {
      expect(capitalizeWords('')).toBe('');
    });
  });

  describe('filterActiveUsers', () => {
    const users = [
      { name: 'Alice', isActive: true },
      { name: 'Bob', isActive: false },
    ];

    test('returns only active users', () => {
      expect(filterActiveUsers(users)).toEqual([{ name: 'Alice', isActive: true }]);
    });

    test('returns empty array if none active', () => {
      expect(filterActiveUsers([{ name: 'Bob', isActive: false }])).toEqual([]);
    });
  });

  describe('logAction', () => {
    const mockDate = new Date('2024-11-27T12:00:00Z');
    const realDate = Date;

    beforeAll(() => {
      global.Date = class extends Date {
        constructor() { super(); return mockDate; }
      };
    });

    afterAll(() => {
      global.Date = realDate;
    });

    test('logs action correctly', () => {
      expect(logAction('login', 'Alice')).toBe(
        'User Alice performed login at 2024-11-27T12:00:00.000Z'
      );
    });

    test('handles missing action', () => {
      expect(logAction('', 'Alice')).toBe(
        'User Alice performed  at 2024-11-27T12:00:00.000Z'
      );
    });

    test('handles missing username', () => {
      expect(logAction('login', '')).toBe(
        'User  performed login at 2024-11-27T12:00:00.000Z'
      );
    });
  });

});

