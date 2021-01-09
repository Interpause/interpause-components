// Adapted from https://github.com/vercel/next.js/tree/canary/examples/with-sitemap
const fs = require('fs');
const globby = require('globby');

const pageExtensions = ['.tsx','.jsx','.mdx'];

function addPage(path){
	path = path.replace('pages','');
	pageExtensions.forEach(ext => path = path.replace(ext,''));
	path = path==='/index'?'':path;

	return `	<url>
		<loc>${process.env.WEBSITE_URL}${path}</loc>
		<changefreq>hourly</changefreq>
	</url>`;
}

async function generateSitemap(){
	const pages = await globby([
		`pages/**/*{${pageExtensions}}`,
		`!pages/_*{${pageExtensions}}`,
		'!pages/api',
	]);
	return fs.writeFileSync('public/sitemap.xml',`
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(addPage).join('\n')}
</urlset>
`);
}

module.exports = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (isServer) {
      generateSitemap();
    }else{
      config.node = { fs: 'empty', module: 'empty' };
    }
    return config;
  },
}