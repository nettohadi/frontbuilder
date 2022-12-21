import { supabase } from '@src/api/index';
import { ElementType } from '@frontbuilder/renderer';

import { PageType, WebsiteType } from '@src/types';
import { current } from '@src/common/current';
import auth from '@src/api/auth';
import websites from '@src/api/websites';

const getById = async (id: string) => {
  const { data, status, error } = await supabase
    .from('pages')
    .select('*')
    .eq('id', id)
    .single();

  if (status !== 200 && error) {
    throw new Error(error as any);
  }

  return data as PageType;
};

const getDefault = async () => {
  if (!current.user) {
    current.user = await auth.getUserProfile();
  }

  const website = await getDefaultWebsite();

  const { data: page } = await supabase
    .from('pages')
    .select('id, draft')
    .eq('isDefault', true)
    .eq('user_id', current.user?.id)
    .eq('website_id', website?.id)
    .single();

  return { website, page };
};

const getDefaultWebsite = async () => {
  let website: WebsiteType | null;
  const { data, error } = await supabase
    .from('websites')
    .select('id')
    .eq('user_id', current.user?.id)
    .eq('isDefault', true)
    .single();

  if (error) throw error;

  website = data as WebsiteType;

  if (!website) {
    website = await websites.create({
      name: generateWebsiteName(current.user?.full_name || ''),
      slug: generateWebsiteSlug(current.user?.full_name || ''),
      isDefault: true,
      user_id: current.user?.id,
    });
  }

  return website;
};

const generateWebsiteName = (userFullName: string) => {
  return userFullName + ' cool site';
};

const generateWebsiteSlug = (userFullName: string) => {
  return userFullName.replaceAll(' ', '-').toLowerCase() + '-cool-site';
};

const getDefaultByWebsiteId = async (websiteId: string) => {
  const { data, status, error } = await supabase
    .from('pages')
    .select('*')
    .eq('isDefault', true)
    .eq('website_id', websiteId)
    .single();

  if (status !== 200 && error) {
    throw new Error(error as any);
  }

  return data as PageType;
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

const getAll = async (websiteId: number) => {
  if (!current.user) return null;
  const {
    data = null,
    status = 400,
    error = null,
  } = await supabase
    .from('pages')
    .select('*')
    .order('name', { ascending: true })
    .eq('user_id', current.user?.id)
    .eq('website_id', websiteId);

  if (status !== 200 && error) {
    throw new Error(String(error));
  }

  return data as PageType[];
};

const create = async (page: PageType) => {
  const isSlugExist = await isSlugExists(
    page?.slug || '',
    page?.website_id || 0
  );

  if (isSlugExist) {
    throw new Error('Slug already exists');
  }

  const { data, error } = await supabase.from('pages').insert(page).select();

  if (error) {
    throw new Error(String(error.message));
  }

  return data?.[0] as PageType | undefined;
};

const update = async (page: PageType) => {
  const { data, error } = await supabase
    .from('pages')
    .update(page)
    .eq('id', page.id)
    .select();

  if (error) {
    throw new Error(String(error.message));
  }

  return data?.[0] as PageType | undefined;
};

const setAsDefault = async (pageId: string) => {
  const response = await supabase
    .from('pages')
    .update({ isDefault: false })
    .eq('isDefault', true)
    .select();

  if (response.error) {
    throw String(response.error.message);
  }

  const { data, error } = await supabase
    .from('pages')
    .update({ isDefault: true })
    .eq('id', pageId)
    .select();

  if (error) {
    throw String(error.message);
  }

  return data?.[0] as PageType | undefined;
};

const isSlugExists = async (
  slug: string,
  websiteId: number,
  exceptPageId: string = ''
) => {
  const query = supabase
    .from('pages')
    .select('id')
    .eq('slug', slug)
    .eq('website_id', websiteId);

  const { data } = exceptPageId
    ? await query.neq('id', exceptPageId).select()
    : await query.select();

  return Boolean(data?.length);
};

const pages = {
  getById,
  getDefault,
  getDefaultByWebsiteId,
  updateDraft,
  getAll,
  create,
  update,
  setAsDefault,
};

export default pages;
