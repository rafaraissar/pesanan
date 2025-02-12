// lib/web-push.js
import webpush from 'web-push';

const publicVapidKey = process.env.VAPID_PUBLIC_KEY;
const privateVapidKey = process.env.VAPID_PRIVATE_KEY;

webpush.setVapidDetails(
  'mailto:rafaraissaraf@gmail.com',
  publicVapidKey,
  privateVapidKey
);

export default webpush;
