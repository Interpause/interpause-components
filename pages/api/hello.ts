import { NextApiHandler } from 'next';

const apiHandler: NextApiHandler = (req, res) => {
  res.statusCode = 200;
  res.json({
    msg: 'hello world!',
  });
};

export default apiHandler;
