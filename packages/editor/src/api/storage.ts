import { supabase } from '@src/api';

const upload = () => {};
const list = async (bucket: string, folder: string = '') => {
  const { data, error } = await supabase.storage.from(bucket).list(folder);
  if (error) {
    throw error;
  }
  return data;
};

export default {
  upload,
  list,
};
