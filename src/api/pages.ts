import { supabase } from '@src/api/index';
import { ElementType } from '@src/types';
import { current } from '@src/common/current';
import auth from '@src/api/auth';

const getById = async (id: string) => {
  const response = await supabase
    .from('pages')
    .select('draft')
    .eq('id', id)
    .single();
  console.log('getById', { response });
  return response;
};

const getDefault = async () => {
  if (!current.user) {
    const authUser = await auth.getUser();
    current.user = authUser;
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
  const response = await supabase
    .from('pages')
    .update({ draft: data })
    .eq('id', id);

  if (response.status === 404) {
    window.location.href = '/signIn';
  }
};

const pages = { getById, getDefault, updateDraft };

export default pages;
