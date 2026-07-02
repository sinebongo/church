import { NextResponse } from "next/server";

const CHANNEL_HANDLE = process.env.YOUTUBE_CHANNEL_HANDLE ?? "ELCSACentralDioceseYouthLeague";

export async function GET() {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { configured: false, isLive: false },
      { headers: { "Cache-Control": "s-maxage=60" } }
    );
  }

  try {
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet&forHandle=${CHANNEL_HANDLE}&key=${apiKey}`
    );
    const channelData = await channelRes.json();
    const channel = channelData.items?.[0];

    if (!channel) {
      return NextResponse.json(
        { configured: true, isLive: false, channelUrl: `https://www.youtube.com/@${CHANNEL_HANDLE}` },
        { headers: { "Cache-Control": "s-maxage=60" } }
      );
    }

    const channelUrl = `https://www.youtube.com/@${CHANNEL_HANDLE}`;

    if (channel.snippet?.liveBroadcastContent !== "live") {
      return NextResponse.json(
        { configured: true, isLive: false, channelUrl },
        { headers: { "Cache-Control": "s-maxage=60" } }
      );
    }

    const searchRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channel.id}&eventType=live&type=video&key=${apiKey}`
    );
    const searchData = await searchRes.json();
    const liveVideo = searchData.items?.[0];

    return NextResponse.json(
      {
        configured: true,
        isLive: !!liveVideo,
        videoId: liveVideo?.id?.videoId,
        channelUrl,
      },
      { headers: { "Cache-Control": "s-maxage=60" } }
    );
  } catch {
    return NextResponse.json(
      { configured: true, isLive: false, error: true, channelUrl: `https://www.youtube.com/@${CHANNEL_HANDLE}` },
      { headers: { "Cache-Control": "s-maxage=60" } }
    );
  }
}
