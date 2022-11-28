import { supabase } from '@src/api/index';
import { current } from '@src/common/current';
import { WebsiteType } from '@src/types';
import pages from '@src/api/pages';
import { initialData } from '@src/data';

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

  if (error) {
    throw new Error(error.message);
  }

  return data as WebsiteType[];
};

const getById = async (id: string) => {
  const { data, status, error } = await supabase
    .from('websites')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      throw new Error('Website not found');
    }
    throw new Error(error.message);
  }

  return data as WebsiteType;
};

const create = async (website: WebsiteType) => {
  const isSlugExist = await isSlugExists(website?.slug || '');

  if (isSlugExist) {
    throw new Error('Slug already exists');
  }

  const { data, error } = await supabase
    .from('websites')
    .insert(website)
    .select();

  if (error) {
    throw new Error(String(error?.message));
  }

  const newWebsite = data?.[0] as WebsiteType | undefined;
  if (newWebsite && newWebsite.id) {
    await pages.create({
      name: 'Home',
      slug: 'home',
      draft: initialData,
      isDefault: true,
      website_id: newWebsite.id,
      user_id: newWebsite.user_id || '',
    });
    return newWebsite;
  }
  return null;
};

const update = async (website: WebsiteType) => {
  const { data, error } = await supabase
    .from('websites')
    .update(website)
    .eq('id', website.id)
    .select();

  if (error) {
    throw new Error(String(error?.message));
  }

  if (data) return data as WebsiteType;
  return null;
};

const isSlugExists = async (slug: string) => {
  const { data } = await supabase
    .from('websites')
    .select('id')
    .eq('slug', slug)
    .single();

  return !!data;
};

const websites = { getAll, getById, create, update };

export default websites;
