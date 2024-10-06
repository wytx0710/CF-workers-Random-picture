# CF-workers-Random-picture
基于CF-workers的随机图片api  
Demo：https://acg.wytx.cc  
***
1.档直接访问`https://acg.wytx.cc`时Cloudflare Worker 会根据用户代理（User-Agent）自动检测设备类型（如移动设备、平板或PC），并跳转到相应的图片链接  
2.当然你也可以通过 URL 参数指定图片组，
例如可以通过访问 http://agc.wytx.cc/?imageGroups=mobile 来指定图片组，如果 imageGroups 参数不存在，则根据 User-Agent 自动确定设备类型。（可指定的图片组为`mobile`，`tablet`，`pc`）
