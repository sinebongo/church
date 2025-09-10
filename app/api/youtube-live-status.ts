import { NextResponse } from 'next/server';

export async function GET() {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  const CHANNEL_ID = 'UC4QZ_LsYcvcq7qOsOhpAX4A'; // Replace with actual channel ID
  if (!YOUTUBE_API_KEY) {
    return NextResponse.json({ error: 'API key missing' }, { status: 500 });
  }
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&key=${YOUTUBE_API_KEY}`
    );
    const data = await res.json();
    return NextResponse.json({ isLive: data.items && data.items.length > 0 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch live status' }, { status: 500 });
  }
}
