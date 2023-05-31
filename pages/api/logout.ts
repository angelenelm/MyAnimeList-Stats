import type { NextApiRequest, NextApiResponse } from 'next';
import { deleteCookie } from 'cookies-next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  deleteCookie('access_token', { req, res });
  deleteCookie('refresh_token', { req, res });
  deleteCookie('code_verifier', { req, res });
  deleteCookie('state', { req, res });

  res.redirect('/');
}
