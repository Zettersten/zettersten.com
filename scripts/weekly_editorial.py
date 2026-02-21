#!/usr/bin/env python3
"""
Weekly editorial pipeline for zettersten.com
- Runs every Monday 9:00 AM America/New_York (enforced in-script)
- Collects last-7-day sources from curated RSS feeds
- Uses OpenAI API for synthesis + long-form article drafting
- Writes markdown post to src/content/blog/
"""

from __future__ import annotations

import datetime as dt
import json
import os
import re
import sys
from pathlib import Path
from urllib.request import urlopen, Request

try:
    from zoneinfo import ZoneInfo
except Exception:
    ZoneInfo = None

try:
    import feedparser  # type: ignore
except Exception:
    print("feedparser missing. pip install feedparser", file=sys.stderr)
    sys.exit(1)

import urllib.request

ROOT = Path(__file__).resolve().parents[1]
BLOG_DIR = ROOT / "src" / "content" / "blog"

RSS_FEEDS = [
    "https://openai.com/news/rss.xml",
    "https://www.anthropic.com/news/rss.xml",
    "https://blog.google/technology/ai/rss/",
    "https://feeds.arstechnica.com/arstechnica/technology-lab",
    "https://www.theverge.com/rss/index.xml",
    "https://www.wired.com/feed/tag/ai/latest/rss",
    "https://www.tomshardware.com/feeds/all",
    "https://www.gamesindustry.biz/feed",
]

TOPIC_HINTS = """
Prioritize: frontier labs, AI labor displacement, enterprise governance/compliance,
software role transformation, infra failures, hardware economics, gaming shifts,
family/parenting impact, centralization vs decentralization, ethical/spiritual leadership implications.
""".strip()


def now_ny() -> dt.datetime:
    if ZoneInfo is None:
        return dt.datetime.utcnow()
    return dt.datetime.now(ZoneInfo("America/New_York"))


def should_run() -> bool:
    n = now_ny()
    return n.weekday() == 0 and n.hour == 9


def clean_text(t: str) -> str:
    return re.sub(r"\s+", " ", (t or "")).strip()


def collect_items(days: int = 7) -> list[dict]:
    cutoff = dt.datetime.utcnow() - dt.timedelta(days=days)
    items: list[dict] = []
    for feed in RSS_FEEDS:
        try:
            parsed = feedparser.parse(feed)
            for e in parsed.entries[:30]:
                published = None
                if getattr(e, "published_parsed", None):
                    published = dt.datetime(*e.published_parsed[:6])
                elif getattr(e, "updated_parsed", None):
                    published = dt.datetime(*e.updated_parsed[:6])
                else:
                    published = dt.datetime.utcnow()

                if published < cutoff:
                    continue
                items.append(
                    {
                        "title": clean_text(getattr(e, "title", "")),
                        "link": getattr(e, "link", ""),
                        "summary": clean_text(getattr(e, "summary", ""))[:500],
                        "published": published.isoformat() + "Z",
                        "source": feed,
                    }
                )
        except Exception:
            continue

    dedup = {}
    for i in items:
        key = i["link"] or i["title"]
        dedup[key] = i
    return list(dedup.values())


def openai_chat(prompt: str) -> str:
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        raise RuntimeError("OPENAI_API_KEY missing")

    payload = {
        "model": os.environ.get("OPENAI_MODEL", "gpt-4o"),
        "messages": [
            {"role": "system", "content": "You are a senior AI and technology editorial analyst."},
            {"role": "user", "content": prompt},
        ],
        "temperature": 0.45,
    }

    req = Request(
        "https://api.openai.com/v1/chat/completions",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )

    with urlopen(req, timeout=120) as r:
        data = json.loads(r.read().decode("utf-8"))
    return data["choices"][0]["message"]["content"].strip()


def slugify(s: str) -> str:
    s = re.sub(r"[^a-zA-Z0-9\s-]", "", s).strip().lower()
    return re.sub(r"[\s_-]+", "-", s)


def parse_title_meta(text: str) -> tuple[str, str, str]:
    title = "Weekly AI Systems Brief"
    meta = "Weekly analysis across AI, systems, labor, and leadership dynamics."
    social = "New weekly: where AI, labor, and systems strategy collide."
    for line in text.splitlines():
        if line.lower().startswith("seo title:"):
            title = line.split(":", 1)[1].strip()
        if line.lower().startswith("meta description:"):
            meta = line.split(":", 1)[1].strip()
        if line.lower().startswith("suggested social headline:"):
            social = line.split(":", 1)[1].strip()
    return title[:70], meta[:155], social


def build_prompt(items: list[dict]) -> str:
    items_json = json.dumps(items[:50], indent=2)
    return f"""
Write one original long-form markdown article based on the previous 7 days of developments.

Constraints:
- 2,300–3,000 words
- 18–24 paragraphs
- Confident, precise, principled, unsentimental tone
- Include these structure sections with markdown H2s:
  1) Opening Thesis
  2) Evidence and Context
  3) Systems Analysis
  4) Leadership and Cultural Implications
  5) Forward Projection (3-5 years)
  6) Closing Position
- Distinguish verified facts from speculation
- Include a short "Sources" section with bullet links used
- Avoid generic summaries; provide original synthesis and defensible position
- Challenge at least one dominant industry narrative
- Output format (top lines):
  SEO Title: ...
  Meta Description: ...
  Suggested Social Headline: ...

Topic priorities:
{TOPIC_HINTS}

Candidate source items JSON:
{items_json}
""".strip()


def write_post(raw: str) -> Path:
    title, meta, _ = parse_title_meta(raw)
    body = raw
    # remove top label lines from body
    body = re.sub(r"(?im)^SEO Title:.*$", "", body)
    body = re.sub(r"(?im)^Meta Description:.*$", "", body)
    body = re.sub(r"(?im)^Suggested Social Headline:.*$", "", body)
    body = body.strip()

    today = now_ny().date().isoformat()
    slug = slugify(title)
    out = BLOG_DIR / f"{slug}.md"
    frontmatter = f'''---
title: "{title.replace('"', '\\"')}"
description: "{meta.replace('"', '\\"')}"
date: {today}
tags: ["weekly-brief", "AI", "systems", "leadership"]
category: "Weekly Intelligence"
coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=1600&q=80"
draft: false
---

'''
    out.write_text(frontmatter + body + "\n", encoding="utf-8")
    return out


def main() -> int:
    if not should_run() and os.environ.get("FORCE_RUN") != "1":
        print("Not Monday 9:00 AM America/New_York; exiting.")
        return 0

    items = collect_items(days=7)
    if len(items) < 6:
        print("Not enough fresh source material; exiting.")
        return 1

    prompt = build_prompt(items)
    article = openai_chat(prompt)
    out = write_post(article)
    print(f"Wrote article: {out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
