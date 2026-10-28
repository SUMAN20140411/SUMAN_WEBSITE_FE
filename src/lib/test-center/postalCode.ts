export type PostalCodeResult = {
  zipCode: string;
  roadAddress: string;
  jibunAddress: string;
};

export const EPOST_SEARCH_URL =
  "https://www.epost.go.kr/search.RetrieveIntegrationNewZipCdList.comm";

const VIEW_DETAIL =
  /viewDetail\('([^']*)','([^']*)','([^']*)','([^']*)',\s*'[^']*'\)/g;

export function parseEpostResults(html: string): PostalCodeResult[] {
  const results: PostalCodeResult[] = [];
  const seen = new Set<string>();

  for (const match of html.matchAll(VIEW_DETAIL)) {
    const zipCode = decodeHtml(match[1] ?? "").trim();
    const roadAddress = decodeHtml(match[2] ?? "").trim();
    const jibunAddress = decodeHtml(match[4] ?? "").trim();
    if (!zipCode || !roadAddress) continue;
    const key = `${zipCode}|${roadAddress}`;
    if (seen.has(key)) continue;
    seen.add(key);
    results.push({ zipCode, roadAddress, jibunAddress });
    if (results.length >= 10) break;
  }

  return results;
}

export async function searchEpostAddresses(
  keyword: string
): Promise<PostalCodeResult[]> {
  const trimmed = keyword.trim();
  if (!trimmed) return [];
  if (trimmed.length > 100) {
    throw new Error("keyword too long");
  }

  const body = new URLSearchParams();
  body.set("keyword", trimmed);

  const response = await fetch(EPOST_SEARCH_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      Accept: "text/html,application/xhtml+xml",
    },
    body,
  });
  if (!response.ok) {
    throw new Error(`Upstream request failed (${response.status})`);
  }
  const html = await response.text();
  return parseEpostResults(html);
}

function decodeHtml(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}
