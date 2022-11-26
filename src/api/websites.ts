import { supabase } from '@src/api/index';
import { current } from '@src/common/current';
import { WebsiteType } from '@src/types';

const getAll = async () => {
  if (!current.user) return null;
  const {
    data = null,
    status = 400,
    error = null,
  } = await supabase
    .from('websites')
    .select('*')
    .eq('user_id', current.user?.id);

  if (status !== 200 && error) {
    throw new Error(String(error));
  }

  return data as WebsiteType[];
};

const getById = async (id: string) => {
  const { data, status, error } = await supabase
    .from('websites')
    .select('*')
    .eq('id', id)
    .single();

  if (status !== 200 && error) {
    throw new Error(String(error));
  }

  return data as WebsiteType;
};

const websites = { getAll, getById };

export default websites;
