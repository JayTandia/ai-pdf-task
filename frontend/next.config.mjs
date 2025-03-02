/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
      config.module.rules.push({
        test: /pdf\.worker\.(min\.)?js/,
        loader: "file-loader",
        options: {
          name: "[name].[contenthash].[ext]",
          publicPath: "/_next/static/worker/",
          outputPath: "static/worker/",
        },
      });
  
      return config;
    },
  };
  
  export default nextConfig;
  