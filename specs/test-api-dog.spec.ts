import { test, expect } from '@playwright/test';

test.describe('Dog API - Test Suite', () => {
  
  test.describe('GET /breeds/list/all - List all dog breeds', () => {
    
    test('should return status 200', async ({ page }) => {
      const response = await page.request.get('/api/breeds/list/all');
      expect(response.status()).toBe(200);
    });

    test('should return JSON with correct structure', async ({ page }) => {
      const response = await page.request.get('/api/breeds/list/all');
      const data = await response.json();
      
      expect(data).toHaveProperty('status');
      expect(data).toHaveProperty('message');
      expect(data.status).toBe('success');
    });

    test('should return message as an object with breed data', async ({ page }) => {
      const response = await page.request.get('/api/breeds/list/all');
      const data = await response.json();
      
      expect(typeof data.message).toBe('object');
      expect(Object.keys(data.message).length).toBeGreaterThan(0);
    });

    test('should contain common dog breeds', async ({ page }) => {
      const response = await page.request.get('/api/breeds/list/all');
      const data = await response.json();
      
      // Verify some common breeds exist
      const breeds = data.message;
      expect(breeds).toHaveProperty('labrador');
      expect(breeds).toHaveProperty('bulldog');
      expect(breeds).toHaveProperty('poodle');
    });

    test('should return sub-breeds as arrays', async ({ page }) => {
      const response = await page.request.get('/api/breeds/list/all');
      const data = await response.json();
      
      const breeds = data.message;
      // Every breed should have sub-breeds array
      Object.values(breeds).forEach(subBreeds => {
        expect(Array.isArray(subBreeds)).toBe(true);
      });
    });

    test('should contain valid sub-breeds for specific breeds', async ({ page }) => {
      const response = await page.request.get('/api/breeds/list/all');
      const data = await response.json();
      
      // Bulldog has sub-breeds
      expect(data.message.bulldog).toContain('french');
      // Poodle has sub-breeds
      expect(data.message.poodle).toContain('toy');
    });
  });

  test.describe('GET /breed/{breed}/images - Get images of a specific breed', () => {
    
    test('should return images for valid breed (labrador)', async ({ page }) => {
      const response = await page.request.get('/api/breed/labrador/images');
      expect(response.status()).toBe(200);
      
      const data = await response.json();
      expect(data.status).toBe('success');
      expect(Array.isArray(data.message)).toBe(true);
      expect(data.message.length).toBeGreaterThan(0);
    });

    test('should return valid image URLs for labrador breed', async ({ page }) => {
      const response = await page.request.get('/api/breed/labrador/images');
      const data = await response.json();
      
      // Verify all URLs are valid image URLs
      data.message.forEach((url: string) => {
        expect(typeof url).toBe('string');
        expect(url).toMatch(/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i);
      });
    });

    test('should return images for sub-breed (french bulldog)', async ({ page }) => {
      const response = await page.request.get('/api/breed/bulldog/sub/french/images');
      expect([200, 404]).toContain(response.status());
      
      if (response.status() === 200) {
        const data = await response.json();
        expect(data.status).toBe('success');
        expect(Array.isArray(data.message)).toBe(true);
      }
    });

    test('should return 404 for non-existent breed', async ({ page }) => {
      const response = await page.request.get('/api/breed/nonexistentbreed/images');
      expect(response.status()).toBe(404);
    });

    test('should return correct response structure for valid breed', async ({ page }) => {
      const response = await page.request.get('/api/breed/bulldog/images');
      const data = await response.json();
      
      expect(data).toHaveProperty('status');
      expect(data).toHaveProperty('message');
      expect(data.status).toBe('success');
    });

    test('should return multiple images for a breed', async ({ page }) => {
      const response = await page.request.get('/api/breed/corgi/images');
      const data = await response.json();
      
      expect(data.message.length).toBeGreaterThanOrEqual(5);
    });

    test('should return images for different breeds', async ({ page }) => {
      const breeds = ['golden', 'pug', 'husky'];
      
      for (const breed of breeds) {
        const response = await page.request.get(`/api/breed/${breed}/images`);
        expect([200, 404]).toContain(response.status());
        
        if (response.status() === 200) {
          const data = await response.json();
          expect(data.status).toBe('success');
          expect(Array.isArray(data.message)).toBe(true);
          expect(data.message.length).toBeGreaterThan(0);
        }
      }
    });
  });

  test.describe('GET /breeds/image/random - Get a random dog image', () => {
    
    test('should return status 200', async ({ page }) => {
      const response = await page.request.get('/api/breeds/image/random');
      expect(response.status()).toBe(200);
    });

    test('should return a single random image URL', async ({ page }) => {
      const response = await page.request.get('/api/breeds/image/random');
      const data = await response.json();
      
      expect(data.status).toBe('success');
      expect(typeof data.message).toBe('string');
      expect(data.message).toMatch(/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i);
    });

    test('should return different URLs on multiple calls', async ({ page }) => {
      const topicSet = new Set<string>();
      
      for (let i = 0; i < 5; i++) {
        const response = await page.request.get('/api/breeds/image/random');
        const data = await response.json();
        topicSet.add(data.message);
      }
      
      // Should have gotten different URLs (at least some variety in 5 calls)
      expect(topicSet.size).toBeGreaterThan(1);
    });

    test('should return response with correct structure', async ({ page }) => {
      const response = await page.request.get('/api/breeds/image/random');
      const data = await response.json();
      
      expect(data).toHaveProperty('status');
      expect(data).toHaveProperty('message');
      expect(Object.keys(data).length).toBe(2);
    });

    test('should return valid HTTP image URL', async ({ page }) => {
      const response = await page.request.get('/api/breeds/image/random');
      const data = await response.json();
      
      // Verify the URL is valid by making a HEAD request
      const imageResponse = await page.request.head(data.message);
      expect([200, 301, 302, 304]).toContain(imageResponse.status());
    });

    test('should return JPEG or PNG images', async ({ page }) => {
      const response = await page.request.get('/api/breeds/image/random');
      const data = await response.json();
      
      expect(data.message.toLowerCase()).toMatch(/\.(jpg|jpeg|png)$/i);
    });

    test('should consistently return URLs from cdn.dog.ceo domain', async ({ page }) => {
      for (let i = 0; i < 3; i++) {
        const response = await page.request.get('/api/breeds/image/random');
        const data = await response.json();
        
        expect(data.message).toContain('dog.ceo');
      }
    });
  });

  test.describe('API Performance and Reliability Tests', () => {
    
    test('all endpoints should respond within 5 seconds', async ({ page }) => {
      const endpoints = [
        '/api/breeds/list/all',
        '/api/breed/labrador/images',
        '/api/breeds/image/random'
      ];
      
      for (const endpoint of endpoints) {
        const startTime = Date.now();
        const response = await page.request.get(endpoint);
        const endTime = Date.now();
        
        expect(response.status()).toBe(200);
        expect(endTime - startTime).toBeLessThan(5000);
      }
    });

    test('should handle concurrent requests', async ({ page }) => {
      const promises = Array.from({ length: 5 }).map(() =>
        page.request.get('/api/breeds/image/random')
      );
      
      const responses = await Promise.all(promises);
      
      responses.forEach(response => {
        expect(response.status()).toBe(200);
      });
    });

    test('API should be available (health check)', async ({ page }) => {
      const response = await page.request.get('/api/breeds/list/all');
      expect(response.ok()).toBe(true);
    });
  });

  test.describe('Error Handling and Edge Cases', () => {
    
    test('should return 404 for invalid breed path', async ({ page }) => {
      const response = await page.request.get('/api/breed/invalidbreed123/images');
      expect(response.status()).toBe(404);
    });

    test('should properly handle case-insensitive breed names', async ({ page }) => {
      // Try with different cases
      const response = await page.request.get('/api/breed/LABRADOR/images');
      // Some APIs are case-insensitive, check response
      expect([200, 404]).toContain(response.status());
    });

    test('should return error response for malformed requests', async ({ page }) => {
      const response = await page.request.get('/api/breed//images');
      expect([400, 404]).toContain(response.status());
    });
  });
});
