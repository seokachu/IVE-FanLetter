/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["react-jwt-avatar.s3.ap-northeast-2.amazonaws.com"], // 허용할 이미지 도메인 추가
  },
};

export default nextConfig;
