import axios from 'axios';

const fetchCountries = async (req, res, next) => {
    try {
        // llama a la API de restcountries y obtiene los países en formato JSON
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countries = response.data.map((country) => ({
            name: country.name.common,
            code: country.cca2,
        }));
        req.countries = countries;
        next();
    } catch (error) {
        console.error('Error fetching countries:', error);
        res.status(500).send('Error fetching countries');
    }
};

export default fetchCountries;
