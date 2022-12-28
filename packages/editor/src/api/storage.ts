import { supabase } from '@src/api';

const upload = async (bucket: string, folder: string = '', image: any) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(folder, image);
  if (error) {
    throw error.message;
  }
  return data;
};

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
