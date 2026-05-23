import api from './axios';

export interface OverleafTemplate {
  id: string;
  slug: string;
  title: string;
  description: string;
  author: string;
  image: string;
  accent: string;
}

export const fetchOverleafTemplates = async (tag: string = 'All', page: number = 1): Promise<OverleafTemplate[]> => {
  const { data } = await api.get('/overleaf/templates', { params: { tag, page } });
  if (!data.success) throw new Error(data.error || 'Failed to fetch templates');
  return data.templates;
};

export const downloadOverleafTemplate = async (id: string, slug: string): Promise<string> => {
  const { data } = await api.get('/overleaf/download', { params: { id, slug } });
  if (!data.success) throw new Error(data.error || 'Failed to download template source');
  return data.source;
};
