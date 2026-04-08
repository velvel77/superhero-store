export async function GET(req: Request) {
  try {
    const url = new URL(req.url).searchParams.get('url');
    if (!url) return new Response('Missing URL', { status: 400 });
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        Referer: 'https://www.superherodb.com/',
      },
    });
    if (!res.ok) {
      console.error('Upstream error:', res.status, res.statusText);
      return new Response('Failed to fetch image', { status: 500 });
    }
    const buffer = await res.arrayBuffer();

    return new Response(buffer, {
      headers: {
        'Content-Type': res.headers.get('Content-Type') || 'image/jpeg',
      },
    });
  } catch (err) {
    console.error('Proxy error:', err);
    return new Response('Internal error', { status: 500 });
  }
}
