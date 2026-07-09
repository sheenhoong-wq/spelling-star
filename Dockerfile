# 小小听写王 —— 用超轻量 nginx 提供静态 PWA
FROM nginx:alpine

# 拷贝网站文件
COPY . /usr/share/nginx/html
# 拷贝站点配置（正确的 manifest MIME、SW 不缓存）
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
