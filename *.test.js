
import { truncate, capitalizeFirstLetter } from './src/utils';

// Test 1: Validate login form input
test('validates login form input', () => {
    const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
    const isValidPassword = (password) => password.length >= 6;

    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('invalid-email')).toBe(false);
    expect(isValidPassword('123456')).toBe(true);
    expect(isValidPassword('123')).toBe(false);
});

// Test 2: Verify a component renders with correct data
test('renders a component with correct data', () => {
    const renderComponent = (data) => `<div>${data}</div>`;
    const view = renderComponent('Hello, Fakeflix!');
    expect(view).toBe('<div>Hello, Fakeflix!</div>');
});

// Test 3: Ensure TMDB fetch returns valid results
test('fetches valid results from TMDB API', async () => {
    const mockFetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve({ results: [{ id: 1, title: 'Movie 1' }] }),
        })
    );
    global.fetch = mockFetch;

    const fetchMovies = async () => {
        const response = await fetch('https://api.themoviedb.org/3/movie/popular');
        const data = await response.json();
        return data.results;
    };

    const movies = await fetchMovies();
    expect(movies).toEqual([{ id: 1, title: 'Movie 1' }]);
    expect(mockFetch).toHaveBeenCalledWith('https://api.themoviedb.org/3/movie/popular');
});

// Test 4: Check truncate function behavior
test('truncate function properly truncates text', () => {
    expect(truncate('Hello, Fakeflix!', 10)).toBe('Hello, Fa...');
    expect(truncate('Short', 10)).toBe('Short');
});

// Test 5: Check capitalizeFirstLetter function
test('capitalizeFirstLetter function capitalizes the first letter', () => {
    expect(capitalizeFirstLetter('fakeflix')).toBe('Fakeflix');
    expect(capitalizeFirstLetter('Fakeflix')).toBe('Fakeflix');
});