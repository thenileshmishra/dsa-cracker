import React from 'react';
import { Helmet } from 'react-helmet-async';

function SEO({ 
  title = 'DSA Cracker - Practice DSA Questions',
  description = 'Practice DSA questions from popular sheets like Love Babbar 450, Arsh Goyal, and Fraz. Track your progress and improve your coding skills.',
  keywords = 'DSA, Data Structures, Algorithms, Coding, Programming, Love Babbar, Arsh Goyal, Fraz, LeetCode, GeeksforGeeks',
  image = '/data-structure.png',
  url = window.location.href,
  type = 'website'
}) {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="DSA Cracker" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Favicon */}
      <link rel="icon" type="image/png" href="/data-structure.png" />
      <link rel="apple-touch-icon" href="/data-structure.png" />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
}

export default SEO; 