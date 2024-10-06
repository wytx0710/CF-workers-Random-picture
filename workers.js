// 定义存放图片链接的数组
const imageGroups = {
  'mobile': ['https://acg.666710.xyz/mobile/00.jpeg',
  'https://acg.666710.xyz/mobile/01.jpeg',
  'https://acg.666710.xyz/mobile/02.jpeg',
  // ... 省略
  'https://acg.666710.xyz/mobile/75.jpg',
  'https://acg.666710.xyz/mobile/76.jpg'
    // ...移动设备图片链接
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
  // 获取 User-Agent 字符串
  const userAgent = request.headers.get('User-Agent') || '';

  // 解析 User-Agent 确定设备的类型
  let groupKey;
  if (/mobile|android|iphone|ipad|phone/i.test(userAgent)) {
    groupKey = 'mobile';
  } else if (/tablet|ipad/i.test(userAgent)) {
    groupKey = 'tablet';
  } else {
    groupKey = 'pc';
  }

  // 检查是否有对应的图片组
  if (!imageGroups[groupKey]) {
    return new Response('No image group defined for this device type.', { status: 404 });
  }

  // 选择对应设备类型的图片组
  const selectedGroup = imageGroups[groupKey];
  
  // 随机选择图片链接
  const randomImage = selectedGroup[Math.floor(Math.random() * selectedGroup.length)];

  // 检查随机图片链接是否有效
  if (!randomImage) {
    return new Response('Invalid image URL.', { status: 500 });
  }

  // 直接重定向到图片链接
  return Response.redirect(randomImage, 302);
}
