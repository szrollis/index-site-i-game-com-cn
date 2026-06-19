const contentMap = {
  site: "爱游戏",
  baseUrl: "https://index-site-i-game.com.cn",
  sections: [
    {
      id: "news",
      title: "游戏资讯",
      tags: ["最新", "评测", "攻略"],
      items: [
        { title: "爱游戏上线新版本", url: "/news/new-version" },
        { title: "夏日活动开启", url: "/news/summer-event" }
      ]
    },
    {
      id: "guides",
      title: "新手引导",
      tags: ["入门", "技巧", "推荐"],
      items: [
        { title: "快速上手教程", url: "/guides/quick-start" },
        { title: "资源获取指南", url: "/guides/resource-guide" }
      ]
    },
    {
      id: "community",
      title: "社区互动",
      tags: ["论坛", "分享", "活动"],
      items: [
        { title: "玩家作品展示", url: "/community/artworks" },
        { title: "每周话题讨论", url: "/community/topics" }
      ]
    }
  ],
  keywords: [
    "爱游戏",
    "游戏平台",
    "在线游戏",
    "互动娱乐",
    "新游推荐"
  ]
};

function searchContent(query, map) {
  const q = query.toLowerCase().trim();
  const results = [];
  if (!q) return results;

  for (const section of map.sections) {
    const matchSection = section.title.toLowerCase().includes(q) ||
      section.tags.some(t => t.toLowerCase().includes(q));

    for (const item of section.items) {
      const matchItem = item.title.toLowerCase().includes(q);
      if (matchSection || matchItem) {
        results.push({
          sectionId: section.id,
          sectionTitle: section.title,
          itemTitle: item.title,
          itemUrl: map.baseUrl + item.url,
          score: matchItem ? 2 : 1
        });
      }
    }
  }

  for (const kw of map.keywords) {
    if (kw.toLowerCase().includes(q)) {
      results.push({
        sectionId: null,
        sectionTitle: null,
        itemTitle: "关键词：" + kw,
        itemUrl: map.baseUrl + "/search?q=" + encodeURIComponent(kw),
        score: 1
      });
    }
  }

  results.sort((a, b) => b.score - a.score);
  return results;
}

function getAllTags(map) {
  const tags = new Set();
  for (const section of map.sections) {
    for (const tag of section.tags) {
      tags.add(tag);
    }
  }
  return Array.from(tags);
}

function getSectionById(map, id) {
  return map.sections.find(s => s.id === id) || null;
}

const allTags = getAllTags(contentMap);
const demoQuery = "爱游戏";
const demoResults = searchContent(demoQuery, contentMap);

console.log("站点：", contentMap.site);
console.log("所有标签：", allTags);
console.log("搜索 '" + demoQuery + "' 结果：", demoResults);