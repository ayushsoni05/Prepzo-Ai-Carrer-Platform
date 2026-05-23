import Template from '../models/template.model.js';

/**
 * Fetch Database Templates based on a tag/query
 * GET /api/overleaf/templates?tag=resume&page=1
 */
export const getTemplates = async (req, res) => {
  try {
    const { tag = 'All', page = '1', limit = '12' } = req.query;
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 12;
    const skip = (pageNum - 1) * limitNum;
    
    let query = {};
    if (tag && tag !== 'All') {
      // Case-insensitive regex match against tags array
      query = { tags: { $regex: new RegExp(`^${tag}$`, 'i') } };
    }

    const templates = await Template.find(query)
      .select('-sourceCode') // Don't send huge source code in gallery list
      .sort({ downloads: -1, createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await Template.countDocuments(query);

    // Map to frontend expected format
    const formattedTemplates = templates.map(t => ({
      id: t.templateId,
      slug: t.templateId,
      title: t.name,
      description: t.description,
      author: t.author,
      image: null, // We use SVG wireframes on frontend
      accent: t.accent,
      badge: t.badge
    }));

    res.json({ 
      success: true, 
      templates: formattedTemplates, 
      totalFetched: formattedTemplates.length,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum
    });
  } catch (error) {
    console.error('[Template DB] Fetch error:', error.message);
    res.status(500).json({ success: false, error: 'Failed to fetch templates.' });
  }
};

/**
 * Download Source Code for a Template
 * GET /api/overleaf/download?id=...
 */
export const downloadTemplate = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ success: false, error: 'Missing id parameter.' });
    }

    const template = await Template.findOne({ templateId: id });
    if (!template) {
      return res.status(404).json({ success: false, error: 'Template not found in database.' });
    }

    // Increment download counter
    template.downloads = (template.downloads || 0) + 1;
    await template.save();

    res.json({ 
      success: true, 
      source: template.sourceCode, 
      filename: 'main.tex' 
    });
  } catch (error) {
    console.error('[Template DB] Download error:', error.message);
    res.status(500).json({ success: false, error: 'Failed to retrieve template source.' });
  }
};
