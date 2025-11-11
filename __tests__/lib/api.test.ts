import { foodApi } from '../../lib/api';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Food API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('fetches foods successfully', async () => {
    const mockFoods = [
      {
        id: '1',
        name: 'Test Food',
        price: 10.99,
        rating: 4.5,
        image: 'test.jpg',
        restaurant: {
          name: 'Test Restaurant',
          logo: 'logo.jpg',
          status: 'Open Now'
        }
      }
    ];

    mockedAxios.get.mockResolvedValue({ data: mockFoods });

    const result = await foodApi.getFoods();

    expect(mockedAxios.get).toHaveBeenCalledWith('/Food');
    expect(result).toEqual(mockFoods);
  });

  test('handles API errors gracefully', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Network error'));

    await expect(foodApi.getFoods()).rejects.toThrow('Failed to fetch food items');
  });
});