import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Substitui __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  path: path.resolve(__dirname, './envs', `.env.${process.env.NODE_ENV || 'development'}`)
};

// Carrega as variáveis de ambiente
dotenv.config(config);


/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  env: {
    API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    API_AUTH_TOKEN: process.env.API_AUTH_TOKEN,
    ENV: process.env.NEXT_PUBLIC_ENV || 'development'
  },
}

export default nextConfig
