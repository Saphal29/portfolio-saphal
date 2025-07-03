import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../supabaseClient.js';

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

function BlogCardDetail({ blog }: { blog: Blog }) {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6 mt-8">
      {blog.thumbnail && (
        <img src={blog.thumbnail} alt={blog.title} className="w-full h-64 object-cover rounded mb-4" />
      )}
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <div className="mb-2 text-sm text-gray-500 flex gap-2">
        <span>{blog.type}</span>
        <span>•</span>
        <span>{new Date(blog.created_at).toLocaleDateString()}</span>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {blog.tags && blog.tags.map((tag) => (
          <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">{tag}</span>
        ))}
      </div>
      <div className="prose max-w-none mb-4">
        {blog.content}
      </div>
      {blog.video_url && (
        <div className="mt-4">
          <iframe
            width="100%"
            height="315"
            src={blog.video_url.replace('watch?v=', 'embed/')}
            title="Blog Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', id)
        .single();
      if (!error && data) {
        setBlog(data);
      }
      setLoading(false);
    }
    fetchBlog();
  }, [id]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!blog) return <div className="p-8 text-center">Blog not found.</div>;

  return <BlogCardDetail blog={blog} />;
} 