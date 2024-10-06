// 定义存放图片链接的数组
const imageGroups = {
  'mobile': ['https://acg.666710.xyz/mobile/00.jpeg',
  'https://acg.666710.xyz/mobile/01.jpeg',
  'https://acg.666710.xyz/mobile/02.jpeg',
  // ... 此处省略图片链接
  'https://acg.666710.xyz/mobile/75.jpg',
  'https://acg.666710.xyz/mobile/76.jpg'
    // ... 其他移动设备图片链接
  ],
  'tablet': ['https://acg.666710.xyz/tablet/01.png'
    // ... 平板设备图片链接
  ],
  'pc': ['https://acg.666710.xyz/tablet/01.png'
    // ... PC设备图片链接
  ]
};


addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // 获取 URL 查询参数
  const url = new URL(request.url);
  const imageGroupParam = url.searchParams.get('imageGroups');
  
  let groupKey;
  // 根据 URL 参数或 User-Agent 确定设备类型或图片组
  if (imageGroupParam) {
    groupKey = imageGroupParam.toLowerCase();
  } else {
    const userAgent = request.headers.get('User-Agent') || '';
    if (/mobile|android|iphone|ipad|phone/i.test(userAgent)) {
      groupKey = 'mobile';
    } else if (/tablet|ipad/i.test(userAgent)) {
      groupKey = 'tablet';
    } else {
      groupKey = 'pc';
    }
  }

  // 检查是否有对应的图片组
  const selectedGroup = imageGroups[groupKey];
  if (!selectedGroup || selectedGroup.length === 0) {
    return new Response('No images available for the specified group.', { status: 404 });
  }

  // 随机选择图片链接
  const randomImage = selectedGroup[Math.floor(Math.random() * selectedGroup.length)];

  // 直接重定向到图片链接
  return Response.redirect(randomImage, 302);
}
