import * as dotenv from 'dotenv';

dotenv.config();

export const welcome = async (req, res) => res.json({ message: 'Test controller OK' });

export default welcome;
