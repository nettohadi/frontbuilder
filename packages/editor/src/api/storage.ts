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

const remove = async (bucket: string, imagePath: string) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .remove([imagePath]);

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

const storage = {
  upload,
  remove,
  list,
};

export default storage;
