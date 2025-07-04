import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from "../../supabaseClient.js";
import gsap from 'gsap';
import { useTranslation } from 'react-i18next';

interface Blog {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  video_url: string | null;
  created_at: string;
  views: number;
  tags: string[];
  type: string;
}

const PAGE_SIZE = 6;
const SORT_OPTIONS = [
  { label: 'Popular', value: 'views_desc' },
  { label: 'Recent', value: 'created_at_desc' },
  { label: 'Oldest', value: 'created_at_asc' },
  { label: 'Alphabetical', value: 'title_asc' },
];
const TYPE_OPTIONS = [
  'Tutorial',
  'Opinion',
  'Project Update',
  'Announcement',
  'Interview',
  'Case Study',
];

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [sort, setSort] = useState('created_at_desc');
  const [allTags, setAllTags] = useState<string[]>([]);

  const blogsContainerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useLayoutEffect(() => {
    if (blogsContainerRef.current) {
      // Ensure individual blog cards start hidden and slightly offset
      gsap.set(blogsContainerRef.current.children, { opacity: 0, y: 50 });
      gsap.to(
        blogsContainerRef.current.children, // Target the children for animation
        { opacity: 1, y: 0, duration: 0.8, ease: "power5.out", stagger: 0.05 }
      );
    }
  }, [blogs]); // Re-run animation when blogs data changes

  useEffect(() => {
    async function fetchTags() {
      const { data, error } = await supabase
        .from('blogs')
        .select('tags');
      if (!error && data) {
        const tagsSet = new Set<string>();
        data.forEach((row: { tags: string[] }) => {
          if (Array.isArray(row.tags)) {
            row.tags.forEach((tag) => tagsSet.add(tag));
          }
        });
        setAllTags(Array.from(tagsSet));
      }
    }
    fetchTags();
  }, []);

  useEffect(() => {
    async function fetchBlogs() {
      setLoading(true);
      let query = supabase.from('blogs').select('*', { count: 'exact' });
      // Filtering
      if (selectedTag) {
        query = query.contains('tags', [selectedTag]);
      }
      if (selectedType) {
        query = query.eq('type', selectedType);
      }
      // Sorting
      if (sort === 'views_desc') query = query.order('views', { ascending: false });
      else if (sort === 'created_at_desc') query = query.order('created_at', { ascending: false });
      else if (sort === 'created_at_asc') query = query.order('created_at', { ascending: true });
      else if (sort === 'title_asc') query = query.order('title', { ascending: true });
      // Pagination
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      query = query.range(from, to);
      const { data, error, count } = await query;
      if (!error && data) {
        console.log("Fetched Blogs Data:", data);
        setBlogs(data);
        setTotal(count || 0);
      } else if (error) {
        console.error("Error fetching blogs:", error);
      }
      setLoading(false);
    }
    fetchBlogs();
  }, [page, selectedTag, selectedType, sort]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  if (loading) return <div className="p-8 text-center">{t('blogs_page.loading')}</div>;

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">{t('blogs_page.title')}</h1>
      {/* Filters & Sorting */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        {/* Type Filter Buttons */}
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 rounded border ${!selectedType ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
            onClick={() => { setSelectedType(null); setPage(1); }}
          >
            {t('blogs_page.filters_and_sorting.all')}
          </button>
          {TYPE_OPTIONS.map(type => (
            <button
              key={type}
              className={`px-3 py-1 rounded border ${selectedType === type ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
              onClick={() => { setSelectedType(type); setPage(1); }}
            >
              {type}
            </button>
          ))}
        </div>
        {/* Tag Dropdown */}
        <div>
          <label className="mr-2 font-medium">{t('blogs_page.filters_and_sorting.tag')}</label>
          <select
            value={selectedTag || ''}
            onChange={e => { setSelectedTag(e.target.value || null); setPage(1); }}
            className="border rounded px-2 py-1"
          >
            <option value="">{t('blogs_page.filters_and_sorting.all')}</option>
            {allTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>
        {/* Sort Dropdown */}
        <div>
          <label className="mr-2 font-medium">{t('blogs_page.filters_and_sorting.sort_by')}</label>
          <select
            value={sort}
            onChange={e => { setSort(e.target.value); setPage(1); }}
            className="border rounded px-2 py-1"
          >
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
      {/* Blog Cards */}
      <div ref={blogsContainerRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <Link
            to={`/blogs/${blog.id}`}
            key={blog.id}
            className="block bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
          >
            {blog.thumbnail && (
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 text-gray-900">{blog.title}</h2>
              <div className="flex flex-wrap gap-2">
                {blog.tags && blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-2">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
        >
          {t('blogs_page.pagination.prev')}
        </button>
        <span className="px-3 py-1">{t('blogs_page.pagination.page_of', { page, totalPages })}</span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
        >
          {t('blogs_page.pagination.next')}
        </button>
      </div>
    </div>
  );
} 