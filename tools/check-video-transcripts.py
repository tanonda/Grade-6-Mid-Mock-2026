#!/usr/bin/env python3
"""Check transcript availability for linked YouTube lessons.

This script prints status, snippet count, and approximate word count for each
video in video-tutorials.json. It does not save full transcripts, because the
app should use transcripts to create original notes rather than redistribute
video scripts verbatim.

Install dependency outside the project if needed:
  python3 -m pip install --user youtube-transcript-api
"""

from __future__ import annotations

import json
from pathlib import Path

from youtube_transcript_api import YouTubeTranscriptApi


ROOT = Path(__file__).resolve().parents[1]


def main() -> None:
    videos = json.loads((ROOT / "video-tutorials.json").read_text())["videos"]
    api = YouTubeTranscriptApi()

    available = 0
    total = 0
    for subject, topics in videos.items():
        for topic, video in topics.items():
            total += 1
            video_id = video["youtubeId"]
            try:
                transcript = api.fetch(video_id, languages=["en"])
                snippet_count = len(transcript)
                word_count = sum(len(snippet.text.split()) for snippet in transcript)
                status = "available"
                available += 1
            except Exception as exc:  # noqa: BLE001 - report API-specific failures as text.
                snippet_count = 0
                word_count = 0
                status = type(exc).__name__

            print(
                "\t".join(
                    [
                        subject,
                        topic,
                        video_id,
                        status,
                        str(snippet_count),
                        str(word_count),
                    ]
                )
            )

    print(f"available\t{available}\tof\t{total}")


if __name__ == "__main__":
    main()
