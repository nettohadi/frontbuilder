import { supabase } from '@src/api/index';
import { ElementType, PageType } from '@src/types';
import { current } from '@src/common/current';
import auth from '@src/api/auth';

const getById = async (id: string) => {
  const response = await supabase
    .from('pages')
    .select('*')
    .eq('id', id)
    .single();
  console.log('getById', { response });
  return response;
};

const getDefault = async () => {
  if (!current.user) {
    current.user = await auth.getUserProfile();
  }

  const { data: website } = await supabase
    .from('websites')
    .select('id')
    .eq('user_id', current.user?.id)
    .single();

  const { data: page } = await supabase
    .from('pages')
    .select('id, draft')
    .eq('isDefault', true)
    .eq('user_id', current.user?.id)
    .eq('website_id', website?.id)
    .single();

  return { website, page };
};

const updateDraft = async (id: string, data: ElementType | string) => {
  if ((window as any).Cypress) return;

  const response = await supabase
    .from('pages')
    .update({ draft: data })
    .eq('id', id);

  if (response.status === 404) {
    window.location.href = '/signIn';
  }
};

const getAll = async () => {
  const {
    data = null,
    status = 400,
    error = null,
  } = await supabase
    .from('pages')
    .select('*')
    .eq('user_id', current.user?.id)
    .eq('website_id', current.websiteId);

  if (status !== 200 && error) {
    throw new Error(String(error));
  }

  return data as PageType[];
};

// check if slug already exist

// add new page

const pages = { getById, getDefault, updateDraft, getAll };

export default pages;
