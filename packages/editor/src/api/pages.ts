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

  const page = await getDefaultByWebsiteId(website?.id || 0);

  return { website, page };
};

const getDefaultWebsite = async () => {
  let website: WebsiteType | null;
  let response;
  response = await supabase
    .from('websites')
    .select('id')
    .eq('user_id', current.user?.id)
    .eq('isDefault', true)
    .single();

  if (!response.data) {
    response = await supabase
      .from('websites')
      .select('id')
      .eq('user_id', current.user?.id)
      .single();
  }

  website = response.data as WebsiteType;

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

const getDefaultByWebsiteId = async (websiteId: number) => {
  let response;
  let data;
  response = await supabase
    .from('pages')
    .select('*')
    .eq('isDefault', true)
    .eq('website_id', websiteId)
    .single();

  data = response.data as PageType;

  if (!response.data && response.error) {
    response = await supabase
      .from('pages')
      .select('*')
      .eq('website_id', websiteId)
      .select();

    if (response.error) throw response.error.message;

    data = response.data?.[0] as PageType;
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

  if (response.error) throw response.error;
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
    throw error.message;
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
  const isSlugExist = await isSlugExists(
    page?.slug || '',
    page?.website_id || 0,
    page.id
  );

  if (isSlugExist) {
    // eslint-disable-next-line no-throw-literal
    throw 'Slug already exists';
  }

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

const setAsDefault = async (id: string) => {
  await supabase
    .from('pages')
    .update({ isDefault: false })
    .eq('isDefault', true)
    .select();

  const { data, error } = await supabase
    .from('pages')
    .update({ isDefault: true })
    .eq('id', id)
    .select();

  if (error) {
    throw String(error.message);
  }

  return data?.[0] as PageType | undefined;
};

const deleteById = async (id: string) => {
  const response = await supabase.from('pages').delete().eq('id', id).select();

  if (response.error) {
    throw String(response.error.message);
  }

  return response.data;
};

const publishPage = async (pageId: string) => {
  const response = await supabase.rpc('publish_page', { page_id: pageId });
  return response;
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
  deleteById,
  publishPage,
};

export default pages;
