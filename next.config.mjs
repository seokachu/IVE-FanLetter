/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https", // https 프로토콜 사용
        hostname: "react-jwt-avatar.s3.ap-northeast-2.amazonaws.com", // 허용할 이미지 도메인
        port: "", // 포트는 기본적으로 빈 문자열로 설정
        pathname: "/**", // 모든 경로 허용
      },
    ],
  },
};

export default nextConfig;
